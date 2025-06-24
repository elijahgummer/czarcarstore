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
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedLength, setSelectedLength] = useState<number | null>(null);
  const [selectedPlug, setSelectedPlug] = useState<number | null>(null);

  // Use the most specific image available
  const mainImage =
    (selectedMode !== null && product.modes && product.modes[selectedMode]?.image) ||
    (selectedColor !== null && product.colors && product.colors[selectedColor]?.image) ||
    product.image[0] ||
    "/placeholder.svg";

  const handleAddToCart = () => {
    const mode = selectedMode !== null && product.modes ? product.modes[selectedMode] : null;
    const color = selectedColor !== null && product.colors ? product.colors[selectedColor] : null;
    const length = selectedLength !== null && product.lengths ? product.lengths[selectedLength] : null;
    const plug = selectedPlug !== null && product.plugTypes ? product.plugTypes[selectedPlug] : null;

    // Build a label with all selected options
    const optionLabel = [
      mode?.name,
      color?.name,
      length,
      plug
    ].filter(Boolean).join(" / ");

    // Pick the best image for the selected options
    const optionImage =
      mode?.image ||
      color?.image ||
      product.image[0] ||
      "/placeholder.svg";

    addItem(product, optionLabel, optionImage);

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

        {/* Mode Selector */}
        {product.modes && product.modes.length > 0 && (
          <div className="flex gap-2 px-4 py-2">
            {product.modes.map((mode, idx) => (
              <button
                key={mode.name}
                type="button"
                onClick={() => {
                  setSelectedMode(idx);
                  setSelectedColor(null); // Deselect color if mode is selected
                }}
                className={`border-2 rounded-lg overflow-hidden p-0 ${
                  selectedMode === idx ? "border-red-500" : "border-gray-400"
                }`}
                title={mode.name}
              >
                <Image
                  src={mode.image}
                  alt={mode.name}
                  width={40}
                  height={40}
                  className="object-contain w-10 h-10 bg-black"
                />
              </button>
            ))}
          </div>
        )}

        {/* Color Selector */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2 px-4 py-2">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => {
                  setSelectedColor(idx);
                  setSelectedMode(null); // Deselect mode if color is selected
                }}
                className={`border-2 rounded-full overflow-hidden p-0 w-8 h-8 ${
                  selectedColor === idx ? "border-red-500" : "border-gray-400"
                }`}
                title={color.name}
                style={{
                  background: `url(${color.image}) center/cover no-repeat`,
                }}
              />
            ))}
          </div>
        )}

        {/* Length Selector */}
        {product.lengths && product.lengths.length > 0 && (
          <div className="flex gap-2 px-4 py-2">
            {product.lengths.map((length, idx) => (
              <button
                key={length}
                type="button"
                onClick={() => setSelectedLength(idx)}
                className={`px-3 py-1 rounded border-2 text-xs font-semibold ${
                  selectedLength === idx ? "border-red-500 bg-gray-700" : "border-gray-400"
                }`}
              >
                {length}
              </button>
            ))}
          </div>
        )}

        {/* Plug Type Selector */}
        {product.plugTypes && product.plugTypes.length > 0 && (
          <div className="flex gap-2 px-4 py-2 flex-wrap">
            {product.plugTypes.map((plug, idx) => (
              <button
                key={plug}
                type="button"
                onClick={() => setSelectedPlug(idx)}
                className={`px-3 py-1 rounded border-2 text-xs font-semibold ${
                  selectedPlug === idx ? "border-red-500 bg-gray-700" : "border-gray-400"
                }`}
              >
                {plug}
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