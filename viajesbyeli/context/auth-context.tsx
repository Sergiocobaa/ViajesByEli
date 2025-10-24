// src/context/auth-context.tsx (VERSIÓN SIMPLIFICADA Y SIN FALLOS)
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
// 🛑 ELIMINAMOS TODAS LAS IMPORTACIONES DE API Y TYPES AQUÍ para evitar fallos

// Definición simple del tipo (si usas TypeScript)
interface SimpleAuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    loginToggle: () => void; // Función para simular el login/logout
}

// Inicializamos el contexto con el tipo y un valor por defecto
const AuthContext = createContext<SimpleAuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // Usamos un estado simple para simular el inicio de sesión
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false); // No necesitamos cargar nada de localStorage

    // Función para alternar el estado
    const loginToggle = () => {
        setIsAuthenticated(prev => !prev);
    };

    // Si quieres que el estado se mantenga en localStorage, puedes usar este useEffect:
    /*
    useEffect(() => {
        const storedAuth = localStorage.getItem('is_admin_auth') === 'true';
        setIsAuthenticated(storedAuth);
        setLoading(false);
    }, []);

    useEffect(() => {
        localStorage.setItem('is_admin_auth', isAuthenticated.toString());
    }, [isAuthenticated]);
    */
    
    const contextValue: SimpleAuthContextType = { 
        isAuthenticated, 
        loading, 
        loginToggle, 
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook useAuth (Se mantiene la verificación que resuelve el error)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context; 
};