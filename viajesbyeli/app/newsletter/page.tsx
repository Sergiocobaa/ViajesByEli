"use client"

import { NewsletterForm } from "@/components/newsletter-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NewsletterPage() {
    return (


        <main className="min-h-screen flex flex-col">
            <div style={{ backgroundColor: "#f37e61" }} className="bg-primary/5">
                <Navbar />
            </div>

            <div className="flex-1 flex items-center justify-center px-4 py-20">
                <div className="w-full max-w-2xl bg-card border rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                    {/* Image side */}
                    <div className="md:w-1/2 relative h-64 md:h-auto bg-muted">
                        <img
                            src="/fondo.jpg"
                            alt="Viajes"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "/fondo.jpg" // Fallback if specific image doesn't exist
                            }}
                        />
                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                    </div>



                    {/* Content side */}
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <h1 className="text-3xl font-bold mb-4 text-foreground">Únete al Club</h1>
                        <p className="text-muted-foreground mb-8">
                            Recibe ofertas exclusivas, guías de viaje secretas y descuentos solo para suscriptores.
                            ¡No enviamos spam, solo aventuras!
                        </p>

                        <NewsletterForm />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
