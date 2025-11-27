"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NewVideo() {
  const [step, setStep] = useState<"select" | "details" | "content" | "preview">("select")
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    scriptContent: "",
    duration: "5",
    style: "professional",
    includeAI: true,
  })

  const claims = [
    {
      id: 1,
      title: "COVID-19 vaccine causes magnetic properties",
      category: "Health",
      confidence: "95%",
      status: "Verified False",
    },
    {
      id: 2,
      title: "Election results were manipulated",
      category: "Politics",
      confidence: "45%",
      status: "Under Review",
    },
    {
      id: 3,
      title: "Climate change is a hoax",
      category: "Science",
      confidence: "92%",
      status: "Verified False",
    },
  ]

  const handleSelectClaim = (claim: any) => {
    setSelectedClaim(claim)
    setVideoData({
      ...videoData,
      title: `Debunking: ${claim.title}`,
      description: `This video addresses the claim: "${claim.title}" and provides evidence-based verification.`,
    })
    setStep("details")
  }

  const handleNext = () => {
    if (step === "details") setStep("content")
    else if (step === "content") setStep("preview")
  }

  const handleBack = () => {
    if (step === "details") setStep("select")
    else if (step === "content") setStep("details")
    else if (step === "preview") setStep("content")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link href="/analyst/creator-studio" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Creator Studio</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Video</h1>
        <p className="text-gray-600 mt-1">Create a verification video to combat misinformation</p>
      </div>

      {/* Step Indicator */}
      <div className="flex gap-2">
        {["select", "details", "content", "preview"].map((s, idx) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step === s
                  ? "bg-blue-600 text-white"
                  : ["select", "details", "content", "preview"].indexOf(step) > idx
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {["select", "details", "content", "preview"].indexOf(step) > idx ? "✓" : idx + 1}
            </div>
            {idx < 3 && <div className="w-8 h-0.5 bg-gray-200" />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Claim */}
      {step === "select" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select a Claim to Address</CardTitle>
              <CardDescription>Choose a verified claim from the verification hub</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {claims.map((claim) => (
                <button
                  key={claim.id}
                  onClick={() => handleSelectClaim(claim)}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{claim.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          {claim.category}
                        </span>
                        <span className="text-xs text-gray-600">Confidence: {claim.confidence}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          claim.status === "Verified False" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {claim.status}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Video Details */}
      {step === "details" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
              <CardDescription>Configure your video title and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                <input
                  type="text"
                  value={videoData.title}
                  onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={videoData.description}
                  onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="Enter video description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <select
                    value={videoData.duration}
                    onChange={(e) => setVideoData({ ...videoData, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="3">3 minutes</option>
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                  <select
                    value={videoData.style}
                    onChange={(e) => setVideoData({ ...videoData, style: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="educational">Educational</option>
                    <option value="animated">Animated</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={videoData.includeAI}
                  onChange={(e) => setVideoData({ ...videoData, includeAI: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <div>
                  <p className="font-medium text-gray-900">Use AI Avatar</p>
                  <p className="text-sm text-gray-600">Generate video with AI-powered avatar narration</p>
                </div>
              </label>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Content & Script */}
      {step === "content" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Script & Content</CardTitle>
              <CardDescription>Write the script for your verification video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Script Content</label>
                <textarea
                  value={videoData.scriptContent}
                  onChange={(e) => setVideoData({ ...videoData, scriptContent: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-64 font-mono text-sm"
                  placeholder="Write your video script here. Include key points, evidence, and conclusions..."
                />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Script Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Start with a clear statement of the claim being addressed</li>
                  <li>• Present evidence from credible sources</li>
                  <li>• Explain the reasoning behind your conclusion</li>
                  <li>• End with a clear, definitive conclusion</li>
                  <li>• Keep language accessible to general audiences</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Preview & Publish */}
      {step === "preview" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review & Publish</CardTitle>
              <CardDescription>Review your video details before publishing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Title</p>
                  <p className="font-semibold text-gray-900">{videoData.title}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-gray-900">{videoData.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">{videoData.duration} min</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Style</p>
                    <p className="font-semibold text-gray-900 capitalize">{videoData.style}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">AI Avatar</p>
                    <p className="font-semibold text-gray-900">{videoData.includeAI ? "Yes" : "No"}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Script Preview</p>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-40 overflow-y-auto">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{videoData.scriptContent}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  Your video is ready to be created. Click "Create Video" to generate your verification video.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        {step !== "select" && (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}
        <div className="flex-1" />
        <Link href="/analyst/creator-studio">
          <Button variant="outline">Cancel</Button>
        </Link>
        {step !== "preview" && (
          <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
            Next
          </Button>
        )}
        {step === "preview" && (
          <Button className="bg-green-600 hover:bg-green-700 gap-2">
            <Zap className="w-4 h-4" />
            Create Video
          </Button>
        )}
      </div>
    </div>
  )
}
