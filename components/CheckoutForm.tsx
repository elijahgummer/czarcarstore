"use client"

import { useState, useEffect } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Truck, Lock, CreditCard, Mail } from "lucide-react"
import { useCart } from "@/lib/cart"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast from "react-hot-toast"

const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
})

type ShippingFormData = z.infer<typeof shippingSchema>

interface CheckoutFormProps {
  clientSecret: string
}

export default function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { items, getTotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  })

  const subtotal = getTotal()
  const tax = subtotal * 0.08
  const total = subtotal + tax

  useEffect(() => {
    if (!stripe) return

    if (!clientSecret) return

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          toast.success("Payment successful!")
          clearCart()
          break
        case "processing":
          setMessage("Your payment is processing.")
          break
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")
          break
        default:
          setMessage("Something went wrong.")
          break
      }
    })
  }, [stripe, clientSecret, clearCart])

  const onSubmit = async (data: ShippingFormData) => {
    if (!stripe || !elements) {
      toast.error("Payment system not ready. Please try again.")
      return
    }

    setIsProcessing(true)
    setMessage(null)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
          shipping: {
            name: `${data.firstName} ${data.lastName}`,
            address: {
              line1: data.address,
              city: data.city,
              state: data.state,
              postal_code: data.zipCode,
              country: "US",
            },
          },
          receipt_email: data.email,
        },
        redirect: "if_required",
      })

      if (error) {
        console.error("Payment error:", error)
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "Payment failed")
          toast.error(error.message || "Payment failed")
        } else {
          setMessage("An unexpected error occurred.")
          toast.error("An unexpected error occurred")
        }
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful! Check your email for confirmation.")

        // Send order confirmation email
        try {
          const orderEmailData = {
            customerEmail: data.email,
            customerName: `${data.firstName} ${data.lastName}`,
            orderNumber: `CZ-${Date.now().toString().slice(-6)}`,
            orderTotal: total,
            orderItems: items.map((item) => ({
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
              total: item.product.price * item.quantity,
            })),
            shippingAddress: {
              name: `${data.firstName} ${data.lastName}`,
              address: data.address,
              city: data.city,
              state: data.state,
              zipCode: data.zipCode,
            },
            paymentIntentId: paymentIntent.id,
          }

          // Send email via API
          await fetch("/api/send-order-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderEmailData),
          })
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError)
          // Don't fail the checkout if email fails
        }

        clearCart()
        // Redirect to confirmation page
        window.location.href = `/order-confirmation?payment_intent=${paymentIntent.id}&payment_intent_client_secret=${paymentIntent.client_secret}`
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      setMessage("An unexpected error occurred.")
      toast.error("An unexpected error occurred")
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-300">
                    First Name *
                  </Label>
                  <Input id="firstName" {...register("firstName")} className="bg-gray-700 border-gray-600 text-white" />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-300">
                    Last Name *
                  </Label>
                  <Input id="lastName" {...register("lastName")} className="bg-gray-700 border-gray-600 text-white" />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300 flex items-center">
                  <Mail className="mr-1 h-4 w-4" />
                  Email (for order confirmation) *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                <p className="text-gray-400 text-xs mt-1">We'll send your order confirmation and tracking info here</p>
              </div>
              <div>
                <Label htmlFor="address" className="text-gray-300">
                  Address *
                </Label>
                <Input id="address" {...register("address")} className="bg-gray-700 border-gray-600 text-white" />
                {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-gray-300">
                    City *
                  </Label>
                  <Input id="city" {...register("city")} className="bg-gray-700 border-gray-600 text-white" />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-gray-300">
                    ZIP Code *
                  </Label>
                  <Input id="zipCode" {...register("zipCode")} className="bg-gray-700 border-gray-600 text-white" />
                  {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode.message}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="state" className="text-gray-300">
                  State *
                </Label>
                <Select onValueChange={(value) => setValue("state", value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="AL" className="text-white">
                      Alabama
                    </SelectItem>
                    <SelectItem value="AK" className="text-white">
                      Alaska
                    </SelectItem>
                    <SelectItem value="AZ" className="text-white">
                      Arizona
                    </SelectItem>
                    <SelectItem value="AR" className="text-white">
                      Arkansas
                    </SelectItem>
                    <SelectItem value="CA" className="text-white">
                      California
                    </SelectItem>
                    <SelectItem value="CO" className="text-white">
                      Colorado
                    </SelectItem>
                    <SelectItem value="CT" className="text-white">
                      Connecticut
                    </SelectItem>
                    <SelectItem value="DE" className="text-white">
                      Delaware
                    </SelectItem>
                    <SelectItem value="FL" className="text-white">
                      Florida
                    </SelectItem>
                    <SelectItem value="GA" className="text-white">
                      Georgia
                    </SelectItem>
                    <SelectItem value="HI" className="text-white">
                      Hawaii
                    </SelectItem>
                    <SelectItem value="ID" className="text-white">
                      Idaho
                    </SelectItem>
                    <SelectItem value="IL" className="text-white">
                      Illinois
                    </SelectItem>
                    <SelectItem value="IN" className="text-white">
                      Indiana
                    </SelectItem>
                    <SelectItem value="IA" className="text-white">
                      Iowa
                    </SelectItem>
                    <SelectItem value="KS" className="text-white">
                      Kansas
                    </SelectItem>
                    <SelectItem value="KY" className="text-white">
                      Kentucky
                    </SelectItem>
                    <SelectItem value="LA" className="text-white">
                      Louisiana
                    </SelectItem>
                    <SelectItem value="ME" className="text-white">
                      Maine
                    </SelectItem>
                    <SelectItem value="MD" className="text-white">
                      Maryland
                    </SelectItem>
                    <SelectItem value="MA" className="text-white">
                      Massachusetts
                    </SelectItem>
                    <SelectItem value="MI" className="text-white">
                      Michigan
                    </SelectItem>
                    <SelectItem value="MN" className="text-white">
                      Minnesota
                    </SelectItem>
                    <SelectItem value="MS" className="text-white">
                      Mississippi
                    </SelectItem>
                    <SelectItem value="MO" className="text-white">
                      Missouri
                    </SelectItem>
                    <SelectItem value="MT" className="text-white">
                      Montana
                    </SelectItem>
                    <SelectItem value="NE" className="text-white">
                      Nebraska
                    </SelectItem>
                    <SelectItem value="NV" className="text-white">
                      Nevada
                    </SelectItem>
                    <SelectItem value="NH" className="text-white">
                      New Hampshire
                    </SelectItem>
                    <SelectItem value="NJ" className="text-white">
                      New Jersey
                    </SelectItem>
                    <SelectItem value="NM" className="text-white">
                      New Mexico
                    </SelectItem>
                    <SelectItem value="NY" className="text-white">
                      New York
                    </SelectItem>
                    <SelectItem value="NC" className="text-white">
                      North Carolina
                    </SelectItem>
                    <SelectItem value="ND" className="text-white">
                      North Dakota
                    </SelectItem>
                    <SelectItem value="OH" className="text-white">
                      Ohio
                    </SelectItem>
                    <SelectItem value="OK" className="text-white">
                      Oklahoma
                    </SelectItem>
                    <SelectItem value="OR" className="text-white">
                      Oregon
                    </SelectItem>
                    <SelectItem value="PA" className="text-white">
                      Pennsylvania
                    </SelectItem>
                    <SelectItem value="RI" className="text-white">
                      Rhode Island
                    </SelectItem>
                    <SelectItem value="SC" className="text-white">
                      South Carolina
                    </SelectItem>
                    <SelectItem value="SD" className="text-white">
                      South Dakota
                    </SelectItem>
                    <SelectItem value="TN" className="text-white">
                      Tennessee
                    </SelectItem>
                    <SelectItem value="TX" className="text-white">
                      Texas
                    </SelectItem>
                    <SelectItem value="UT" className="text-white">
                      Utah
                    </SelectItem>
                    <SelectItem value="VT" className="text-white">
                      Vermont
                    </SelectItem>
                    <SelectItem value="VA" className="text-white">
                      Virginia
                    </SelectItem>
                    <SelectItem value="WA" className="text-white">
                      Washington
                    </SelectItem>
                    <SelectItem value="WV" className="text-white">
                      West Virginia
                    </SelectItem>
                    <SelectItem value="WI" className="text-white">
                      Wisconsin
                    </SelectItem>
                    <SelectItem value="WY" className="text-white">
                      Wyoming
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <PaymentElement
                  options={{
                    layout: "tabs",
                    paymentMethodOrder: ["card", "apple_pay", "google_pay"],
                    fields: {
                      billingDetails: {
                        name: "auto",
                        email: "auto",
                      },
                    },
                  }}
                />
                {message && <div className="text-red-400 text-sm">{message}</div>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="bg-gray-800 border-gray-700 sticky top-4">
            <CardHeader>
              <CardTitle className="text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.id}`} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-400">{item.quantity}x</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium line-clamp-2">{item.product.name}</p>
                        <p className="text-gray-400 text-xs">${item.product.price.toFixed(2)} each</p>
                      </div>
                      <p className="text-white font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="bg-gray-700" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Email Notification Info */}
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 mt-4">
                  <div className="flex items-center text-blue-300 text-sm">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Order confirmation will be sent to your email</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  disabled={isProcessing || !stripe || !elements}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 mt-6"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Pay ${total.toFixed(2)}
                    </div>
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center mt-4">
                  🔒 Your payment information is secure and encrypted with Stripe
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
