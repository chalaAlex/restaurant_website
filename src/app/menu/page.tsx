import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Our Menu | Bella Vista Restaurant",
  description: "Explore our authentic Italian menu featuring fresh pasta, wood-fired pizza, and traditional dishes.",
}

const menuCategories = [
  {
    name: "Antipasti",
    items: [
      { name: "Bruschetta al Pomodoro", description: "Grilled bread with fresh tomatoes, basil, and garlic", price: 12.99 },
      { name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze", price: 14.99 },
      { name: "Calamari Fritti", description: "Crispy fried calamari with marinara sauce", price: 16.99 },
    ],
  },
  {
    name: "Pasta",
    items: [
      { name: "Spaghetti Carbonara", description: "Creamy pasta with pancetta, eggs, and pecorino romano", price: 22.99 },
      { name: "Fettuccine Alfredo", description: "Fresh fettuccine in creamy parmesan sauce", price: 20.99 },
      { name: "Lasagna Bolognese", description: "Layers of pasta, meat sauce, and béchamel", price: 24.99 },
      { name: "Penne Arrabbiata", description: "Spicy tomato sauce with garlic and chili", price: 19.99 },
    ],
  },
  {
    name: "Pizza",
    items: [
      { name: "Margherita", description: "Tomato sauce, mozzarella, and fresh basil", price: 18.99 },
      { name: "Quattro Formaggi", description: "Four cheese pizza with mozzarella, gorgonzola, parmesan, and ricotta", price: 21.99 },
      { name: "Diavola", description: "Spicy salami, tomato sauce, and mozzarella", price: 22.99 },
    ],
  },
  {
    name: "Main Courses",
    items: [
      { name: "Osso Buco", description: "Braised veal shanks in white wine with gremolata", price: 34.99 },
      { name: "Chicken Parmigiana", description: "Breaded chicken with tomato sauce and mozzarella", price: 26.99 },
      { name: "Branzino al Forno", description: "Oven-roasted Mediterranean sea bass with herbs", price: 32.99 },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Tiramisu", description: "Classic Italian dessert with espresso-soaked ladyfingers", price: 12.99 },
      { name: "Panna Cotta", description: "Creamy vanilla custard with berry compote", price: 10.99 },
      { name: "Cannoli", description: "Crispy pastry shells filled with sweet ricotta cream", price: 11.99 },
    ],
  },
]

export default function MenuPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative h-[40vh] flex items-center justify-center bg-[--color-secondary]">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074')",
              }}
            />
          </div>
          <div className="relative z-10 text-center text-white">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
            <p className="text-xl text-gray-200">Authentic Italian Cuisine</p>
          </div>
        </section>

        {/* Menu */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            {menuCategories.map((category, idx) => (
              <div key={idx} className="mb-16 last:mb-0">
                <h2 className="font-display text-3xl font-bold text-[--color-secondary] mb-8 pb-4 border-b-2 border-[--color-accent]">
                  {category.name}
                </h2>
                <div className="space-y-6">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[--color-secondary] mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <span className="text-[--color-primary] font-bold text-lg flex-shrink-0">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
