"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/lib/products"

interface ProductOptionsSelectorProps {
  product: Product
  onOptionsChange: (options: {
    selectedColor?: number
    selectedModel?: number
    selectedMode?: number
    selectedLength?: number
    selectedPlug?: number
  }) => void
}

export default function ProductOptionsSelector({ product, onOptionsChange }: ProductOptionsSelectorProps) {
  const [selectedColor, setSelectedColor] = useState<number | null>(null)
  const [selectedModel, setSelectedModel] = useState<number | null>(null)
  const [selectedMode, setSelectedMode] = useState<number | null>(null)
  const [selectedLength, setSelectedLength] = useState<number | null>(null)
  const [selectedPlug, setSelectedPlug] = useState<number | null>(null)

  const handleOptionChange = (type: string, index: number | null) => {
    const newOptions = {
      selectedColor,
      selectedModel,
      selectedMode,
      selectedLength,
      selectedPlug,
    }

    switch (type) {
      case "color":
        setSelectedColor(index)
        newOptions.selectedColor = index !== null ? index : null
        // Clear conflicting selections
        setSelectedMode(null)
        newOptions.selectedMode = null
        break
      case "model":
        setSelectedModel(index)
        newOptions.selectedModel = index !== null ? index : null
        // Clear conflicting selections
        setSelectedColor(null)
        setSelectedMode(null)
        newOptions.selectedColor = null
        newOptions.selectedMode = null
        break
      case "mode":
        setSelectedMode(index)
        newOptions.selectedMode = index !== null ? index : null
        // Clear conflicting selections
        setSelectedColor(null)
        newOptions.selectedColor = null
        break
      case "length":
        setSelectedLength(index)
        newOptions.selectedLength = index !== null ? index : null
        break
      case "plug":
        setSelectedPlug(index)
        newOptions.selectedPlug = index !== null ? index : null
        break
    }

    onOptionsChange({
      selectedColor: newOptions.selectedColor !== null ? newOptions.selectedColor : undefined,
      selectedModel: newOptions.selectedModel !== null ? newOptions.selectedModel : undefined,
      selectedMode: newOptions.selectedMode !== null ? newOptions.selectedMode : undefined,
      selectedLength: newOptions.selectedLength !== null ? newOptions.selectedLength : undefined,
      selectedPlug: newOptions.selectedPlug !== null ? newOptions.selectedPlug : undefined,
    })
  }

  return (
    <div className="space-y-6">
      {/* Color Selector */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Select Color</h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => handleOptionChange("color", idx)}
                className={`relative group ${selectedColor === idx ? "ring-2 ring-red-500" : ""}`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-600 hover:border-red-400 transition-colors">
                  <Image
                    src={color.image || "/placeholder.svg"}
                    alt={color.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 group-hover:text-white">
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Model Selector */}
      {product.models && product.models.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Select Model</h3>
          <div className="flex flex-wrap gap-3">
            {product.models.map((model, idx) => (
              <button
                key={model.name}
                type="button"
                onClick={() => handleOptionChange("model", idx)}
                className={`relative group ${selectedModel === idx ? "ring-2 ring-red-500" : ""}`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-600 hover:border-red-400 transition-colors">
                  <Image
                    src={model.image || "/placeholder.svg"}
                    alt={model.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 group-hover:text-white">
                  {model.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mode Selector */}
      {product.modes && product.modes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Select Mode</h3>
          <div className="flex flex-wrap gap-3">
            {product.modes.map((mode, idx) => (
              <button
                key={mode.name}
                type="button"
                onClick={() => handleOptionChange("mode", idx)}
                className={`relative group ${selectedMode === idx ? "ring-2 ring-red-500" : ""}`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-600 hover:border-red-400 transition-colors">
                  <Image
                    src={mode.image || "/placeholder.svg"}
                    alt={mode.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 group-hover:text-white">
                  {mode.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Length Selector */}
      {product.lengths && product.lengths.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Select Length</h3>
          <div className="flex flex-wrap gap-2">
            {product.lengths.map((length, idx) => (
              <button
                key={length}
                type="button"
                onClick={() => handleOptionChange("length", idx)}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  selectedLength === idx
                    ? "border-red-500 bg-red-500/20 text-red-300"
                    : "border-gray-600 text-gray-300 hover:border-red-400 hover:text-white"
                }`}
              >
                {length}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Plug Type Selector */}
      {product.plugTypes && product.plugTypes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Select Plug Type</h3>
          <div className="flex flex-wrap gap-2">
            {product.plugTypes.map((plug, idx) => (
              <button
                key={plug}
                type="button"
                onClick={() => handleOptionChange("plug", idx)}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  selectedPlug === idx
                    ? "border-red-500 bg-red-500/20 text-red-300"
                    : "border-gray-600 text-gray-300 hover:border-red-400 hover:text-white"
                }`}
              >
                {plug}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
