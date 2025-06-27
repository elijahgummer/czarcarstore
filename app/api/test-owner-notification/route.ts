import { type NextRequest, NextResponse } from "next/server"
// Make sure sendOrderNotificationToOwner is exported from "@/lib/email"
// If it is not, either export it in that file or import the correct function here
// Make sure sendOrderNotificationToOwner is exported from "@/lib/email"
// If not, import the correct function name as exported from that file
import { type OrderEmailData } from "@/lib/email"
// import { sendOrderNotificationToOwner } from "@/lib/email" // Uncomment and use the correct function name below

// Example: If the function is named sendOwnerNotification in the module, import as:
import { sendOwnerNotification as sendOrderNotificationToOwner } from "@/lib/email"

// Patch: Extend OrderEmailData type locally to include 'options' in orderItems if not present in the original type
type OrderItemWithOptions = {
  name: string;
  options: string;
  quantity: number;
  price: number;
  total: number;
};

type OrderEmailDataWithOptions = Omit<OrderEmailData, "orderItems"> & {
  orderItems: OrderItemWithOptions[];
};

// Create test order data
const testOrderData: OrderEmailDataWithOptions = {
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
      console.log("❌ Primary notification failed, trying backup...")

      // Try backup notification
      const backupResult = await sendBackupOwnerNotification(testOrderData)

      if (backupResult.success) {
        console.log("✅ Backup owner notification sent successfully!")
        return NextResponse.json({
          success: true,
          message: "Test backup notification sent successfully to elijahgummer5@gmail.com",
          data: backupResult.data,
        })
      } else {
        console.error("❌ Both notifications failed:", backupResult.error)
        return NextResponse.json(
          {
            success: false,
            error: "Both primary and backup notifications failed",
            primaryError: result.error,
            backupError: backupResult.error,
          },
          { status: 500 },
        )
      }
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
