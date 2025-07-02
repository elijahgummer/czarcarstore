import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, Shield, AlertTriangle } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-silver-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using our website or purchasing our products.
          </p>
          <p className="text-gray-400 mt-4">Last updated: December 2024</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Agreement */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                By accessing and using the CzarCar website (czarcars.shop), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
              <div className="bg-red-900/20 border border-red-700 rounded p-4">
                <h4 className="font-semibold text-red-300 mb-2">Important:</h4>
                <p className="text-red-200 text-sm">
                  These terms constitute a legally binding agreement between you and CzarCar. Please read them
                  carefully.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Use License */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Scale className="mr-2 h-5 w-5" />
                Use License
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-3">Permitted Use</h3>
                <p className="mb-2">Permission is granted to temporarily download one copy of CzarCar materials for:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>Personal, non-commercial transitory viewing only</li>
                  <li>Placing orders for products</li>
                  <li>Accessing customer support</li>
                  <li>Reviewing product information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Prohibited Activities</h3>
                <p className="mb-2">This license shall NOT allow you to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for commercial purposes</li>
                  <li>Attempt to reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                  <li>Transfer materials to another person</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Products and Orders */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Products and Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-3">Product Information</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>We strive to display product colors and images as accurately as possible</li>
                  <li>Actual colors may vary due to monitor settings</li>
                  <li>Product specifications are subject to change without notice</li>
                  <li>We reserve the right to limit quantities</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Pricing and Payment</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>All prices are in USD unless otherwise specified</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Payment is due at time of order</li>
                  <li>We accept major credit cards and PayPal</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Order Acceptance</h3>
                <p className="text-gray-400">
                  We reserve the right to refuse or cancel any order for any reason, including but not limited to
                  product availability, errors in product or pricing information, or problems identified by our fraud
                  detection systems.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping and Returns */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Shipping and Returns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Shipping Terms</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Shipping times are estimates only</li>
                    <li>• Risk of loss passes to buyer upon delivery</li>
                    <li>• International orders may incur customs fees</li>
                    <li>• We are not responsible for shipping delays</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Return Policy</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• 30-day return window from delivery</li>
                    <li>• Items must be in original condition</li>
                    <li>• Customer responsible for return shipping</li>
                    <li>• Refunds processed within 5-7 business days</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warranties and Disclaimers */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Warranties and Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-3">Product Warranties</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>Products come with manufacturer warranties as specified</li>
                  <li>Warranty terms vary by product and manufacturer</li>
                  <li>We facilitate warranty claims but are not the warranty provider</li>
                  <li>Warranty does not cover misuse or normal wear and tear</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Disclaimer</h3>
                <div className="bg-yellow-900/20 border border-yellow-700 rounded p-4">
                  <p className="text-yellow-200 text-sm">
                    The materials on CzarCar's website are provided on an 'as is' basis. CzarCar makes no warranties,
                    expressed or implied, and hereby disclaims and negates all other warranties including without
                    limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
                    or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                In no event shall CzarCar or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on CzarCar's website, even if CzarCar or an authorized representative has been
                notified orally or in writing of the possibility of such damage.
              </p>
              <div className="bg-red-900/20 border border-red-700 rounded p-4">
                <h4 className="font-semibold text-red-300 mb-2">Maximum Liability</h4>
                <p className="text-red-200 text-sm">
                  Our total liability to you for any claim arising from or relating to these terms or your use of our
                  services shall not exceed the amount you paid for the specific product or service that gave rise to
                  the claim.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Conduct */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">User Conduct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>You agree not to use our website or services to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Prohibited Activities</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Violate any applicable laws or regulations</li>
                    <li>• Infringe on intellectual property rights</li>
                    <li>• Transmit harmful or malicious code</li>
                    <li>• Attempt unauthorized access to our systems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Account Responsibilities</h4>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Provide accurate account information</li>
                    <li>• Maintain security of your account</li>
                    <li>• Notify us of unauthorized use</li>
                    <li>• Accept responsibility for account activity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Governing Law and Disputes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-3">Applicable Law</h3>
                <p className="text-gray-400">
                  These terms and conditions are governed by and construed in accordance with the laws of the United
                  States and the State of [Your State], and you irrevocably submit to the exclusive jurisdiction of the
                  courts in that state or location.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">Dispute Resolution</h3>
                <p className="text-gray-400">
                  Any disputes arising from these terms or your use of our services will be resolved through binding
                  arbitration, except for claims that may be brought in small claims court.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">If you have any questions about these Terms of Service, please contact us:</p>
              <div className="space-y-2 text-gray-400">
                <p>Email: czarcarphotos@gmail.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
            <h3 className="text-blue-300 font-semibold mb-3">Changes to Terms</h3>
            <p className="text-blue-200 text-sm">
              We reserve the right to update these Terms of Service at any time. Changes will be effective immediately
              upon posting on this page. Your continued use of our website and services after any changes constitutes
              acceptance of the new terms.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
