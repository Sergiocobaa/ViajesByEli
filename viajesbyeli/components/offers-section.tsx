"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Loader2 } from "lucide-react";
import { getOffers } from '@/components/services/api'; // Corregimos la ruta de importación de la API
import Link from 'next/link'; // <--- 🛑 NUEVA IMPORTACIÓN 🛑

// 1. Definimos el tipo de datos que esperamos de la API
interface ApiOffer {
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
    const [offers, setOffers] = useState<ApiOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Lógica para cargar las ofertas al inicio
    useEffect(() => {
        const loadOffers = async () => {
            try {
                setLoading(true);
                const data = await getOffers(); 
                
                const mappedData = data.map((offer: any) => ({
                    ...offer,
                    discount: "25% OFF", 
                    price: `€${offer.price.toFixed(0)}`, 
                    people: "2 personas", 
                }));

                setOffers(mappedData);
                setError(null);

            } catch (err) {
                console.error("Error fetching offers:", err);
                setError("No se pudieron cargar las ofertas. Por favor, verifica el servidor.");
            } finally {
                setLoading(false);
            }
        };

        loadOffers();
    }, []);

    // --- Renderizado Condicional ---

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
                <p className="text-xl text-muted-foreground">No hay ofertas disponibles en este momento.</p>
            </section>
        );
    }


    // --- Renderizado de Ofertas ---
    return (
        <section className="py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl md::text-5xl font-bold mb-4 text-balance">Ofertas Destacadas</h2>
                    <p className="text-xl text-muted-foreground text-pretty">Las mejores promociones para tu próxima aventura</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {offers.map((offer) => (
                        // 🛑 ENVOLVEMOS CADA TARJETA CON EL LINK 🛑
                        <Link href={`/ofertas/${offer.id}`} key={offer.id} passHref>
                            <Card
                                // Eliminamos la key de la Card ya que la tiene el Link
                                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-card text-card-foreground h-full"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={offer.imageUrl || "/placeholder.svg"} 
                                        alt={offer.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    
                                </div>

                                <CardContent className="p-6 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                                                <p className="text-sm text-muted-foreground">{offer.description.substring(0, 70)}...</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{offer.duration}</span>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Desde</p>
                                            <p className="text-2xl font-bold" style={{ color: "rgb(47, 174, 183)" }}>
                                                {offer.price} 
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* 1. Nombre del Destino */}
                                            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                                                {offer.destination}
                                            </span>
                                            
                                            {/* 2. Botón del Mapa (Usamos <a> para el enlace) */}
                                            <a 
                                                href={`https://maps.google.com/?q=${encodeURIComponent(offer.destination)}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                title={`Ver ${offer.destination} en Google Maps`}
                                                className="transition-opacity hover:opacity-80"
                                            >
                                                <MapPin className="w-5 h-5" style={{ color: "rgb(249, 134, 109)" }} />
                                            </a>
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