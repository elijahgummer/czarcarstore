"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "./products"

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedOptions?: {
    color?: string
    model?: string
    length?: string
    plugType?: string
    mode?: string
  }
  optionImage?: string
  optionLabel?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, selectedOptions?: CartItem["selectedOptions"], optionImage?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, selectedOptions?: CartItem["selectedOptions"], optionImage?: string) => {
        const items = get().items

        // Create option label for display
        const optionValues = selectedOptions ? Object.values(selectedOptions).filter(Boolean) : []
        const optionLabel = optionValues.length > 0 ? optionValues.join(" / ") : undefined

        // Check if item with same product and options already exists
        const existingItem = items.find(
          (item) =>
            item.product.id === product.id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions),
        )

        if (existingItem) {
          set({
            items: items.map((item) => (item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item)),
          })
        } else {
          set({
            items: [
              ...items,
              {
                id: `${product.id}-${Date.now()}-${Math.random()}`,
                product,
                quantity: 1,
                selectedOptions,
                optionImage,
                optionLabel,
              },
            ],
          })
        }
      },

      removeItem: (itemId: string) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        })
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        set({
          items: get().items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotal: () => {
        return get().items.reduce((total, item) => {
          return total + item.product.price * item.quantity
        }, 0)
      },
    }),
    {
      name: "czarcar-cart",
    },
  ),
)
