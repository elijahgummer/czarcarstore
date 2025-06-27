import { Resend } from "resend"

// Initialize Resend with better error handling
const resend = new Resend(process.env.RESEND_API_KEY)

// Add debug logging
console.log("Resend API Key configured:", !!process.env.RESEND_API_KEY)

export interface OrderEmailData {
  customerEmail: string
  customerName: string
  orderNumber: string
  orderTotal: number
  orderItems: Array<{
    name: string
    options?: string
    quantity: number
    price: number
    total: number
  }>
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  paymentIntentId: string
}

export async function sendOrderConfirmationEmail(orderData: OrderEmailData) {
  try {
    console.log("Attempting to send email to:", orderData.customerEmail)
    console.log("Order data:", JSON.stringify(orderData, null, 2))

    // Validate required data
    if (!orderData.customerEmail) {
      throw new Error("Customer email is required")
    }

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set")
    }

    const { data, error } = await resend.emails.send({
      from: "CzarCar <czarcarphotos@gmail.com>", // Use Resend's default domain for testing
      to: [orderData.customerEmail],
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      html: generateOrderConfirmationHTML(orderData),
    })

    if (error) {
      console.error("Resend API error:", error)
      return { success: false, error }
    }

    console.log("Email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error in sendOrderConfirmationEmail:", error)
    return { success: false, error }
  }
}

// 🚨 ENHANCED: Send order notification to store owner (YOU!)
export async function sendOrderNotificationToOwner(orderData: OrderEmailData) {
  try {
    console.log("🚨 SENDING ORDER NOTIFICATION TO STORE OWNER")
    console.log("Order details:", JSON.stringify(orderData, null, 2))

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set")
    }

    // Your email address - hardcoded as backup
    const OWNER_EMAIL = process.env.OWNER_EMAIL || "elijahgummer5@gmail.com"

    console.log("📧 Sending owner notification to:", OWNER_EMAIL)

    const { data, error } = await resend.emails.send({
      from: "CzarCar Orders <czarcarphotos@gmail.com>",
      to: [OWNER_EMAIL],
      subject: `🚨 NEW ORDER #${orderData.orderNumber} - $${orderData.orderTotal.toFixed(2)} - SHIP NOW!`,
      html: generateOwnerNotificationHTML(orderData),
    })

    if (error) {
      console.error("❌ Error sending owner notification:", error)
      return { success: false, error }
    }

    console.log("✅ Owner notification sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("❌ Critical error in sendOrderNotificationToOwner:", error)
    return { success: false, error }
  }
}

// 🆕 NEW: Backup notification method
export async function sendBackupOwnerNotification(orderData: OrderEmailData) {
  try {
    console.log("🔄 Sending backup owner notification...")

    const { data, error } = await resend.emails.send({
      from: "CzarCar Backup <czarcarphotos@gmail.com>",
      to: ["elijahgummer5@gmail.com"], // Your email hardcoded
      subject: `🚨 BACKUP ALERT - Order ${orderData.orderNumber} - $${orderData.orderTotal.toFixed(2)}`,
      html: generateSimpleOwnerNotificationHTML(orderData),
    })

    return { success: !error, data, error }
  } catch (error) {
    console.error("Backup notification failed:", error)
    return { success: false, error }
  }
}

export async function sendShippingNotificationEmail(orderData: OrderEmailData & { trackingNumber?: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "CzarCar <czarcarphotos@gmail.com>",
      to: [orderData.customerEmail],
      subject: `Your Order is Shipping - ${orderData.orderNumber}`,
      html: generateShippingNotificationHTML(orderData),
    })

    if (error) {
      console.error("Error sending shipping email:", error)
      return { success: false, error }
    }

    console.log("Shipping notification email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending shipping email:", error)
    return { success: false, error }
  }
}

// 🚨 ENHANCED: Generate comprehensive owner notification email
function generateOwnerNotificationHTML(orderData: OrderEmailData): string {
  const itemsHTML = orderData.orderItems
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px 8px; color: #374151; font-weight: 500;">
        ${item.name}
        ${item.options ? `<br><small style="color: #6b7280; font-style: italic;">${item.options}</small>` : ""}
      </td>
      <td style="padding: 12px 8px; text-align: center; color: #374151; font-weight: 600;">${item.quantity}</td>
      <td style="padding: 12px 8px; text-align: right; color: #374151;">$${item.price.toFixed(2)}</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: 700; color: #111827;">$${item.total.toFixed(2)}</td>
    </tr>
  `,
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>🚨 NEW ORDER ALERT - CzarCar</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      
      <!-- URGENT HEADER -->
      <div style="text-align: center; margin-bottom: 30px; padding: 25px; background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h1 style="color: white; font-size: 32px; margin: 0; font-weight: bold;">🚨 NEW ORDER ALERT!</h1>
        <p style="color: #fecaca; margin: 8px 0 0 0; font-size: 18px; font-weight: 500;">CzarCar Store - SHIP IMMEDIATELY</p>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Hi Elijah! You have a new order to fulfill.</p>
      </div>

      <!-- ORDER SUMMARY CARD -->
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 6px solid #f59e0b; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h2 style="color: #92400e; margin: 0; font-size: 28px; font-weight: bold;">💰 Order #${orderData.orderNumber}</h2>
          <div style="background: #dc2626; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 18px;">
            $${orderData.orderTotal.toFixed(2)}
          </div>
        </div>
        <div style="grid-template-columns: 1fr 1fr; display: grid; gap: 15px; color: #92400e;">
          <div><strong>Payment ID:</strong> ${orderData.paymentIntentId}</div>
          <div><strong>Order Date:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
        </div>
      </div>

      <!-- CUSTOMER CONTACT INFO CARD -->
      <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
        <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; display: flex; align-items: center;">
          👤 CUSTOMER CONTACT DETAILS
        </h3>
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <div style="margin-bottom: 15px;">
                <strong style="color: #374151; display: block; margin-bottom: 4px; font-size: 14px;">CUSTOMER NAME:</strong>
                <span style="color: #111827; font-size: 18px; font-weight: 600;">${orderData.customerName}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <strong style="color: #374151; display: block; margin-bottom: 4px; font-size: 14px;">EMAIL ADDRESS:</strong>
                <a href="mailto:${orderData.customerEmail}" style="color: #dc2626; text-decoration: none; font-weight: 600; font-size: 16px;">${orderData.customerEmail}</a>
              </div>
            </div>
            <div>
              <div style="margin-bottom: 15px;">
                <strong style="color: #374151; display: block; margin-bottom: 4px; font-size: 14px;">ORDER DATE:</strong>
                <span style="color: #111827; font-size: 16px;">${new Date().toLocaleDateString()}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <strong style="color: #374151; display: block; margin-bottom: 4px; font-size: 14px;">ORDER TIME:</strong>
                <span style="color: #111827; font-size: 16px;">${new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SHIPPING ADDRESS CARD -->
      <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
        <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; display: flex; align-items: center;">
          📦 SHIPPING ADDRESS (WHERE TO SEND)
        </h3>
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <div style="color: #111827; line-height: 1.8; font-size: 16px;">
            <div style="font-weight: 700; font-size: 20px; margin-bottom: 8px; color: #15803d;">${orderData.shippingAddress.name}</div>
            <div style="margin-bottom: 6px; font-weight: 500;">${orderData.shippingAddress.address}</div>
            <div style="font-weight: 600; font-size: 18px;">${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zipCode}</div>
          </div>
        </div>
      </div>

      <!-- ORDER ITEMS CARD -->
      <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
        <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 20px;">📋 ITEMS TO SHIP</h3>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #374151;">
                <th style="text-align: left; padding: 15px 12px; color: white; font-weight: 600; font-size: 14px;">PRODUCT</th>
                <th style="text-align: center; padding: 15px 12px; color: white; font-weight: 600; font-size: 14px;">QTY</th>
                <th style="text-align: right; padding: 15px 12px; color: white; font-weight: 600; font-size: 14px;">PRICE</th>
                <th style="text-align: right; padding: 15px 12px; color: white; font-weight: 600; font-size: 14px;">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 3px solid #e5e7eb; text-align: right;">
          <div style="font-size: 24px; font-weight: bold; color: #dc2626; background: #fef2f2; padding: 15px; border-radius: 8px; display: inline-block;">
            ORDER TOTAL: $${orderData.orderTotal.toFixed(2)}
          </div>
        </div>
      </div>

      <!-- ACTION REQUIRED CARD -->
      <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
        <h3 style="margin: 0 0 20px 0; color: #1d4ed8; font-size: 22px; font-weight: bold;">⚡ IMMEDIATE ACTION REQUIRED</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div>
            <h4 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">📋 Process Order:</h4>
            <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px;">
              <li style="margin-bottom: 6px;">✅ Payment confirmed ($${orderData.orderTotal.toFixed(2)})</li>
              <li style="margin-bottom: 6px;">📦 Prepare items for shipping</li>
              <li style="margin-bottom: 6px;">🏷️ Print shipping labels</li>
              <li style="margin-bottom: 6px;">📮 Ship within 24 hours</li>
            </ul>
          </div>
          <div>
            <h4 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">📞 Customer Service:</h4>
            <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px;">
              <li style="margin-bottom: 6px;">📧 Email customer if needed</li>
              <li style="margin-bottom: 6px;">📱 Provide tracking number</li>
              <li style="margin-bottom: 6px;">💬 Follow up on delivery</li>
              <li style="margin-bottom: 6px;">⭐ Request review after delivery</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- QUICK ACTIONS -->
      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h4 style="margin: 0 0 15px 0; color: #111827;">Quick Actions:</h4>
          <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <a href="mailto:${orderData.customerEmail}?subject=Your CzarCar Order ${orderData.orderNumber}&body=Hi ${orderData.customerName},%0D%0A%0D%0AThank you for your order! I'm preparing your items for shipment.%0D%0A%0D%0ABest regards,%0D%0AElijah%0D%0ACzarCar" 
               style="background: #dc2626; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
              📧 Email Customer
            </a>
            <a href="https://www.auspost.com.au/" target="_blank"
               style="background: #059669; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
              📦 Australia Post
            </a>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div style="text-align: center; padding: 25px; border-top: 2px solid #e5e7eb; margin-top: 40px; background: #f9fafb; border-radius: 8px;">
        <p style="color: #6b7280; margin: 0 0 10px 0; font-weight: bold; font-size: 16px;">CzarCar Store Management System</p>
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">
          This is an automated order notification sent to elijahgummer5@gmail.com
        </p>
        <p style="color: #dc2626; font-size: 14px; margin: 10px 0 0 0; font-weight: 600;">
          ⏰ Recommended: Ship within 24 hours for best customer experience
        </p>
      </div>

    </body>
    </html>
  `
}

// 🆕 NEW: Simple backup notification
function generateSimpleOwnerNotificationHTML(orderData: OrderEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="color: #dc2626;">🚨 NEW ORDER BACKUP ALERT</h1>
      
      <h2>Order #${orderData.orderNumber} - $${orderData.orderTotal.toFixed(2)}</h2>
      
      <h3>Customer Details:</h3>
      <p><strong>Name:</strong> ${orderData.customerName}</p>
      <p><strong>Email:</strong> ${orderData.customerEmail}</p>
      
      <h3>Shipping Address:</h3>
      <p>
        ${orderData.shippingAddress.name}<br>
        ${orderData.shippingAddress.address}<br>
        ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zipCode}
      </p>
      
      <h3>Items Ordered:</h3>
      <ul>
        ${orderData.orderItems
          .map(
            (item) => `
          <li>${item.name} ${item.options ? `(${item.options})` : ""} - Qty: ${item.quantity} - $${item.total.toFixed(2)}</li>
        `,
          )
          .join("")}
      </ul>
      
      <p><strong>Total: $${orderData.orderTotal.toFixed(2)}</strong></p>
      <p><strong>Payment ID:</strong> ${orderData.paymentIntentId}</p>
      
      <p style="color: #dc2626; font-weight: bold;">ACTION REQUIRED: Ship this order to the customer!</p>
    </body>
    </html>
  `
}

function generateOrderConfirmationHTML(orderData: OrderEmailData): string {
  const itemsHTML = orderData.orderItems
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px 0; color: #374151;">
        ${item.name}
        ${item.options ? `<br><small style="color: #6b7280; font-style: italic;">${item.options}</small>` : ""}
      </td>
      <td style="padding: 12px 0; text-align: center; color: #374151;">${item.quantity}</td>
      <td style="padding: 12px 0; text-align: right; color: #374151;">$${item.price.toFixed(2)}</td>
      <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #111827;">$${item.total.toFixed(2)}</td>
    </tr>
  `,
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - CzarCar</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); border-radius: 8px;">
        <h1 style="color: #ef4444; font-size: 32px; margin: 0; font-weight: bold;">CzarCar</h1>
        <p style="color: #d1d5db; margin: 5px 0 0 0; font-size: 16px;">Premium Car Accessories</p>
      </div>

      <!-- Order Confirmation -->
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
        <h2 style="color: #10b981; margin: 0 0 10px 0; font-size: 24px;">✅ Order Confirmed!</h2>
        <p style="margin: 0; color: #374151; font-size: 16px;">Thank you for your purchase, ${orderData.customerName}!</p>
        <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">🚚 We'll ship your order within 24 hours</p>
      </div>

      <!-- Social Proof Banner -->
      <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
        <p style="margin: 0; color: #92400e; font-weight: bold; font-size: 16px;">🎉 You're one of 500+ happy customers this month!</p>
        <p style="margin: 5px 0 0 0; color: #b45309; font-size: 14px;">Join thousands who trust CzarCar for quality car accessories</p>
      </div>

      <!-- Order Details -->
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px;">Order Details</h3>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #6b7280;">Order Number:</span>
          <span style="font-weight: 600; color: #111827;">${orderData.orderNumber}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #6b7280;">Order Date:</span>
          <span style="color: #111827;">${new Date().toLocaleDateString()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #6b7280;">Payment ID:</span>
          <span style="color: #111827; font-family: monospace; font-size: 14px;">${orderData.paymentIntentId.slice(0, 20)}...</span>
        </div>
      </div>

      <!-- Order Items -->
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px;">Items Ordered</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e7eb;">
              <th style="text-align: left; padding: 12px 0; color: #6b7280; font-weight: 600;">Product</th>
              <th style="text-align: center; padding: 12px 0; color: #6b7280; font-weight: 600;">Qty</th>
              <th style="text-align: right; padding: 12px 0; color: #6b7280; font-weight: 600;">Price</th>
              <th style="text-align: right; padding: 12px 0; color: #6b7280; font-weight: 600;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #e5e7eb;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #6b7280;">Subtotal:</span>
            <span style="color: #111827;">$${(orderData.orderTotal / 1.08).toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #6b7280;">Tax:</span>
            <span style="color: #111827;">$${((orderData.orderTotal * 0.08) / 1.08).toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #6b7280;">Shipping:</span>
            <span style="color: #10b981; font-weight: 600;">FREE</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; padding-top: 8px; border-top: 1px solid #e5e7eb;">
            <span style="color: #111827;">Total:</span>
            <span style="color: #ef4444;">$${orderData.orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <!-- Shipping Address -->
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px;">🚚 Shipping Address</h3>
        <div style="color: #374151; line-height: 1.5;">
          <div style="font-weight: 600;">${orderData.shippingAddress.name}</div>
          <div>${orderData.shippingAddress.address}</div>
          <div>${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zipCode}</div>
        </div>
      </div>

      <!-- Next Steps -->
      <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 18px;">📦 What's Next?</h3>
        <ul style="margin: 0; padding-left: 20px; color: #92400e;">
          <li style="margin-bottom: 8px;">✅ Payment confirmed - Order processing now</li>
          <li style="margin-bottom: 8px;">📦 We'll ship within 24 hours</li>
          <li style="margin-bottom: 8px;">📧 Tracking info sent to your email</li>
          <li style="margin-bottom: 8px;">🚚 Delivery in 5-7 business days</li>
          <li>💬 Questions? Reply to this email anytime</li>
        </ul>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; margin-top: 30px;">
        <p style="color: #6b7280; margin: 0 0 10px 0;">Thank you for choosing CzarCar!</p>
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">
          Questions? Contact us at 
          <a href="mailto:czarcarphotos@gmail.com" style="color: #ef4444; text-decoration: none;">czarcarphotos@gmail.com</a>
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
          🌟 Leave a review and get 10% off your next order!
        </p>
      </div>

    </body>
    </html>
  `
}

function generateShippingNotificationHTML(orderData: OrderEmailData & { trackingNumber?: string }): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Order is Shipping - CzarCar</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); border-radius: 8px;">
        <h1 style="color: #ef4444; font-size: 32px; margin: 0; font-weight: bold;">CzarCar</h1>
        <p style="color: #d1d5db; margin: 5px 0 0 0; font-size: 16px;">Premium Car Accessories</p>
      </div>

      <!-- Shipping Notification -->
      <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
        <h2 style="color: #1d4ed8; margin: 0 0 10px 0; font-size: 24px;">🚚 Your Order is Shipping!</h2>
        <p style="margin: 0; color: #1e40af; font-size: 16px;">Great news ${orderData.customerName}! Your order is on its way.</p>
      </div>

      <!-- Order Info -->
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px;">Shipping Details</h3>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #6b7280;">Order Number:</span>
          <span style="font-weight: 600; color: #111827;">${orderData.orderNumber}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #6b7280;">Shipping Date:</span>
          <span style="color: #111827;">${new Date().toLocaleDateString()}</span>
        </div>
        ${
          orderData.trackingNumber
            ? `
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #6b7280;">Tracking Number:</span>
          <span style="color: #111827; font-family: monospace; font-weight: 600;">${orderData.trackingNumber}</span>
        </div>
        `
            : ""
        }
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #6b7280;">Estimated Delivery:</span>
          <span style="color: #10b981; font-weight: 600;">${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
        </div>
      </div>

      <!-- Shipping Address -->
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px;">📍 Shipping To</h3>
        <div style="color: #374151; line-height: 1.5;">
          <div style="font-weight: 600;">${orderData.shippingAddress.name}</div>
          <div>${orderData.shippingAddress.address}</div>
          <div>${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zipCode}</div>
        </div>
      </div>

      <!-- Track Package Button -->
      ${
        orderData.trackingNumber
          ? `
      <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="display: inline-block; background: #ef4444; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
          Track Your Package
        </a>
      </div>
      `
          : ""
      }

      <!-- Footer -->
      <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; margin-top: 30px;">
        <p style="color: #6b7280; margin: 0 0 10px 0;">Thank you for your business!</p>
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">
          Questions about your shipment? Contact us at 
          <a href="mailto:czarcarphotos@gmail.com" style="color: #ef4444; text-decoration: none;">czarcarphotos@gmail.com</a>
        </p>
      </div>

    </body>
    </html>
  `
}
