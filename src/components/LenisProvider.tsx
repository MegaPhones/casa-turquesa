'use client'

// Lenis temporalmente desactivado — usamos CSS scroll-behavior: smooth
// Se reactiva cuando se confirme que las secciones son visibles
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
