"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        router.push("/login")
        return
      }

      setUserId(user.id)
      setEmail(user.email || "")

      // Fetch profile and address
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, phone_number, address(*)")
        .eq("id", user.id)
        .maybeSingle()


        if (profileError) {
          setError(profileError.message)
        } else if (profile) {
          setName(profile.full_name || "")
          setPhone(profile.phone_number || "")
          const addressEntry = Array.isArray(profile.address) ? profile.address[0] : profile.address
          if (addressEntry) {
            setAddress(addressEntry.address_text || "")
            setCity(addressEntry.city || "")
            setZip(addressEntry.zip_code || "")
          }

        } else {
          setError("No profile found for this user.")
        }
        

      setLoading(false)
    }

    fetchProfile()
  }, [router])

  const handleSave = async () => {
    setError(null)
    setSuccess(null)

    if (!userId) return

    // Update profile
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name: name, phone_number: phone })
      .eq("id", userId)

    // Upsert address
    const { error: addressError } = await supabase
      .from("address")
      .upsert({
        user_id: userId,
        address_text: address,
        city,
        zip_code: zip,
      }, { onConflict: "user_id" })

    if (profileError || addressError) {
      setError(profileError?.message || addressError?.message || "Failed to update profile")
    } else {
      setSuccess("Profile updated successfully!")
    }
  }

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <main className="max-w-lg mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
      <Button
        variant="outline"
        onClick={() => router.push("/")}
        className="text-sm"
      >
        ← Back to Home
      </Button>

      <Button
        variant="destructive"
        onClick={async () => {
          await supabase.auth.signOut()
          router.push("/login")
        }}
        className="text-sm"
      >
        Logout
      </Button>
    </div>

      <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

      <div className="space-y-4">
        <Input type="email" value={email} disabled />
        <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <Input placeholder="Zip Code" value={zip} onChange={(e) => setZip(e.target.value)} />

        <Button onClick={handleSave} className="w-full bg-pink-600 text-white">
          Save Changes
        </Button>
      </div>
    </main>
  )
}
