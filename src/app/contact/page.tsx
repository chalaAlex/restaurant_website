import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata = {
  title: "Contact Us | Bella Vista Restaurant",
  description: "Get in touch with Bella Vista. Find our location, hours, and contact information.",
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[40vh] flex items-center justify-center bg-[--color-secondary]">
          <div className="relative z-10 text-center text-white">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-200">We'd love to hear from you</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-display text-3xl font-bold text-[--color-secondary] mb-8">Get in Touch</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[--color-primary] flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[--color-secondary] mb-1">Location</h3>
                      <p className="text-gray-600">123 Main Street<br />New York, NY 10001</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[--color-primary] flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[--color-secondary] mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-[--color-primary]">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[--color-primary] flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[--color-secondary] mb-1">Email</h3>
                      <a href="mailto:info@bellavista.com" className="text-gray-600 hover:text-[--color-primary]">
                        info@bellavista.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[--color-primary] flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[--color-secondary] mb-1">Hours</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Thursday: 11am - 10pm</p>
                        <p>Friday - Saturday: 11am - 11pm</p>
                        <p>Sunday: 12pm - 9pm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[--color-muted] rounded-lg p-8">
                <h2 className="font-display text-2xl font-bold text-[--color-secondary] mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                    />
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
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      className="w-full px-4 py-3 border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[--color-primary] text-white py-3 rounded-md font-semibold hover:bg-[--color-primary]/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
