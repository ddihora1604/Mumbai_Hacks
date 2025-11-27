"use client"

import Link from "next/link"
import { ChevronLeft, ExternalLink, CheckCircle, AlertCircle, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const analysisData: Record<string, any> = {
  "1": {
    title: "COVID-19 Vaccine Safety Update",
    description:
      "New vaccines do not cause magnetic properties. This claim has been thoroughly debunked by multiple scientific sources.",
    status: "verified",
    confidence: 98,
    category: "Health",
    conclusion:
      "COVID-19 vaccines are safe and do not contain magnetic particles. This has been confirmed by the WHO, CDC, and numerous peer-reviewed scientific studies. The claim that vaccines can be detected with magnets is false and has been debunked through rigorous scientific testing.",
    timeline: [
      {
        date: "2024-10-15",
        event: "Claim Detection",
        description: "Initial claim detected across social media platforms",
        source: "Social Media Monitoring",
      },
      {
        date: "2024-10-16",
        event: "Source Aggregation",
        description: "Collected data from 47 credible sources including WHO, CDC, and peer-reviewed journals",
        source: "Multi-Source Aggregation Agent",
      },
      {
        date: "2024-10-17",
        event: "Media Analysis",
        description: "Analyzed 156 images and 23 videos claiming to show magnetic properties",
        source: "Media Forensics Agent",
      },
      {
        date: "2024-10-18",
        event: "Fact-Checking",
        description: "Identified 12 variations of the claim and debunked all of them",
        source: "Fact-Checker Agent",
      },
      {
        date: "2024-10-19",
        event: "Verification Complete",
        description: "Claim verified as FALSE with 98% confidence",
        source: "Verification System",
      },
    ],
    research: [
      {
        title: "Scientific Testing",
        description:
          "Multiple independent laboratories tested vaccine samples and found no magnetic properties. All tests were conducted according to international standards.",
        methodology: "Laboratory analysis of vaccine composition",
        findings: "No magnetic particles detected in any samples",
      },
      {
        title: "Expert Consensus",
        description:
          "Over 500 medical experts and scientists have reviewed the evidence and confirmed vaccine safety. No credible scientific organization disputes vaccine safety.",
        methodology: "Expert review and consensus analysis",
        findings: "100% expert agreement on vaccine safety",
      },
      {
        title: "Real-World Data",
        description:
          "Billions of vaccine doses have been administered worldwide with excellent safety records. Adverse events are rare and thoroughly investigated.",
        methodology: "Global vaccination data analysis",
        findings: "Excellent safety profile across all demographics",
      },
      {
        title: "Debunking Methodology",
        description:
          "We analyzed 156 videos and images claiming to show magnetic properties. All were explained by natural phenomena or video manipulation.",
        methodology: "Media forensics and image analysis",
        findings: "All claims explained by non-magnetic phenomena",
      },
    ],
    sources: [
      {
        name: "WHO",
        url: "https://www.who.int/news/item/vaccine-safety",
        credibility: "99%",
        type: "Official Health Organization",
        date: "2024-10-15",
      },
      {
        name: "CDC",
        url: "https://www.cdc.gov/coronavirus/2019-ncov/vaccines/",
        credibility: "98%",
        type: "Government Health Agency",
        date: "2024-10-15",
      },
      {
        name: "Nature Medicine",
        url: "https://www.nature.com/articles/vaccine-analysis",
        credibility: "97%",
        type: "Peer-Reviewed Journal",
        date: "2024-10-16",
      },
      {
        name: "The Lancet",
        url: "https://www.thelancet.com/vaccine-safety",
        credibility: "96%",
        type: "Peer-Reviewed Journal",
        date: "2024-10-16",
      },
      {
        name: "Medical Journal",
        url: "https://www.medicaljournal.org/vaccine-myths",
        credibility: "95%",
        type: "Peer-Reviewed Journal",
        date: "2024-10-17",
      },
    ],
  },
}

export default function AnalysisDetail({ params }: { params: { id: string } }) {
  const analysis = analysisData[params.id] || analysisData["1"]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/public-portal" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Research</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {analysis.status === "verified" ? (
              <CheckCircle className="w-6 h-6 text-cyan-400" />
            ) : (
              <AlertCircle className="w-6 h-6 text-amber-400" />
            )}
            <span
              className={`text-sm font-semibold ${analysis.status === "verified" ? "text-cyan-400" : "text-amber-400"}`}
            >
              {analysis.status === "verified" ? "VERIFIED" : "UNDER INVESTIGATION"}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-50 mb-4">{analysis.title}</h1>
          <p className="text-lg text-slate-400">{analysis.description}</p>
        </div>

        {/* Confidence & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-400 mb-3">Confidence Level</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                      style={{ width: `${analysis.confidence}%` }}
                    />
                  </div>
                </div>
                <span className="text-3xl font-bold text-cyan-400">{analysis.confidence}%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-400 mb-3">Category</p>
              <p className="text-2xl font-bold text-slate-50">{analysis.category}</p>
            </CardContent>
          </Card>
        </div>

        {/* Conclusion */}
        <Card className="border-2 border-cyan-500/30 bg-slate-900 mb-8">
          <CardHeader>
            <CardTitle className="text-slate-50">Our Conclusion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 leading-relaxed text-lg">{analysis.conclusion}</p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="bg-slate-900 border-slate-800 mb-8">
          <CardHeader>
            <CardTitle className="text-slate-50">Verification Timeline</CardTitle>
            <CardDescription className="text-slate-400">How we verified this claim step by step</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analysis.timeline.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    </div>
                    {idx < analysis.timeline.length - 1 && <div className="w-0.5 h-16 bg-slate-700 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-sm font-semibold text-slate-400">{item.date}</p>
                      <p className="text-lg font-bold text-slate-50">{item.event}</p>
                    </div>
                    <p className="text-slate-400 mb-2">{item.description}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {item.source}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Research Conducted */}
        <Card className="bg-slate-900 border-slate-800 mb-8">
          <CardHeader>
            <CardTitle className="text-slate-50">Research Conducted</CardTitle>
            <CardDescription className="text-slate-400">Detailed methodology and findings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analysis.research.map((item: any, idx: number) => (
                <div key={idx} className="border border-slate-700 rounded-lg p-4 bg-slate-800/50">
                  <h4 className="font-semibold text-slate-50 mb-3">{item.title}</h4>
                  <p className="text-sm text-slate-400 mb-4">{item.description}</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Methodology</p>
                      <p className="text-sm text-slate-300">{item.methodology}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Findings</p>
                      <p className="text-sm text-cyan-400 font-medium">{item.findings}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Source Links */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-50">Sources We Used</CardTitle>
            <CardDescription className="text-slate-400">
              Links to the credible sources that informed this analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.sources.map((source: any, idx: number) => (
                <a
                  key={idx}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors group"
                >
                  <div>
                    <p className="font-medium text-slate-50 group-hover:text-cyan-400">{source.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{source.type}</p>
                    <p className="text-xs text-slate-600 mt-1">Verified: {source.date}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm font-bold text-cyan-400">{source.credibility}</span>
                    <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-cyan-400" />
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
