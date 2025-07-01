import { type NextRequest, NextResponse } from "next/server"
import { sendOrderConfirmationEmail, sendOrderNotificationToOwner, type OrderEmailData } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderEmailData = await request.json()

    // Validate required fields
    if (!orderData.customerEmail || !orderData.customerName || !orderData.orderNumber) {
      return NextResponse.json({ error: "Missing required order data" }, { status: 400 })
    }

    // Send the customer confirmation email
    const customerResult = await sendOrderConfirmationEmail(orderData)

    // Send the owner notification email
    const ownerResult = await sendOrderNotificationToOwner(orderData)

    if (customerResult.success && ownerResult.success) {
      return NextResponse.json({ success: true, message: "Order confirmation and owner alert sent" })
    } else {
      console.error("Failed to send email:", customerResult.error || ownerResult.error)
      return NextResponse.json({ error: "Failed to send one or more emails" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in send-order-email API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}