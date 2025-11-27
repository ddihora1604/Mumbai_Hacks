"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, AlertCircle, Share2, MessageSquare, Tag, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PublishModal from "@/components/publish-modal"

const claimDetails: Record<string, any> = {
  "1": {
    title: "COVID-19 vaccine causes magnetic properties",
    description: "Claims that COVID-19 vaccines contain magnetic particles that can be detected with magnets.",
    category: "Health",
    confidence: "95%",
    sources: 47,
    engagement: "2.4K",
    created: "2024-10-15",
    status: "false",
    published: false,
    conclusion:
      "This claim is definitively FALSE. Multiple scientific studies have confirmed that COVID-19 vaccines do not contain magnetic particles and cannot be detected with magnets.",
    agents: [
      {
        name: "Source/Aggregator Agent",
        status: "success",
        confidence: "+18.6%",
        inputs: "Query: 'COVID-19 vaccine magnetic'",
        outputs: "Vaccines found: 47 sources analyzed",
      },
      {
        name: "Media/Forensics Agent",
        status: "success",
        confidence: "+28.2%",
        inputs: "156 images and 23 videos analyzed",
        outputs: "No magnetic properties detected",
      },
      {
        name: "Fact-Checker/Debunker Agent",
        status: "success",
        confidence: "+18.5%",
        inputs: "Claim variations: 12 identified",
        outputs: "All variations debunked",
      },
      {
        name: "Propagation/Analysis Agent",
        status: "warning",
        confidence: "-4.2%",
        inputs: "8 social media platforms tracked",
        outputs: "Peak engagement: 2.4K interactions",
      },
    ],
    evidence: [
      {
        title: "Official Statement on Vaccine Safety",
        source: "WHO",
        date: "2024-10-15",
        confidence: "99%",
        type: "official",
      },
      {
        title: "Vaccine Ingredients & Composition",
        source: "CDC",
        date: "2024-10-15",
        confidence: "98%",
        type: "official",
      },
      {
        title: "Peer-Reviewed Analysis",
        source: "Nature Medicine",
        date: "2024-10-15",
        confidence: "97%",
        type: "journal",
      },
      {
        title: "Vaccine Safety Review",
        source: "The Lancet",
        date: "2024-10-15",
        confidence: "96%",
        type: "journal",
      },
      {
        title: "Debunking Magnetic Claims",
        source: "Medical Journal",
        date: "2024-10-15",
        confidence: "94%",
        type: "journal",
      },
    ],
    tags: ["Health", "Vaccines", "Misinformation", "High Priority"],
  },
}

export default function ClaimDetail({ params }: { params: { id: string } }) {
  const claim = claimDetails[params.id] || claimDetails["1"]
  const [publishModalOpen, setPublishModalOpen] = useState(false)
  const [expandedAgent, setExpandedAgent] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/analyst/verification-hub"
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Hub</span>
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                <MessageSquare className="w-4 h-4" />
                Request Review
              </Button>
              <Button
                onClick={() => setPublishModalOpen(true)}
                size="sm"
                className="gap-2 bg-cyan-600 hover:bg-cyan-700"
              >
                <Share2 className="w-4 h-4" />
                Escalate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <span className="text-sm font-semibold text-red-400">VERIFIED FALSE</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-50 mb-3">{claim.title}</h1>
          <p className="text-slate-400">{claim.description}</p>
          <p className="text-xs text-slate-500 mt-3">ID: {claim.created} • Created: Oct 15, 2024 10:04 IST</p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Claim Summary */}
          <div className="space-y-6">
            {/* Confidence Circle */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-700"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={`${95 * 2.827} ${100 * 2.827}`}
                      className="text-cyan-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-cyan-400">{claim.confidence}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 text-center">Confidence Score</p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-50">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Sources</p>
                  <p className="text-2xl font-bold text-cyan-400">{claim.sources}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Media Items</p>
                  <p className="text-2xl font-bold text-slate-50">179</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Fact-checks</p>
                  <p className="text-2xl font-bold text-slate-50">4</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Entities</p>
                  <p className="text-2xl font-bold text-slate-50">4</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6 space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                >
                  <MessageSquare className="w-4 h-4" />
                  Request Human Review
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                >
                  <Tag className="w-4 h-4" />
                  Add Tag
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                >
                  <FileText className="w-4 h-4" />
                  Add Note
                </Button>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-50">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {claim.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-800 text-cyan-400 text-xs rounded-full font-medium border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Agent Timeline */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-50">Agent Timeline</CardTitle>
                <CardDescription className="text-slate-400">Verification process executed by AI agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {claim.agents.map((agent: any, idx: number) => (
                    <div key={idx} className="border border-slate-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedAgent(expandedAgent === idx ? -1 : idx)}
                        className="w-full p-3 flex items-center justify-between hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              agent.status === "success" ? "bg-green-900 text-green-400" : "bg-amber-900 text-amber-400"
                            }`}
                          >
                            {agent.status === "success" ? "✓" : "!"}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-slate-50">{agent.name}</p>
                            <p
                              className={`text-xs ${agent.status === "success" ? "text-green-400" : "text-amber-400"}`}
                            >
                              {agent.confidence}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-slate-400 transition-transform ${expandedAgent === idx ? "rotate-180" : ""}`}
                        >
                          ▼
                        </span>
                      </button>
                      {expandedAgent === idx && (
                        <div className="border-t border-slate-700 p-3 bg-slate-800/50 space-y-3">
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Inputs</p>
                            <p className="text-sm text-slate-300">{agent.inputs}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Outputs</p>
                            <p className="text-sm text-slate-300">{agent.outputs}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Evidence Feed */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-50">Evidence Feed</CardTitle>
                <CardDescription className="text-slate-400">By Confidence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {claim.evidence.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-50">{item.title}</p>
                          <p className="text-xs text-slate-400 mt-1">{item.source}</p>
                        </div>
                        <span className="text-xs font-bold text-cyan-400">{item.confidence}</span>
                      </div>
                      <p className="text-xs text-slate-500">{item.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Verdict Modal */}
        <div className="mt-8 flex justify-center">
          <Card className="bg-white text-slate-900 border-0 max-w-md">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <p className="text-2xl font-bold text-red-600">VERIFIED FALSE</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Vaccine Reliability", value: 95 },
                  { label: "Fact-Check Sources", value: 92 },
                  { label: "Primary Evidence", value: 89 },
                  { label: "Scientific Consensus", value: 98 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm font-bold text-cyan-600">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-pink-500"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white">Publish Summary</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {publishModalOpen && (
        <PublishModal
          claim={claim}
          onClose={() => setPublishModalOpen(false)}
          onPublish={() => setPublishModalOpen(false)}
        />
      )}
    </div>
  )
}
