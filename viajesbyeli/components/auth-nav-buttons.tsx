// src/components/auth-nav-buttons.tsx
"use client";

import React, { JSX } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/auth-context'; 

export function AuthNavButtons(): JSX.Element {
    const { isAuthenticated, logout, loading } = useAuth();

    if (loading) {
        return <Button disabled variant="outline" className="bg-white/10 text-white">Cargando...</Button>;
    }

    if (isAuthenticated) {
        // Opción 1: Usuario autenticado (Admin)
        return (
            <div className="flex items-center space-x-3">
                {/* Botón 1: Dashboard (al formulario de ofertas) */}
                <Link href="/admin/ofertas">
                    <Button 
                        variant="default" 
                        className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-shadow gap-2"
                    >
                        <LayoutDashboard className="h-5 w-5" /> 
                        Dashboard
                    </Button>
                </Link>
                
                {/* Botón 2: Cerrar Sesión */}
                <Button 
                    onClick={logout} 
                    variant="ghost" 
                    className="text-white hover:bg-red-600/20 border border-white/20 hover:border-red-600/40"
                >
                    <LogOut className="h-5 w-5 mr-2" /> Salir
                </Button>
            </div>
        );
    }

    // Opción 2: Usuario NO autenticado
    return (
        <Link href="/login">
            <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
                Iniciar Sesión
            </Button>
        </Link>
    );
}