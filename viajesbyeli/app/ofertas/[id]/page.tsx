// 🛑 NO USAR "use client" aquí. Esta página es ahora un Server Component.

import Link from "next/link";
import { notFound } from "next/navigation";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, Check, X, ArrowLeft, DollarSign, Clock } from "lucide-react";
import { Footer } from "@/components/footer"; // Asumiendo que existe

// 1. Importaciones para leer archivos en el servidor
import fs from 'fs/promises';
import path from 'path';

// 2. Definición del Tipo (Interface)
// Asegúrate de que esto coincida 100% con la estructura de tu ofertas.json
interface Offer {
    id: number;
    title: string;
    destination: string;
    price: number;
    description: string;
    imageUrl: string;
    duration: string;
    tipo: string;
    discount?: string;
    longDescription?: string;
    highlights?: string[];
    includes?: string[];
    notIncludes?: string[];
    originalPrice?: string;
    people?: string;
    country?: string;
}

// 3. Función Helper para obtener los datos de UNA oferta
// Esta función se ejecuta solo en el servidor.
async function getOfferData(id: string): Promise<Offer | undefined> {
    const filePath = path.join(process.cwd(), 'public', 'ofertas.json');
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const offers: Offer[] = JSON.parse(fileContent);
        
        const offerIdNum = parseInt(id, 10);
        if (isNaN(offerIdNum)) return undefined;

        return offers.find((o) => o.id === offerIdNum);

    } catch (error) {
        console.error("Error al leer ofertas.json para Metadata:", error);
        return undefined;
    }
}

// 4. 🛑 GENERADOR DE METADATOS DINÁMICOS 🛑
// Esta es la función clave para el SEO.
// Se ejecuta en el servidor antes de renderizar la página.
export async function generateMetadata({ params }: { params: { id: string } }) {
    const offer = await getOfferData(params.id);

    if (!offer) {
        return {
            title: "Oferta no encontrada",
            description: "La oferta que buscas ya no está disponible.",
        };
    }

    // Genera un título y descripción únicos para Google
    return {
        title: `${offer.title} | Viajes by Eli`,
        description: `${offer.description.substring(0, 155)}...`, // Límite de 155-160 chars
        // Opcional: Open Graph para redes sociales
        openGraph: {
            title: offer.title,
            description: offer.description,
            images: [
                {
                    url: offer.imageUrl.startsWith('/') ? `https://www.viajesbyeli.es${offer.imageUrl}` : offer.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: offer.title,
                },
            ],
        },
    };
}


// 5. El Componente de la Página (Ahora es un Server Component)
export default async function OfferDetailPage({ params }: { params: { id: string } }) {
    
    // Obtenemos los datos de la oferta en el servidor
    const offer = await getOfferData(params.id);

    // Si no se encuentra, mostramos la página 404 de Next.js
    if (!offer) {
        notFound();
    }
    
    // Función para el enlace de WhatsApp (no necesita "use client")
    const generateWhatsappLink = (title: string): string => {
        const phone = "34649613702";
        const message = `Buenas! Estaría interesado en la oferta de ${title}.`;
        const encodedMessage = encodeURIComponent(message);
        return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    };

    return (
        <div className="min-h-screen flex flex-col pt-24 bg-background text-foreground"> 
            
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px]">
                <Image
                    src={offer.imageUrl || "/placeholder.svg"}
                    alt={offer.title}
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
                 <Link href="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-card/80 backdrop-blur-sm text-card-foreground hover:bg-card px-4 py-2 rounded-full shadow-lg transition">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Volver a Ofertas</span>
                 </Link>
            </section>

            {/* Main Content */}
            <main className="flex-1 py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Details */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Descripción Larga */}
                            {(offer.longDescription || offer.description) && (
                                <Card className="bg-card border-border">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold">Descripción Detallada</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {/* Usamos 'whitespace-pre-line' para respetar los \n del JSON */}
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

                        {/* Right Column - Booking Card */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24 shadow-xl bg-card border-border">
                                <CardContent className="p-6 space-y-6">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Precio por persona</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-bold text-primary">
                                                €{offer.price.toFixed(0)}
                                            </span>
                                            {offer.originalPrice && (
                                                <span className="text-lg text-muted-foreground line-through">
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
                                                <p className="font-medium">{offer.people || '2 personas (estándar)'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Destino</Capa>
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
                                        <Button variant="outline" className="w-full bg-transparent" size="lg">
                                            Consultar disponibilidad
                                        </Button>
                                    </div>
                                    <p className="text-xs text-center text-muted-foreground">
                                        Reserva sin compromiso.
                                    </p>
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