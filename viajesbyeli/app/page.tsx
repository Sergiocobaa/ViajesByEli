import { SearchBar } from "@/components/search-bar"
import { OffersSection } from "@/components/offers-section"
import { Button } from "@/components/ui/button"
import { AuthNavButtons } from "@/components/auth-nav-buttons"
import Link from "next/link"
import { Footer } from "@/components/footer"
import Navbar from "@/components/navbar"
import { NewsletterPopup } from "@/components/newsletter-popup"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with integrated navbar */}
      <section className="relative min-h-[85vh] flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/fondo.jpg"
            alt="Destino paradisíaco"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        </div>


        <Navbar />
        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 pb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-4 text-balance">
            Descubre tu próximo destino
          </h1>
          <p className="text-xl md:text-2xl text-white/90 text-center mb-12 max-w-2xl text-pretty">
            Explora el mundo con las mejores ofertas y experiencias únicas
          </p>

          <SearchBar />
        </div>
      </section>

      {/* Offers Section */}
      <OffersSection />
      <Footer></Footer>
      <NewsletterPopup />
    </main>
  )
}
