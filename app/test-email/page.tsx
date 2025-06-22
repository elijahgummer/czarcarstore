"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"
import toast from "react-hot-toast"

export default function TestEmailPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testEmail = async () => {
    if (!email) {
      toast.error("Please enter an email address")
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      setResult(data)

      if (data.success) {
        toast.success("Test email sent! Check your inbox.")
      } else {
        toast.error("Failed to send test email")
      }
    } catch (error) {
      console.error("Error testing email:", error)
      toast.error("Error testing email")
      setResult({ success: false, error: "Network error" })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Test Email System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-gray-300 block mb-2">Test Email Address:</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <Button onClick={testEmail} disabled={loading} className="w-full bg-red-600 hover:bg-red-700">
              {loading ? "Sending..." : "Send Test Email"}
            </Button>

            {result && (
              <div
                className={`p-4 rounded-lg border ${
                  result.success
                    ? "bg-green-900/20 border-green-700 text-green-300"
                    : "bg-red-900/20 border-red-700 text-red-300"
                }`}
              >
                <div className="flex items-center mb-2">
                  {result.success ? <CheckCircle className="mr-2 h-5 w-5" /> : <AlertCircle className="mr-2 h-5 w-5" />}
                  <span className="font-semibold">{result.success ? "Success!" : "Error"}</span>
                </div>
                <p className="text-sm">{result.success ? result.message : result.error}</p>
                {result.data && (
                  <pre className="mt-2 text-xs bg-gray-800 p-2 rounded overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                )}
              </div>
            )}

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">Debug Steps:</h3>
              <ol className="text-blue-200 text-sm space-y-1 list-decimal list-inside">
                <li>Make sure RESEND_API_KEY is set in .env.local</li>
                <li>Check browser console for error messages</li>
                <li>Verify email address is valid</li>
                <li>Check spam/junk folder</li>
                <li>Try with a different email provider</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
