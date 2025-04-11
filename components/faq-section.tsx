"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How long do cookies stay fresh?",
    answer:
      "Our cookies stay fresh for up to 7 days when stored in an airtight container at room temperature. For longer freshness, you can refrigerate them for up to 2 weeks or freeze them for up to 3 months.",
  },
  {
    question: "Do you offer same-day delivery?",
    answer:
      "Yes! We offer same-day delivery for orders placed before 11 AM within a 10-mile radius of our bakery. For other areas, delivery typically takes 1-2 business days.",
  },
  {
    question: "Can I customize my cookie box with different flavors?",
    answer:
      "When you select a box of 6 or 12 cookies, you can mix and match any flavors you like. You can even choose multiple of the same flavor if you have a favorite.",
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer:
      "We offer gluten-free and vegan options for select flavors. Please contact us directly for special dietary requirements, and we'll do our best to accommodate your needs.",
  },
  {
    question: "How do I place a large order for an event?",
    answer:
      "For orders of more than 5 boxes or custom corporate gifts, please contact us at orders@liciousss.com or call (555) 123-4567. We recommend placing large orders at least 48 hours in advance.",
  },
  {
    question: "What's your return policy?",
    answer:
      "We want you to be completely satisfied with your cookies. If you're not happy with your order for any reason, please contact us within 24 hours of delivery, and we'll make it right.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-burgundy-700 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-burgundy-600 max-w-2xl mx-auto">
            Everything you need to know about our cookies and ordering process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-colors ${
                  openIndex === index ? "bg-pink-600 text-white" : "bg-white hover:bg-pink-100 text-burgundy-700"
                }`}
              >
                <span className="font-bold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className={`h-5 w-5 ${openIndex === index ? "text-white" : "text-pink-600"}`} />
                ) : (
                  <ChevronDown className="h-5 w-5 text-pink-600" />
                )}
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-5 rounded-b-lg shadow-inner border-t border-pink-100"
                >
                  <p className="text-burgundy-600">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

