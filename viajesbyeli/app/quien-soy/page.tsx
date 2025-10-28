import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { MapPin, Heart, Plane } from "lucide-react"

export default function QuienSoy() {
  return (
    <main className="min-h-screen">
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
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center">Quién Soy</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/img/eli.jpg"
                alt="Eli - Agente de viajes"
                className="w-full h-full object-cover"
              />
            </div>
            {/* <div className="absolute -bottom-6 -right-6 bg-[rgb(47,174,183)] text-white p-6 rounded-xl shadow-xl">
              <p className="text-3xl font-bold">+10 años</p>
              <p className="text-sm">de experiencia</p>
            </div> */}
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Hola, soy <span className="text-[rgb(47,174,183)]">Eli</span>
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
                una apasionada de los viajes y mamá de dos aventureros que me han enseñado que la mejor forma de descubrir el mundo es hacerlo con ilusión (y un poquito de organización 😉).
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
                Soy esa persona que disfruta buscando rincones secretos, alojamientos con encanto y experiencias auténticas que no salen en los catálogos.
La que se emociona planificando tu escapada como si fuera propia.
Y la que está ahí cuando surgen dudas, imprevistos o simplemente necesitas a alguien que te diga:

            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
                “Tranquil@, yo me ocupo.”
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
                🌍 Mi misión es sencilla: que cada viaje se sienta fácil, auténtico y tuyo.
                Porque no se trata solo de moverse de un lugar a otro. Se trata de vivir historias, crear recuerdos y volver con esa sensación de haber ganado un pedacito más de mundo (y de ti mism@).

                Así que si estás buscando a alguien que no solo te prepare un itinerario, sino que te acompañe con cercanía, humor y cariño…

            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
                                
                Bienvenid@ a ViajesbyEli 

                Tu próxima aventura empieza aquí, conmigo, y prometo hacer que valga la pena ☺
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
