"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-pink-50 relative">
      {/* Top wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
        <svg
          className="relative block w-full h-[40px] md:h-[60px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#fff"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <Image src="/placeholder.svg?height=800&width=800" alt="Our bakery" fill style={{ objectFit: "cover" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-burgundy-700 mb-6">Our Sweet Story</h2>
            <p className="text-lg text-burgundy-600 mb-4">
              Liciousss was born from a passion for creating the perfect cookie. What started as weekend baking sessions
              with friends and family quickly turned into a beloved local business.
            </p>
            <p className="text-lg text-burgundy-600 mb-6">
              We believe in using only the finest ingredients, traditional baking methods, and a whole lot of love to
              create cookies that bring joy with every bite.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="text-3xl font-bold text-pink-600 mb-2">15+</h3>
                <p className="text-burgundy-600">Cookie Varieties</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="text-3xl font-bold text-pink-600 mb-2">5k+</h3>
                <p className="text-burgundy-600">Happy Customers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-[40px] md:h-[60px]"
          data-name="Layer 2"
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

