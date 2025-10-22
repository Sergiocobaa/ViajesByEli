// src/components/theme-provider.jsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

// Este componente envuelve toda la aplicación y gestiona el estado del tema
export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider 
      attribute="class"       // Añade la clase 'dark' al <html>
      defaultTheme="system"   // Tema por defecto es el del sistema operativo
      enableSystem          // Permite que el sistema operativo controle el tema
      disableTransitionOnChange // Evita que los cambios de color se animen (mejor experiencia)
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}