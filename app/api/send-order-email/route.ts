import { type NextRequest, NextResponse } from "next/server"
import { sendOrderConfirmationEmail, type OrderEmailData } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderEmailData = await request.json()

    // Validate required fields
    if (!orderData.customerEmail || !orderData.customerName || !orderData.orderNumber) {
      return NextResponse.json({ error: "Missing required order data" }, { status: 400 })
    }

    // Send the email
    const result = await sendOrderConfirmationEmail(orderData)

    if (result.success) {
      return NextResponse.json({ success: true, message: "Order confirmation email sent" })
    } else {
      console.error("Failed to send email:", result.error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in send-order-email API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
