import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import {Footer} from "@/components/footer"

export default function PoliticaDeCookies() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-[rgb(47,174,183)] to-[rgb(249,134,109)] bg-clip-text text-transparent">
            Política de Cookies
          </h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">¿Qué son las cookies?</h2>
              <p className="text-gray-600 leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio
                web. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente y
                proporcionen información a los propietarios del sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">¿Cómo utilizamos las cookies?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">En Viajes by Eli utilizamos cookies para:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Recordar tus preferencias y configuraciones</li>
                <li>Mejorar la experiencia de navegación</li>
                <li>Analizar el tráfico del sitio web</li>
                <li>Personalizar el contenido según tus intereses</li>
                <li>Facilitar el proceso de reserva</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tipos de cookies que utilizamos</h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Cookies esenciales</h3>
                  <p className="text-gray-600 text-sm">
                    Estas cookies son necesarias para que el sitio web funcione correctamente. No se pueden desactivar.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Cookies de rendimiento</h3>
                  <p className="text-gray-600 text-sm">
                    Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando información
                    de forma anónima.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Cookies de funcionalidad</h3>
                  <p className="text-gray-600 text-sm">
                    Permiten que el sitio web recuerde las elecciones que haces y proporcione características mejoradas
                    y más personales.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Control de cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en
                tu dispositivo y puedes configurar la mayoría de los navegadores para evitar que se coloquen. Sin
                embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que
                visites un sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contacto</h2>
              <p className="text-gray-600 leading-relaxed">
                Si tienes alguna pregunta sobre nuestra política de cookies, no dudes en{" "}
                <Link
                  href="/contacto"
                  className="text-[rgb(47,174,183)] hover:text-[rgb(249,134,109)] underline transition-colors"
                >
                  contactarnos
                </Link>
                .
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
