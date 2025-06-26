import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Shield, Truck, Award, Users, Star, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-silver-400 bg-clip-text text-transparent">
            About CzarCar
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for premium car accessories and automotive gadgets. We're passionate about helping car
            enthusiasts enhance their driving experience with quality products.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">1000+</div>
            <div className="text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">4.6★</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">1 days</div>
            <div className="text-gray-400">Warranty</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-gray-400">Countries Served</div>
          </div>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-silver-400 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded in 2020, CzarCar began with a simple mission: to provide car enthusiasts with access to premium
                automotive accessories that enhance both functionality and style.
              </p>
              <p>
                What started as a small operation has grown into a trusted global brand, serving customers in over 50
                countries. We carefully curate every product in our catalog, ensuring that each item meets our high
                standards for quality, durability, and value.
              </p>
              <p>
                Today, we're proud to be the go-to destination for car accessories, from practical maintenance tools to
                cutting-edge electronics and stylish interior upgrades.
              </p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Why Choose CzarCar?</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Premium Quality</h4>
                  <p className="text-gray-400 text-sm">Every product is tested and verified for quality</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Fast Shipping</h4>
                  <p className="text-gray-400 text-sm">Free worldwide shipping on orders</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Expert Support</h4>
                  <p className="text-gray-400 text-sm">Dedicated customer service team</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Satisfaction Guarantee</h4>
                  <p className="text-gray-400 text-sm">Product approval </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-silver-400 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Quality First</h3>
                <p className="text-gray-400">
                  We never compromise on quality. Every product is carefully selected and tested to meet our high
                  standards.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Customer Focus</h3>
                <p className="text-gray-400">
                  Our customers are at the heart of everything we do. We're committed to providing exceptional service
                  and support.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
                <p className="text-gray-400">
                  We constantly seek out the latest innovations in automotive technology to bring you cutting-edge
                  products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-silver-400 mb-6">Meet Our Team</h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
            Our passionate team of automotive enthusiasts and customer service experts work tirelessly to bring you the
            best products and shopping experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Product Team</h3>
              <p className="text-gray-400">Curating the best automotive accessories</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Logistics Team</h3>
              <p className="text-gray-400">Ensuring fast and reliable delivery</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Support Team</h3>
              <p className="text-gray-400">Providing exceptional customer service</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Have Questions?</h2>
          <p className="text-red-100 mb-6">
            We'd love to hear from you. Get in touch with our team for any questions or support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="mailto:support@czarcar.com"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
