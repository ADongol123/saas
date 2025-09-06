"use client"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  description: string
  inStock: boolean
}

interface CartAnimationProps {
  product: Product
  onComplete: () => void
}

export function CartAnimation({ product, onComplete }: CartAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Start animation immediately
    setIsAnimating(true)

    // Complete animation after duration
    const timer = setTimeout(() => {
      setIsAnimating(false)
      onComplete()
    }, 1000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isAnimating) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Animated product image */}
      <div
        className={cn(
          "absolute transition-all duration-1000 ease-out",
          "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
          isAnimating && "translate-x-[40vw] -translate-y-[40vh] scale-50 opacity-0",
        )}
      >
        <div className="relative">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-20 h-20 rounded-lg shadow-lg border-2 border-white animate-pulse"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg animate-ping"></div>
        </div>
      </div>

      {/* Success particles */}
      <div className="absolute top-4 right-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn("absolute w-2 h-2 bg-green-400 rounded-full animate-bounce", `animation-delay-${i * 100}`)}
            style={{
              left: `${Math.random() * 40}px`,
              top: `${Math.random() * 40}px`,
              animationDuration: "0.6s",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Success message */}
      <div className="absolute top-16 right-4 animate-in slide-in-from-right-4 duration-500">
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          Added to cart!
        </div>
      </div>
    </div>
  )
}
