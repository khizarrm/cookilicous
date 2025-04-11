"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { motion } from "framer-motion"

const products = [
  {
    id: 1,
    name: "Chocolate Chip",
    description: "Our classic cookie with premium chocolate chips",
    price: 3.99,
    image: "/images/chocolate-chip.png",
  },
  {
    id: 2,
    name: "Choc Creme",
    description: "Chocolate cookies with creamy filling",
    price: 4.49,
    image: "/images/choc-creme.png",
  },
  {
    id: 3,
    name: "Swiss Chocolate",
    description: "Rich chocolate cookies with Swiss chocolate chunks",
    price: 4.99,
    image: "/images/swiss-chocolate.png",
  },
]

export default function ProductsSection() {
  const { addToCart } = useCart()
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section id="products" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 section-appear">
          <h2 className="text-4xl md:text-5xl font-bold text-burgundy-700 mb-4">
            We Create Delicious
            <br />
            Cookie Treats
          </h2>
          <p className="text-lg text-burgundy-600 max-w-2xl mx-auto">
            Our cookies are made from scratch with the finest ingredients and baked to perfection for the ultimate
            freshly baked experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="product-card bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative h-64 bg-black">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6 bg-gradient-to-r from-pink-700 to-pink-600 text-white">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price}</span>
                  <Button onClick={() => addToCart(product)} className="bg-white text-pink-600 hover:bg-pink-100">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 rounded-full text-lg font-semibold">
            View All Cookies
          </Button>
        </div>
      </div>
    </section>
  )
}

