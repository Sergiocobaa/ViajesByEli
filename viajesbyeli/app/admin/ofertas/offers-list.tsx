// // src/app/admin/offers-list.tsx
// "use client";

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Trash2, Loader2, RefreshCw, AlertTriangle } from "lucide-react";
// import { Button } from "@/components/ui/button"; // Necesitas este botón para la eliminación

// // Asegúrate de que esta ruta sea correcta:
// import { getOffers, deleteOffer } from '@/components/services/api'; 
// import { useAuth } from '@/context/auth-context'; 

// // 1. Definimos el tipo de datos que esperamos de la API
// interface ApiOffer {
//     id: number;
//     title: string;
//     destination: string;
//     price: number; 
//     description: string;
//     imageUrl: string;
//     duration: string;
//     tipo: string;
// }

// export function AdminOffersList() {
//     const { token } = useAuth(); // Obtenemos el token del contexto
//     const [offers, setOffers] = useState<ApiOffer[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Función para cargar los datos (la usaremos también para refrescar)
//     const loadOffers = async () => {
//         try {
//             setLoading(true);
//             const data = await getOffers(); 
            
//             // Mapeamos los datos y añadimos los campos necesarios para el renderizado
//             const mappedData = data.map((offer: any) => ({
//                 ...offer,
//                 discount: "25% OFF", 
//                 price: `€${offer.price.toFixed(0)}`, 
//                 people: "2 personas", 
//             }));

//             setOffers(mappedData);
//             setError(null);

//         } catch (err) {
//             console.error("Error fetching offers:", err);
//             setError("No se pudieron cargar las ofertas. Verifica el servidor.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadOffers();
//     }, []);

//     // 2. FUNCIÓN DE ELIMINACIÓN
//     const handleDelete = async (offerId: number) => {
//         if (!confirm(`¿Estás seguro de que quieres eliminar la oferta ID ${offerId}?`)) {
//             return;
//         }

//         try {
//             setLoading(true);
//             await deleteOffer(offerId, token); // Llama a la API con el ID y el token
            
//             // Si la eliminación es exitosa, actualiza la lista en el frontend
//             setOffers(prevOffers => prevOffers.filter(offer => offer.id !== offerId));
//             setLoading(false);

//         } catch (err) {
//             console.error("Error al eliminar la oferta:", err);
//             setLoading(false);
//             setError("Fallo al eliminar. ¿El token es válido?");
//         }
//     };
    
//     // --- Renderizado Condicional de Estado ---
//     if (loading) {
//         return (
//             <section className="py-20 px-6 text-center">
//                 <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
//                 <p className="text-xl text-foreground">Cargando catálogo de ofertas...</p>
//             </section>
//         );
//     }
//     if (error) {
//         return (
//             <section className="py-20 px-6 text-center text-destructive">
//                 <p className="text-xl font-bold mb-4">{error}</p>
//                 <Button onClick={loadOffers} variant="outline" className="gap-2">
//                     <RefreshCw className="w-4 h-4" /> Reintentar Carga
//                 </Button>
//             </section>
//         );
//     }
    
//     // --- Renderizado Principal (Similar a OffersSection) ---
//     return (
//         <section className="py-10 px-6">
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex justify-between items-center mb-10 border-b border-border pb-4">
//                     <h2 className="text-3xl font-bold text-white" >Catálogo Actual ({offers.length} ofertas)</h2>
//                     <Button onClick={loadOffers} variant="outline" className="gap-2">
//                         <RefreshCw className="w-4 h-4" /> Recargar
//                     </Button>
//                 </div>

//                 {offers.length === 0 && (
//                      <div className="text-center py-16 text-muted-foreground">
//                         <AlertTriangle className="w-8 h-8 mx-auto mb-4" />
//                         <p className="text-xl">No hay ofertas cargadas en el sistema.</p>
//                      </div>
//                 )}

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {offers.map((offer) => (
//                         <Card
//                             key={offer.id}
//                             className="group overflow-hidden shadow-xl bg-card text-card-foreground border-destructive/20"
//                         >
//                             <div className="relative h-56 overflow-hidden">
//                                 <img
//                                     src={offer.imageUrl || "/placeholder.svg"} 
//                                     alt={offer.title}
//                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                                 />
    
                                
//                                 {/* 3. BOTÓN DE ELIMINAR */}
//                                 <Button
//                                     variant="destructive"
//                                     size="icon"
//                                     className="absolute top-4 left-4 rounded-full z-10"
//                                     onClick={() => handleDelete(offer.id)}
//                                     disabled={loading}
//                                 >
//                                     <Trash2 className="w-5 h-5" />
//                                 </Button>
//                             </div>

//                             <CardContent className="p-6">
//                                 <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
//                                 <p className="text-sm text-muted-foreground">{offer.description.substring(0, 70)}...</p>
//                                 <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
//                                     <p className="text-2xl font-bold text-primary">{offer.price}</p>
//                                     <Badge variant="secondary">{offer.tipo}</Badge>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }