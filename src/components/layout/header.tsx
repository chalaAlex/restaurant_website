"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Reservations", href: "/reservations" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn(
              "text-2xl font-display font-bold transition-colors",
              isScrolled ? "text-[--color-secondary]" : "text-white"
            )}>
              Bella Vista
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[--color-primary]",
                  isScrolled ? "text-gray-700" : "text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="tel:+1234567890" className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span className={cn(
                "font-medium",
                isScrolled ? "text-gray-700" : "text-white"
              )}>
                (123) 456-7890
              </span>
            </Link>
            <Link
              href="/reservations"
              className="inline-flex items-center justify-center h-9 px-4 text-xs font-medium bg-[--color-primary] text-[--color-primary-foreground] shadow hover:bg-[--color-primary]/90 rounded-md transition-colors"
            >
              Reserve Table
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 transition-colors",
              isScrolled ? "text-gray-700" : "text-white"
            )}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-white rounded-lg shadow-lg mt-2">
            <nav className="flex flex-col space-y-1 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-gray-700 hover:text-[--color-primary] transition-colors border-b border-gray-100 last:border-0"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-gray-700 py-2"
                >
                  <Phone className="h-4 w-4" />
                  (123) 456-7890
                </Link>
                <Link
                  href="/reservations"
                  className="w-full inline-flex items-center justify-center h-10 px-6 py-2 font-medium bg-[--color-primary] text-[--color-primary-foreground] shadow hover:bg-[--color-primary]/90 rounded-md transition-colors"
                >
                  Reserve Table
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
