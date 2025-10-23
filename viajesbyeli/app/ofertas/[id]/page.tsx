// src/app/ofertas/[id]/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { getOfferById, Offer } from '@/components/services/api'; // Necesitarás crear getOfferById
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import { AuthNavButtons } from "@/components/auth-nav-buttons"
import Link from "next/link"
export default function OfferDetailPage() {
    const params = useParams();
    const offerId = params.id as string; 
    const [offer, setOffer] = useState<Offer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!offerId) return;

        const loadOffer = async () => {
            try {
                const id = parseInt(offerId, 10); 
                if (isNaN(id)) {
                    setError("ID de oferta inválido.");
                    setLoading(false);
                    return;
                }
                
                const data = await getOfferById(id); 
                setOffer(data);
            } catch (err) {
                console.error("Error al cargar la oferta:", err);
                setError("No se pudo cargar la oferta. Es posible que no exista.");
            } finally {
                setLoading(false);
            }
        };

        loadOffer();
    }, [offerId]);

    if (loading) {
        return <div className="min-h-screen pt-32 text-center text-xl">Cargando detalles de la oferta...</div>;
    }

    if (error) {
        return <div className="min-h-screen pt-32 text-center text-red-500 text-xl">{error}</div>;
    }

    if (!offer) {
        return <div className="min-h-screen pt-32 text-center text-xl">Oferta no encontrada.</div>;
    }
    const generateWhatsappLink = (title: string): string => {
        const phone = "34649613702";
        const message = `Buenas! Estaría interesado en la oferta de ${title}.`;
        
        const encodedMessage = encodeURIComponent(message);
        
        return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    };

    return (
        
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-10">
            <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
                <Link href="/">
                    <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <img src="/logo.png" alt="Viajes by Eli" className="h-14 w-auto object-contain" />
                    </div>
                </Link>
                <AuthNavButtons />
            </nav>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="shadow-2xl overflow-hidden dark:bg-gray-800 border-0">
                    <div className="relative h-64 w-full">
                        <Image
                            src={offer.imageUrl}
                            alt={offer.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                            priority
                        />
                    </div>
                    
                    <CardHeader className="bg-primary-foreground/10 p-6">
                        <CardTitle className="text-4xl font-extrabold text-primary dark:text-white mb-2">
                            {offer.title}
                        </CardTitle>
                        <p className="text-xl text-muted-foreground">{offer.description}</p>
                    </CardHeader>
                    
                    <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <DollarSign className="w-6 h-6 text-green-500" />
                                <span className="text-2xl font-bold">{offer.price}€</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-6 h-6 text-red-500" />
                                <span className="text-lg">{offer.destination}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-6 h-6 text-blue-500" />
                                <span className="text-lg">{offer.duration}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-3 border-b pb-2">Descripción del Viaje</h3>
                            <p className="text-lg whitespace-pre-line text-foreground/80">
                                {offer.description}
                            </p>
                        </div>

                        <div className="pt-4 flex justify-center">
                            <a 
                                href={generateWhatsappLink(offer.title)} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-green-600 text-white hover:bg-green-700 font-bold py-3 px-8 rounded-lg transition duration-200 text-xl shadow-lg flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp"><path d="M10 13a4 4 0 0 0 4 4l2-2h4V8H6z"/><path d="M15 17l-2 2-4-4V6h4l2-2 4 4v4l-2 2h-4z"/></svg>
                                Contactar por WhatsApp
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}