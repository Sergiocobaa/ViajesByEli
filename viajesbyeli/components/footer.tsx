import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { NewsletterForm } from "@/components/newsletter-form"

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/16PtgdRAod/?mibextid=wwXIfr", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/viajesbyeli/", label: "Instagram" },
    { icon: Mail, href: "eliarquillo.nadidu@gmail.com", label: "Email" },
  ]

  return (
    <footer className="bg-gradient-to-b from-background to-muted border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <img src="/logo.png" alt="Viajes by Eli" className="h-16 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu agencia de viajes de confianza. Descubre el mundo con las mejores ofertas y experiencias únicas
              adaptadas a ti.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Destinos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+34 649 613 702</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>eliarquillo.nadidu@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Barcelona, España</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterForm />
          </div>

        </div>

        {/* Redes sociales */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Viajes by Eli. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-3 text-sm">
                <Link
                  href="/politica-de-cookies"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Política de Cookies
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  href="/politica-de-privacidad"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Política de Privacidad
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/aviso-legal" className="text-muted-foreground hover:text-primary transition-colors">
                  Aviso Legal
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
