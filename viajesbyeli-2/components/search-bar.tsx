"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar() {
  const [destination, setDestination] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí conectarás con tu backend
    console.log("Buscando destino:", destination)
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-3 flex gap-3">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="¿A dónde quieres viajar?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="pl-12 h-14 text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="h-14 px-8 text-lg font-semibold"
        style={{ backgroundColor: "rgb(47, 174, 183)" }}
      >
        Buscar
      </Button>
    </form>
  )
}
