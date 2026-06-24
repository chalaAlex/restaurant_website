import Link from "next/link"
import { Calendar, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074')",
        }}
      >
        <div className="absolute inset-0 bg-[--color-secondary]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
          Ready to Experience Excellence?
        </h2>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Reserve your table today and discover why Bella Vista is the city's favorite Italian restaurant
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/reservations" 
            className="min-w-[200px] inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-medium bg-[--color-accent] text-[--color-secondary] hover:bg-[--color-accent]/90 shadow rounded-md transition-colors"
          >
            <Calendar className="h-5 w-5" />
            Book a Table
          </Link>
          <Link 
            href="tel:+1234567890" 
            className="min-w-[200px] inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-medium bg-transparent border-2 border-white text-white hover:bg-white hover:text-[--color-secondary] rounded-md transition-colors"
          >
            <Phone className="h-5 w-5" />
            Call Us Now
          </Link>
        </div>
      </div>
    </section>
  )
}
