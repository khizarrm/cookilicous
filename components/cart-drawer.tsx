"use client"

import { useEffect } from "react"
import { X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { useRouter } from "next/navigation"

export default function CartDrawer() {
  const { cartItems, removeFromCart, totalPrice, clearCart, isCartOpen, setIsCartOpen } = useCart()
  const router = useRouter()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isCartOpen, setIsCartOpen])

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isCartOpen])

  // Add a checkout button function that navigates to checkout and closes the drawer
  const handleCheckout = () => {
    router.push("/checkout")
    setIsCartOpen(false)
  }

  if (!isCartOpen) return null

  // Count flavor occurrences
  const getFlavorSummary = (flavors: any[]) => {
    const flavorCounts: Record<string, number> = {}

    flavors.forEach((flavor) => {
      if (flavorCounts[flavor.name]) {
        flavorCounts[flavor.name]++
      } else {
        flavorCounts[flavor.name] = 1
      }
    })

    return Object.entries(flavorCounts)
      .map(([name, count]) => `${count}x ${name}`)
      .join(", ")
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />

      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-burgundy-700">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
            <X className="h-6 w-6 text-burgundy-700" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-pink-300 mb-4" />
              <h3 className="text-xl font-bold text-burgundy-700 mb-2">Your cart is empty</h3>
              <p className="text-burgundy-600 mb-6">Add some delicious cookies to get started!</p>
              <Button onClick={() => setIsCartOpen(false)} className="bg-pink-600 hover:bg-pink-700 text-white">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-start border-b pb-4">
                  <div className="w-16 h-16 bg-pink-100 rounded-md flex items-center justify-center mr-3">
                    <span className="font-bold text-pink-600">{item.flavors.length}</span>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-burgundy-700">{item.boxName}</h4>
                    <p className="text-sm text-burgundy-600 mb-1">{getFlavorSummary(item.flavors)}</p>
                    <p className="font-medium text-pink-600">${item.boxPrice.toFixed(2)}</p>
                  </div>

                  <Button variant="ghost" size="icon" className="ml-2" onClick={() => removeFromCart(index)}>
                    <X className="h-5 w-5 text-burgundy-600" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center font-bold text-lg">
              <span className="text-burgundy-700">Total:</span>
              <span className="text-pink-600">${totalPrice.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full border-pink-600 text-pink-600 hover:bg-pink-50"
                onClick={clearCart}
              >
                Clear Cart
              </Button>

              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

