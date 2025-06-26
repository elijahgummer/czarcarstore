"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Mail, Send, User, Package } from "lucide-react"

export default function TestEmailSystemPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testEmailSystem = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-owner-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: "Failed to send test emails",
        details: error,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">🚨 CzarCar Email System Test</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Test the complete email notification system that sends order details to{" "}
            <strong>elijahgummer5@gmail.com</strong> and confirmation emails to customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Owner Email Card */}
          <Card className="bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Package className="h-8 w-8 text-red-400" />
                Owner Notification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/20">
                <h3 className="text-lg font-semibold text-red-300 mb-3">📧 Email to: elijahgummer5@gmail.com</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• 🚨 Urgent order alert with customer details</li>
                  <li>• 📦 Complete shipping address for posting</li>
                  <li>• 📋 Detailed product list with options</li>
                  <li>• 💰 Order total and payment confirmation</li>
                  <li>• 📧 Quick action buttons to contact customer</li>
                  <li>• ⚡ Processing checklist for fulfillment</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Customer Email Card */}
          <Card className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <User className="h-8 w-8 text-green-400" />
                Customer Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/20">
                <h3 className="text-lg font-semibold text-green-300 mb-3">📧 Email to: Customer</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• ✅ Professional order confirmation</li>
                  <li>• 📋 Complete order details and items</li>
                  <li>• 🚚 Shipping address confirmation</li>
                  <li>• 📦 What's next timeline</li>
                  <li>• 💬 Contact information for support</li>
                  <li>• 🌟 Review request for future discount</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Mail className="h-8 w-8 text-blue-400" />
              Test Complete Email System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-700/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">🧪 What this test does:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Owner Email Test:</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Sends urgent order alert to your email</li>
                    <li>• Includes sample customer: John Smith</li>
                    <li>• Shows shipping address in Sydney</li>
                    <li>• Lists products with options</li>
                    <li>• Provides quick action buttons</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-300 mb-2">Customer Email Test:</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Professional order confirmation</li>
                    <li>• Beautiful branded design</li>
                    <li>• Complete order summary</li>
                    <li>• Shipping timeline information</li>
                    <li>• Contact details for support</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={testEmailSystem}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 text-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <Send className="mr-3 h-5 w-5 animate-spin" />
                  Sending Test Emails...
                </>
              ) : (
                <>
                  <Send className="mr-3 h-5 w-5" />
                  Send Test Email Notifications
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card
            className={`border-2 ${
              result.success
                ? "border-green-500 bg-gradient-to-br from-green-900/30 to-green-800/20"
                : "border-red-500 bg-gradient-to-br from-red-900/30 to-red-800/20"
            }`}
          >
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 ${result.success ? "text-green-400" : "text-red-400"}`}>
                {result.success ? (
                  <>
                    <CheckCircle className="h-8 w-8" />
                    Test Emails Sent Successfully! ✅
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-8 w-8" />
                    Test Email Failed ❌
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.success ? (
                <div className="space-y-6">
                  <div className="bg-green-800/30 p-6 rounded-lg border border-green-500/30">
                    <p className="text-green-300 font-semibold text-lg mb-3">
                      🎉 Success! Check your email at elijahgummer5@gmail.com
                    </p>
                    <p className="text-green-200 mb-4">
                      The test notification should arrive within a few minutes. Check your spam folder if you don't see
                      it.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-900/20 p-4 rounded-lg">
                        <h4 className="text-green-300 font-semibold mb-2">📧 Owner Email:</h4>
                        <p className="text-green-200 text-sm">
                          <strong>Subject:</strong> 🚨 NEW ORDER #CZ-TEST-XXXXXX - $89.99 - SHIP NOW!
                        </p>
                        <p className="text-green-200 text-sm">
                          <strong>To:</strong> elijahgummer5@gmail.com
                        </p>
                      </div>
                      <div className="bg-green-900/20 p-4 rounded-lg">
                        <h4 className="text-green-300 font-semibold mb-2">📧 Customer Email:</h4>
                        <p className="text-green-200 text-sm">
                          <strong>Subject:</strong> ✅ Order Confirmation - Thank You!
                        </p>
                        <p className="text-green-200 text-sm">
                          <strong>To:</strong> testcustomer@example.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {result.data && (
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">📊 Response Data:</h4>
                      <pre className="text-gray-300 text-xs overflow-auto max-h-40">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-red-800/30 p-6 rounded-lg border border-red-500/30">
                    <p className="text-red-300 font-semibold text-lg mb-3">❌ Failed to send test emails</p>
                    <p className="text-red-200 mb-4">Please check your Resend API key configuration and try again.</p>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">🔍 Error Details:</h4>
                    <pre className="text-red-300 text-xs overflow-auto max-h-40">{JSON.stringify(result, null, 2)}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="bg-gray-800/50 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">📋 Setup Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-gray-300">
                  Owner email configured: <strong>elijahgummer5@gmail.com</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <span className="text-gray-300">Resend API key needs to be configured in .env.local</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <span className="text-gray-300">Stripe webhook needs to be set up for production</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">i</span>
                </div>
                <span className="text-gray-300">
                  Both emails will be sent automatically when customers complete orders
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
