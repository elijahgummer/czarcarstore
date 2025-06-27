import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { sendOrderConfirmationEmail, sendOrderNotificationToOwner } from "@/lib/email"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  console.log("🔔 Webhook received")

  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    console.log("✅ Webhook event type:", event.type)
  } catch (error) {
    console.error("❌ Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log("💰 Payment succeeded:", paymentIntent.id)
      console.log("📋 Payment Intent metadata:", paymentIntent.metadata)
      console.log("📧 Payment Intent receipt_email:", paymentIntent.receipt_email)
      console.log("📦 Payment Intent shipping:", paymentIntent.shipping)

      try {
        // Extract order data from metadata
        const metadata = paymentIntent.metadata
        let orderItems = []

        try {
          orderItems = metadata.order_items ? JSON.parse(metadata.order_items) : []
          console.log("📦 Parsed order items:", orderItems)
        } catch (parseError) {
          console.error("❌ Error parsing order items:", parseError)
          orderItems = []
        }

        // Generate unique order number
        const orderNumber = `CZ-${Date.now().toString().slice(-6)}`

        // Prepare order data for emails
        const orderEmailData = {
          customerEmail: paymentIntent.receipt_email || "customer@example.com",
          customerName: metadata.customer_name || paymentIntent.shipping?.name || "Customer",
          orderNumber: orderNumber,
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

        console.log("📋 Email data prepared:", JSON.stringify(orderEmailData, null, 2))

        // 🚨 CRITICAL: Send notification email to store owner (YOU!)
        console.log("🚨 SENDING ORDER NOTIFICATION TO ELIJAH...")
        let ownerNotificationResult = { success: false } // Declare the variable before using it
        try {
          ownerNotificationResult = await sendOrderNotificationToOwner(orderEmailData)
          if (ownerNotificationResult.success) {
            console.log("✅ SUCCESS: Owner notification sent to elijahgummer5@gmail.com!")
          } else {
            console.error("❌ FAILED: Owner notification error:", ownerNotificationResult.error)
          }
        } catch (ownerError) {
          console.error("❌ CRITICAL ERROR sending owner notification:", ownerError)
        }

        // 📧 Send confirmation email to customer
        if (paymentIntent.receipt_email) {
          console.log("📧 Sending customer confirmation email...")
          try {
            const customerEmailResult = await sendOrderConfirmationEmail(orderEmailData)
            if (customerEmailResult.success) {
              console.log("✅ SUCCESS: Customer confirmation email sent!")
            } else {
              console.error("❌ FAILED: Customer email error:", customerEmailResult.error)
            }
          } catch (customerError) {
            console.error("❌ ERROR sending customer email:", customerError)
          }
        }

        // 📊 Log final status
        console.log("🎉 ORDER PROCESSING COMPLETE")
        console.log(`📧 Owner email: ${ownerNotificationResult?.success ? "SENT" : "FAILED"}`)
        console.log(`📧 Customer email: ${paymentIntent.receipt_email ? "SENT" : "NO EMAIL PROVIDED"}`)
      } catch (error) {
        console.error("❌ CRITICAL ERROR processing successful payment:", error)
      }
      break

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object as Stripe.PaymentIntent
      console.log("❌ Payment failed:", failedPayment.id)
      break

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
