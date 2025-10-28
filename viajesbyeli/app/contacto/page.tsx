import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import {Navbar} from "@/components/navbar"
import { Mail, Phone, Instagram, MapPin } from "lucide-react"

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Navbar */}
      <section className="relative min-h-[50vh] flex flex-col">
        <div className="absolute inset-0 z-0">
          <img
            src="/fondo.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>

        <Navbar />

        <div className="relative z-10 flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Contáctanos</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Estamos aquí para ayudarte a planificar tu próxima aventura
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Información de Contacto</h2>
              <p className="text-muted-foreground mb-8">
                Ponte en contacto con nosotros a través de cualquiera de estos medios. Responderemos lo antes posible.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Email */}
              <Card className="border-2 hover:border-[rgb(47,174,183)] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[rgb(47,174,183)]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[rgb(47,174,183)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-muted-foreground mb-2">Escríbenos directamente</p>
                      <a
                        href="mailto:contacto@viajesbyeli.com"
                        className="text-[rgb(47,174,183)] hover:underline font-medium"
                      >
                        eliarquillo.nadidu@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp */}
              <Card className="border-2 hover:border-[rgb(47,174,183)] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[rgb(47,174,183)]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[rgb(47,174,183)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                      <p className="text-muted-foreground mb-2">Chatea con nosotros</p>
                      <a
                        href="https://wa.me/649613702"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[rgb(47,174,183)] hover:underline font-medium"
                      >
                        +34 649 613 702
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instagram */}
              <Card className="border-2 hover:border-[rgb(249,134,109)] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[rgb(249,134,109)]/10 flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-6 h-6 text-[rgb(249,134,109)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">Instagram</h3>
                      <p className="text-muted-foreground mb-2">Síguenos en redes</p>
                      <a
                        href="https://instagram.com/viajesbyeli"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[rgb(249,134,109)] hover:underline font-medium"
                      >
                        @viajesbyeli
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
        </div>
      </section>

      <Footer />
    </main>
  )
}
