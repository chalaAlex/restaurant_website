import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Award, Heart, Users } from "lucide-react"

export const metadata = {
  title: "About Us | Bella Vista Restaurant",
  description: "Learn about Bella Vista's history and our commitment to authentic Italian cuisine.",
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="relative h-[50vh] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070')",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-center text-white">
            <h1 className="font-display text-5xl md:text-6xl font-bold">Our Story</h1>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed mb-16">
              <p>
                Since 1985, Bella Vista has been a cornerstone of authentic Italian dining in the heart of the city. 
                Our journey began when Chef Marco Rossi brought his family recipes from Naples to share with the world.
              </p>
              <p>
                For nearly four decades, we've maintained our commitment to traditional cooking methods while sourcing 
                the finest local and imported ingredients. Every dish tells a story of Italian heritage and culinary passion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[--color-primary] text-white mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[--color-secondary] mb-2">38+ Years</h3>
                <p className="text-gray-600">Of culinary excellence</p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[--color-primary] text-white mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[--color-secondary] mb-2">50,000+</h3>
                <p className="text-gray-600">Happy customers served</p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[--color-primary] text-white mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[--color-secondary] mb-2">100%</h3>
                <p className="text-gray-600">Fresh ingredients daily</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
