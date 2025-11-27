"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  CheckCircle2,
  Video,
  Users,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  Play,
  Sparkles,
  Brain,
  Network,
  Eye,
  TrendingUp,
  Lock,
  Lightbulb,
} from "lucide-react"

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">AI-Powered Misinformation Detection</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
                Detect Misinformation. Verify Truth. Build Trust.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance leading-relaxed">
                FactGuard is an agentic AI system that continuously monitors information streams, detects emerging
                misinformation, verifies facts through multiple independent sources, and provides transparent,
                explainable reasoning during crises.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                    Start Verifying <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/public-portal">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    <Play className="w-4 h-4" /> View Verified Content
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Challenge</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                During crises, misinformation spreads faster than truth. Even reliable sources can repeat false
                narratives. We solve this with intelligent verification.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Coordinated Misinformation",
                  description:
                    "Multiple 'reliable' sources can repeat the same false narrative, making majority-vote verification unreliable.",
                },
                {
                  icon: Network,
                  title: "Complex Propagation",
                  description:
                    "Misinformation spreads through coordinated networks, bot amplification, and syndication chains that hide the true origin.",
                },
                {
                  icon: Eye,
                  title: "Multimedia Deception",
                  description:
                    "Deepfakes, reused footage, and manipulated images can fool both humans and simple automated systems.",
                },
              ].map((item, idx) => (
                <Card key={idx} className="p-6 border-red-200 bg-red-50/50">
                  <item.icon className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Multi-Agent Solution</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                FactGuard uses specialized AI agents working together to detect, verify, and explain misinformation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Topic Detection & Divergence Analysis",
                  description:
                    "Continuously scan 15-20 reliable sources. Identify emerging topics and detect when sources contradict each other.",
                },
                {
                  icon: CheckCircle2,
                  title: "Multi-Source Verification",
                  description:
                    "Cross-reference claims against fact-check databases, primary sources, and official records independently.",
                },
                {
                  icon: Lock,
                  title: "Media Forensics",
                  description:
                    "Analyze images and videos for deepfakes, reuse, metadata anomalies, and manipulation using specialized detectors.",
                },
                {
                  icon: Network,
                  title: "Propagation Analysis",
                  description:
                    "Track publication timelines and detect suspicious spread patterns, bot signatures, and coordinated amplification.",
                },
                {
                  icon: Lightbulb,
                  title: "Contextual Research",
                  description:
                    "Gather related historical events and incidents to build a knowledge graph connecting people, places, and events.",
                },
                {
                  icon: Eye,
                  title: "Transparent Reasoning",
                  description:
                    "Every verdict includes confidence scores, evidence traces, source provenance, and explainable reasoning paths.",
                },
              ].map((item, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-all hover:border-accent/50">
                  <item.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Verification Workflow</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From detection to public explanation, every step is transparent and explainable
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {[
                { step: "1", title: "Detect", description: "Identify emerging topics and divergence" },
                { step: "2", title: "Extract", description: "Parse atomic factual claims" },
                { step: "3", title: "Verify", description: "Multi-source evidence gathering" },
                { step: "4", title: "Score", description: "Compute confidence & verdict" },
                { step: "5", title: "Explain", description: "Generate transparent summaries" },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mb-4 font-bold text-accent">
                      {item.step}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  {idx < 4 && (
                    <div className="hidden md:block absolute top-6 -right-2 w-4 h-0.5 bg-gradient-to-r from-accent to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Platform Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tools for analysts, creators, and the public to collaborate on truth
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Verification Hub",
                  description:
                    "Analysts manage verification claims, publish to public portal, and track verification status in real-time.",
                },
                {
                  icon: Video,
                  title: "Creator Studio",
                  description:
                    "Create verified videos with AI avatars, select from verified claims, and publish with authenticity badges.",
                },
                {
                  icon: Users,
                  title: "Public Portal",
                  description:
                    "Browse verified videos, understand verification reasoning, and report suspicious claims for review.",
                },
                {
                  icon: Zap,
                  title: "Real-Time Analysis",
                  description:
                    "Instant misinformation detection powered by multi-agent AI reasoning and continuous source monitoring.",
                },
                {
                  icon: BarChart3,
                  title: "Analytics Dashboard",
                  description:
                    "Track verification metrics, engagement, propagation patterns, and impact of verified content.",
                },
                {
                  icon: CheckCircle2,
                  title: "Knowledge Graph",
                  description:
                    "Interactive visualization of relationships between claims, entities, sources, and evidence.",
                },
              ].map((feature, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-all hover:border-accent/50">
                  <feature.icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { stat: "16", label: "Specialized AI Agents" },
                { stat: "99.8%", label: "Verification Accuracy" },
                { stat: "Multi-Modal", label: "Evidence Analysis" },
                { stat: "100%", label: "Transparent Reasoning" },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{item.stat}</div>
                  <p className="text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your research needs. Upgrade to Pro to research any trending topic with
                advanced tools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <Card className="p-8 flex flex-col border-border hover:shadow-lg transition-all">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Free</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-accent">₹0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Perfect for exploring verified research</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {[
                    "Unlimited access to published articles",
                    "Unlimited access to published videos",
                    "View verified plans",
                    "Community discussions",
                    "Email support",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/login">
                  <Button className="w-full bg-muted text-foreground hover:bg-muted/80">Get Started Free</Button>
                </Link>
              </Card>

              {/* Pro Plan - Highlighted */}
              <Card className="p-8 flex flex-col border-accent border-2 shadow-lg relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>

                <div className="mb-6 mt-4">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Pro</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-accent">₹499</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">For serious researchers and analysts</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {[
                    "Research on your desired topic",
                    "Advanced fact-checking tools",
                    "Priority claim verification",
                    "Export research reports",
                    "Advanced filters & search",
                    "Priority email support",
                    "API access (limited)",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/login">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Upgrade to Pro</Button>
                </Link>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-16 pt-16 border-t border-border">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h3>

              <div className="space-y-6">
                {[
                  {
                    q: "Can I cancel my subscription anytime?",
                    a: "Yes, you can cancel your Pro subscription anytime. No long-term contracts or hidden fees.",
                  },
                  {
                    q: "What can I research with the Free plan?",
                    a: "With the Free plan, you get unlimited access to published articles and videos. Upgrade to Pro to research any trending topic you want.",
                  },
                  {
                    q: "Do you offer discounts for annual billing?",
                    a: "Yes! Annual Pro plans are available at ₹4,999/year (save 17%). Contact us for bulk discounts.",
                  },
                  {
                    q: "Is there a free trial for Pro?",
                    a: "Yes, we offer a 7-day free trial of Pro features. No credit card required to start.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-6">
                    <h4 className="font-semibold text-foreground mb-2">{item.q}</h4>
                    <p className="text-muted-foreground text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join the Fight Against Misinformation
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're an analyst, creator, or concerned citizen, FactGuard helps build a more trustworthy
              information ecosystem. Start researching today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/public-portal">
                <Button size="lg" variant="outline">
                  Explore Verified Content
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
