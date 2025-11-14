import Link from "next/link";
import { NewsletterPageForm } from "@/components/newsletter-form-page";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function NewsletterPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6">
      
      {/* 1. Fondo (igual que el login) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/fondo.jpg" // Asumiendo que /public/fondo.jpg existe
          alt="Fondo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      </div>

      {/* 2. Logo / Volver a Inicio */}
      <Link href="/" className="absolute top-6 left-6 md:left-12 z-20">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Volver</span>
        </div>
      </Link>

      {/* 3. Contenido de la página */}
      <div className="relative z-10 w-full max-w-lg text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-balance drop-shadow-md">
          Suscríbete a nuestra Newsletter
        </h1>
        <p className="text-lg md:text-xl text-white/90 mt-4 text-pretty">
          Recibe solo las mejores ofertas y chollos de viajes.
        </p>
      </div>

      {/* 4. Formulario (Client Component) */}
      <NewsletterPageForm />
      
    </main>
  );
}