"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { Download } from "lucide-react"

const analyticsData = {
  metrics: [
    { label: "Total Claims", value: "1247" },
    { label: "Verification Rate", value: "87.5%" },
    { label: "Avg Confidence", value: "82.3%" },
    { label: "Active Creators", value: "24" },
  ],
  dailyTrend: [
    { date: "Oct 1", claims: 120 },
    { date: "Oct 2", claims: 150 },
    { date: "Oct 3", claims: 140 },
    { date: "Oct 4", claims: 180 },
    { date: "Oct 5", claims: 200 },
    { date: "Oct 6", claims: 220 },
    { date: "Oct 7", claims: 250 },
  ],
  verificationStatus: [
    { name: "Verified False", value: 892 },
    { name: "Under Review", value: 245 },
    { name: "Verified True", value: 110 },
  ],
  accuracy: [
    { name: "Highly Accurate", value: 75 },
    { name: "Moderately Accurate", value: 18 },
    { name: "Low Accuracy", value: 7 },
  ],
  categoryEngagement: [
    { category: "Health", engagement: 4500 },
    { category: "Politics", engagement: 3200 },
    { category: "Science", engagement: 2100 },
    { category: "Other", engagement: 1800 },
  ],
  metricsOverTime: [
    { date: "Oct 1", false: 80, true: 20, review: 15 },
    { date: "Oct 2", false: 95, true: 25, review: 18 },
    { date: "Oct 3", false: 110, true: 28, review: 20 },
    { date: "Oct 4", false: 130, true: 32, review: 25 },
    { date: "Oct 5", false: 150, true: 35, review: 28 },
    { date: "Oct 6", false: 170, true: 40, review: 32 },
    { date: "Oct 7", false: 190, true: 45, review: 35 },
  ],
  topClaims: [
    { rank: 1, title: "COVID-19 vaccine causes magnetic properties", engagement: "2.4K" },
    { rank: 2, title: "Election results were manipulated", engagement: "1.8K" },
    { rank: 3, title: "Climate change is a hoax", engagement: "1.6K" },
  ],
}

const COLORS = ["#ef4444", "#f59e0b", "#10b981"]

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive insights into misinformation detection and verification performance
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Export</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.metrics.map((metric, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
              <p className="text-3xl font-bold text-blue-600">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Claims Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Claims Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="claims" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.verificationStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.verificationStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Verification Accuracy */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analyticsData.accuracy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Engagement by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.categoryEngagement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="engagement" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Verification Metrics Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Metrics Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.metricsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="false" stroke="#ef4444" name="False" />
              <Line type="monotone" dataKey="true" stroke="#8b5cf6" name="True" />
              <Line type="monotone" dataKey="review" stroke="#f59e0b" name="Under Review" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Claims by Engagement */}
      <Card>
        <CardHeader>
          <CardTitle>Top Claims by Engagement</CardTitle>
          <CardDescription>Most viewed and engaged claims</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topClaims.map((claim) => (
              <div key={claim.rank} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    {claim.rank}
                  </div>
                  <p className="font-medium text-gray-900">{claim.title}</p>
                </div>
                <p className="text-blue-600 font-semibold">{claim.engagement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
