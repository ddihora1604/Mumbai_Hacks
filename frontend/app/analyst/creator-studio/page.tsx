"use client"

import { Plus, Edit2, Trash2, Eye, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const creatorData = {
  metrics: [
    { label: "Total Videos", value: "3" },
    { label: "Total Views", value: "21,300" },
    { label: "Total Engagement", value: "4,200" },
    { label: "Avg Engagement Rate", value: "19.2%" },
  ],
  videos: [
    {
      id: 1,
      title: "Debunking COVID-19 Vaccine Myths",
      claim: "COVID-19 vaccine causes magnetic properties",
      views: "12,400",
      engagement: "2,400",
      created: "Oct 15, 2024",
      status: "Published",
      thumbnail: "🎬",
    },
    {
      id: 2,
      title: "Climate Change: The Science Behind It",
      claim: "Climate change is a hoax",
      views: "0",
      engagement: "0",
      created: "Oct 14, 2024",
      status: "Draft",
      thumbnail: "🎬",
    },
    {
      id: 3,
      title: "Election Security Explained",
      claim: "Election results were manipulated",
      views: "8,900",
      engagement: "1,800",
      created: "Oct 13, 2024",
      status: "Published",
      thumbnail: "🎬",
    },
  ],
  topCreators: [
    { rank: 1, name: "Sarah Chen", videos: "12 videos created", reach: "45,000" },
    { rank: 2, name: "Marcus Johnson", videos: "8 videos created", reach: "32,000" },
  ],
}

export default function CreatorStudio() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Creator Studio</h1>
          <p className="text-gray-600 mt-1">Create and manage verification videos to combat misinformation</p>
        </div>
        <Link href="/analyst/creator-studio/new">
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Video</span>
          </Button>
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {creatorData.metrics.map((metric, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
              <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Your Videos */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Your Videos</CardTitle>
            <CardDescription>{creatorData.videos.length} videos created</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorData.videos.map((video) => (
              <div
                key={video.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative bg-gradient-to-br from-blue-400 to-purple-500 h-40 flex items-center justify-center text-4xl">
                  {video.thumbnail}
                  <span
                    className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${
                      video.status === "Published" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                    }`}
                  >
                    {video.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{video.claim}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{video.engagement} engagement</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">Created {video.created}</p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-red-600">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Creators */}
      <Card>
        <CardHeader>
          <CardTitle>Top Creators</CardTitle>
          <CardDescription>Most active verification creators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creatorData.topCreators.map((creator) => (
              <div
                key={creator.rank}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {creator.rank}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{creator.name}</p>
                    <p className="text-sm text-gray-600">{creator.videos}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">{creator.reach}</p>
                  <p className="text-xs text-gray-600">reach</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
