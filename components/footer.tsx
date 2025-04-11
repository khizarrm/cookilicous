import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-burgundy-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image src="/images/logo.png" alt="Liciousss" width={150} height={60} className="h-12 w-auto" />
            </Link>
            <p className="text-pink-200 mb-6">Freshly baked cookies made with love and the finest ingredients.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-pink-300 transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-pink-300 transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-white hover:text-pink-300 transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-pink-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-pink-200 hover:text-white transition-colors">
                  Our Cookies
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-pink-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-pink-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Cookie Menu</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-pink-200 hover:text-white transition-colors">
                  Chocolate Chip
                </Link>
              </li>
              <li>
                <Link href="#" className="text-pink-200 hover:text-white transition-colors">
                  Choc Creme
                </Link>
              </li>
              <li>
                <Link href="#" className="text-pink-200 hover:text-white transition-colors">
                  Swiss Chocolate
                </Link>
              </li>
              <li>
                <Link href="#" className="text-pink-200 hover:text-white transition-colors">
                  View All Cookies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-pink-200 mb-4">Subscribe to get special offers and cookie updates!</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-burgundy-800"
              />
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-r-lg font-medium transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-pink-800 pt-8 text-center text-pink-300">
          <p>&copy; {new Date().getFullYear()} Liciousss. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

