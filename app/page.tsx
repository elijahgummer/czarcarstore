import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import { getFeaturedProducts } from "@/lib/products"
import Link from "next/link"
import { ShoppingCart, Wrench, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-silver-400 bg-clip-text text-transparent">
            CzarCar
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-300 max-w-3xl mx-auto">Premium Car Accessories & Gadgets</p>
          <p className="text-lg mb-6 text-yellow-400 font-semibold">
            🚗 Quality Products • Fast Shipping • Extra 1% off with coins
          </p>
          <p className="text-base mb-10 text-gray-400 max-w-2xl mx-auto">
            Essential car accessories starting from $11.95. Engine funnels, dash cams, LED lights, and more!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
              <Link href="/products">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shop Now - From $11.95
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-silver-400 text-silver-400 hover:bg-silver-400 hover:text-gray-900 px-8 py-3"
            >
              <Link href="#featured">View Featured</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-silver-400">Quality Products</h3>
              <p className="text-gray-400">Premium car accessories and gadgets for every need</p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-silver-400">Trusted Quality</h3>
              <p className="text-gray-400">All products tested and backed by warranty</p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-silver-400">Fast Shipping</h3>
              <p className="text-gray-400">Quick delivery worldwide with tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-silver-400">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
