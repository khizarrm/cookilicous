import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function useUserProfile() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (!error && data) setProfile(data)
      }

      setLoading(false)
    }

    fetchUserAndProfile()
  }, [])

  return { user, profile, loading }
}