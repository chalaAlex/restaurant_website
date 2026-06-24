import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Experience Authentic
          <span className="block text-[--color-accent] mt-2">Italian Cuisine</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Indulge in the finest Italian dishes, crafted with passion and the freshest ingredients 
          in an elegant atmosphere.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/reservations" 
            className="min-w-[200px] inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-medium bg-[--color-primary] text-[--color-primary-foreground] shadow hover:bg-[--color-primary]/90 rounded-md transition-colors"
          >
            <Calendar className="h-5 w-5" />
            Reserve a Table
          </Link>
          <Link 
            href="/menu" 
            className="min-w-[200px] inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-medium bg-white/10 backdrop-blur-sm text-white border border-white hover:bg-white/20 rounded-md transition-colors"
          >
            View Menu
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white rounded-full" />
        </div>
      </div>
    </section>
  )
}
