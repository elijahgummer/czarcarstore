"use client"

import { useState, useEffect } from "react"
import { Elements } from "@stripe/react-stripe-js"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CheckoutForm from "@/components/CheckoutForm"
import { useCart } from "@/lib/cart"
import { stripePromise } from "@/lib/stripe"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"

export default function CheckoutPage() {
  const { items, getTotal } = useCart()
  const [clientSecret, setClientSecret] = useState<string>("")
  const [loading, setLoading] = useState(true)

  const subtotal = getTotal()
  const tax = subtotal * 0.08
  const total = subtotal + tax

  useEffect(() => {
    if (items.length === 0) {
      setLoading(false)
      return
    }

    // Create PaymentIntent with detailed order information
    const orderItems = items.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity,
    }))

    console.log("Creating payment intent with items:", orderItems)

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: total,
        currency: "usd",
        items: orderItems,
        metadata: {
          order_date: new Date().toISOString(),
          item_count: items.reduce((sum, item) => sum + item.quantity, 0),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        console.log("Payment intent response:", data)
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
          toast.success("Checkout ready!")
        } else {
          throw new Error("No client secret received")
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error)
        toast.error("Failed to initialize checkout. Please try again.")
        setLoading(false)
      })
  }, [items, total])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Preparing your checkout...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 text-gray-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-silver-400 mb-4">No Items to Checkout</h1>
          <p className="text-gray-400 mb-8">Add some products to your cart first!</p>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const appearance = {
    theme: "night" as const,
    variables: {
      colorPrimary: "#ef4444",
      colorBackground: "#1f2937",
      colorText: "#ffffff",
      colorDanger: "#ef4444",
      fontFamily: "Inter, system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "6px",
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#ffffff",
            border: "1px solid #374151",
          },
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-silver-400 mb-8">Secure Checkout</h1>

        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        )}
      </div>

      <Footer />
    </div>
  )
}
