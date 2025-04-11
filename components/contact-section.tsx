"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formState)
    alert("Thanks for your message! We'll get back to you soon.")
    setFormState({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-burgundy-700 mb-6">Get in Touch</h2>
            <p className="text-lg text-burgundy-600 mb-8">
              Have questions or want to place a special order? Reach out to us and we'll get back to you as soon as
              possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-pink-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-bold text-burgundy-700">Visit Us</h4>
                  <p className="text-burgundy-600">123 Cookie Lane, Sweet City, SC 12345</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-pink-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-bold text-burgundy-700">Call Us</h4>
                  <p className="text-burgundy-600">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-pink-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-bold text-burgundy-700">Email Us</h4>
                  <p className="text-burgundy-600">hello@liciousss.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-pink-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-bold text-burgundy-700">Opening Hours</h4>
                  <p className="text-burgundy-600">Mon-Fri: 9am-6pm | Sat-Sun: 10am-4pm</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-burgundy-700 mb-6">Send us a Message</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-burgundy-600 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-burgundy-600 mb-1">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-burgundy-600 mb-1">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg text-lg font-semibold"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

