"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Mail, Send } from "lucide-react"

export default function TestOwnerNotificationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testOwnerNotification = async () => {
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
        error: "Failed to send test notification",
        details: error,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🚨 Test Owner Notification System</h1>
          <p className="text-xl text-gray-300">
            Test the email notification system that sends order details to elijahgummer5@gmail.com
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="h-6 w-6 text-red-500" />
              Owner Notification Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">What this test does:</h3>
              <ul className="text-gray-300 space-y-1">
                <li>
                  • Sends a test order notification to <strong>elijahgummer5@gmail.com</strong>
                </li>
                <li>• Includes sample customer details and shipping address</li>
                <li>• Shows sample products with options (LED Strip, Phone Holder)</li>
                <li>• Tests both primary and backup email systems</li>
                <li>• Verifies the complete order fulfillment workflow</li>
              </ul>
            </div>

            <Button
              onClick={testOwnerNotification}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? (
                <>
                  <Send className="mr-2 h-4 w-4 animate-spin" />
                  Sending Test Notification...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Test Owner Notification
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card
            className={`border-2 ${result.success ? "border-green-500 bg-green-900/20" : "border-red-500 bg-red-900/20"}`}
          >
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${result.success ? "text-green-400" : "text-red-400"}`}>
                {result.success ? (
                  <>
                    <CheckCircle className="h-6 w-6" />
                    Test Notification Sent Successfully! ✅
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-6 w-6" />
                    Test Notification Failed ❌
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.success ? (
                <div className="space-y-3">
                  <div className="bg-green-800/30 p-4 rounded-lg">
                    <p className="text-green-300 font-semibold">
                      🎉 Success! Check your email at elijahgummer5@gmail.com
                    </p>
                    <p className="text-green-200 text-sm mt-2">
                      The test notification should arrive within a few minutes. Check your spam folder if you don't see
                      it.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Email Details:</h4>
                    <p className="text-gray-300 text-sm">
                      <strong>Subject:</strong> 🚨 NEW ORDER #CZ-TEST-XXXXXX - $89.99 - SHIP NOW!
                    </p>
                    <p className="text-gray-300 text-sm">
                      <strong>To:</strong> elijahgummer5@gmail.com
                    </p>
                    <p className="text-gray-300 text-sm">
                      <strong>From:</strong> CzarCar Orders
                    </p>
                  </div>

                  {result.data && (
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Response Data:</h4>
                      <pre className="text-gray-300 text-xs overflow-auto">{JSON.stringify(result.data, null, 2)}</pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-red-800/30 p-4 rounded-lg">
                    <p className="text-red-300 font-semibold">❌ Failed to send test notification</p>
                    <p className="text-red-200 text-sm mt-2">
                      Please check your Resend API key configuration and try again.
                    </p>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Error Details:</h4>
                    <pre className="text-red-300 text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="bg-gray-800 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">📋 Setup Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-300">Owner email set to elijahgummer5@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
                <span className="text-gray-300">Resend API key needs to be configured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
                <span className="text-gray-300">Stripe webhook needs to be set up</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
