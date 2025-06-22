import { formatCurrency } from "@/lib/countries"

interface PriceDisplayProps {
  price: number
  originalPrice?: number
  discount?: number
  size?: "sm" | "md" | "lg"
  currency?: string
}

export default function PriceDisplay({
  price,
  originalPrice,
  discount,
  size = "md",
  currency = "USD",
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: {
      price: "text-lg",
      original: "text-sm",
      discount: "text-xs",
    },
    md: {
      price: "text-xl",
      original: "text-sm",
      discount: "text-sm",
    },
    lg: {
      price: "text-3xl",
      original: "text-lg",
      discount: "text-base",
    },
  }

  return (
    <div className="flex items-center space-x-2">
      {originalPrice && (
        <span className={`text-gray-500 line-through ${sizeClasses[size].original}`}>
          {formatCurrency(originalPrice, currency)}
        </span>
      )}
      <span className={`font-bold text-red-400 ${sizeClasses[size].price}`}>{formatCurrency(price, currency)}</span>
      {discount && (
        <span className={`bg-green-600 text-white px-2 py-1 rounded ${sizeClasses[size].discount}`}>-{discount}%</span>
      )}
    </div>
  )
}
