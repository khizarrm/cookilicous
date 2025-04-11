"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-context"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CreditCard, Check } from "lucide-react"
import Link from "next/link"
import { useUserProfile } from "../hooks/userProfile"
import { supabase } from "@/lib/supabaseClient"

export default function Checkout() {
  const router = useRouter()
  const { cartItems, totalPrice, clearCart, setIsCartOpen } = useCart()
  console.log("at checkout");
  const { user, profile, loading: profileLoading } = useUserProfile()

  
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    console.log("useEffect");
    if (profile && !orderPlaced) {
      setFormState((prev) => ({
        ...prev,
        firstName: profile.name?.split(" ")[0] || "",
        lastName: profile.name?.split(" ")[1] || "",
        email: profile.email || "",
        address: profile.address || "",
      }))
    }
  }, [profile, orderPlaced])

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      router.push("/#flavors")
    }
  }, [cartItems, orderPlaced, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("handleChange");
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit");
    e.preventDefault();
    console.log("handleSubmit");
    return;
    e.preventDefault()
    setIsSubmitting(true)
  
    let profileId = null
  
    if (user) {
      // Update existing profile
      const { error: updateError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          name: `${formState.firstName} ${formState.lastName}`,
          email: formState.email,
          address: formState.address,
        })
  
      if (updateError) console.error(updateError)
      profileId = user.id
    } else {
      // Create a new guest profile
      const { data: guestProfile, error: guestError } = await supabase
        .from("profiles")
        .insert({
          name: `${formState.firstName} ${formState.lastName}`,
          email: formState.email,
          address: formState.address,
        })
        .select()
        .single()
  
      if (guestError) console.error(guestError)
      else profileId = guestProfile?.id
    }
  
    // Create the order (linking to profile ID)
    const { error: orderError } = await supabase.from("orders").insert({
      user_id: profileId,
      status: "paid",
      total_price: totalPrice + 5.99,
    })
  
    if (orderError) console.error(orderError)
  
    setOrderPlaced(true)
    clearCart()
    setIsSubmitting(false)
  }

  // Count flavor occurrences for display
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

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background">
        <Header onCartClick={() => setIsCartOpen(true)} />

        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold text-burgundy-700 mb-4">Order Confirmed!</h1>

              <p className="text-lg text-burgundy-600 mb-8">
                Thank you for your order. We've sent a confirmation email with all the details.
              </p>

              <Link href="/">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header onCartClick={() => setIsCartOpen(true)} />

        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h1 className="text-2xl font-bold text-burgundy-700 mb-4">Your cart is empty</h1>

              <p className="text-burgundy-600 mb-8">
                Add some delicious cookies to your cart before proceeding to checkout.
              </p>

              <Link href="/#flavors">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full">
                  Browse Boxes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />

      <div className="pt-24 pb-16 bg-gradient-to-b from-pink-100 to-background">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-burgundy-700 mb-2">Checkout</h1>
            <p className="text-lg text-burgundy-600">Complete your order</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={() => console.log("hheheh")} className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-burgundy-700 mb-4">Shipping Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-burgundy-600 mb-1">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-burgundy-600 mb-1">
                      Last Name
                    </label>
                    <Input id="lastName" name="lastName" value={formState.lastName} onChange={handleChange} required />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-burgundy-600 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-burgundy-600 mb-1">
                      Phone
                    </label>
                    <Input id="phone" name="phone" value={formState.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-burgundy-600 mb-1">
                    Address
                  </label>
                  <Textarea id="address" name="address" value={formState.address} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-burgundy-600 mb-1">
                      City
                    </label>
                    <Input id="city" name="city" value={formState.city} onChange={handleChange} required />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-burgundy-600 mb-1">
                      ZIP Code
                    </label>
                    <Input id="zipCode" name="zipCode" value={formState.zipCode} onChange={handleChange} required />
                  </div>
                </div>

                {/* <h2 className="text-xl font-bold text-burgundy-700 mb-4">Payment Information</h2>

                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-burgundy-600 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formState.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-burgundy-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-burgundy-600 mb-1">
                      Name on Card
                    </label>
                    <Input id="cardName" name="cardName" value={formState.cardName} onChange={handleChange} required />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-burgundy-600 mb-1">
                        Expiry Date
                      </label>
                      <Input
                        id="expiry"
                        name="expiry"
                        value={formState.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-burgundy-600 mb-1">
                        CVV
                      </label>
                      <Input id="cvv" name="cvv" value={formState.cvv} onChange={handleChange} required />
                    </div>
                  </div>
                </div> */}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg text-lg font-semibold"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-burgundy-700 mb-4">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-start pb-4 border-b border-pink-100">
                      <div className="w-16 h-16 bg-pink-100 rounded-md flex items-center justify-center mr-3">
                        <span className="font-bold text-pink-600">{item.flavors.length}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-burgundy-700">{item.boxName}</h4>
                        <p className="text-sm text-burgundy-600 mb-1">{getFlavorSummary(item.flavors)}</p>
                        <p className="font-medium text-pink-600">${item.boxPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-pink-100 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-burgundy-600">Subtotal</span>
                    <span className="font-medium text-burgundy-700">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-burgundy-600">Shipping</span>
                    <span className="font-medium text-burgundy-700">$5.99</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4">
                    <span className="text-burgundy-700">Total</span>
                    <span className="text-pink-600">${(totalPrice + 5.99).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

