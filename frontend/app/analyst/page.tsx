"use client"

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Plus } from "lucide-react"
import Link from "next/link"

const dashboardData = {
  metrics: [
    { label: "Total Research", value: "1247", change: "+28 from last week" },
    { label: "Verified False", value: "892", change: "+18 of total" },
    { label: "Under Review", value: "245", change: "+18 of total" },
    { label: "Verified True", value: "110", change: "+3 of total" },
  ],
  engagementTrend: [
    { date: "Oct 1", engagement: 1200 },
    { date: "Oct 2", engagement: 1900 },
    { date: "Oct 3", engagement: 1600 },
    { date: "Oct 4", engagement: 1800 },
    { date: "Oct 5", engagement: 2200 },
    { date: "Oct 6", engagement: 2000 },
    { date: "Oct 7", engagement: 1800 },
  ],
  categoryBreakdown: [
    { name: "Health", value: 4500 },
    { name: "Politics", value: 3200 },
    { name: "Science", value: 2100 },
    { name: "Other", value: 1800 },
  ],
  verificationTrend: [
    { date: "Oct 1", false: 120, true: 45, review: 30 },
    { date: "Oct 2", false: 140, true: 50, review: 35 },
    { date: "Oct 3", false: 150, true: 48, review: 40 },
    { date: "Oct 4", false: 160, true: 52, review: 38 },
    { date: "Oct 5", false: 180, true: 55, review: 42 },
    { date: "Oct 6", false: 190, true: 58, review: 45 },
    { date: "Oct 7", false: 200, true: 60, review: 48 },
  ],
  recentClaims: [
    { title: "COVID-19 vaccine causes magnetic properties", category: "Health", confidence: "98%", status: "false" },
    { title: "Election results were manipulated", category: "Politics", confidence: "45%", status: "review" },
    { title: "Climate change is a hoax", category: "Science", confidence: "92%", status: "false" },
  ],
}

const COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981"]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time overview of fact-checking and verification status</p>
        </div>
        <Link href="/analyst/creator-studio">
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Create Research
          </Button>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData.metrics.map((metric, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-2">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Research Engagement Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dashboardData.engagementTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Research by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dashboardData.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Verification Status Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Status Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.verificationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="false" fill="#ef4444" name="Verified False" />
              <Bar dataKey="true" fill="#8b5cf6" name="Verified True" />
              <Bar dataKey="review" fill="#f59e0b" name="Under Review" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trending Topics Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Trending Topics by Region</CardTitle>
              <CardDescription>Hot topics requiring fact-checking research</CardDescription>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Regions</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia</option>
              <option>South America</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                topic: "Vaccine Safety Myths",
                region: "North America",
                mentions: 2847,
                trend: "↑ 23%",
                category: "Health",
              },
              {
                topic: "Election Fraud Claims",
                region: "Europe",
                mentions: 1923,
                trend: "↑ 15%",
                category: "Politics",
              },
              { topic: "Climate Hoax Theories", region: "Asia", mentions: 1654, trend: "↓ 8%", category: "Science" },
              { topic: "5G Health Risks", region: "North America", mentions: 1432, trend: "↑ 12%", category: "Health" },
              {
                topic: "Economic Collapse Predictions",
                region: "Europe",
                mentions: 987,
                trend: "↑ 31%",
                category: "Finance",
              },
              {
                topic: "Government Conspiracy",
                region: "South America",
                mentions: 756,
                trend: "↑ 19%",
                category: "Politics",
              },
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.topic}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.region}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      item.category === "Health"
                        ? "bg-red-100 text-red-700"
                        : item.category === "Politics"
                          ? "bg-blue-100 text-blue-700"
                          : item.category === "Science"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">{item.mentions} mentions</span>
                  <span
                    className={`text-sm font-semibold ${item.trend.includes("↑") ? "text-red-600" : "text-green-600"}`}
                  >
                    {item.trend}
                  </span>
                </div>
                <Link
                  href={`/analyst/verification-hub?topic=${encodeURIComponent(item.topic)}`}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm text-center block"
                >
                  Start Research
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Claims & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Claims</CardTitle>
                  <CardDescription>Latest submissions requiring fact-checking</CardDescription>
                </div>
                <Link
                  href="/analyst/verification-hub"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentClaims.map((claim, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{claim.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{claim.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{claim.confidence}</p>
                      <p
                        className={`text-sm font-medium ${claim.status === "false" ? "text-red-600" : "text-amber-600"}`}
                      >
                        {claim.status === "false" ? "Verified False" : "Under Review"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { icon: "✓", label: "Review Pending Claims", href: "/analyst/verification-hub" },
                { icon: "✎", label: "Create Research", href: "/analyst/creator-studio" },
                { icon: "📊", label: "View Analytics", href: "/analyst/analytics" },
                { icon: "🌐", label: "Public Portal", href: "/public-portal" },
              ].map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                >
                  <span className="text-lg">{action.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
