// app/checkout/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { useCart } from "@/components/cart-context"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabaseClient"
import { useUserProfile } from "@/hooks/userProfile"

export default function Checkout() {
  const router = useRouter()
  const { cartItems, totalPrice, clearCart, setIsCartOpen } = useCart()
  const { user, profile, address, loading: profileLoading } = useUserProfile()


  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    if (profile && address && !orderPlaced) {
      setFormState({
        fullName: profile.full_name || "",
        email: user?.email || "",
        phone: profile.phone_number || "",
        address: address?.address_text || "",
        city: address?.city || "",
        zipCode: address?.zip_code || ""
      })
    }
  }, [profile, address, user, orderPlaced])
  

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      router.push("/#flavors")
    }
  }, [cartItems, orderPlaced, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log("bomboclat")

    const { fullName, email, phone, address, city, zipCode } = formState

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone_number: phone })
      .eq("id", user?.id)

    const { error: addressError } = await supabase
      .from("address")
      .upsert({
        user_id: user?.id,
        address_text: address,
        city,
        zip_code: zipCode
      }, { onConflict: "user_id" })

    if (profileError || addressError) {
      console.error(profileError || addressError)
      setIsSubmitting(false)
      return
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id,
        total_price: totalPrice + 5.99,
        status: "paid"
      })
      .select()
      .single()

    if (orderError) {
      console.error(orderError)
      setIsSubmitting(false)
      return
    }

    const orderItems = cartItems.flatMap(box => {
      const flavorCounts: Record<number, number> = {}
      box.flavors.forEach(f => {
        flavorCounts[f.id] = (flavorCounts[f.id] || 0) + 1
      })
      return Object.entries(flavorCounts).map(([flavorId, qty]) => ({
        order_id: orderData.id,
        flavor_id: Number(flavorId),
        quantity: qty
      }))
    })
    console.log("orderItems:", orderItems)
    console.log("orderData:", cartItems)

    const { error: itemError } = await supabase.from("order_items").insert(orderItems)
    if (itemError) console.error(itemError)

    setOrderPlaced(true)
    clearCart()
    setIsSubmitting(false)
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

  return (
    <main className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold text-burgundy-700 mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="fullName" placeholder="Full Name" value={formState.fullName} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={formState.email} onChange={handleChange} required disabled />
          <Input name="phone" placeholder="Phone Number" value={formState.phone} onChange={handleChange} required />
          <Textarea name="address" placeholder="Street Address" value={formState.address} onChange={handleChange} required />
          <Input name="city" placeholder="City" value={formState.city} onChange={handleChange} required />
          <Input name="zipCode" placeholder="ZIP Code" value={formState.zipCode} onChange={handleChange} required />
          <Button type="submit" disabled={isSubmitting} className="w-full bg-pink-600 text-white">
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        </form>
      </div>
    </main>
  )
}
