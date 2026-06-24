import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedMenu } from "@/components/home/featured-menu"
import { AboutSection } from "@/components/home/about-section"
import { Testimonials } from "@/components/home/testimonials"
import { CTASection } from "@/components/home/cta-section"
import { Test } from "@/components/layout/test"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedMenu />
        <AboutSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <Test />
    </>
  )
}
