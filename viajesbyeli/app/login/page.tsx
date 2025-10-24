// src/app/login/page.jsx
"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

// Importar hooks de autenticación y redirección
import { useAuth } from "@/context/auth-context" 
import { useRouter } from "next/navigation" 

// Color del botón de enlace (el RGB que usaste)
const LINK_COLOR = "rgb(47, 174, 183)";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("") // Estado para mostrar errores
  
  // Obtenemos las funciones de autenticación y el estado
  const { login, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  
  const isLoading = loading; 

  // 1. Redirigir si ya está autenticado
  if (!isLoading && isAuthenticated) {
    router.push('/admin/ofertas'); 
    return null;
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(""); // Limpiamos errores al intentar el login

    try {
      // 🛑 LLAMADA AL BACKEND REAL 🛑
      await login(email, password); 
      
      // Si el login fue exitoso, el contexto ya guardó el token y redirigimos
      router.push('/admin/ofertas'); 

    } catch (err) {
      // Si hay error (ej: 401 Unauthorized), mostramos el mensaje.
      console.error("Error de autenticación:", err);
      setError("Credenciales incorrectas. Verifica el email y la contraseña.");
    }
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center p-6">
      {/* Background Image (Mantenemos tu estilo y fondo) */}
      <div className="absolute inset-0 z-0" suppressHydrationWarning>
        <img
          src="/fondo.jpg"
          alt="Fondo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" suppressHydrationWarning/>
      </div>

      {/* Logo */}
      <Link href="/" className="absolute top-6 left-6 md:left-12 z-20">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg hover:shadow-xl transition-shadow">
          <img src="/logo.png" alt="Viajes by Eli" className="h-14 w-auto object-contain" />
        </div>
      </Link>

      {/* Login Card (Tu estilo original con fondo Liquid Glass) */}
      <Card className="relative z-10 w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-3 text-center pb-6">
          <CardTitle className="text-3xl font-bold">Acceso de Administrador</CardTitle>
          <CardDescription className="text-base">
            Inicia sesión para acceder a las herramientas de gestión de ofertas.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Campo Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-base">Contraseña</Label>
                <Link
                  href="/recuperar-password"
                  className="text-sm hover:underline"
                  style={{ color: LINK_COLOR }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 text-base pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {/* Mensaje de Error */}
            {error && <p className="text-red-600 text-sm font-medium pt-2 text-center">{error}</p>}


            {/* Botón de Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold"
              style={{ backgroundColor: LINK_COLOR }} // Usamos tu color RGB para el botón
            >
              {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
            </Button>
          </form>


        </CardContent>
      </Card>
    </main>
  )
}