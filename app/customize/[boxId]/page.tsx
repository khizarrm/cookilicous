"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import Header from "@/components/header"
import { motion } from "framer-motion"
import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { useEffect } from "react"

const boxOptions = [
  {
    id: "1",
    name: "Box of 6",
    price: 19.99,
    count: 6,
  },
  {
    id: "2",
    name: "Box of 12",
    price: 34.99,
    count: 12,
  },
]



export default function CustomizeBox() {
  const params = useParams()
  const router = useRouter()
  const { addBoxToCart, setIsCartOpen, cartItems } = useCart()

  const [flavorQuantities, setFlavorQuantities] = useState<Record<number, number>>({})

  const [cookieFlavors, setCookieFlavors] = useState<any[]>([])

  useEffect(() => {
    const fetchCookies = async () => {
      const { data, error } = await supabase
        .from("cookies")
        .select("*")
        .eq("active", true)

      if (error) {
        console.error("Failed to fetch cookie flavors:", error)
      } else {
        setCookieFlavors(data)
      }
    }

    fetchCookies()
  }, [])


  const boxId = params.boxId as string
  const selectedBox = boxOptions.find((box) => box.id === boxId)

  if (!selectedBox) {
    return <div>Box not found</div>
  }

  const maxSelections = selectedBox.count

  const totalSelected = Object.values(flavorQuantities).reduce((sum, quantity) => sum + quantity, 0)
  const remainingSelections = maxSelections - totalSelected

  const handleIncrement = (flavorId: number) => {
    if (totalSelected < maxSelections) {
      setFlavorQuantities((prev) => ({
        ...prev,
        [flavorId]: (prev[flavorId] || 0) + 1,
      }))
    }
  }

  const handleDecrement = (flavorId: number) => {
    if (flavorQuantities[flavorId] > 0) {
      setFlavorQuantities((prev) => ({
        ...prev,
        [flavorId]: prev[flavorId] - 1,
      }))
    }
  }

  const handleAddToCart = () => {
    if (totalSelected === maxSelections) {
      // Create an array of flavors based on quantities
      const selectedFlavorObjects: any[] = []

      Object.entries(flavorQuantities).forEach(([flavorIdStr, quantity]) => {
        const flavorId = Number.parseInt(flavorIdStr)
        const flavor = cookieFlavors.find((f) => f.id === flavorId)

        if (flavor && quantity > 0) {
          // Add the flavor to the array multiple times based on quantity
          for (let i = 0; i < quantity; i++) {
            selectedFlavorObjects.push(flavor)
          }
        }
      })

      addBoxToCart({
        boxId: selectedBox.id,
        boxName: selectedBox.name,
        boxPrice: selectedBox.price,
        flavors: selectedFlavorObjects,
      })

      setIsCartOpen(true)
      // Reset quantities after adding to cart
      setFlavorQuantities({})
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          className="bg-white/80 backdrop-blur-sm shadow-md rounded-full p-2"
          onClick={() => setIsCartOpen(true)}
          aria-label="Open cart"
        >
          <ShoppingCart className="h-6 w-6 text-pink-600" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-burgundy-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {cartItems.length}
            </span>
          )}
        </Button>
      </div>

      <div className="pt-24 pb-16 bg-gradient-to-b from-pink-100 to-background">
        <div className="container mx-auto px-4">
          <Link
            href="/#flavors"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6"
            onClick={(e) => {
              e.preventDefault()
              router.push("/")
              // Use setTimeout to ensure navigation completes before scrolling
              setTimeout(() => {
                const flavorsSection = document.getElementById("flavors")
                if (flavorsSection) {
                  window.scrollTo({
                    top: flavorsSection.offsetTop,
                    behavior: "smooth",
                  })
                }
              }, 100)
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Box Selection
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-burgundy-700 mb-2">Customize Your {selectedBox.name}</h1>
            <p className="text-lg text-burgundy-600">Select {maxSelections} cookies to fill your box</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-burgundy-700">{selectedBox.name}</h2>
                <p className="text-burgundy-600">${selectedBox.price}</p>
              </div>
              <div className="bg-pink-100 text-pink-600 font-bold px-4 py-2 rounded-full">
                {remainingSelections} selections remaining
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {cookieFlavors.map((flavor) => {
              const quantity = flavorQuantities[flavor.id] || 0
              return (
                <motion.div
                  key={flavor.id}
                  whileHover={{ y: -5 }}
                  className={`relative rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
                    quantity > 0 ? "ring-2 ring-pink-500" : ""
                  }`}
                >
                  <div className="relative h-48 bg-pink-50">
                    <Image
                      src={flavor.image || "/placeholder.svg"}
                      alt={flavor.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    {quantity > 0 && (
                      <div className="absolute top-2 right-2 bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {quantity}
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-burgundy-700 mb-1">{flavor.name}</h3>
                    <p className="text-sm text-burgundy-600 mb-3">{flavor.description}</p>

                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDecrement(flavor.id)}
                        disabled={quantity === 0}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Decrease</span>
                      </Button>

                      <span className="font-medium text-burgundy-700">{quantity}</span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIncrement(flavor.id)}
                        disabled={totalSelected >= maxSelections}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Cart Summary */}
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-pink-100 p-4 z-40">
            <div className="container mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-burgundy-700 font-bold">
                    {totalSelected} of {maxSelections} cookies selected
                  </p>
                  {remainingSelections > 0 ? (
                    <p className="text-sm text-burgundy-600">
                      Select {remainingSelections} more cookie{remainingSelections !== 1 ? "s" : ""}
                    </p>
                  ) : (
                    <p className="text-sm text-green-600">Your box is complete!</p>
                  )}
                </div>
                <Button
                  onClick={handleAddToCart}
                  disabled={totalSelected !== maxSelections}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

