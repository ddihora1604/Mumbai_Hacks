"use client"

import { useState } from "react"
import Link from "next/link"
import { Trash2, Edit, Eye, Share2, MoreVertical, Upload, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ManagedVideo {
  id: string
  title: string
  status: "draft" | "published" | "scheduled"
  views: number
  likes: number
  createdAt: string
  publishedAt?: string
  thumbnail: string
  duration: string
  category: string
}

const managedVideos: ManagedVideo[] = [
  {
    id: "1",
    title: "COVID-19 Vaccine Safety Explained",
    status: "published",
    views: 15420,
    likes: 1240,
    createdAt: "2024-01-15",
    publishedAt: "2024-01-17",
    thumbnail: "/vaccine-safety.jpg",
    duration: "8:45",
    category: "Health",
  },
  {
    id: "2",
    title: "Climate Policy Impact Analysis",
    status: "published",
    views: 8920,
    likes: 892,
    createdAt: "2024-01-10",
    publishedAt: "2024-01-12",
    thumbnail: "/climate-policy-video.jpg",
    duration: "12:30",
    category: "Environment",
  },
  {
    id: "3",
    title: "New Election Analysis",
    status: "draft",
    views: 0,
    likes: 0,
    createdAt: "2024-01-20",
    thumbnail: "/election-fact-check.jpg",
    duration: "15:20",
    category: "Politics",
  },
  {
    id: "4",
    title: "AI Safety Regulations Update",
    status: "scheduled",
    views: 0,
    likes: 0,
    createdAt: "2024-01-18",
    publishedAt: "2024-01-25",
    thumbnail: "/ai-safety-regulation.jpg",
    duration: "11:45",
    category: "Technology",
  },
]

export default function VideoManagement() {
  const [videos, setVideos] = useState(managedVideos)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "draft" | "published" | "scheduled">("all")

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || video.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: string) => {
    setVideos(videos.filter((v) => v.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return "Published"
      case "draft":
        return "Draft"
      case "scheduled":
        return "Scheduled"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Video Management</h1>
          <p className="text-gray-600 mt-1">Manage and publish your verification videos</p>
        </div>
        <Link
          href="/analyst/creator-studio/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-5 h-5" />
          <span>New Video</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Total Videos</p>
            <p className="text-3xl font-bold text-gray-900">{videos.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Published</p>
            <p className="text-3xl font-bold text-green-600">{videos.filter((v) => v.status === "published").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Drafts</p>
            <p className="text-3xl font-bold text-gray-600">{videos.filter((v) => v.status === "draft").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Total Views</p>
            <p className="text-3xl font-bold text-blue-600">
              {videos.reduce((sum, v) => sum + v.views, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4">
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
        <div className="flex gap-2">
          {(["all", "draft", "published", "scheduled"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Table */}
      <Card>
        <CardContent className="pt-6">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No videos found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Views</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Likes</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Created</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVideos.map((video) => (
                    <tr key={video.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{video.title}</p>
                            <p className="text-xs text-gray-500">{video.duration}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(video.status)}`}
                        >
                          {getStatusLabel(video.status)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{video.views.toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-900">{video.likes.toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-600 text-sm">{video.createdAt}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Share">
                            <Share2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(video.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="More">
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
