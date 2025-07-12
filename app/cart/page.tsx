"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingBag, Truck, Shield } from "lucide-react"
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
          <h1 className="text-3xl font-bold text-silver-400 mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Discover our premium car accessories and gadgets</p>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/products">Browse Products</Link>
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

        {/* Professional Benefits Bar */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center text-green-400">
              <Truck className="h-5 w-5 mr-2" />
              <span className="text-sm">
                {getTotal() >= 50 ? "✓ Free shipping included" : `Free shipping on orders over $50`}
              </span>
            </div>
            <div className="flex items-center justify-center text-blue-400">
              <Shield className="h-5 w-5 mr-2" />
              <span className="text-sm">2-year warranty on all products</span>
            </div>
            <div className="flex items-center justify-center text-purple-400">
              <Shield className="h-5 w-5 mr-2" />
              <span className="text-sm">30-day money-back guarantee</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Your Items ({items.length})
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
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-700 rounded-lg bg-gray-900"
                    >
                      <Image
                        src={item.optionImage || item.product.image?.[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain bg-black rounded self-center sm:self-auto"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold break-words">{item.product.name}</h3>
                        {item.optionLabel && (
                          <p className="text-blue-400 text-sm font-medium">{item.optionLabel}</p>
                        )}
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

                      <div className="text-right min-w-[80px]">
                        <p className="text-white font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
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
                  {/* Tax removed */}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span>${getTotal().toFixed(2)}</span>
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