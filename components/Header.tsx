"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-red-500 hover:text-red-400 transition-colors">
            <Image
              src="/logo.png"
              alt="CzarCar Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
            <span>CzarCar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">
              Shipping
            </Link>
            <Link href="/returns" className="text-gray-300 hover:text-white transition-colors">
              Returns
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 w-64"
              />
            </div>
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">
                Shipping
              </Link>
              <Link href="/returns" className="text-gray-300 hover:text-white transition-colors">
                Returns
              </Link>
              <div className="pt-4">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
