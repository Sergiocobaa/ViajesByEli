import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users } from "lucide-react"

const offers = [
  {
    id: 1,
    destination: "Bali, Indonesia",
    image: "/bali-tropical-beach-resort-with-palm-trees.jpg",
    price: "€899",
    discount: "30% OFF",
    duration: "7 días",
    people: "2 personas",
    description: "Paraíso tropical con playas de ensueño",
  },
  {
    id: 2,
    destination: "Santorini, Grecia",
    image: "/santorini-white-buildings-blue-domes-sunset.jpg",
    price: "€1,299",
    discount: "25% OFF",
    duration: "5 días",
    people: "2 personas",
    description: "Atardeceres mágicos en el Egeo",
  },
  {
    id: 3,
    destination: "Tokio, Japón",
    image: "/tokyo-modern-city-with-cherry-blossoms.jpg",
    price: "€1,599",
    discount: "20% OFF",
    duration: "10 días",
    people: "2 personas",
    description: "Cultura milenaria y modernidad",
  },
  {
    id: 4,
    destination: "Maldivas",
    image: "/maldives-overwater-bungalows-crystal-clear-water.jpg",
    price: "€2,199",
    discount: "35% OFF",
    duration: "6 días",
    people: "2 personas",
    description: "Lujo y exclusividad en el océano",
  },
]

export function OffersSection() {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Ofertas destacadas</h2>
          <p className="text-xl text-muted-foreground text-pretty">Las mejores promociones para tu próxima aventura</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <Card
              key={offer.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.destination}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge
                  className="absolute top-4 right-4 text-white font-bold px-3 py-1"
                  style={{ backgroundColor: "rgb(249, 134, 109)" }}
                >
                  {offer.discount}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{offer.destination}</h3>
                    <p className="text-sm text-muted-foreground">{offer.description}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{offer.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{offer.people}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Desde</p>
                    <p className="text-2xl font-bold" style={{ color: "rgb(47, 174, 183)" }}>
                      {offer.price}
                    </p>
                  </div>
                  <MapPin className="w-5 h-5" style={{ color: "rgb(249, 134, 109)" }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
