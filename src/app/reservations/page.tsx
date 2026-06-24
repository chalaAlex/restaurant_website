import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Calendar, Clock, Users } from "lucide-react"

export const metadata = {
  title: "Reservations | Bella Vista Restaurant",
  description: "Reserve your table at Bella Vista. Book online for a seamless dining experience.",
}

export default function ReservationsPage() {
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
                backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070')",
              }}
            />
          </div>
          <div className="relative z-10 text-center text-white">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Reserve a Table</h1>
            <p className="text-xl text-gray-200">Join us for an unforgettable dining experience</p>
          </div>
        </section>

        {/* Reservation Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-[--color-muted] rounded-lg p-8 shadow-lg">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-3 border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-3 border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-4 py-3 border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      required
                      className="w-full px-4 py-3 border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Time *
                    </label>
                    <select
                      id="time"
                      required
                      className="w-full px-4 py-3 border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                    >
                      <option value="">Select time</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Guests *
                    </label>
                    <select
                      id="guests"
                      required
                      className="w-full px-4 py-3 border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                    >
                      <option value="">Select</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                      <option value="9+">9+ Guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="specialRequest" className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="specialRequest"
                    rows={4}
                    className="w-full px-4 py-3 border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                    placeholder="Allergies, dietary restrictions, special occasions, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[--color-primary] text-white py-4 rounded-md font-semibold hover:bg-[--color-primary]/90 transition-colors"
                >
                  Complete Reservation
                </button>
              </form>
            </div>

            <div className="mt-8 text-center text-gray-600">
              <p className="mb-2">Need to modify or cancel a reservation?</p>
              <a href="tel:+1234567890" className="text-[--color-primary] font-medium hover:underline">
                Call us at (123) 456-7890
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
