"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isPublicPortal = pathname.startsWith("/public-portal")
  const isAnalyst = pathname.startsWith("/analyst")
  const isHome = pathname === "/"

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="hidden sm:inline">FactGuard</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {isHome && (
              <>
                <Link href="/analyst" className="text-sm font-medium hover:text-primary transition-colors">
                  Analyst Dashboard
                </Link>
                <Link href="/public-portal" className="text-sm font-medium hover:text-primary transition-colors">
                  Public Portal
                </Link>
              </>
            )}
            {isAnalyst && (
              <>
                <Link
                  href="/analyst/verification-hub"
                  className={`text-sm font-medium transition-colors ${pathname.includes("verification-hub") ? "text-primary" : "hover:text-primary"}`}
                >
                  Verification Hub
                </Link>
                <Link
                  href="/analyst/creator-studio"
                  className={`text-sm font-medium transition-colors ${pathname.includes("creator-studio") ? "text-primary" : "hover:text-primary"}`}
                >
                  Creator Studio
                </Link>
              </>
            )}
            {isPublicPortal && (
              <>
                <Link
                  href="/public-portal"
                  className={`text-sm font-medium transition-colors ${pathname === "/public-portal" ? "text-primary" : "hover:text-primary"}`}
                >
                  Videos
                </Link>
                <Link
                  href="/public-portal/how-we-verify"
                  className={`text-sm font-medium transition-colors ${pathname.includes("how-we-verify") ? "text-primary" : "hover:text-primary"}`}
                >
                  How We Verify
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isHome && (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {isHome && (
              <>
                <Link href="/analyst" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded">
                  Analyst Dashboard
                </Link>
                <Link href="/public-portal" className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded">
                  Public Portal
                </Link>
              </>
            )}
            {isAnalyst && (
              <>
                <Link
                  href="/analyst/verification-hub"
                  className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded"
                >
                  Verification Hub
                </Link>
                <Link
                  href="/analyst/creator-studio"
                  className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded"
                >
                  Creator Studio
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
