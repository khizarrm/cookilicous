"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const boxOptions = [
  {
    id: 1,
    name: "Box of 6",
    description: "Perfect for a small treat or gift",
    price: 19.99,
    image: "/placeholder.svg?height=400&width=400",
    count: 6,
  },
  {
    id: 2,
    name: "Box of 12",
    description: "Ideal for sharing or serious cookie lovers",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=400",
    count: 12,
  },
]

export default function BoxOptionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleChooseFlavors = (boxId: number) => {
    router.push(`/customize/${boxId}`)
  }

  return (
    <section
      id="flavors"
      ref={sectionRef}
      className="py-20 bg-background"
      style={{
        background: "linear-gradient(180deg, #fff5f9 0%, #fff 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 section-appear">
          <h2 className="text-4xl md:text-5xl font-bold text-burgundy-700 mb-4">Choose Your Box</h2>
          <p className="text-lg text-burgundy-600 max-w-2xl mx-auto">
            Select your perfect cookie box and customize it with your favorite flavors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {boxOptions.map((box, index) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="product-card bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative h-64 bg-pink-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-pink-600 text-white text-2xl font-bold rounded-full w-32 h-32 flex items-center justify-center">
                    {box.count} Cookies
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-r from-pink-700 to-pink-600 text-white">
                <h3 className="text-2xl font-bold mb-2">{box.name}</h3>
                <p className="text-sm mb-4">{box.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${box.price}</span>
                  <Button
                    className="bg-white text-pink-600 hover:bg-pink-100"
                    onClick={() => handleChooseFlavors(box.id)}
                  >
                    Choose Flavors
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

