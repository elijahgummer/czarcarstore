import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-silver-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-gray-400 mt-4">Last updated: December 2024</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Overview */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Privacy Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                At CzarCar, we are committed to protecting your privacy and ensuring the security of your personal
                information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website or make a purchase.
              </p>
              <div className="bg-blue-900/20 border border-blue-700 rounded p-4">
                <h4 className="font-semibold text-blue-300 mb-2">Key Points:</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• We only collect information necessary to provide our services</li>
                  <li>• We never sell your personal information to third parties</li>
                  <li>• We use industry-standard security measures</li>
                  <li>• You have control over your data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-3">Personal Information</h3>
                <p className="mb-2">When you make a purchase or create an account, we may collect:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>Name and contact information (email, phone, address)</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely by Stripe)</li>
                  <li>Order history and preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>IP address and browser information</li>
                  <li>Device type and operating system</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Cookies and Tracking</h3>
                <p className="text-gray-400">
                  We use cookies to improve your browsing experience, remember your preferences, and analyze site
                  traffic. You can control cookie settings in your browser.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Order Processing</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Process and fulfill your orders</li>
                    <li>• Send order confirmations and updates</li>
                    <li>• Handle returns and exchanges</li>
                    <li>• Provide customer support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Communication</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Send important account information</li>
                    <li>• Respond to your inquiries</li>
                    <li>• Send promotional emails (with consent)</li>
                    <li>• Notify about product updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Website Improvement</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Analyze site usage and performance</li>
                    <li>• Improve user experience</li>
                    <li>• Develop new features</li>
                    <li>• Prevent fraud and abuse</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Legal Compliance</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Comply with legal obligations</li>
                    <li>• Protect our rights and property</li>
                    <li>• Enforce our terms of service</li>
                    <li>• Respond to legal requests</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Technical Safeguards</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• SSL encryption for data transmission</li>
                    <li>• Secure payment processing via Stripe</li>
                    <li>• Regular security audits</li>
                    <li>• Encrypted data storage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Access Controls</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Limited employee access to data</li>
                    <li>• Multi-factor authentication</li>
                    <li>• Regular access reviews</li>
                    <li>• Secure development practices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>You have the following rights regarding your personal information:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Access & Control</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Access your personal data</li>
                    <li>• Update or correct information</li>
                    <li>• Delete your account</li>
                    <li>• Export your data</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Communication Preferences</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Opt out of marketing emails</li>
                    <li>• Manage cookie preferences</li>
                    <li>• Control data sharing</li>
                    <li>• Request data portability</li>
                  </ul>
                </div>
              </div>
              <div className="bg-green-900/20 border border-green-700 rounded p-4">
                <p className="text-green-300 text-sm">
                  To exercise any of these rights, please contact us at czarcarphotos@gmail.com. We will respond to your
                  request within 30 days.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>We work with trusted third-party services to provide our services:</p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Payment Processing</h4>
                  <p className="text-gray-400 text-sm">
                    Stripe processes all payments securely. We do not store your payment card information on our
                    servers.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Email Services</h4>
                  <p className="text-gray-400 text-sm">
                    Resend handles our email communications. Your email address is used only for order confirmations and
                    customer service.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Analytics</h4>
                  <p className="text-gray-400 text-sm">
                    We use analytics tools to understand how our website is used. This data is anonymized and
                    aggregated.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-400">
                <p>Email: czarcarphotos@gmail.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-6">
            <h3 className="text-yellow-300 font-semibold mb-3">Policy Updates</h3>
            <p className="text-yellow-200 text-sm">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
              the new policy on this page and updating the "Last updated" date. Your continued use of our services after
              any changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
