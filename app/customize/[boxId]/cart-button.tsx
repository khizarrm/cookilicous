"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-context"

export default function CartButton() {
  const { cartItems, setIsCartOpen } = useCart()
  const totalItems = cartItems.reduce((total, item) => total + 1, 0)

  return (
    <Button
      variant="ghost"
      className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm shadow-md rounded-full p-2"
      onClick={() => setIsCartOpen(true)}
      aria-label="Open cart"
    >
      <ShoppingCart className="h-6 w-6 text-pink-600" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-burgundy-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {totalItems}
        </span>
      )}
    </Button>
  )
}

