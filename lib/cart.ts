"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "./products"

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const items = get().items
        const existingItem = items.find((item) => item.product.id === product.id)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                id: `${product.id}-${Date.now()}`,
                product,
                quantity: 1,
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
