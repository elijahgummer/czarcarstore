import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getCountryByCode, stripeSupportedCurrencies } from "@/lib/countries"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "usd", metadata = {}, items = [], countryCode = "US" } = await request.json()

    console.log("Creating payment intent with:", { amount, currency, metadata, items, countryCode })

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Validate currency
    const requestedCurrency = currency.toUpperCase()
    const finalCurrency = stripeSupportedCurrencies.includes(requestedCurrency) ? requestedCurrency : "USD"

    if (finalCurrency !== requestedCurrency) {
      console.log(`Currency ${requestedCurrency} not supported, using USD instead`)
    }

    // Calculate the actual amount in cents (or smallest currency unit)
    let amountInSmallestUnit: number

    // Handle zero-decimal currencies (like JPY, KRW)
    const zeroDecimalCurrencies = ["JPY", "KRW", "CLP", "ISK", "HUF", "TWD", "UGX"]
    if (zeroDecimalCurrencies.includes(finalCurrency)) {
      amountInSmallestUnit = Math.round(amount)
    } else {
      amountInSmallestUnit = Math.round(amount * 100)
    }

    const country = getCountryByCode(countryCode)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: finalCurrency.toLowerCase(),
      metadata: {
        ...metadata,
        order_items: JSON.stringify(items),
        order_total: amount.toString(),
        customer_name: metadata.customer_name || "Customer",
        country_code: countryCode,
        original_currency: currency,
      },
      automatic_payment_methods: {
        enabled: true,
      },
      description: `CzarCar Order - ${items.length} items - ${country?.name || countryCode}`,
      receipt_email: metadata.email || undefined,
      shipping: metadata.shipping
        ? {
            name: metadata.shipping.name,
            address: {
              line1: metadata.shipping.address,
              city: metadata.shipping.city,
              state: metadata.shipping.state,
              postal_code: metadata.shipping.postalCode,
              country: countryCode,
            },
          }
        : undefined,
    })

    console.log("Payment intent created:", paymentIntent.id, "Currency:", finalCurrency)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      currency: finalCurrency,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
