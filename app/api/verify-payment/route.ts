import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { sendOrderConfirmationEmail, sendOrderNotificationToOwner } from "@/lib/email" // import your email functions

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
})

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, orderData } = await request.json()

    if (!paymentIntentId) {
      return NextResponse.json({ error: "Payment Intent ID required" }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    // Only send emails if payment succeeded
    if (paymentIntent.status === "succeeded") {
      try {
        await sendOrderConfirmationEmail(orderData)
        await sendOrderNotificationToOwner(orderData)
        console.log("✅ Order emails sent!")
      } catch (emailError) {
        console.error("❌ Error sending order emails:", emailError)
      }
    }

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
      created: paymentIntent.created,
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}