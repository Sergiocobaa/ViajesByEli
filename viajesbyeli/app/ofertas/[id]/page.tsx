// src/app/ofertas/[id]/page.tsx

"use client"; // <--- Convertimos a Client Component

import React, { useEffect, useState } from 'react'; // Necesitamos React aquí
import Link from "next/link";
import { notFound, useParams } from "next/navigation"; // useParams solo funciona en Client Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, Check, X, ArrowLeft, DollarSign, Clock, Loader2 } from "lucide-react";
import { Footer } from "@/components/footer"; // Asumiendo que existe
import Image from 'next/image'; // Usaremos Next/Image
import { ImageGallery } from "@/components/image-gallery"
// Define el tipo de la Oferta (Asegúrate que coincida con tu JSON)
interface Offer {
    id: number;
    title: string;
    destination: string;
    price: number;
    description: string;
    imageUrl: string;
    duration: string;
    tipo: string;
    images : string[];
    discount?: string;
    longDescription?: string;
    highlights?: string[];
    includes?: string[];
    notIncludes?: string[];
    originalPrice?: string;
    people?: string;
    country?: string;
}

export default function OfferDetailPage() {
    const params = useParams(); // Usamos el hook de cliente
    const offerId = params.id as string;
    const [offer, setOffer] = useState<Offer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Usamos useEffect y fetch para leer el JSON
    useEffect(() => {
        if (!offerId) return;

        const loadOffer = async () => {
            try {
                setLoading(true);
                // Leemos el JSON desde public/ usando fetch
                const res = await fetch("/ofertas.json");
                if (!res.ok) throw new Error("No se pudo cargar el archivo JSON de ofertas");

                const offers = await res.json();

                // Buscamos la oferta
                const offerIdNum = parseInt(offerId, 10);
                const foundOffer = offers.find((o: Offer) => o.id === offerIdNum);

                if (!foundOffer || isNaN(offerIdNum)) {
                    setError("Oferta no encontrada.");
                    // En Client Components, notFound() puede no funcionar como esperado, manejamos con estado
                } else {
                    setOffer(foundOffer);
                    setError(null);
                }
            } catch (err) {
                console.error("Error al cargar la oferta:", err);
                setError("No se pudo cargar la oferta. Es posible que no exista o el archivo JSON sea inválido.");
            } finally {
                setLoading(false);
            }
        };

        loadOffer();
    }, [offerId]); // Se ejecuta cuando el ID cambia

    // --- Renderizado Condicional ---
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-32 text-center text-xl">
                 <Loader2 className="w-8 h-8 animate-spin mr-3 text-primary" /> Cargando detalles...
            </div>
        );
    }

    // Si hay error o no se encontró la oferta
    if (error || !offer) {
        return (
             <div className="min-h-screen flex flex-col items-center justify-center pt-32 text-center text-xl text-destructive">
                <p>{error || "Oferta no encontrada."}</p>
                 <Link href="/" className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg">
                    <ArrowLeft className="w-5 h-5" /> Volver a Inicio
                 </Link>
             </div>
        );
    }

    // Función para el enlace de WhatsApp
    const generateWhatsappLink = (title: string): string => {
        const phone = "34649613702"; // Reemplaza con tu número si es necesario
        const message = `Buenas! Estaría interesado en la oferta de ${title}.`;
        const encodedMessage = encodeURIComponent(message);
        return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    };

    return (
        // Añadimos padding superior aquí para compensar la navbar global
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Volver</span>
                </Link>
                <Link href="/">
                    <img src="/logo.png" alt="Viajes by Eli" className="h-10 w-auto" />
                </Link>
                
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px]">
                <Image
                    src={offer.imageUrl || "/placeholder.svg"}
                    alt={offer.title || 'Imagen de oferta'}
                    layout="fill"
                    objectFit="cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                    <div className="max-w-7xl mx-auto">
                        {offer.discount && (
                            <Badge
                                className="mb-4 text-white font-bold px-4 py-2 text-lg bg-destructive"
                            >
                                {offer.discount}
                            </Badge>
                        )}
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
                            {offer.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-pretty">{offer.destination}</p>
                    </div>
                </div>
                 
            </section>

            {/* Main Content */}
            <main className="flex-1 py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Details */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Descripción Larga o Corta si no existe la larga */}
                            {(offer.longDescription || offer.description) && (
                                <Card className="bg-card border-border">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold">Descripción</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                            {offer.longDescription || offer.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Lo más destacado */}
                            {offer.highlights && offer.highlights.length > 0 && (
                                <Card className="bg-card border-border">
                                    <CardHeader>
                                       <CardTitle className="text-2xl font-bold">Lo más destacado</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {offer.highlights.map((highlight: string, index: number) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                                                    <span className="text-muted-foreground">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}

                           {/* Incluye / No incluye */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {offer.includes && (
                                    <Card className="bg-card border-border">
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                <Check className="w-5 h-5 text-green-500" /> Incluye
                                            </h3>
                                            <ul className="space-y-2">
                                                {offer.includes.map((item: string, index: number) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm">
                                                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                                                        <span className="text-muted-foreground">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                )}
                                {offer.notIncludes && (
                                     <Card className="bg-card border-border">
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                <X className="w-5 h-5 text-destructive" /> No incluye
                                            </h3>
                                            <ul className="space-y-2">
                                                {offer.notIncludes.map((item: string, index: number) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm">
                                                        <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-destructive" />
                                                        <span className="text-muted-foreground">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <Card className="sticky top-24 shadow-xl bg-card border-border">
                                <CardContent className="p-6 space-y-6">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Precio por persona</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-sm text-muted-foreground self-end mb-1">
                                                Desde
                                            </span>
                                            
                                            <span className="text-4xl font-bold text-primary">
                                                €{offer.price.toFixed(0)}
                                            </span>
                                            
                                            {offer.originalPrice && (
                                                <span className="text-lg text-muted-foreground line-through self-end mb-1">
                                                {offer.originalPrice}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3 py-4 border-y border-border">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Duración</p>
                                                <p className="font-medium">{offer.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Personas</p>
                                                <p className="font-medium">{offer.people || 'No especificado'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Destino</p>
                                                <p className="font-medium">{offer.destination}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <a
                                          href={generateWhatsappLink(offer.title)}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-full text-white font-semibold bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center gap-2 h-12 text-base transition"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp"><path d="M10 13a4 4 0 0 0 4 4l2-2h4V8H6z"/><path d="M15 17l-2 2-4-4V6h4l2-2 4 4v4l-2 2h-4z"/></svg>
                                            Contactar por WhatsApp
                                        </a>
                                        
                                    </div>

                                    
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}