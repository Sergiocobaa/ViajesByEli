"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("viajesByEliCookieConsent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("viajesByEliCookieConsent", "accepted")
    setShowBanner(false)
    // Add your analytics or tracking code here
  }

  const handleDecline = () => {
    localStorage.setItem("viajesByEliCookieConsent", "declined")
    setShowBanner(false)
  }

  const handleClose = () => {
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="mx-auto max-w-6xl">
        <div className="relative bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgb(47,174,183)] to-[rgb(249,134,109)] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">🍪 Usamos cookies</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Este sitio web utiliza cookies para mejorar tu experiencia de navegación y ofrecerte contenido
                personalizado.{" "}
                <Link
                  href="/politica-de-cookies"
                  className="text-[rgb(47,174,183)] hover:text-[rgb(249,134,109)] underline underline-offset-2 transition-colors font-medium"
                >
                  Política de Cookies
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                onClick={handleDecline}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all bg-transparent"
              >
                Rechazar
              </Button>
              <Button
                onClick={handleAccept}
                className="bg-gradient-to-r from-[rgb(47,174,183)] to-[rgb(249,134,109)] hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Aceptar cookies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
