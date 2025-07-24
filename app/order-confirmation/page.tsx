"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  interface OrderEmailData {
    customerEmail?: string
    paymentIntentId?: string
    [key: string]: any
  }

  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [emailSent, setEmailSent] = useState(false)
  const paymentIntent = searchParams.get("payment_intent")
  const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret")
  const { clearCart } = useCart()

  // 1. Verify payment and set order details
  useEffect(() => {
    if (paymentIntent) {
      fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId: paymentIntent }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "succeeded") {
            setOrderDetails({
              id: paymentIntent,
              number: `CZ-${Date.now().toString().slice(-6)}`,
              status: "confirmed",
              total: data.amount / 100, // Convert from cents
              currency: data.currency.toUpperCase(),
              items: data.metadata.order_items ? JSON.parse(data.metadata.order_items) : [],
              estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              paymentDate: new Date(data.created * 1000).toLocaleDateString(),
            })
          } else {
            console.error("Payment not successful:", data.status)
          }
        })
        .catch((error) => {
          console.error("Error fetching payment details:", error)
        })
    }

    if (paymentIntent && !emailSent) {
      let orderEmailData: OrderEmailData = {}
      try {
        orderEmailData = JSON.parse(localStorage.getItem("orderEmailData") || "{}")
      } catch {
        orderEmailData = {}
      }

      if (orderEmailData && orderEmailData.customerEmail) {
        orderEmailData.paymentIntentId = paymentIntent

        fetch("/api/send-order-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderEmailData),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              clearCart()
              localStorage.removeItem("orderEmailData")
              setEmailSent(true)
            }
          })
      }
    }
  }, [paymentIntent, emailSent, clearCart])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Thank you for your purchase. Your order has been successfully processed.
          </p>

          {/* Order Details */}
          {orderDetails && (
            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Order Number:</span>
                  <span className="text-white font-semibold">{orderDetails.number}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Payment ID:</span>
                  <span className="text-white font-mono text-sm">{paymentIntent?.slice(0, 20)}...</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Paid:</span>
                  <span className="text-green-400 font-bold">
                    ${orderDetails.total.toFixed(2)} {orderDetails.currency}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Payment Date:</span>
                  <span className="text-white">{orderDetails.paymentDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Estimated Delivery:</span>
                  <span className="text-white">{orderDetails.estimatedDelivery}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Confirmation Email</h3>
              <p className="text-gray-400 text-sm">
                You'll receive an email confirmation with your order details shortly.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Order Processing</h3>
              <p className="text-gray-400 text-sm">We'll prepare your items for shipment within 1-2 business days.</p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Fast Shipping</h3>
              <p className="text-gray-400 text-sm">Your order will be delivered within 5-7 business days.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>

          {/* Support Info */}
          <div className="mt-12 p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
            <p className="text-gray-400 mb-4">
              If you have any questions about your order, our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Contact Support
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Track Your Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}