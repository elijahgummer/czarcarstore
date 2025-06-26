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
            Returns & Refunds
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We stand behind our products with a hassle-free 30-day return policy and satisfaction guarantee.
          </p>
        </div>

        {/* Guarantee Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 mb-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">💯 30-Day Money-Back Guarantee</h2>
          <p className="text-green-100">Not satisfied? Return it for a full refund, no questions asked!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Return Policy */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Return Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">30-Day Return Window</h4>
                      <p className="text-gray-400 text-sm">
                        Return any item within 30 days of delivery for a full refund
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Original Condition</h4>
                      <p className="text-gray-400 text-sm">Items must be unused and in original packaging</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Free Return Shipping</h4>
                      <p className="text-gray-400 text-sm">We provide prepaid return labels for all returns</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Fast Refunds</h4>
                      <p className="text-gray-400 text-sm">Refunds processed within 3-5 business days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  How to Return
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
                        Email support@czarcar.com or use our contact form to initiate a return
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Get Return Label</h4>
                      <p className="text-gray-400 text-sm">
                        We'll email you a prepaid return shipping label within 24 hours
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
                        Pack the item in original packaging and attach the return label
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Get Refunded</h4>
                      <p className="text-gray-400 text-sm">
                        Receive your refund within 3-5 business days after we receive the item
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Refund Information */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Refund Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Refund Methods</h4>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>• Credit card refunds: 3-5 business days</li>
                      <li>• PayPal refunds: 1-2 business days</li>
                      <li>• Bank transfers: 5-7 business days</li>
                      <li>• Store credit: Instant (optional)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">What's Covered</h4>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>• Full purchase price</li>
                      <li>• Original shipping costs</li>
                      <li>• Return shipping (we provide label)</li>
                      <li>• Taxes and fees</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Store Credit Bonus</h4>
                    <div className="bg-blue-900/20 border border-blue-700 rounded p-3">
                      <p className="text-blue-300 text-sm">
                        Choose store credit instead of a refund and get an extra 10% bonus credit!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Return Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Item in original condition</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Original packaging included</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">All accessories and manuals</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">Within 30 days of delivery</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h4 className="font-semibold text-white mb-2">Non-Returnable Items</h4>
                  <ul className="text-gray-400 space-y-1 text-sm">
                    <li>• Personalized or custom items</li>
                    <li>• Items damaged by misuse</li>
                    <li>• Items without original packaging</li>
                    <li>• Digital downloads</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="bg-green-900/20 border border-green-700 rounded-lg p-6">
              <h3 className="text-green-300 font-semibold mb-3">✅ Quality Guarantee</h3>
              <div className="space-y-2 text-green-200 text-sm">
                <p>• Every product is tested before shipping</p>
                <p>• 2-year manufacturer warranty included</p>
                <p>• Defective items replaced immediately</p>
                <p>• 100% satisfaction guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Policy */}
        <div className="mt-16">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <RotateCcw className="mr-2 h-5 w-5" />
                Exchange Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-white mb-4">When You Can Exchange</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Wrong size or color received</li>
                    <li>• Defective or damaged item</li>
                    <li>• Item doesn't fit your vehicle</li>
                    <li>• Want to upgrade to a different model</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-4">Exchange Process</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Contact us within 30 days</li>
                    <li>• We'll arrange the exchange</li>
                    <li>• Free shipping both ways</li>
                    <li>• Pay only the price difference (if any)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need to Return Something?</h2>
          <p className="text-red-100 mb-6">
            Our customer service team is here to make your return process as smooth as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start a Return
            </a>
            <a
              href="mailto:returns@czarcar.com"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              Email Returns Team
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
