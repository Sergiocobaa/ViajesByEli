// src/components/auth-nav-buttons.tsx
"use client";

import React, { JSX } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/auth-context'; 

export function AuthNavButtons(): JSX.Element {
    // 🛑 USAMOS EL NUEVO HOOK 🛑
    const { isAuthenticated, loginToggle, loading } = useAuth(); 
    
    // ... (El resto del código se mantiene, pero ajustamos los botones)

    if (isAuthenticated) {
        return (
            <div className="flex items-center space-x-3">
                {/* Botón 1: Dashboard */}
                <Link href="/admin/ofertas">
                    <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-shadow gap-2">
                        Dashboard
                    </Button>
                </Link>
                
                {/* Botón 2: Cerrar Sesión (Ahora es un toggle) */}
                <Button 
                    onClick={loginToggle} // <--- CAMBIO CLAVE
                    variant="ghost" 
                    className="text-red-400 border border-red-400/20 hover:bg-red-400/10"
                >
                    <LogOut className="h-5 w-5 mr-2" /> Salir (Mock)
                </Button>
            </div>
        );
    }

    // Usuario NO autenticado
    return (
        <Button
            onClick={loginToggle} // <--- CAMBIO CLAVE
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        >
            Iniciar Sesión (Mock)
        </Button>
    );
}