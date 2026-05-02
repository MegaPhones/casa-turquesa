'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  productoId: string
  varianteId: string
  nombre: string
  marca: string | null
  slug: string
  varianteLabel: string
  imagenUrl: string | null
  precioUnitario: number
  cantidad: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  lastAddedAt: number | null
  lastAddedNombre: string | null

  addItem: (item: Omit<CartItem, 'cantidad'>, cantidad?: number) => void
  removeItem: (varianteId: string) => void
  updateCantidad: (varianteId: string, cantidad: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      lastAddedAt: null,
      lastAddedNombre: null,

      addItem: (item, cantidad = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.varianteId === item.varianteId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.varianteId === item.varianteId
                  ? { ...i, cantidad: i.cantidad + cantidad }
                  : i
              ),
              lastAddedAt: Date.now(),
              lastAddedNombre: item.nombre,
            }
          }
          return {
            items: [...state.items, { ...item, cantidad }],
            lastAddedAt: Date.now(),
            lastAddedNombre: item.nombre,
          }
        }),

      removeItem: (varianteId) =>
        set((state) => ({
          items: state.items.filter((i) => i.varianteId !== varianteId),
        })),

      updateCantidad: (varianteId, cantidad) =>
        set((state) => ({
          items:
            cantidad <= 0
              ? state.items.filter((i) => i.varianteId !== varianteId)
              : state.items.map((i) =>
                  i.varianteId === varianteId ? { ...i, cantidad } : i
                ),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'casa-turquesa-cart-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: false,
    }
  )
)

export function useCartTotals() {
  const items = useCart((s) => s.items)
  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0)
  const subtotal = items.reduce((acc, i) => acc + i.precioUnitario * i.cantidad, 0)
  return { totalItems, subtotal }
}
