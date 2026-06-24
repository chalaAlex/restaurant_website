import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Terms of Service | Bella Vista Restaurant",
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-[--color-secondary] mb-8">Terms of Service</h1>
          <div className="prose prose-lg">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>By using our services, you agree to these terms and conditions.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
