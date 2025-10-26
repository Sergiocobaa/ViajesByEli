import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // Importamos CardContent si se usa
import { ArrowLeft } from "lucide-react";
import {Footer} from "@/components/footer"; // Asumiendo que existe y la ruta es correcta

// Definimos la fecha de actualización
const LAST_UPDATED_DATE = "26/10/2025"; // O usa new Date().toLocaleDateString("es-ES")

export default function AvisoLegalPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-foreground">
            {/* Header */}
            <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/">
                        <Button variant="ghost" className="gap-2 text-foreground hover:bg-muted">
                            <ArrowLeft className="h-4 w-4" />
                            Volver al inicio
                        </Button>
                    </Link>
                    <Link href="/">
                       <img src="/logo.png" alt="Viajes by Eli" className="h-10 w-auto" />
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <Card className="rounded-2xl shadow-lg p-8 md:p-12 border-border bg-card">
                    <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-rose-400 bg-clip-text text-transparent">
                        AVISO LEGAL Y CONDICIONES DE USO - VIAJESBYELI.ES
                    </h1>

                    <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-foreground/90">
                        
                        {/* -- Sección 1: Datos del Titular -- */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Datos Identificativos del Titular</h2>
                            <p className="leading-relaxed mb-4">En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), a continuación se reflejan los siguientes datos:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>**Titular:** Elisabet Arquillo Treviño</li>
                                <li>**Correo Electrónico:** eliarquillo@hotmail.com</li>
                                <li>**Teléfono:** 649613702</li>
                                <li>**Actividad Principal:** Información y promoción de ofertas de viajes.</li>
                            </ul>
                        </section>

                        {/* -- Sección 2: Objeto del Sitio Web -- */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Objeto del Sitio Web</h2>
                            <p className="leading-relaxed">El sitio web **www.viajesbyeli.es** (en adelante, el "Sitio Web") tiene como finalidad principal la exposición de ofertas y promociones de viajes, facilitando información orientativa sobre destinos, precios y condiciones, y proporcionando un medio de contacto (ej. WhatsApp) para que los usuarios puedan solicitar más detalles o iniciar consultas sobre las ofertas presentadas.</p>
                        </section>

                        {/* -- Sección 3: Condiciones de Uso -- */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Acceso y Uso del Sitio Web</h2>
                            <p className="leading-relaxed">El acceso y/o uso de este Sitio Web atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las presentes Condiciones Generales de Uso. El Usuario se compromete a utilizar el Sitio Web y sus contenidos de conformidad con la Ley, la moral, el orden público y las presentes condiciones.</p>
                            <p className="leading-relaxed mt-2">Queda expresamente prohibido el uso del Sitio Web con fines ilícitos, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización del Sitio Web.</p>
                        </section>

                        {/* -- Sección 4: Contenido y Ofertas -- */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Contenido, Ofertas y Exactitud de la Información</h2>
                            <p className="leading-relaxed">La información relativa a las ofertas de viajes (descripciones, precios, disponibilidad, imágenes) mostrada en el Sitio Web tiene carácter meramente orientativo y es proporcionada por el Titular basándose en la información disponible en el momento de su publicación o facilitada por terceros proveedores.</p>
                            <p className="leading-relaxed mt-2">El Titular procura que dicha información sea precisa y actualizada, pero no puede garantizar su total exactitud, exhaustividad o vigencia en todo momento. Los precios indicados pueden variar y están sujetos a disponibilidad y a las condiciones específicas de cada oferta o proveedor. La solicitud de información a través de los medios de contacto no constituye una reserva confirmada.</p>
                        </section>

                        {/* -- Sección 5: Propiedad Intelectual e Industrial -- */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Propiedad Intelectual e Industrial</h2>
                            <p className="leading-relaxed">Todos los derechos de propiedad intelectual e industrial del Sitio Web y de sus contenidos (textos, imágenes, diseños, logos, software, código fuente) pertenecen al Titular o, en su caso, a terceros. Queda prohibida la reproducción, distribución, comunicación pública o transformación total o parcial de dichos contenidos sin la autorización expresa del Titular.</p>
                        </section>

                        {/* -- Sección 6: Exclusión de Garantías y Responsabilidad -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Exclusión de Garantías y Responsabilidad</h2>
                             <p className="leading-relaxed">El Titular no garantiza la disponibilidad ininterrumpida del Sitio Web y no se hace responsable de los posibles daños o perjuicios derivados de fallos técnicos, virus informáticos o interferencias externas.</p>
                             <p className="leading-relaxed mt-2">El Titular actúa con la máxima diligencia, pero no se responsabiliza de errores u omisiones en la información de las ofertas proporcionada por terceros. El Titular actúa como mero intermediario o plataforma informativa y no asume responsabilidad por la correcta ejecución de los servicios de viaje contratados con los proveedores finales. Cualquier incidencia o reclamación relativa al viaje deberá dirigirse directamente al proveedor del servicio.</p>
                             <p className="leading-relaxed mt-2">El Sitio Web puede contener enlaces a sitios externos. El Titular no ejerce control sobre dichos sitios y no asume responsabilidad alguna por sus contenidos o prácticas de privacidad.</p>
                        </section>

                        {/* -- Sección 7: Protección de Datos -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Protección de Datos Personales</h2>
                             <p className="leading-relaxed">El tratamiento de los datos personales recabados a través de este Sitio Web se rige por lo establecido en nuestra <Link href="/politica-de-privacidad" className="text-primary hover:underline">Política de Privacidad</Link>.</p>
                        </section>
                        
                        {/* -- Sección 8: Modificaciones -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Modificaciones de las Condiciones</h2>
                             <p className="leading-relaxed">El Titular se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su Sitio Web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados.</p>
                        </section>

                        {/* -- Sección 9: Legislación Aplicable y Jurisdicción -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Legislación Aplicable y Jurisdicción</h2>
                             <p className="leading-relaxed">La relación entre el Titular y el Usuario se regirá por la normativa española vigente. Para cualquier controversia que pudiera derivarse del acceso o uso del Sitio Web, ambas partes se someten a los Juzgados y Tribunales de la ciudad de Barcelona, con renuncia expresa a cualquier otro fuero.</p>
                        </section>

                        {/* -- Fecha de Actualización -- */}
                        <div className="mt-10 pt-6 border-t border-border">
                            <p className="text-sm text-muted-foreground">Última actualización: {LAST_UPDATED_DATE}</p>
                        </div>
                    </div>
                </Card>
            </main>

            <Footer />
        </div>
    );
}