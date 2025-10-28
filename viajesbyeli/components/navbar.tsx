"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6">
        <Link href="/">
          <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <img src="/logo.png" alt="Viajes by Eli" className="h-14 w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/destinos" className="text-white font-medium hover:text-[rgb(47,174,183)] transition-colors">
            Destinos
          </Link>
          <Link href="/quien-soy" className="text-white font-medium hover:text-[rgb(47,174,183)] transition-colors">
            Quién Soy
          </Link>
          <Link href="/contacto">
            <Button className="bg-[rgb(47,174,183)] hover:bg-[rgb(47,174,183)]/90 text-white">Contacto</Button>
          </Link>
        </div>

        <button
          className="md:hidden text-white bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900/98 backdrop-blur-md z-[100] md:hidden">
          <div className="flex flex-col h-full">
            {/* Header with logo and close button */}
            <div className="flex items-center justify-between px-6 py-6">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                  <img src="/logo.png" alt="Viajes by Eli" className="h-12 w-auto object-contain" />
                </div>
              </Link>
              <button
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={28} />
              </button>
            </div>

            {/* Menu items */}
            <div className="flex flex-col justify-center flex-1 px-8 gap-8">
              <Link
                href="/"
                className="text-white text-3xl font-light tracking-wider uppercase hover:text-[rgb(47,174,183)] transition-colors border-b border-white/10 pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/destinos"
                className="text-white text-3xl font-light tracking-wider uppercase hover:text-[rgb(47,174,183)] transition-colors border-b border-white/10 pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinos
              </Link>
              <Link
                href="/quien-soy"
                className="text-white text-3xl font-light tracking-wider uppercase hover:text-[rgb(47,174,183)] transition-colors border-b border-white/10 pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Quién Soy
              </Link>
              <Link
                href="/contacto"
                className="text-[rgb(249,134,109)] text-3xl font-light tracking-wider uppercase hover:text-[rgb(249,134,109)]/80 transition-colors pb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export { Navbar }
