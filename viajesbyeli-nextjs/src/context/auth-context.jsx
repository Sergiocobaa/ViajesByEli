"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, createOffer } from '@/services/api';

const AuthContext = createContext(null);

const TOKEN_STORAGE_KEY = 'auth_token';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (storedToken) {
            setToken(storedToken);
            setUser({ email: 'admin@viajesbyeli.com' }); 
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const data = await apiLogin(email, password); 
            
            const newToken = data.token || data.accessToken; 
            
            if (!newToken) {
                throw new Error("El token de acceso no fue proporcionado por el servidor.");
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

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    };

    const handleCreateOffer = async (data) => {
        if (!token) {
            throw new Error("No tienes permiso. Inicia sesión.");
        }
        return createOffer(data, token);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            user, 
            token, 
            loading, 
            login, 
            logout, 
            createOffer: handleCreateOffer 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);