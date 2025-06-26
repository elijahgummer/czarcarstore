import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { sendOrderConfirmationEmail, sendOrderNotificationToOwner, sendBackupOwnerNotification } from "@/lib/email"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  console.log("Webhook received")

  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    console.log("Webhook event type:", event.type)
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log("Payment succeeded:", paymentIntent.id)
      console.log("Payment Intent metadata:", paymentIntent.metadata)
      console.log("Payment Intent receipt_email:", paymentIntent.receipt_email)
      console.log("Payment Intent shipping:", paymentIntent.shipping)

      try {
        // Extract order data from metadata
        const metadata = paymentIntent.metadata
        let orderItems = []

        try {
          orderItems = metadata.order_items ? JSON.parse(metadata.order_items) : []
          console.log("Parsed order items:", orderItems)
        } catch (parseError) {
          console.error("Error parsing order items:", parseError)
          orderItems = []
        }

        // Prepare order data for emails
        const orderEmailData = {
          customerEmail: paymentIntent.receipt_email || "customer@example.com",
          customerName: metadata.customer_name || paymentIntent.shipping?.name || "Customer",
          orderNumber: `CZ-${Date.now().toString().slice(-6)}`,
          orderTotal: paymentIntent.amount / 100, // Convert from cents
          orderItems: orderItems,
          shippingAddress: {
            name: paymentIntent.shipping?.name || metadata.customer_name || "Customer",
            address: paymentIntent.shipping?.address?.line1 || "Address not provided",
            city: paymentIntent.shipping?.address?.city || "City not provided",
            state: paymentIntent.shipping?.address?.state || "State not provided",
            zipCode: paymentIntent.shipping?.address?.postal_code || "ZIP not provided",
          },
          paymentIntentId: paymentIntent.id,
        }

        console.log("Email data prepared:", JSON.stringify(orderEmailData, null, 2))

        // Send confirmation email to customer
        if (paymentIntent.receipt_email) {
          const emailResult = await sendOrderConfirmationEmail(orderEmailData)
          if (emailResult.success) {
            console.log("✅ Customer confirmation email sent successfully")
          } else {
            console.error("❌ Failed to send customer confirmation email:", emailResult.error)
          }
        }

        // 🚨 CRITICAL: Send notification email to store owner
        console.log("🚨 Sending order notification to store owner at elijahgummer5@gmail.com...")
        try {
          const ownerNotificationResult = await sendOrderNotificationToOwner(orderEmailData)
          if (ownerNotificationResult.success) {
            console.log("✅ Owner notification email sent successfully to elijahgummer5@gmail.com!")
          } else {
            console.error("❌ Failed to send owner notification email:", ownerNotificationResult.error)
            // Try to send a backup notification
            console.log("🔄 Attempting backup owner notification...")
            const backupResult = await sendBackupOwnerNotification(orderEmailData)
            console.log("Backup notification result:", backupResult)
          }
        } catch (error) {
          console.error("❌ Critical error sending owner notification:", error)
        }
      } catch (error) {
        console.error("Error processing successful payment:", error)
      }
      break

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object as Stripe.PaymentIntent
      console.log("Payment failed:", failedPayment.id)
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
