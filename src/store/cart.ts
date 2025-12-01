import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/data/products'

// Simplified product type for cart to avoid rating-related rendering issues
type CartProduct = {
  id: string
  title: string
  price: number
  images: string[]
}

export type CartItem = {
  product: CartProduct
  quantity: number
}

export type CartState = {
  items: CartItem[]
  add: (product: Product, qty?: number) => void
  remove: (id: string) => void
  update: (id: string, qty: number) => void
  clear: () => void
  count: () => number
  subtotal: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
              ),
            }
          }
          // Extract only the properties we need for the cart
          const cartProduct: CartProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            images: product.images
          }
          return { items: [...state.items, { product: cartProduct, quantity: qty }] }
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.product.id !== id) })),
      update: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.product.id === id ? { ...i, quantity: qty } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((acc, cur) => acc + cur.quantity, 0),
      subtotal: () => get().items.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0),
    }),
    { name: 'cart' }
  )
)
