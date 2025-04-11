"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { supabase } from '@/lib/supabaseClient'


export default function HeroSection() {
  const controls = useAnimation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    })

    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect()
        const parallaxValue = top * 0.4
        if (sectionRef.current) {
          sectionRef.current.style.backgroundPositionY = `${parallaxValue}px`
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [controls])

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center pt-20 overflow-hidden ${isMobile ? "min-h-[85vh]" : "min-h-screen"}`}
      style={{
        background: "linear-gradient(135deg, #ffb6c1 0%, #ff69b4 100%)",
      }}
    >
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={controls} className="text-left">
            <h1 className="text-5xl md:text-8xl font-bold text-burgundy-700 mb-4">
              Freshly Baked
              <br />
              <span className="sweet-love">with Sweet Love</span>
            </h1>
            <p className="text-lg md:text-xl text-burgundy-800 mb-8 max-w-md">
              Our cookies are made with love, laughter, and just the right amount of chocolate. Guaranteed to melt your
              heart, not just your taste buds.
            </p>
            <Link
              href="/#flavors"
              onClick={(e) => {
                e.preventDefault()
                const flavorsSection = document.getElementById("flavors")
                if (flavorsSection) {
                  window.scrollTo({
                    top: flavorsSection.offsetTop,
                    behavior: "smooth",
                  })
                }
              }}
            >
              <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-150">
                Order Now
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-visible"
          >
            <div className="relative h-[300px] md:h-[500px] w-full overflow-visible">
              <Image
                src="/images/hero-pic.png"
                alt="Delicious cookies on a wooden board"
                fill
                style={{ 
                  objectFit: "contain",
                  objectPosition: "center"
                }}
                priority
                className="scale-125" // Makes the image 25% larger
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-[40px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#fff5f9"
          ></path>
        </svg>
      </div>
    </section>
  )
}