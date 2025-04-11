"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BoxOptionsSection from "@/components/box-options-section"
import AboutSection from "@/components/about-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import FAQSection from "@/components/faq-section"
import { useCart } from "@/components/cart-context"

export default function Home() {
  const { setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section-appear")

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("appear")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    // Trigger once on load
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <HeroSection />
      <BoxOptionsSection />
      {/* <AboutSection /> */}
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

