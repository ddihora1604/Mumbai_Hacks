"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const viewsData = [
  { date: "Jan 1", views: 120, likes: 40 },
  { date: "Jan 2", views: 300, likes: 120 },
  { date: "Jan 3", views: 200, likes: 80 },
  { date: "Jan 4", views: 278, likes: 98 },
  { date: "Jan 5", views: 189, likes: 67 },
  { date: "Jan 6", views: 239, likes: 85 },
  { date: "Jan 7", views: 349, likes: 120 },
]

const categoryData = [
  { category: "Health", videos: 12, views: 45000 },
  { category: "Environment", videos: 8, views: 32000 },
  { category: "Finance", videos: 6, views: 28000 },
  { category: "Politics", videos: 10, views: 52000 },
  { category: "Technology", videos: 7, views: 38000 },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Video Analytics</h1>
        <p className="text-gray-600 mt-1">Track performance and engagement metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Total Views</p>
            <p className="text-3xl font-bold text-gray-900">156.2K</p>
            <p className="text-xs text-green-600 mt-2">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Total Likes</p>
            <p className="text-3xl font-bold text-gray-900">12.4K</p>
            <p className="text-xs text-green-600 mt-2">+8% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Avg. Engagement</p>
            <p className="text-3xl font-bold text-gray-900">7.9%</p>
            <p className="text-xs text-green-600 mt-2">+2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">Subscribers</p>
            <p className="text-3xl font-bold text-gray-900">2.3K</p>
            <p className="text-xs text-green-600 mt-2">+15% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views & Likes Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Views & Likes Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#2563eb" name="Views" />
                <Line type="monotone" dataKey="likes" stroke="#10b981" name="Likes" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Views by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Views by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#2563eb" name="Views" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Videos</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Views</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg. Views/Video</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Growth</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((cat) => (
                  <tr key={cat.category} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{cat.category}</td>
                    <td className="py-4 px-4 text-gray-600">{cat.videos}</td>
                    <td className="py-4 px-4 text-gray-900">{cat.views.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-900">{Math.round(cat.views / cat.videos).toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className="text-green-600 font-medium">+12%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
