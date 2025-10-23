// src/app/page.js
"use client";

import React, { useState, useEffect } from "react";
import ParticlesBackground from '@/components/particles-background'; // <--- IMPORTAMOS EL FONDO DE PARTÍCULAS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Search } from 'lucide-react'; 

import { getOffers } from "@/services/api"; // Usamos @/services/api para consistencia

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
    // Aseguramos que el contenedor principal ocupe toda la altura
    <div className="relative min-h-screen flex flex-col pt-24 pb-8 bg-black"> 
      {/* Fondo de Partículas */}
      <ParticlesBackground />

      {/* Hero Section: Contenido central y buscador */}
      <section
        className="flex-1 flex flex-col justify-center items-center text-white relative z-10 p-4"
      >
        <div className="w-full max-w-4xl mx-auto text-center mb-8">
            {/* Título Principal */}
            <h1 className="text-5xl md:text-6xl font-extralight font-montserrat tracking-tight mb-4 drop-shadow-md">
              Desbloquea tus futuras aventuras
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-open-sans mb-12 drop-shadow-sm">
              Explora destinos únicos y crea recuerdos inolvidables.
            </p>
            
            {/* Barra de Búsqueda Flotante y Estética */}
            <div className="flex w-full max-w-lg mx-auto bg-card/90 backdrop-blur-sm rounded-full overflow-hidden shadow-2xl shadow-primary/20 border border-primary/40 transition-shadow duration-300 hover:shadow-primary/50">
              <Input
                type="text"
                placeholder="Busca tu destino soñado..."
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
      <main className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row gap-10 relative z-10 bg-background/80 backdrop-blur-md rounded-xl mt-8 shadow-xl">
        {/* Filters Sidebar: sticky y compacto */}
        <aside className="md:w-1/4 p-6 rounded-xl border border-border bg-card shadow-lg h-fit sticky top-24">
          <h3 className="text-xl font-bold text-foreground mb-6 border-b border-border/70 pb-3 font-montserrat">Ajustar Viajes</h3>

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
              <SelectTrigger className="w-full border-border focus:ring-primary h-11 rounded-lg bg-input text-foreground">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border bg-popover text-popover-foreground">
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
              <SelectTrigger className="w-full border-border focus:ring-primary h-11 rounded-lg bg-input text-foreground">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-border bg-popover text-popover-foreground">
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
                <h4 className="text-xl font-bold text-foreground mb-1 font-montserrat">{viaje.title}</h4>
                <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider font-open-sans">{viaje.destination}</p>
                <p className="text-muted-foreground mb-4 text-sm font-open-sans">{viaje.description?.substring(0, 90)}...</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-border/70">
                  <p className={`text-2xl font-extrabold text-primary font-montserrat`}>{viaje.price} €</p>
                  <Button
                    variant="default"
                    className="font-medium px-5 py-3 rounded-full shadow-md transition duration-300 hover:shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
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

      {/* Modal / Dialog Section (se mantiene igual) */}
      <Dialog open={!!detalle} onOpenChange={(open) => !open && cerrarModal()}>
        <DialogContent className="max-w-lg rounded-xl bg-card border-border text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-foreground font-montserrat">
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
              <p className="mb-4 text-lg text-foreground font-open-sans">{detalle.description}</p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-lg border-t border-border/70 pt-4">
                  <p className="font-semibold text-primary font-montserrat">Precio: {detalle.price} €</p>
                  {detalle.destination && <p className="text-muted-foreground font-open-sans">Destino: {detalle.destination}</p>}
                  {detalle.duration && <p className="text-muted-foreground font-open-sans">Duración: {detalle.duration}</p>}
                  {detalle.tipo && <p className="text-muted-foreground font-open-sans">Tipo: {detalle.tipo}</p>}
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