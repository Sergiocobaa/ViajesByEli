// src/components/navbar.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun, LogOut, User, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context'; // Importamos el contexto de autenticación

// --- Componente 1: Alternador de Modo Claro/Oscuro ---
function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Alternar tema</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Claro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Oscuro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// --- Componente 2: Botón de Autenticación y Admin ---
function AuthButton() {
    const { isAuthenticated, logout, loading } = useAuth();

    // Si el estado está cargando, mostramos un botón deshabilitado
    if (loading) {
        return <Button disabled className="rounded-full px-5 py-2">Cargando...</Button>;
    }
    
    // Si la madre (Admin) está autenticada
    if (isAuthenticated) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* Botón de Perfil */}
                    <Button variant="default" className="rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-shadow gap-2">
                        <User className="h-4 w-4" /> Admin
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                        {/* Enlace al formulario de subir productos */}
                        <Link href="/admin/ofertas" className="flex items-center">
                            <Settings className="mr-2 h-4 w-4" /> Gestionar Ofertas
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-700">
                        <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    // Si NO está autenticado, mostramos el botón de Login
    return (
        <Link href="/login">
            <Button variant="default" className="rounded-full px-5 py-2 shadow-md hover:shadow-lg transition-shadow">
                Iniciar Sesión
            </Button>
        </Link>
    );
}


// --- Componente Principal: Navbar ---
function Navbar() {
    return (
        <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center">
            <div className="
                liquid-glass 
                border border-border/70 
                rounded-2xl 
                shadow-2xl shadow-black/10 
                px-8 py-3 
                flex items-center justify-between
                max-w-7xl w-[96%]
                mx-4 
            ">
                {/* Logo/Marca */}
                <Link 
                    href="/" 
                    className="flex items-center space-x-2 text-2xl font-extrabold text-primary transition-colors tracking-wider"
                >
                    <Image
                        src="/logo.png" 
                        alt="Logo de Viajes By Eli"
                        width={32} // Ajustado para un logo de navbar más pequeño
                        height={32} 
                        priority={true}
                        className="rounded-lg"
                    />
                    <span className="hidden sm:inline">VIAJES BY ELI</span>
                </Link>

                {/* Enlaces y Botones de Acción */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    <Link href="/" className="hidden md:block text-foreground hover:text-primary transition-colors text-lg font-medium">
                        Inicio
                    </Link>
                    <Link href="/ofertas" className="hidden md:block text-foreground hover:text-primary transition-colors text-lg font-medium">
                        Destinos
                    </Link>
                    <Link href="/contacto" className="hidden md:block text-foreground hover:text-primary transition-colors text-lg font-medium">
                        Inspiración
                    </Link>
                    
                    <ModeToggle /> {/* Alternador de Tema */}
                    <AuthButton /> {/* Botón de Login/Admin */}

                    {/* Botón de Menú Móvil (se mantiene por si acaso) */}
                    <Button variant="outline" size="icon" className="md:hidden rounded-lg">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;