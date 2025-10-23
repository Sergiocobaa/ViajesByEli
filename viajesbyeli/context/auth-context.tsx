// src/context/auth-context.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, createOffer } from '@/components/services/api';
import { AuthContextType, User } from '@/types/auth'; // <-- IMPORTA LOS TIPOS

// Definimos el Contexto. Le decimos que es de tipo AuthContextType O null.
// Y lo inicializamos con null.
const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_STORAGE_KEY = 'auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) { // Añade el tipado de props
    const [user, setUser] = useState<User | null>(null); // Usamos el tipo User
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // ... (Tu lógica de useEffect se mantiene igual)

    // 1. Cargar el token de localStorage al inicio
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (storedToken) {
            setToken(storedToken);
            // Asumimos un usuario fijo aquí para el contexto:
            setUser({ email: 'admin@viajesbyeli.com', role: 'admin' }); 
        }
        setLoading(false);
    }, []);

    // 2. Función de Inicio de Sesión Real (Añadimos tipado a los parámetros y al retorno)
    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        try {
            const data = await apiLogin(email, password); 
            const newToken = data.token || data.accessToken; 
            
            if (!newToken) {
                throw new Error("Token no recibido.");
            }

            setToken(newToken);
            localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
            setUser({ email: email, role: 'admin' }); 
            setLoading(false);
            return true;
        } catch (error) {
            setLoading(false);
            throw error; 
        }
    };

    // ... (Tu lógica de logout y createOffer se mantiene igual)

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    };

    const handleCreateOffer = async (data: any) => {
        if (!token) {
            throw new Error("No tienes permiso. Inicia sesión.");
        }
        return createOffer(data, token);
    };

    const isAuthenticated = !!token;

    // 3. El objeto value debe tener el tipo AuthContextType
    const contextValue: AuthContextType = { 
        isAuthenticated, 
        user, 
        token, 
        loading, 
        login, 
        logout, 
        createOffer: handleCreateOffer 
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// 4. El Hook useAuth (AÑADIMOS LA VERIFICACIÓN DE NULL QUE SILENCIA EL ERROR DEL EDITOR)
export const useAuth = () => {
    const context = useContext(AuthContext);
    
    // Esta verificación es la que resuelve el error "Property 'login' does not exist on type 'null'"
    if (context === null) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context; // El editor ahora sabe que 'context' es AuthContextType, NO null.
};