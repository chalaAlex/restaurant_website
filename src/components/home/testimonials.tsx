import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Critic",
    content: "Bella Vista delivers an authentic Italian experience. The attention to detail in every dish is remarkable, and the atmosphere is simply perfect for any occasion.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Customer",
    content: "I've been coming here for years, and the quality never disappoints. The carbonara is the best I've had outside of Italy. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Local Resident",
    content: "From the warm welcome to the last bite of tiramisu, everything was perfect. The staff is knowledgeable and the wine selection is impressive.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[--color-secondary] mb-4">
            What Our Guests Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our valued customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[--color-muted] rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[--color-accent] text-[--color-accent]" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${testimonial.image}')` }}
                />
                <div>
                  <p className="font-semibold text-[--color-secondary]">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
