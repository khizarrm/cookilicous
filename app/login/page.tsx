"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    let result
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password })
    } else {
      result = await supabase.auth.signUp({
        email,
        password,
        phone,
      })
    }

    const { error } = result

    if (error) {
      setError(error.message)
    } else {
      router.push("/")
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-burgundy-700 mb-6 text-center">
          {isLogin ? "Welcome Back 🍪" : "Join the Cookie Club 🍪"}
        </h1>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!isLogin && (
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button onClick={handleSubmit} disabled={loading} className="w-full bg-pink-600 text-white">
            {loading ? "Please wait..." : isLogin ? "Log In" : "Sign Up"}
          </Button>

          <p className="text-center text-sm text-burgundy-600">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-pink-600 hover:underline font-medium"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}
