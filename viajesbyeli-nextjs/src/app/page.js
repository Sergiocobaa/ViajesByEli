"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search } from 'lucide-react'; // Nuevo icono para el buscador

import { getOffers } from "../services/api"; 

function HomePage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({
    precioMax: 2000,
    destino: "",
    tipo: "",
  });
  const [ofertas, setOfertas] = useState([]);
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    getOffers().then((data) => setOfertas(data)).catch(console.error);
  }, []);

  const handleFiltroChange = (name, value) => {
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };
  const handleSliderChange = (value) => {
    setFiltros((prev) => ({ ...prev, precioMax: value[0] }));
  };
  const filtrados = ofertas.filter((viaje) => {
    const cumpleBusqueda =
      viaje.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      viaje.destination?.toLowerCase().includes(busqueda.toLowerCase());
    const cumplePrecio = viaje.price <= filtros.precioMax;
    const cumpleDestino = (filtros.destino === "" || filtros.destino === "ALL") || viaje.destination === filtros.destino;
    const cumpleTipo = (filtros.tipo === "" || filtros.tipo === "ALL") || viaje.tipo === filtros.tipo;
    return cumpleBusqueda && cumplePrecio && cumpleDestino && cumpleTipo;
  });
  const cerrarModal = () => setDetalle(null);
  const destinosUnicos = Array.from(new Set(ofertas.map((v) => v.destination))).filter(Boolean);
  const tiposUnicos = Array.from(new Set(ofertas.map((v) => v.tipo))).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section: Más limpio y enfocado en el buscador */}
      <section
        // Usamos el color primario del tema (primary) y lo hacemos más alto
        className="bg-primary h-[500px] flex flex-col justify-end items-center text-primary-foreground relative pb-16"
        style={{
          // Eliminamos el backgroundImage
        }}
      >

        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 text-center mb-8">
            <h2 className="text-5xl font-light drop-shadow-lg mb-8">
              Descubre tu próximo destino
            </h2>
            
            {/* Barra de Búsqueda Flotante y Estética */}
            <div className="flex shadow-2xl rounded-full overflow-hidden bg-card/95 backdrop-blur-md transition-shadow duration-300 hover:shadow-primary/50 border border-primary/20">
              <Input
                type="text"
                placeholder="Busca por título o destino..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="flex-1 rounded-l-full rounded-r-none p-4 text-lg text-foreground border-none focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground"
              />
              <Button 
                className="rounded-r-full rounded-l-none text-lg px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition duration-200 flex items-center gap-2"
              >
                <Search className="h-5 w-5" /> Buscar
              </Button>
            </div>
        </div>
      </section>

      {/* Content: Filters + Results */}
      <main className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row gap-10">
        {/* Filters Sidebar: sticky y compacto */}
        <aside className="md:w-1/4 p-6 rounded-xl border border-border bg-card shadow-lg h-fit sticky top-24">
          <h3 className="text-xl font-bold text-foreground mb-6 border-b border-border/70 pb-3">Ajustar Viajes</h3>

          {/* Precio Máximo (SLIDER) */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-foreground">Precio máximo (€)</label>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={[filtros.precioMax]}
              onValueChange={handleSliderChange}
              className="w-full my-4"
            />
            <span className="text-base font-bold text-primary mt-4 block">Hasta {filtros.precioMax} €</span>
          </div>

          {/* Destino (SELECT) */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-foreground">Destino</label>
            <Select 
              value={filtros.destino} 
              onValueChange={(value) => handleFiltroChange('destino', value)}
            >
              <SelectTrigger className="w-full border-border focus:ring-primary h-11 rounded-lg">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="ALL">Todos los Destinos</SelectItem> 
                {destinosUnicos.map((dest) => (
                  <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo (SELECT) */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-foreground">Tipo</label>
            <Select 
              value={filtros.tipo} 
              onValueChange={(value) => handleFiltroChange('tipo', value)}
            >
              <SelectTrigger className="w-full border-border focus:ring-primary h-11 rounded-lg">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border">
                <SelectItem value="ALL">Todos los Tipos</SelectItem> 
                {tiposUnicos.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </aside>

        {/* Results Section */}
        <section className="md:w-3/4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtrados.length === 0 && <p className="col-span-full text-center text-xl text-muted-foreground py-16">😔 No encontramos viajes que coincidan con tus preferencias.</p>}

          {filtrados.map((viaje) => (
            <div key={viaje.id} className="bg-card text-card-foreground border border-border/70 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/70 group">
              
              {/* Card Image */}
              {viaje.imageUrl && (
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={viaje.imageUrl}
                        alt={viaje.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x200?text=Imagen+No+Disponible"; }}
                    />
                </div>
              )}
              
              {/* Card Body */}
              <div className="p-5">
                <h4 className="text-xl font-bold text-foreground mb-1">{viaje.title}</h4>
                <p className="text-sm font-medium text-secondary mb-3 uppercase tracking-wider">{viaje.destination}</p>
                <p className="text-muted-foreground mb-4 text-sm">{viaje.description.substring(0, 90)}...</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-border/70">
                  <p className={`text-2xl font-extrabold text-primary`}>{viaje.price} €</p>
                  <Button
                    variant="default" // Usamos el color principal del tema (primary)
                    className="font-medium px-5 py-3 rounded-full shadow-md transition duration-300 hover:shadow-lg"
                    onClick={() => setDetalle(viaje)}
                  >
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Modal / Dialog Section */}
      <Dialog open={!!detalle} onOpenChange={(open) => !open && cerrarModal()}>
        <DialogContent className="max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-foreground">
              {detalle?.title}
            </DialogTitle>
          </DialogHeader>
          
          {detalle && (
            <div className="overflow-y-auto max-h-[70vh] pr-4">
              {detalle.imageUrl && (
                <img
                  src={detalle.imageUrl}
                  alt={detalle.title}
                  className="w-full h-72 object-cover rounded-lg mb-6"
                />
              )}
              <p className="mb-4 text-lg text-foreground">{detalle.description}</p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-lg border-t border-border/70 pt-4">
                  <p className="font-semibold text-primary">Precio: {detalle.price} €</p>
                  {detalle.destination && <p className="text-muted-foreground">Destino: {detalle.destination}</p>}
                  {detalle.duration && <p className="text-muted-foreground">Duración: {detalle.duration}</p>}
                  {detalle.tipo && <p className="text-muted-foreground">Tipo: {detalle.tipo}</p>}
              </div>
              
              <Button
                onClick={() => window.open(`mailto:mama@example.com?subject=Información sobre ${detalle.title}`)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition w-full"
              >
                Contactar por email
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HomePage;