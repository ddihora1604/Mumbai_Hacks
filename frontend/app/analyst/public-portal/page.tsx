"use client"

import Link from "next/link"

export default function PublicPortalRedirect() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-gray-600 mb-4">Redirecting to Public Portal...</p>
        <Link href="/public-portal" className="text-blue-600 hover:text-blue-700 font-medium">
          Click here if not redirected
        </Link>
      </div>
    </div>
  )
}
