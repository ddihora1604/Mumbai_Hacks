"use client"

import { CheckCircle, Database, Network, Eye, Shield, Zap } from "lucide-react"

const verificationSteps = [
  {
    icon: Database,
    title: "Multi-Source Aggregation",
    description:
      "We continuously monitor 15-20 reliable news sources and official databases to identify emerging claims and topics.",
    details: [
      "Real-time scraping from verified news outlets",
      "Official government and institutional records",
      "Primary source documentation",
      "Cross-platform monitoring",
    ],
  },
  {
    icon: Network,
    title: "Claim Canonicalization",
    description:
      "We extract and standardize claims using advanced NLP to identify the same information across different sources.",
    details: [
      "Named Entity Recognition (NER)",
      "Relation extraction and parsing",
      "Temporal and location analysis",
      "Duplicate detection and syndication tracking",
    ],
  },
  {
    icon: Eye,
    title: "Multi-Modal Verification",
    description: "We verify claims using images, videos, and multimedia content with advanced forensic analysis.",
    details: [
      "Reverse image search and metadata analysis",
      "Video frame analysis and OCR",
      "Deepfake detection models",
      "Audio forensics and manipulation detection",
    ],
  },
  {
    icon: Shield,
    title: "Source Credibility Scoring",
    description:
      "We maintain a comprehensive registry of sources with historical accuracy metrics and credibility scores.",
    details: [
      "Historical accuracy tracking",
      "Fact-check database cross-referencing",
      "Publisher provenance analysis",
      "Correction history monitoring",
    ],
  },
  {
    icon: Network,
    title: "Propagation Analysis",
    description: "We analyze how information spreads to detect coordinated misinformation campaigns and bot activity.",
    details: [
      "Origin attribution tracking",
      "Time-to-spread measurement",
      "Bot signature detection",
      "Network graph analysis",
    ],
  },
  {
    icon: Zap,
    title: "Confidence Scoring",
    description:
      "We combine all signals into a transparent confidence score that reflects the reliability of our verification.",
    details: [
      "Multi-signal aggregation",
      "Uncertainty quantification",
      "Human-in-the-loop escalation",
      "Audit trail transparency",
    ],
  },
]

const confidenceLevels = [
  {
    range: "90-100%",
    label: "Verified",
    color: "bg-green-100 text-green-800",
    description: "Strong evidence from multiple independent sources and primary documentation",
  },
  {
    range: "70-89%",
    label: "Likely True",
    color: "bg-blue-100 text-blue-800",
    description: "Consistent reporting with supporting evidence, minor uncertainties",
  },
  {
    range: "50-69%",
    label: "Under Investigation",
    color: "bg-yellow-100 text-yellow-800",
    description: "Conflicting signals or insufficient evidence, requires further analysis",
  },
  {
    range: "Below 50%",
    label: "Likely False",
    color: "bg-red-100 text-red-800",
    description: "Strong evidence of misinformation or contradictory primary sources",
  },
]

export default function HowWeVerify() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How We Verify</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our agentic AI system uses advanced multi-modal verification techniques to detect misinformation and provide
          trustworthy crisis information. Here's how we work.
        </p>
      </div>

      {/* Verification Process */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">Our Verification Process</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verificationSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Confidence Levels */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">Understanding Confidence Levels</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {confidenceLevels.map((level, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{level.label}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${level.color}`}>{level.range}</span>
              </div>
              <p className="text-gray-600">{level.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Our System is Different</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Mitigating Coordinated Misinformation
            </h3>
            <p className="text-gray-700">
              We don't rely on majority vote alone. Our system combines source credibility scoring, independent
              cross-checks, multimodal forensic analysis, and propagation signals to detect coordinated misinformation
              campaigns.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-teal-600" />
              Transparent & Explainable
            </h3>
            <p className="text-gray-700">
              Every verification decision includes a detailed audit trail showing sources, evidence, and reasoning. When
              confidence is low, we escalate to human fact-checkers and present uncertainty transparently.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Found a Suspicious Claim?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Help us verify information by reporting claims you've encountered. Our agentic AI system will investigate and
          provide a detailed analysis.
        </p>
        <a
          href="/public-portal/report-claim"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Report a Claim
        </a>
      </div>
    </div>
  )
}
