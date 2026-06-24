import Link from "next/link"
import { Award, Users, Heart } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-20 bg-[--color-muted]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070')",
              }}
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[--color-secondary] mb-6">
              Our Story
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Since 1985, Bella Vista has been serving authentic Italian cuisine in the heart of 
              the city. Our passion for traditional recipes, combined with locally sourced 
              ingredients, creates an unforgettable dining experience.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Chef Marco Rossi brings over 30 years of culinary expertise from Naples, ensuring 
              every dish captures the essence of Italian gastronomy.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[--color-primary] text-white mb-3">
                  <Award className="h-6 w-6" />
                </div>
                <p className="font-display text-2xl font-bold text-[--color-secondary]">38+</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[--color-primary] text-white mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <p className="font-display text-2xl font-bold text-[--color-secondary]">50K+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[--color-primary] text-white mb-3">
                  <Heart className="h-6 w-6" />
                </div>
                <p className="font-display text-2xl font-bold text-[--color-secondary]">100%</p>
                <p className="text-sm text-gray-600">Made Fresh</p>
              </div>
            </div>

            <Link 
              href="/about"
              className="inline-flex items-center justify-center h-12 px-8 text-base font-medium bg-[--color-secondary] text-white shadow-sm hover:bg-[--color-secondary]/90 rounded-md transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
