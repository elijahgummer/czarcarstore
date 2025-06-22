import { type NextRequest, NextResponse } from "next/server"
import { sendOrderConfirmationEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    console.log("Testing email send to:", email)

    // Test email data
    const testOrderData = {
      customerEmail: email,
      customerName: "Test Customer",
      orderNumber: `TEST-${Date.now().toString().slice(-6)}`,
      orderTotal: 29.99,
      orderItems: [
        {
          name: "Test Car Phone Holder",
          quantity: 1,
          price: 8.99,
          total: 8.99,
        },
        {
          name: "Test LED Strip Lights",
          quantity: 2,
          price: 10.5,
          total: 21.0,
        },
      ],
      shippingAddress: {
        name: "Test Customer",
        address: "123 Test Street",
        city: "Test City",
        state: "CA",
        zipCode: "12345",
      },
      paymentIntentId: "pi_test_123456789",
    }

    const result = await sendOrderConfirmationEmail(testOrderData)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Test email sent successfully!",
        data: result.data,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in test-email API:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
