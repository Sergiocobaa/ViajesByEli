"use client";

import React, { useState } from "react"; 
import type { FormEvent } from "react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation"; // <--- 🛑 NUEVA IMPORTACIÓN 🛑

export function SearchBar() {
  const [destination, setDestination] = useState("");
  const router = useRouter(); // Inicializamos el hook de enrutamiento

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("Buscando destino:", destination);

    // 🛑 ACCIÓN CLAVE: Redireccionar a la página de resultados 🛑
    // Pasamos el término de búsqueda como parámetro 'q' en la URL
    router.push(`/resultados?q=${encodeURIComponent(destination)}`); 
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-full shadow-lg p-2 flex gap-2 border border-gray-200/50" 
    >
      <div className="flex-1 relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" /> 
        <Input
          type="text"
          placeholder="¿A dónde quieres viajar?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          // Añadimos 'required' para asegurar que el usuario escriba algo
          required 
          className="pl-11 h-11 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent rounded-full w-full"
        />
      </div>
      <Button
        type="submit"
        className="h-11 px-6 text-base font-semibold rounded-full flex items-center gap-2" 
        style={{ backgroundColor: "rgb(47, 174, 183)" }} 
      >
        <Search className="w-4 h-4" /> 
        Buscar
      </Button>
    </form>
  );
}