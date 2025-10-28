"use client"; // <--- 🛑 Convertimos a Client Component

import React, { useState, useEffect } from 'react'; // <--- Importamos React Hooks
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Loader2 } from "lucide-react"; // Añadimos Loader2
import Link from "next/link";
import Image from 'next/image'; // Usaremos Next/Image

// 1. Definimos el tipo de Oferta (Debe coincidir con tu ofertas.json)
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

export default function Destinos() {
    // 2. Estados para cargar datos, loading y error
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 3. useEffect para cargar el JSON
    useEffect(() => {
        const loadOffers = async () => {
            try {
                setLoading(true);
                const res = await fetch("/ofertas.json");
                if (!res.ok) throw new Error("No se pudo cargar el archivo JSON de ofertas");
                const data = await res.json();
                setOffers(data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Error al cargar las ofertas.");
            } finally {
                setLoading(false);
            }
        };

        loadOffers();
    }, []); // Se ejecuta solo una vez

    // --- Renderizado Condicional de Carga/Error ---
    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Cargando destinos...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return <main className="min-h-screen text-center pt-20 text-destructive">{error}</main>;
    }

    // --- Renderizado Principal ---
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero Section with Navbar */}
            <section className="relative min-h-[50vh] flex flex-col">
                {/* Fondo (Asegúrate que la imagen exista en /public) */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/fondo.jpg" // Asegúrate que esta imagen exista
                        alt="Fondo Destinos"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
                </div>

                <Navbar />

                <div className="relative z-10 flex-1 flex items-center justify-center px-6">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Nuestros Destinos</h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Explora los lugares más increíbles del mundo
                        </p>
                    </div>
                </div>
            </section>

            {/* Destinos Grid */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* 4. Mapeamos las 'offers' cargadas */}
                    {offers.map((offer) => (
                        <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-shadow group bg-card border-border">
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={offer.imageUrl || "/placeholder.svg"} // Campo imageUrl de tu JSON
                                    alt={offer.title} // Campo title de tu JSON
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                                    {offer.tipo} {/* Campo tipo de tu JSON */}
                                </Badge>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-2xl font-bold text-foreground mb-2">{offer.title}</h3>
                                <p className="text-muted-foreground mb-4 line-clamp-2">{offer.description}</p>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>{offer.duration}</span> {/* Campo duration */}
                                    </div>
                                    {/* Eliminamos "personas" ya que no está en tu JSON */}
                                </div>

                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Desde</p>
                                        <p className="text-2xl font-bold text-primary">€{offer.price.toFixed(0)}</p> {/* Campo price */}
                                    </div>
                                    <Link href={`/ofertas/${offer.id}`} passHref>
                                        <Button className="bg-primary hover:bg-primary/90">Ver Detalles</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    )
}