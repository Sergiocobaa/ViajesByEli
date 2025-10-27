import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from '@/context/auth-context';
import CookieBanner from "@/components/cookie-banner"
import Script from 'next/script';
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
      <head>
        {/* 1. PEGA EL PRIMER CÓDIGO DE GTM AQUÍ */}
        {/* We use the Script component from Next.js for better performance */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WGQ8R5H8');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* ... (Tus otros elementos del head: <link> de fuentes, etc.) ... */}
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WGQ8R5H8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <AuthProvider>
            {children}
            <CookieBanner />
          </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
