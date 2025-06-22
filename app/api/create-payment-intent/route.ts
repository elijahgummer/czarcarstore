import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "usd", metadata = {}, items = [] } = await request.json()

    console.log("Creating payment intent with:", { amount, currency, metadata, items })

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Calculate the actual amount in cents
    const amountInCents = Math.round(amount * 100)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      metadata: {
        ...metadata,
        order_items: JSON.stringify(items),
        order_total: amount.toString(),
        customer_name: metadata.customer_name || "Customer",
      },
      automatic_payment_methods: {
        enabled: true,
      },
      description: `CzarCar Order - ${items.length} items`,
      receipt_email: metadata.email || undefined,
    })

    console.log("Payment intent created:", paymentIntent.id)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}
