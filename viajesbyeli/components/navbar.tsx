"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
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

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg md:hidden">
          <div className="flex flex-col p-6 gap-4">
            <Link
              href="/destinos"
              className="text-gray-800 font-medium hover:text-[rgb(47,174,183)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinos
            </Link>
            <Link
              href="/quien-soy"
              className="text-gray-800 font-medium hover:text-[rgb(47,174,183)] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quién Soy
            </Link>
            <Link href="/contacto" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-[rgb(47,174,183)] hover:bg-[rgb(47,174,183)]/90 text-white">Contacto</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export { Navbar }
