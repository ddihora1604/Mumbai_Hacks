"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Settings, Menu, X, LogOut, Search } from "lucide-react"
import { useState } from "react"

export function UnifiedNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isPublicPortal = pathname.startsWith("/public-portal")
  const isAnalyst = pathname.startsWith("/analyst")
  const isHome = pathname === "/"

  const getNavItems = () => {
    if (isAnalyst) {
      return [
        { href: "/analyst", label: "Dashboard", active: pathname === "/analyst" },
        { href: "/analyst/verification-hub", label: "Research Hub", active: pathname.includes("verification-hub") },
        { href: "/analyst/creator-studio", label: "Create Research", active: pathname.includes("creator-studio") },
        { href: "/analyst/analytics", label: "Analytics", active: pathname.includes("analytics") },
      ]
    }
    if (isPublicPortal) {
      return [
        { href: "/public-portal", label: "Trending Topics", active: pathname === "/public-portal" },
        { href: "/public-portal/how-we-verify", label: "How We Verify", active: pathname.includes("how-we-verify") },
        { href: "/public-portal/report-claim", label: "Report a Claim", active: pathname.includes("report-claim") },
      ]
    }
    return []
  }

  const navItems = getNavItems()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-gray-900">FactGuard</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  item.active
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {isAnalyst && (
              <>
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </>
            )}

            {isPublicPortal && (
              <>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English</option>
                </select>
              </>
            )}

            {(isAnalyst || isPublicPortal) && (
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-1 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 text-sm font-medium rounded transition-colors ${
                  item.active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
