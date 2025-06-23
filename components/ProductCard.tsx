"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import toast from "react-hot-toast";
import PriceDisplay from "./PriceDisplay";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<number | null>(null);

  // Use images array if available, fallback to image array or placeholder
  const images = Array.isArray(product.image)
    ? product.image
    : [product.image || "/placeholder.svg"];

  // If a color is selected and has an image, use that as the main image
  const mainImage =
    selectedColor !== null &&
    product.colors &&
    product.colors[selectedColor]?.image
      ? product.colors[selectedColor].image
      : images[0] || "/placeholder.svg";

  const handleAddToCart = () => {
    const color =
      selectedColor !== null && product.colors
        ? product.colors[selectedColor]
        : null;

    addItem(
      product,
      color ? color.name : undefined,
      color ? color.image : undefined
    );
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      style: {
        background: "#1f2937",
        color: "#ffffff",
        border: "1px solid #374151",
      },
    });
  };

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-red-500 transition-all duration-300 group">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <Image
              src={mainImage}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-contain bg-black group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-red-600 text-white">
              Featured
            </Badge>
          )}
          {product.discount && (
            <Badge className="absolute top-2 right-2 bg-green-600 text-white">
              -{product.discount}%
            </Badge>
          )}
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2 px-4 py-2">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(idx)}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition
                  ${selectedColor === idx ? "border-red-500" : "border-gray-400"}`}
                style={{
                  background:
                    color.name.toLowerCase() === "black"
                      ? "#222"
                      : color.name.toLowerCase() === "blue"
                      ? "#3490eb"
                      : `url(${color.image}) center/cover no-repeat`
                }}
                title={color.name}
              >
                {/* Optionally show a checkmark or ring if selected */}
              </button>
            ))}
          </div>
        )}

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
        <Button onClick={handleAddToCart} className="w-full bg-red-600 hover:bg-red-700 text-white">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}