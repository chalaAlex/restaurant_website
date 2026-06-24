import Link from "next/link"
import { ArrowRight } from "lucide-react"

const featuredItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800",
  },
  {
    id: 2,
    name: "Spaghetti Carbonara",
    description: "Creamy pasta with pancetta, eggs, and pecorino romano",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=800",
  },
  {
    id: 3,
    name: "Osso Buco",
    description: "Braised veal shanks in white wine with gremolata",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
  },
  {
    id: 4,
    name: "Tiramisu",
    description: "Classic Italian dessert with espresso-soaked ladyfingers",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800",
  },
]

export function FeaturedMenu() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[--color-secondary] mb-4">
            Featured Dishes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most beloved creations, each dish tells a story of tradition and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-xl font-semibold text-[--color-secondary]">
                    {item.name}
                  </h3>
                  <span className="text-[--color-primary] font-bold">
                    ${item.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/menu"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-medium bg-[--color-primary] text-[--color-primary-foreground] shadow hover:bg-[--color-primary]/90 rounded-md transition-colors"
          >
            View Full Menu
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
