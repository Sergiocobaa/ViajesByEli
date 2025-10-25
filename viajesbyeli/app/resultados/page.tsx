"use client"; // Necesario por useSearchParams y useState/useEffect

import React, { Suspense, useEffect, useState } from "react"; // Importamos React
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Calendar, ArrowLeft, Loader2 } from "lucide-react"; // Añadimos Loader2
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {Footer} from "@/components/footer"; // Asumiendo que existe

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
  // Añade campos opcionales si tu JSX los usa y no están en el JSON
  // rating?: number;
  // reviews?: number;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || ""; // 'q' es el parámetro de búsqueda en la URL
  const [searchTerm, setSearchTerm] = useState(query);
  const [allOffers, setAllOffers] = useState<Offer[]>([]); // Estado para todas las ofertas
  const [filteredResults, setFilteredResults] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Cargar las ofertas desde el JSON al inicio
  useEffect(() => {
    const loadOffers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/ofertas.json");
        if (!res.ok) throw new Error("No se pudo cargar el archivo JSON");
        const data = await res.json();
        setAllOffers(data); // Guardamos todas las ofertas
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las ofertas.");
        setLoading(false);
      }
    };
    loadOffers();
  }, []); // Se ejecuta solo una vez al montar

  // 3. Filtrar las ofertas cuando cambie la query de la URL o todas las ofertas se carguen
  useEffect(() => {
    if (allOffers.length > 0) {
      if (query) {
        const results = allOffers.filter(
          (offer) =>
            // 🛑 AJUSTAMOS LOS CAMPOS DE BÚSQUEDA A TU JSON 🛑
            offer.title.toLowerCase().includes(query.toLowerCase()) ||
            offer.destination.toLowerCase().includes(query.toLowerCase()) ||
            offer.description.toLowerCase().includes(query.toLowerCase()) ||
            offer.tipo.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredResults(results);
      } else {
        // Si no hay query, mostramos todas
        setFilteredResults(allOffers); 
      }
    }
  }, [query, allOffers]); // Se ejecuta cuando 'query' o 'allOffers' cambian

  // 4. Manejar la búsqueda manual desde el input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtramos manualmente basado en el 'searchTerm' actual
    const results = allOffers.filter(
      (offer) =>
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results);
    // Opcional: Actualizar la URL con el nuevo término (requiere useRouter)
    // router.push(`/resultados?q=${searchTerm}`);
  };

  // --- Renderizado Condicional de Carga/Error ---
  if (loading) {
     return ( // Usamos el mismo loader que definiste en el Suspense
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Buscando destinos...</p>
            </div>
        </div>
     );
  }

  if (error) {
     return <div className="min-h-screen text-center pt-20 text-destructive">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header con buscador */}
      <header className="bg-card border-b sticky top-0 z-50 shadow-sm text-card-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/">
              <Image src="/logo.png" alt="Viajes by Eli" width={100} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Busca por título, destino, descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base bg-input"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-6" style={{ backgroundColor: "rgb(47, 174, 183)" }}>
              Buscar
            </Button>
          </form>
        </div>
      </header>

      {/* Resultados */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-foreground">{query ? `Resultados para "${query}"` : "Todas las Ofertas"}</h1>
          <p className="text-muted-foreground">
            {filteredResults.length} {filteredResults.length === 1 ? "oferta encontrada" : "ofertas encontradas"}
          </p>
        </div>

        {filteredResults.length === 0 ? (
          <Card className="p-12 text-center bg-card border-border">
            <div className="flex flex-col items-center gap-4">
              <Search className="w-16 h-16 text-muted-foreground" />
              <h2 className="text-2xl font-semibold text-foreground">No se encontraron resultados</h2>
              <p className="text-muted-foreground max-w-md">
                No encontramos ofertas que coincidan con tu búsqueda. Intenta con otros términos.
              </p>
              <Link href="/">
                <Button style={{ backgroundColor: "rgb(47, 174, 183)" }}>Volver al inicio</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((offer) => ( // Usamos 'offer' en lugar de 'destination'
              <Link key={offer.id} href={`/ofertas/${offer.id}`} passHref>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full bg-card text-card-foreground border-border">
                  <div className="relative h-64">
                    <Image
                      src={offer.imageUrl || "/placeholder.svg"} // Campo imageUrl de tu JSON
                      alt={offer.title} // Campo title de tu JSON
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <Badge
                      className="absolute top-4 right-4 text-white border-0"
                      style={{ backgroundColor: "rgb(249, 134, 109)" }}
                    >
                      {offer.tipo} {/* Campo tipo de tu JSON */}
                    </Badge>
                  </div>
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                     <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{offer.destination}</span> {/* Campo destination de tu JSON */}
                            </div>
                          </div>
                          {/* Eliminamos Rating y Reviews ya que no están en tu JSON */}
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{offer.description}</p>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Calendar className="w-4 h-4" />
                          <span>{offer.duration}</span> {/* Campo duration de tu JSON */}
                        </div>
                     </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                      <div>
                        <p className="text-sm text-muted-foreground">Desde</p>
                        <p className="text-2xl font-bold" style={{ color: "rgb(47, 174, 183)" }}>
                          €{offer.price.toFixed(0)} {/* Campo price de tu JSON */}
                        </p>
                      </div>
                      <Button variant="link" className="p-0 h-auto text-primary">Ver detalles</Button> {/* Botón simple */}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Envolvemos ResultsContent en Suspense para manejar la carga inicial de useSearchParams
export default function ResultadosPage() {
  return (
    <Suspense
      fallback={ // Mantenemos tu fallback de carga
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
             <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Buscando destinos...</p>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}