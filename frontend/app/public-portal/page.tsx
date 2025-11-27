"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, AlertCircle, Search, Filter, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Research {
  id: string
  status: "verified" | "investigating"
  timestamp: string
  title: string
  description: string
  confidence: number
  sources: string[]
  category: string
  views: number
  borderColor: string
  statusColor: string
}

const research: Research[] = [
  {
    id: "1",
    status: "verified",
    timestamp: "2 hours ago",
    title: "COVID-19 Vaccine Safety Update",
    description:
      "New vaccines do not cause magnetic properties. This claim has been thoroughly debunked by multiple scientific sources.",
    confidence: 98,
    sources: ["WHO", "CDC", "Medical Journal"],
    category: "Health",
    views: 12400,
    borderColor: "border-teal-500",
    statusColor: "text-teal-600",
  },
  {
    id: "2",
    status: "verified",
    timestamp: "4 hours ago",
    title: "Climate Policy Announcement",
    description:
      "Government announces new climate initiative. Details confirmed through official press release and multiple news outlets.",
    confidence: 95,
    sources: ["Government Press", "Reuters", "AP News"],
    category: "Environment",
    views: 8900,
    borderColor: "border-teal-500",
    statusColor: "text-teal-600",
  },
  {
    id: "3",
    status: "investigating",
    timestamp: "6 hours ago",
    title: "Stock Market Prediction Debunked",
    description: "Claims of imminent market crash lack credible evidence. Investigation ongoing.",
    confidence: 72,
    sources: ["Financial Times", "Bloomberg"],
    category: "Finance",
    views: 5600,
    borderColor: "border-amber-500",
    statusColor: "text-amber-600",
  },
  {
    id: "4",
    status: "verified",
    timestamp: "8 hours ago",
    title: "Election Results Accuracy Confirmed",
    description:
      "Independent audits confirm election results are accurate. Multiple verification methods validate the outcome.",
    confidence: 99,
    sources: ["Election Commission", "Independent Auditors", "News Networks"],
    category: "Politics",
    views: 15200,
    borderColor: "border-teal-500",
    statusColor: "text-teal-600",
  },
]

const categories = ["All", "Health", "Environment", "Finance", "Politics", "Technology"]

export default function PublicPortal() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResearch = research.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8 border border-blue-100">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Trending Topics Research</h1>
        <p className="text-gray-600 mb-6">
          Get comprehensive, fact-checked research on trending news and hot topics. All claims verified through multiple
          independent sources.
        </p>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics, claims, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Research Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResearch.map((item) => (
          <Card key={item.id} className={`border-2 ${item.borderColor} hover:shadow-lg transition-all`}>
            <div className="p-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-2 ${item.statusColor}`}>
                  {item.status === "verified" ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">Verified</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">Investigating</span>
                    </>
                  )}
                </div>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.timestamp}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>

              {/* Confidence Level */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Confidence Level</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.status === "verified" ? "bg-teal-500" : "bg-amber-500"}`}
                      style={{ width: `${item.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.confidence}%</span>
                </div>
              </div>

              {/* Sources */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Sources</p>
                <div className="flex flex-wrap gap-2">
                  {item.sources.map((source) => (
                    <span key={source} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              {/* Views */}
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <Eye className="w-4 h-4" />
                <span>{item.views.toLocaleString()} views</span>
              </div>

              {/* CTA Button */}
              <Link
                href={`/public-portal/analysis/${item.id}`}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors block text-center"
              >
                Read Full Research
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredResearch.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No research found matching your search.</p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
