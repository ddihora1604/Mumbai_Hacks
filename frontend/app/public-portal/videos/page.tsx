"use client"

import { useState } from "react"
import Link from "next/link"
import { Play, Heart, Filter, Search } from "lucide-react"

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: number
  likes: number
  category: string
  creator: string
  createdAt: string
  verified: boolean
}

const videos: Video[] = [
  {
    id: "1",
    title: "COVID-19 Vaccine Safety Explained",
    description: "A comprehensive breakdown of vaccine safety data and debunking common myths.",
    thumbnail: "/vaccine-safety-video.jpg",
    duration: "8:45",
    views: 15420,
    likes: 1240,
    category: "Health",
    creator: "Dr. Sarah Chen",
    createdAt: "2 days ago",
    verified: true,
  },
  {
    id: "2",
    title: "Climate Policy Impact Analysis",
    description: "Understanding the new government climate initiative and its potential impact.",
    thumbnail: "/climate-policy-video.jpg",
    duration: "12:30",
    views: 8920,
    likes: 892,
    category: "Environment",
    creator: "Climate Research Team",
    createdAt: "4 days ago",
    verified: true,
  },
  {
    id: "3",
    title: "Stock Market Volatility Explained",
    description: "Breaking down current market conditions and separating fact from speculation.",
    thumbnail: "/stock-market-analysis.png",
    duration: "10:15",
    views: 12340,
    likes: 1050,
    category: "Finance",
    creator: "Financial Analyst Team",
    createdAt: "1 week ago",
    verified: true,
  },
  {
    id: "4",
    title: "Election Misinformation Debunked",
    description: "Fact-checking viral claims about the recent election with verified sources.",
    thumbnail: "/election-fact-check.jpg",
    duration: "15:20",
    views: 24560,
    likes: 2340,
    category: "Politics",
    creator: "Fact Check Bureau",
    createdAt: "5 days ago",
    verified: true,
  },
  {
    id: "5",
    title: "AI Safety and Regulation",
    description: "Exploring the latest developments in AI safety and government regulations.",
    thumbnail: "/ai-safety-regulation.jpg",
    duration: "11:45",
    views: 9870,
    likes: 945,
    category: "Technology",
    creator: "Tech Policy Institute",
    createdAt: "3 days ago",
    verified: true,
  },
  {
    id: "6",
    title: "Pandemic Response Timeline",
    description: "A detailed timeline of pandemic response measures and their effectiveness.",
    thumbnail: "/pandemic-response.jpg",
    duration: "13:50",
    views: 18920,
    likes: 1820,
    category: "Health",
    creator: "Public Health Team",
    createdAt: "1 week ago",
    verified: true,
  },
]

const categories = ["All", "Health", "Environment", "Finance", "Politics", "Technology"]

export default function VideoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Verification Videos</h1>
            <p className="text-gray-600 mt-1">Watch verified analysis and fact-checks from our experts</p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 overflow-x-auto pb-2">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No videos found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Link
                key={video.id}
                href={`/public-portal/videos/${video.id}`}
                className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden bg-gray-200 aspect-video">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-blue-600 ml-1" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  {/* Verified Badge */}
                  {video.verified && (
                    <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>

                  {/* Creator & Date */}
                  <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                    <span className="font-medium">{video.creator}</span>
                    <span>{video.createdAt}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        {(video.views / 1000).toFixed(1)}K
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {(video.likes / 1000).toFixed(1)}K
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                      {video.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
