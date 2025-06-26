import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Package, Globe, Clock, Shield, CheckCircle } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-silver-400 bg-clip-text text-transparent">
            Shipping Information
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fast, reliable, and secure shipping worldwide. Get your car accessories delivered right to your door.
          </p>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 mb-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">🚚 FREE Worldwide Shipping</h2>
          <p className="text-green-100">On all orders over $50 • No minimum for digital products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Shipping Options */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Shipping Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-b border-gray-700 pb-4">
                  <h3 className="font-semibold text-white mb-2">Standard Shipping (FREE over $50)</h3>
                  <div className="text-gray-400 space-y-1">
                    <p>• Delivery: 5-7 business days</p>
                    <p>• Cost: $4.99 (FREE over $50)</p>
                    <p>• Tracking included</p>
                    <p>• Available worldwide</p>
                  </div>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <h3 className="font-semibold text-white mb-2">Express Shipping</h3>
                  <div className="text-gray-400 space-y-1">
                    <p>• Delivery: 2-3 business days</p>
                    <p>• Cost: $12.99</p>
                    <p>• Priority handling</p>
                    <p>• Real-time tracking</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Overnight Shipping</h3>
                  <div className="text-gray-400 space-y-1">
                    <p>• Delivery: Next business day</p>
                    <p>• Cost: $24.99</p>
                    <p>• Available in US only</p>
                    <p>• Order by 2PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  International Shipping
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-2">North America</h4>
                    <ul className="text-gray-400 space-y-1">
                      <li>• USA: 3-5 days</li>
                      <li>• Canada: 5-7 days</li>
                      <li>• Mexico: 7-10 days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Europe</h4>
                    <ul className="text-gray-400 space-y-1">
                      <li>• UK: 5-7 days</li>
                      <li>• EU: 7-10 days</li>
                      <li>• Other: 10-14 days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Asia Pacific</h4>
                    <ul className="text-gray-400 space-y-1">
                      <li>• Australia: 7-10 days</li>
                      <li>• Japan: 5-8 days</li>
                      <li>• Other: 10-15 days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Other Regions</h4>
                    <ul className="text-gray-400 space-y-1">
                      <li>• South America: 10-15 days</li>
                      <li>• Africa: 12-18 days</li>
                      <li>• Middle East: 8-12 days</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Processing & Tracking */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Order Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Order Confirmation</h4>
                    <p className="text-gray-400 text-sm">Immediate email confirmation after purchase</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Processing Time</h4>
                    <p className="text-gray-400 text-sm">1-2 business days for order preparation</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Truck className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Shipping Notification</h4>
                    <p className="text-gray-400 text-sm">Tracking number sent via email when shipped</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Package className="h-5 w-5 text-orange-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Delivery</h4>
                    <p className="text-gray-400 text-sm">Secure packaging with signature confirmation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Shipping Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Package insurance included</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Lost package replacement</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Damage protection</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Real-time tracking</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-6">
              <h3 className="text-yellow-300 font-semibold mb-3">📦 Packaging</h3>
              <div className="space-y-2 text-yellow-200 text-sm">
                <p>• Eco-friendly packaging materials</p>
                <p>• Secure bubble wrap protection</p>
                <p>• Discreet packaging (no branding)</p>
                <p>• Recyclable shipping boxes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-400">
              <p>• Orders placed after 2PM EST ship the next business day</p>
              <p>• Weekend orders are processed on Monday</p>
              <p>• Holiday shipping may experience delays</p>
              <p>• PO Box delivery available for most items</p>
              <p>• Signature required for orders over $200</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Customs & Duties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-400">
              <p>• International customers may be subject to customs fees</p>
              <p>• Duties and taxes are buyer's responsibility</p>
              <p>• We declare accurate values on customs forms</p>
              <p>• Some countries may restrict certain products</p>
              <p>• Contact us for specific country requirements</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Questions About Shipping?</h2>
          <p className="text-red-100 mb-6">
            Our customer service team is here to help with any shipping questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:shipping@czarcar.com"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              Email Shipping Team
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
