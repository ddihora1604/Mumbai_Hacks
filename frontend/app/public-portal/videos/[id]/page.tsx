"use client"

import Link from "next/link"
import { ChevronLeft, Play, Heart, Share2, ThumbsDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const videoData: Record<string, any> = {
  "1": {
    title: "COVID-19 Vaccine Safety Explained",
    description: "A comprehensive breakdown of vaccine safety data and debunking common myths.",
    creator: "Dr. Sarah Chen",
    creatorAvatar: "/doctor-avatar.png",
    views: 15420,
    likes: 1240,
    dislikes: 45,
    comments: 234,
    duration: "8:45",
    category: "Health",
    createdAt: "2 days ago",
    verified: true,
    thumbnail: "/vaccine-safety.jpg",
    content: `In this video, we break down the latest vaccine safety data and address common misconceptions. 
    
Key points covered:
- How vaccines are tested and approved
- Real-world safety data from billions of doses
- Common myths vs. scientific facts
- Expert consensus on vaccine safety
- How to identify misinformation

This analysis is based on data from WHO, CDC, and peer-reviewed scientific journals.`,
    relatedVideos: [
      { id: "2", title: "Climate Policy Impact Analysis", views: 8920 },
      { id: "3", title: "Stock Market Volatility Explained", views: 12340 },
      { id: "4", title: "Election Misinformation Debunked", views: 24560 },
    ],
  },
}

export default function VideoDetail({ params }: { params: { id: string } }) {
  const video = videoData[params.id] || videoData["1"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/public-portal/videos" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Videos</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player & Info */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="relative bg-black rounded-xl overflow-hidden mb-6 aspect-video flex items-center justify-center">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-10 h-10 text-blue-600 ml-1" />
                </div>
              </div>
            </div>

            {/* Video Title & Info */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{video.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{video.views.toLocaleString()} views</span>
                    <span>{video.createdAt}</span>
                    {video.verified && (
                      <span className="flex items-center gap-1 text-teal-600 font-medium">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>{(video.likes / 1000).toFixed(1)}K</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <ThumbsDown className="w-5 h-5" />
                  <span>{video.dislikes}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Creator Info */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={video.creatorAvatar || "/placeholder.svg"}
                      alt={video.creator}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{video.creator}</p>
                      <p className="text-sm text-gray-600">Verified Creator</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>About this video</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{video.content}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Related Videos */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Related Videos</h3>
            <div className="space-y-4">
              {video.relatedVideos.map((related: any) => (
                <Link key={related.id} href={`/public-portal/videos/${related.id}`} className="block group">
                  <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative bg-gray-200 aspect-video">
                      <img
                        src={`/video-thumbnail-concept.png?height=100&width=180&query=video thumbnail ${related.id}`}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                        <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600">
                        {related.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{(related.views / 1000).toFixed(1)}K views</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
