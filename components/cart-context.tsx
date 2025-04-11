"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

export interface CookieFlavor {
  id: number
  name: string
  description: string
  image: string
}

export interface BoxItem {
  boxId: string
  boxName: string
  boxPrice: number
  flavors: CookieFlavor[]
}

interface CartContextType {
  cartItems: BoxItem[]
  addBoxToCart: (box: BoxItem) => void
  removeFromCart: (index: number) => void
  clearCart: () => void
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [cartItems, setCartItems] = useState<BoxItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const addBoxToCart = (box: BoxItem) => {
    setCartItems((prevItems) => [...prevItems, box])
  }

  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.boxPrice, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addBoxToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {mounted ? children : null}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }

  return context
}

