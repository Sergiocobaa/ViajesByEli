import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"; // Añadimos CardContent si se usa
import { ArrowLeft } from "lucide-react"
import {Footer} from "@/components/footer"
const LAST_UPDATED_DATE = "26/10/2025";
export default function PoliticaDePrivacidad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-foreground">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
                    <div className="container mx-auto px-4 py-4">
                    <Link href="/">
                        <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Volver al inicio
                        </Button>
                    </Link>
                    </div>
                </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Usamos Card para el contenedor principal */}
                <Card className="rounded-2xl shadow-lg p-8 md:p-12 border-border bg-card">
                    <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-rose-400 bg-clip-text text-transparent">
                        POLÍTICA DE PRIVACIDAD - VIAJESBYELI.ES
                    </h1>

                    {/* Usamos 'prose' de Tailwind para estilizar el texto legal */}
                    <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-foreground/90">
                        
                        {/* -- Sección 1: Responsable -- */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Responsable del Tratamiento de sus Datos</h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>**Identidad del Responsable:** Elisabet Arquillo Treviño</li>
                                {/* <li>**NIF:** [Añade el NIF de tu madre aquí]</li> */}
                                {/* <li>**Domicilio:** [Añade la dirección aquí]</li> */}
                                <li>**Correo Electrónico de Contacto:** eliarquillo@hotmail.com</li>
                                <li>**Teléfono:** 649613702</li>
                            </ul>
                        </section>

                        {/* -- Sección 2: Finalidades -- */}
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Finalidades del Tratamiento y Tipos de Datos Recabados</h2>
                            <p className="leading-relaxed mb-4">El Titular tratará los datos personales que usted nos facilite con las siguientes finalidades:</p>
                            <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                                <li>**Gestionar sus consultas y solicitudes de información:** Cuando nos contacta a través de los medios disponibles (WhatsApp, correo electrónico), tratamos sus datos (nombre, teléfono, email, consulta) para responderle. Base legal: su consentimiento y nuestro interés legítimo.</li>
                                <li>**Análisis y mejora del Sitio Web:** Usamos Vercel Analytics para recoger datos anónimos de navegación (páginas vistas, origen) y mejorar la web. Base legal: nuestro interés legítimo y/o su consentimiento (cookies). Los datos son técnicos (IP anonimizada, navegador, etc.).</li>
                                {/* <li>[Opcional] Envío de comunicaciones comerciales: Si nos da su consentimiento explícito, usaremos su email para enviarle ofertas. Podrá darse de baja en cualquier momento.</li> */}
                            </ul>
                            <p className="mt-2">No recopilamos categorías especiales de datos personales.</p>
                        </section>

                        {/* -- Sección 3: Legitimación -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Legitimación para el Tratamiento de sus Datos</h2>
                             <p className="leading-relaxed mb-4">La base legal para tratar sus datos depende de la finalidad:</p>
                             <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                 <li>Gestión de consultas: Su **consentimiento** al contactarnos y nuestro **interés legítimo**.</li>
                                 <li>Análisis web: Nuestro **interés legítimo** y/o su **consentimiento** (cookies).</li>
                                 {/* <li>Comunicaciones comerciales: Su **consentimiento** explícito.</li> */}
                             </ul>
                        </section>

                        {/* -- Sección 4: Destinatarios -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Destinatarios de los Datos</h2>
                             <p className="leading-relaxed mb-4">Sus datos personales **no serán cedidos a terceros**, salvo:</p>
                             <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                 <li>Por **obligación legal**.</li>
                                 <li>A **proveedores tecnológicos** (hosting Vercel, analítica Vercel Analytics) bajo contrato, garantizando la seguridad.</li>
                             </ul>
                             <p className="mt-2">No realizamos transferencias internacionales fuera del EEE sin garantías adecuadas.</p>
                        </section>

                        {/* -- Sección 5: Conservación -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Plazo de Conservación de los Datos</h2>
                             <p className="leading-relaxed mb-4">Guardaremos sus datos el tiempo necesario:</p>
                             <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                 <li>Datos de consultas: Hasta resolverla y durante los plazos legales.</li>
                                 {/* <li>Datos para comunicaciones: Hasta que revoque el consentimiento.</li> */}
                                 <li>Datos de analítica: Según la política del proveedor (Vercel).</li>
                             </ul>
                        </section>

                        {/* -- Sección 6: Derechos -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Sus Derechos en Materia de Protección de Datos</h2>
                             <p className="leading-relaxed mb-4">Usted tiene derecho a acceder, rectificar, suprimir, limitar, oponerse al tratamiento y solicitar la portabilidad de sus datos. Puede ejercerlos enviando un email a **eliarquillo@hotmail.com**, adjuntando copia de su DNI.</p>
                             <p>Si considera vulnerados sus derechos, puede reclamar ante la Agencia Española de Protección de Datos (AEPD): <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aepd.es</a>.</p>
                        </section>
                        
                        {/* -- Sección 7: Medidas de Seguridad -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Medidas de Seguridad</h2>
                             <p className="leading-relaxed">Adoptamos medidas técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, alteración o pérdida.</p>
                        </section>

                        {/* -- Sección 8: Cookies -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Uso de Cookies</h2>
                             <p className="leading-relaxed">Este sitio web utiliza cookies. Para más información, consulte nuestra <Link href="/politica-de-cookies" className="text-primary hover:underline">Política de Cookies</Link>.</p>
                        </section>

                         {/* -- Sección 9: Modificaciones -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Modificaciones de la Política de Privacidad</h2>
                             <p className="leading-relaxed">Nos reservamos el derecho a modificar esta política. Cualquier cambio será publicado en este sitio web. Revísela periódicamente.</p>
                        </section>

                        {/* -- Sección 10: Contacto -- */}
                        <section>
                             <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Contacto</h2>
                             <p className="leading-relaxed">Si tiene dudas sobre esta política, contáctenos en: **eliarquillo@hotmail.com**.</p>
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
  )
}
