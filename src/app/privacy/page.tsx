import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Privacy Policy | Bella Vista Restaurant",
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-[--color-secondary] mb-8">Privacy Policy</h1>
          <div className="prose prose-lg">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your information.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
