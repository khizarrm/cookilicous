"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Cookie Enthusiast",
    content:
      "These are the best cookies I've ever had! The chocolate chip cookies are perfectly soft in the middle and crispy on the edges.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Dessert Blogger",
    content:
      "Liciousss has redefined what a good cookie should taste like. Their attention to detail and quality ingredients really shine through.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Regular Customer",
    content:
      "I order these cookies for all my special occasions. Everyone always asks where I got them from. The Swiss Chocolate is my absolute favorite!",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current])

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-burgundy-700 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-burgundy-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers who keep coming back for more.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl text-burgundy-600 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center text-pink-600 font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-burgundy-700">{testimonial.name}</h4>
                        <p className="text-sm text-burgundy-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white rounded-full p-2 shadow-md"
            onClick={prev}
          >
            <ChevronLeft className="h-6 w-6 text-pink-600" />
            <span className="sr-only">Previous</span>
          </Button>

          <Button
            variant="outline"
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white rounded-full p-2 shadow-md"
            onClick={next}
          >
            <ChevronRight className="h-6 w-6 text-pink-600" />
            <span className="sr-only">Next</span>
          </Button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${i === current ? "bg-pink-600" : "bg-pink-200"}`}
                onClick={() => setCurrent(i)}
              >
                <span className="sr-only">Testimonial {i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

