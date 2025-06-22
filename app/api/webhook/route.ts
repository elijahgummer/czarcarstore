import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { sendOrderConfirmationEmail } from "@/lib/email"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log("Payment succeeded:", paymentIntent.id)

      try {
        // Extract order data from metadata
        const metadata = paymentIntent.metadata
        const orderItems = metadata.order_items ? JSON.parse(metadata.order_items) : []

        // Send order confirmation email
        if (paymentIntent.receipt_email && metadata.customer_name) {
          const orderEmailData = {
            customerEmail: paymentIntent.receipt_email,
            customerName: metadata.customer_name,
            orderNumber: `CZ-${Date.now().toString().slice(-6)}`,
            orderTotal: paymentIntent.amount / 100, // Convert from cents
            orderItems: orderItems,
            shippingAddress: {
              name: paymentIntent.shipping?.name || metadata.customer_name,
              address: paymentIntent.shipping?.address?.line1 || "Address not provided",
              city: paymentIntent.shipping?.address?.city || "City not provided",
              state: paymentIntent.shipping?.address?.state || "State not provided",
              zipCode: paymentIntent.shipping?.address?.postal_code || "ZIP not provided",
            },
            paymentIntentId: paymentIntent.id,
          }

          const emailResult = await sendOrderConfirmationEmail(orderEmailData)
          if (emailResult.success) {
            console.log("Order confirmation email sent successfully")
          } else {
            console.error("Failed to send order confirmation email:", emailResult.error)
          }
        }
      } catch (error) {
        console.error("Error processing successful payment:", error)
      }
      break

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object as Stripe.PaymentIntent
      console.log("Payment failed:", failedPayment.id)
      // Handle failed payment - could send failure notification email
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
