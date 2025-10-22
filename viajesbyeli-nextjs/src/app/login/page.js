"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context'; // <--- USAMOS EL HOOK
import { useRouter } from 'next/navigation'; // Hook de redirección
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Si necesitas importar tu función login, hazlo aquí:
// import { login } from '../services/api'; 

function LoginPage() {
  // src/app/login/page.jsx (línea dentro de LoginPage)
  const { login, loading, isAuthenticated } = useAuth(); // <--- Aquí debes obtener 'loading'
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  if (!loading && isAuthenticated) {
    router.push('/admin/ofertas');
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
        await login(email, password);
        router.push('/admin/ofertas');
    } catch (err) {
        setError("Credenciales incorrectas o error de conexión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm rounded-xl shadow-2xl border-border">
        
        {/* 1. Encabezado */}
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-foreground">
            Iniciar Sesión
          </CardTitle>
         
        </CardHeader>
        
        {/* 2. Contenido Principal / Formulario */}
        <CardContent className="grid gap-4">

          
          
          
          {/* Formulario de Email y Contraseña */}
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg h-12"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg h-12"
              />
            </div>
          
            {/* Botón Principal */}
            <Button 
              type="submit" 
              className="w-full rounded-lg h-12 mt-4" 
              disabled={isLoading}
            >
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </form>
        </CardContent>        
        
      </Card>
    </div>
  );
}

export default LoginPage;