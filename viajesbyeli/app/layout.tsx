import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from '@/context/auth-context';
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Viajes by Eli",
  description: "Descubre los mejores destinos con ofertas exclusivas",
  generator: "v0.app",
  icons: {
    icon: '/icono.ico', // Ruta al icono principal (debe estar en public/ o app/)

  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <AuthProvider>
            {/* Tus componentes de Navbar, Page.tsx y Login.tsx se renderizan dentro de {children}, 
              y ahora pueden usar useTheme y useAuth sin el error 'useAuth debe ser usado dentro de un AuthProvider'.
            */}
            {children}
          </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
