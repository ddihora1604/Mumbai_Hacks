"use client"

import { useState } from "react"
import { Search, Filter, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PublishModal from "@/components/publish-modal"

const verificationData = {
  stats: [
    { label: "Verified False", value: "3", icon: "✗", color: "red" },
    { label: "Verified True", value: "0", icon: "✓", color: "green" },
    { label: "Under Review", value: "2", icon: "⏳", color: "amber" },
  ],
  claims: [
    {
      id: 1,
      title: "COVID-19 vaccine causes magnetic properties",
      description: "Claims that COVID-19 vaccines contain magnetic particles that can be detected with magnets.",
      category: "Health",
      confidence: "95%",
      sources: 3,
      engagement: "2.4K",
      created: "2024-10-15",
      status: "false",
      published: false,
    },
    {
      id: 2,
      title: "Election results were manipulated",
      description: "Unsubstantiated claims about election fraud in recent elections.",
      category: "Politics",
      confidence: "45%",
      sources: 8,
      engagement: "5.2K",
      created: "2024-10-14",
      status: "review",
      published: false,
    },
    {
      id: 3,
      title: "Climate change is a hoax",
      description: "Claims that climate change is a fabricated scientific conspiracy.",
      category: "Science",
      confidence: "92%",
      sources: 5,
      engagement: "1.8K",
      created: "2024-10-13",
      status: "false",
      published: true,
    },
    {
      id: 4,
      title: "New treatment cures all diseases",
      description: "Miraculous cure claims without scientific evidence.",
      category: "Health",
      confidence: "98%",
      sources: 2,
      engagement: "3.1K",
      created: "2024-10-12",
      status: "false",
      published: false,
    },
  ],
}

export default function VerificationHub() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [publishModalOpen, setPublishModalOpen] = useState(false)
  const [selectedClaim, setSelectedClaim] = useState<any>(null)

  const categories = ["All", "Health", "Politics", "Science", "Other"]

  const filteredClaims = verificationData.claims.filter((claim) => {
    const matchesCategory = selectedCategory === "All" || claim.category === selectedCategory
    const matchesSearch = claim.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handlePublish = (claim: any) => {
    setSelectedClaim(claim)
    setPublishModalOpen(true)
  }

  const handlePublishConfirm = (publishData: any) => {
    console.log("Publishing claim:", selectedClaim, publishData)
    setPublishModalOpen(false)
    setSelectedClaim(null)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Verification Hub</h1>
        <p className="text-gray-600 mt-1">Review, verify, and manage misinformation claims across all categories</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {verificationData.stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center text-xl`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search claims by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Claims List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Claims</CardTitle>
              <CardDescription>
                Showing {filteredClaims.length} of {verificationData.claims.length} claims
              </CardDescription>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">More Filters</span>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClaims.map((claim) => (
              <div key={claim.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => (window.location.href = `/analyst/verification-hub/${claim.id}`)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{claim.title}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          claim.category === "Health"
                            ? "bg-red-100 text-red-700"
                            : claim.category === "Politics"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {claim.category}
                      </span>
                      {claim.published && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                          Published
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{claim.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>Sources: {claim.sources}</span>
                      <span>Engagement: {claim.engagement}</span>
                      <span>Created: {claim.created}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div>
                      <p className="text-lg font-bold text-blue-600">{claim.confidence}</p>
                      <p
                        className={`text-sm font-medium mt-1 ${
                          claim.status === "false" ? "text-red-600" : "text-amber-600"
                        }`}
                      >
                        {claim.status === "false" ? "Verified False" : "Under Review"}
                      </p>
                    </div>
                    {!claim.published && (
                      <Button size="sm" variant="outline" onClick={() => handlePublish(claim)} className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Publish
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {publishModalOpen && selectedClaim && (
        <PublishModal
          claim={selectedClaim}
          onClose={() => setPublishModalOpen(false)}
          onPublish={handlePublishConfirm}
        />
      )}
    </div>
  )
}
