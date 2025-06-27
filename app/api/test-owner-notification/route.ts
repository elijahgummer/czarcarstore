import { type NextRequest, NextResponse } from "next/server"
import { sendOrderNotificationToOwner, type OrderEmailData } from "@/lib/email"
// import { sendBackupOwnerNotification } from "@/lib/email"

// Create test order data
const testOrderData: OrderEmailData = {
  customerEmail: "testcustomer@example.com",
  customerName: "John Smith",
  orderNumber: `CZ-TEST-${Date.now().toString().slice(-6)}`,
  orderTotal: 89.99,
  orderItems: [
    {
      name: "LED Strip Lights",
      options: "Blue / 3M / USB Plug",
      quantity: 2,
      price: 29.99,
      total: 59.98,
    },
    {
      name: "Phone Holder",
      options: "Mode 2",
      quantity: 1,
      price: 29.99,
      total: 29.99,
    },
  ],
  shippingAddress: {
    name: "John Smith",
    address: "123 Test Street",
    city: "Sydney",
    state: "NSW",
    zipCode: "2000",
  },
  paymentIntentId: "pi_test_1234567890",
};

// Export an async handler function for the API route
export async function POST(req: NextRequest) {
  try {
    console.log("📧 Sending test notification to elijahgummer5@gmail.com...")

    // Try primary notification
    const result = await sendOrderNotificationToOwner(testOrderData)

    if (result.success) {
      console.log("✅ Primary owner notification sent successfully!")
      return NextResponse.json({
        success: true,
        message: "Test owner notification sent successfully to elijahgummer5@gmail.com",
        data: result.data,
      })
    } else {
      console.error("❌ Primary notification failed:", result.error)
      return NextResponse.json(
        {
          success: false,
          error: "Primary notification failed",
          primaryError: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("❌ Error in test owner notification:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error,
      },
      { status: 500 },
    )
  }
}
