"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductById } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Heart,
} from "lucide-react";
import { useCart } from "@/lib/cart";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-400">
            The product you're looking for doesn't exist.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // Use images array if available, fallback to image array or placeholder
  const images = Array.isArray(product.image)
    ? product.image
    : [product.image || "/placeholder.svg"];

  const mainImage =
    selectedMode !== null && product.modes && product.modes[selectedMode]?.image
      ? product.modes[selectedMode].image
      : selectedColor !== null &&
          product.colors &&
          product.colors[selectedColor]?.image
        ? product.colors[selectedColor].image
        : images[selectedImage] || "/placeholder.svg";

  // Add to cart logic: pass both mode and color if present
  const handleAddToCart = () => {
    const mode =
      selectedMode !== null && product.modes
        ? product.modes[selectedMode]
        : null;
    const color =
      selectedColor !== null && product.colors
        ? product.colors[selectedColor]
        : null;

    for (let i = 0; i < quantity; i++) {
      addItem(
        product,
        // Prefer mode, then color, then undefined
        mode ? mode.name : color ? color.name : undefined,
        mode ? mode.image : color ? color.image : undefined
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <Image
                src={mainImage}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-96 object-contain bg-black rounded-lg"
              />
            </div>
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setSelectedColor(null); // Deselect color if thumbnail is clicked
                  }}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index && selectedColor === null
                      ? "border-red-500"
                      : "border-gray-700"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={100}
                    height={80}
                    className="w-20 h-16 object-contain bg-black"
                  />
                </button>
              ))}
            </div>
            
            {/* Mode Selector */}
            {product.modes && product.modes.length > 0 && (
              <>
                <div className="mt-6 mb-2 font-semibold text-gray-200">Select Mode</div>
                <div className="flex gap-2 mt-4">
                  {product.modes.map((mode, idx) => (
                    <button
                      key={mode.name}
                      type="button"
                      onClick={() => {
                        setSelectedMode(idx);
                        setSelectedColor(null); // Deselect color if mode is selected
                      }}
                      className={`border-2 rounded-lg overflow-hidden p-0 ${
                        selectedMode === idx
                          ? "border-red-500"
                          : "border-gray-400"
                      }`}
                      title={mode.name}
                    >
                      <Image
                        src={mode.image}
                        alt={mode.name}
                        width={60}
                        height={60}
                        className="object-contain w-14 h-14 bg-black"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <>
                <div className="mt-6 mb-2 font-semibold text-gray-200">Select Color</div>
                <div className="flex gap-2 mt-4">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(idx);
                        setSelectedMode(null); // Deselect mode if color is selected
                        // Optionally update selectedImage to match color image in images array
                        const imgIdx = images.findIndex(
                          (img) => img === color.image
                        );
                        if (imgIdx !== -1) setSelectedImage(imgIdx);
                      }}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition
                ${selectedColor === idx ? "border-red-500" : "border-gray-400"}`}
                      style={{
                        background:
                          color.name.toLowerCase() === "black"
                            ? "#222"
                            : color.name.toLowerCase() === "blue"
                              ? "#3490eb"
                              : `url(${color.image}) center/cover no-repeat`,
                      }}
                      title={color.name}
                    >
                      {/* Optionally show a checkmark or ring if selected */}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge className="bg-red-600 text-white mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-400 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                {product.originalPrice && (
                  <span className="text-gray-500 line-through text-xl">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-3xl font-bold text-red-400">
                  ${product.price.toFixed(2)}
                </span>
                {product.discount && (
                  <Badge className="bg-green-600 text-white">
                    Save {product.discount}%
                  </Badge>
                )}
              </div>
              <p className="text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-gray-300">Quantity:</label>
                <div className="flex items-center border border-gray-700 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-300 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <Truck className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">30 Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger
                value="specifications"
                className="data-[state=active]:bg-red-600"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-red-600"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="data-[state=active]:bg-red-600"
              >
                Shipping & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-silver-400">
                    Product Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">General</h4>
                      <ul className="space-y-1">
                        <li>Brand: CzarCar</li>
                        <li>Model: {product.name}</li>
                        <li>Category: {product.category}</li>
                        <li>Weight: 2.5 lbs</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        Features
                      </h4>
                      <ul className="space-y-1">
                        <li>Premium Quality Materials</li>
                        <li>Easy Installation</li>
                        <li>Weather Resistant</li>
                        <li>2 Year Warranty</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-silver-400">
                    Customer Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div
                        key={review}
                        className="border-b border-gray-700 pb-4"
                      >
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                          <span className="text-gray-300 ml-2 font-semibold">
                            Customer {review}
                          </span>
                          <span className="text-gray-500 ml-2">
                            2 weeks ago
                          </span>
                        </div>
                        <p className="text-gray-300">
                          Great product! Easy to install and works perfectly.
                          The quality is excellent and it looks amazing on my
                          car.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-silver-400">
                    Shipping & Returns
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        Shipping Information
                      </h4>
                      <ul className="space-y-1">
                        <li>• Free shipping on orders over $50</li>
                        <li>• Standard shipping: 3-5 business days</li>
                        <li>• Express shipping: 1-2 business days</li>
                        <li>• International shipping available</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        Return Policy
                      </h4>
                      <ul className="space-y-1">
                        <li>• 30-day return window</li>
                        <li>• Items must be in original condition</li>
                        <li>• Free return shipping</li>
                        <li>• Full refund or exchange</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
