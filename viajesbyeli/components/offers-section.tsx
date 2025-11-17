"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Loader2 } from "lucide-react";
import Link from 'next/link';

interface Offer {
  id: number;
  title: string;
  destination: string;
  price: number;
  description: string;
  imageUrl: string;
  duration: string;
  tipo: string;
}

export function OffersSection() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const res = await fetch("/ofertas.json");
        if (!res.ok) throw new Error("No se pudo cargar el archivo JSON");
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las ofertas. Verifica el archivo JSON.");
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-xl text-foreground">Cargando las mejores ofertas...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 text-center">
        <p className="text-xl text-destructive font-bold">{error}</p>
      </section>
    );
  }

  if (offers.length === 0) {
    return (
      <section className="py-20 px-6 text-center">
        <p className="text-xl text-muted-foreground">No hay ofertas disponibles.</p>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Ofertas Destacadas</h2>
          <p className="text-xl text-muted-foreground">
            Las mejores promociones para tu próxima aventura
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <Link href={`/ofertas/${offer.id}`} key={offer.id} passHref>
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-card text-card-foreground h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={offer.imageUrl || "/placeholder.svg"}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                    <p 
                                                className="text-muted-foreground leading-relaxed whitespace-pre-line"
                                                dangerouslySetInnerHTML={{ __html: offer.description.substring(0,70) }}
                    />
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{offer.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                        <div>
                            <p className="text-sm text-muted-foreground">Desde</p>
                            <p className="text-2xl font-bold text-cyan-500">
                                €{offer.price.toFixed(0)}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground  sm:inline">
                                {offer.destination}
                            </span>
                            
                            {/* 🛑 CORRECCIÓN: Quitamos el <a> alrededor del MapPin 🛑 */}
                            {/* El Link principal ya hace la tarjeta cliqueable */}
                            <MapPin 
                                className="w-5 h-5 text-rose-400 cursor-pointer transition-opacity hover:opacity-80" 
                                
                                // Opcional: Podrías añadir un onClick aquí si necesitas funcionalidad extra
                                // onClick={(e) => { e.stopPropagation(); window.open(`URL_MAPS...`, '_blank'); }}
                            />
                            
                        </div>
                    </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
