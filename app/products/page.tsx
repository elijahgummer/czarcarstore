"use client"

import { useState, useMemo } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import { getAllProducts } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [priceRange, setPriceRange] = useState("all")

  const allProducts = getAllProducts()

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by price range
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-50":
          filtered = filtered.filter((product) => product.price < 50)
          break
        case "50-100":
          filtered = filtered.filter((product) => product.price >= 50 && product.price < 100)
          break
        case "100-200":
          filtered = filtered.filter((product) => product.price >= 100 && product.price < 200)
          break
        case "over-200":
          filtered = filtered.filter((product) => product.price >= 200)
          break
      }
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return filtered
  }, [allProducts, searchTerm, selectedCategory, sortBy, priceRange])

  const categories = ["all", "lighting", "electronics", "detailing"]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-silver-400">All Products</h1>
          <p className="text-gray-400">Discover our complete range of premium car accessories and lighting solutions</p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-gray-600">
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all" className="text-white hover:bg-gray-600">
                  All Prices
                </SelectItem>
                <SelectItem value="under-50" className="text-white hover:bg-gray-600">
                  Under $50
                </SelectItem>
                <SelectItem value="50-100" className="text-white hover:bg-gray-600">
                  $50 - $100
                </SelectItem>
                <SelectItem value="100-200" className="text-white hover:bg-gray-600">
                  $100 - $200
                </SelectItem>
                <SelectItem value="over-200" className="text-white hover:bg-gray-600">
                  Over $200
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="name" className="text-white hover:bg-gray-600">
                  Name
                </SelectItem>
                <SelectItem value="price-low" className="text-white hover:bg-gray-600">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high" className="text-white hover:bg-gray-600">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="rating" className="text-white hover:bg-gray-600">
                  Highest Rated
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">Showing {filteredAndSortedProducts.length} products</p>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setPriceRange("all")
                setSortBy("name")
              }}
              variant="outline"
              className="mt-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
