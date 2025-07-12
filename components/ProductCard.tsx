"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart"
import toast from "react-hot-toast"
import PriceDisplay from "./PriceDisplay"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  // Use the first image or a placeholder
  const mainImage = product.image[0] || "/placeholder.svg"

  const handleAddToCart = () => {
    addItem(product)

    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      style: {
        background: "#1f2937",
        color: "#ffffff",
        border: "1px solid #374151",
      },
    })
  }

  return (
    <>
      <Link href={`/products/${product.id}`} className="block hover:shadow-lg rounded-lg bg-gray-800 p-4"></Link>
      <Card className="bg-gray-800 border-gray-700 hover:border-red-500 transition-all duration-300 group">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-contain bg-black group-hover:scale-105 transition-transform duration-300"
              />
            {product.featured && <Badge className="absolute top-2 left-2 bg-red-600 text-white">Featured</Badge>}
            {product.discount && (
              <Badge className="absolute top-2 right-2 bg-green-600 text-white">-{product.discount}%</Badge>
            )}
          </div>

          <div className="p-4">
            <Link href={`/products/${product.id}`}>
              <h3 className="text-lg font-semibold text-white mb-2 hover:text-red-400 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>

            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm ml-2">({product.reviews})</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                size="md"
              />
              <Badge variant="outline" className="text-silver-400 border-silver-400">
                {product.category}
              </Badge>
            </div>

            {product.originalPrice && (
              <div className="mb-2">
                <span className="text-green-400 text-sm font-semibold">
                  💰 Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          
        </CardFooter>
      </Card>
    </>
  )
}
