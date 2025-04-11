"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-context"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { LogIn } from "lucide-react"


interface HeaderProps {
  onCartClick: () => void
}

export default function Header({ onCartClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const totalItems = cartItems.reduce((total, item) => total + 1, 0)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center p-4">
      <div className="flex items-center max-h-16 overflow-hidden">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Liciousss"
          width={0}
          height={0}
          sizes="100vw"
          className="h-16 w-auto object-contain"
          priority
        />
      </Link>
    </div>

        {!isMobile ? (
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-pink-600 font-medium">
              Home
            </Link>
            <Link href="#flavors" className="text-foreground hover:text-pink-600 font-medium">
              Flavors
            </Link>
            <Link href="#about" className="text-foreground hover:text-pink-600 font-medium">
              About Us
            </Link>
            <Button variant="ghost" className="relative" onClick={onCartClick} aria-label="Open cart">
              <ShoppingCart className="h-6 w-6 text-pink-600" />
              {totalItems > 0 && <span className="cart-item-count">{totalItems}</span>}
            </Button>

            {/* Login Button */}
            <div className="hidden md:flex items-center">
              <Link href="/login" aria-label="Login">
              <Button variant="ghost">
                <LogIn className="h-6 w-6 text-pink-600" />
              </Button>
            </Link>
            </div>

          </nav>
        ) : (
          <div className="flex items-center">
            <Button variant="ghost" className="relative mr-2" onClick={onCartClick} aria-label="Open cart">
              <ShoppingCart className="h-6 w-6 text-pink-600" />
              {totalItems > 0 && <span className="cart-item-count">{totalItems}</span>}
            </Button>
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6 text-pink-600" /> : <Menu className="h-6 w-6 text-pink-600" />}
            </Button>

            <Link
              href="/login"
              className="text-foreground hover:text-pink-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>

          </div>

          

          
        )}
      

      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 flex flex-col space-y-4">
          <Link
            href="/"
            className="text-foreground hover:text-pink-600 font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#flavors"
            className="text-foreground hover:text-pink-600 font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Flavors
          </Link>
          <Link
            href="#about"
            className="text-foreground hover:text-pink-600 font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
        </div>
      )}
    </header>
  )
}

