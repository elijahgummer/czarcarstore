import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Shield, CheckCircle, AlertTriangle, Package } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-silver-400 bg-clip-text text-transparent">
            Returns & Exchanges
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We want you to be happy with your purchase! While we do not offer refunds, we’re happy to help with exchanges for eligible items.
          </p>
        </div>

        {/* Exchange Banner */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg p-6 mb-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">🔄 Easy Exchanges</h2>
          <p className="text-yellow-100">Need a different size, color, or model? We’ll help you exchange your item quickly and easily.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Exchange Policy */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Exchange Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Exchange Window</h4>
                      <p className="text-gray-400 text-sm">
                        Contact us within 30 days of delivery to request an exchange.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Original Condition</h4>
                      <p className="text-gray-400 text-sm">Items must be unused and in original packaging.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Free Exchange Shipping</h4>
                      <p className="text-gray-400 text-sm">We provide prepaid shipping labels for exchanges.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Fast Processing</h4>
                      <p className="text-gray-400 text-sm">Exchanges processed within 3-5 business days after we receive your item.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  How to Exchange
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Contact Us</h4>
                      <p className="text-gray-400 text-sm">
                        Email czarcarphotos@gmail.com or use our contact form to start your exchange.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Get Exchange Label</h4>
                      <p className="text-gray-400 text-sm">
                        We’ll email you a prepaid shipping label within 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Pack & Ship</h4>
                      <p className="text-gray-400 text-sm">
                        Pack the item in original packaging and attach the exchange label.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Receive Your Exchange</h4>
                      <p className="text-gray-400 text-sm">
                        We’ll ship your replacement as soon as we receive your item.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exchange Information */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Exchange Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">What Can Be Exchanged</h4>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>• Wrong size, color, or model received</li>
                      <li>• Defective or damaged items</li>
                      <li>• Items that don’t fit your vehicle</li>
                      <li>• Upgrades to a different model</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">What Can't Be Exchanged</h4>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>• Personalized or custom items</li>
                      <li>• Items damaged by misuse</li>
                      <li>• Items without original packaging</li>
                      <li>• Digital downloads</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Quality Guarantee</h4>
                    <div className="bg-green-900/20 border border-green-700 rounded p-3">
                      <p className="text-green-300 text-sm">
                        Every product is tested before shipping. Defective items are replaced immediately. 100% satisfaction guaranteed.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need Help With an Exchange?</h2>
          <p className="text-red-100 mb-6">
            Our customer service team is here to make your exchange process as smooth as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start an Exchange
            </a>
            <a
              href="mailto:support@czarcar.com"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              Email Support Team
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}