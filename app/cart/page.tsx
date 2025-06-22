"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 text-gray-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-silver-400 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">Add some amazing products to get started!</p>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-silver-400 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Cart Items ({items.length})
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Clear Cart
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.id}`}
                      className="flex items-center space-x-4 p-4 border border-gray-700 rounded-lg"
                    >
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded"
                      />

                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.product.name}</h3>
                        <p className="text-gray-400 text-sm">{item.product.category}</p>
                        <p className="text-red-400 font-bold">${item.product.price.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-gray-600 text-gray-300"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-gray-600 text-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-white font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 mt-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${(getTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span>${(getTotal() * 1.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mt-6">
                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white py-3">
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Link href="/products">Continue Shopping</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
