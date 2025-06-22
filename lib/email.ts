import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface OrderEmailData {
  customerEmail: string
  customerName: string
  orderNumber: string
  orderTotal: number
  orderItems: Array<{
    name: string
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
    const { data, error } = await resend.emails.send({
      from: "CzarCar <orders@czarcar.com>",
      to: [orderData.customerEmail],
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      html: generateOrderConfirmationHTML(orderData),
    })

    if (error) {
      console.error("Error sending email:", error)
      return { success: false, error }
    }

    console.log("Order confirmation email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}

export async function sendShippingNotificationEmail(orderData: OrderEmailData & { trackingNumber?: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "CzarCar <shipping@czarcar.com>",
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

function generateOrderConfirmationHTML(orderData: OrderEmailData): string {
  const itemsHTML = orderData.orderItems
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px 0; color: #374151;">${item.name}</td>
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
          <li style="margin-bottom: 8px;">We'll process your order within 1-2 business days</li>
          <li style="margin-bottom: 8px;">You'll receive a shipping confirmation with tracking info</li>
          <li style="margin-bottom: 8px;">Estimated delivery: 5-7 business days</li>
          <li>Questions? Reply to this email or contact support</li>
        </ul>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb; margin-top: 30px;">
        <p style="color: #6b7280; margin: 0 0 10px 0;">Thank you for choosing CzarCar!</p>
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">
          If you have any questions, contact us at 
          <a href="mailto:support@czarcar.com" style="color: #ef4444; text-decoration: none;">support@czarcar.com</a>
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
          <a href="mailto:support@czarcar.com" style="color: #ef4444; text-decoration: none;">support@czarcar.com</a>
        </p>
      </div>

    </body>
    </html>
  `
}
