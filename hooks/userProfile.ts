import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function useUserProfile() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [address, setAddress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        const { data: addressData } = await supabase
          .from("address")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (profileData) setProfile(profileData)
        if (addressData) setAddress(addressData)
      }

      setLoading(false)
    }

    fetchUserData()
  }, [])

  return { user, profile, address, loading }
}
