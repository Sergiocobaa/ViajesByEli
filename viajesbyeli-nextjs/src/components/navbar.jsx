// src/components/navbar.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun, LogOut, User, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { 
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';

// --- Componente 1: Alternador de Modo Claro/Oscuro ---
function ModeToggle() {
    const { setTheme } = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Alternar tema</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground">
                <DropdownMenuItem onClick={() => setTheme("light")}>Claro</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Oscuro</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>Sistema</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// --- Componente 2: Botón de Autenticación y Admin ---
function AuthButton() {
    const { isAuthenticated, logout, loading } = useAuth();
    if (loading) {
        return <Button disabled variant="ghost" className="text-white">Cargando...</Button>;
    }
    if (isAuthenticated) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white hover:bg-white/10 px-4 py-2 rounded-full shadow-sm gap-2">
                        <User className="h-4 w-4" /> Admin
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover border-border text-popover-foreground">
                    <DropdownMenuItem asChild>
                        <Link href="/admin/ofertas" className="flex items-center">
                            <Settings className="mr-2 h-4 w-4" /> Gestionar Ofertas
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem onClick={logout} className="text-red-400 focus:text-red-500 hover:bg-destructive/10">
                        <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
    return (
        <Link href="/login">
            <Button variant="outline" className="text-primary-foreground border-primary hover:bg-primary/20 hover:text-primary-foreground px-5 py-2 rounded-full font-semibold">
                Iniciar Sesión
            </Button>
        </Link>
    );
}

// --- Componente Principal: Navbar ---
function Navbar() {
    return (
        // La navbar ahora es fija arriba y transparente
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
            <div className="
                flex items-center justify-between
                max-w-7xl w-full
            ">
                {/* Logo/Marca */}
                <Link 
                    href="/" 
                    className="flex items-center space-x-2 text-2xl font-extrabold text-white transition-colors tracking-wider hover:text-primary"
                >
                    <Image
                        src="/logo.png" 
                        alt="Logo de Viajes By Eli"
                        width={32} 
                        height={32} 
                        priority={true}
                        className="rounded-lg filter brightness-125" // Pequeño ajuste para que destaque
                    />
                    <span className="hidden sm:inline font-montserrat text-2xl font-light">VIAJES BY ELI</span>
                </Link>

                {/* Enlaces y Botones de Acción */}
                <div className="flex items-center space-x-4 lg:space-x-8">
                    <Link href="/" className="hidden lg:block text-white hover:text-primary transition-colors text-lg font-montserrat font-medium">
                        Inicio
                    </Link>
                    <Link href="/ofertas" className="hidden lg:block text-white hover:text-primary transition-colors text-lg font-montserrat font-medium">
                        Destinos
                    </Link>
                    <Link href="/contacto" className="hidden lg:block text-white hover:text-primary transition-colors text-lg font-montserrat font-medium">
                        Inspiración
                    </Link>
                    
                    <ModeToggle />
                    <AuthButton />

                    {/* Botón de Menú Móvil (para hamburguesa, si se implementa) */}
                    <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10 rounded-lg">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;