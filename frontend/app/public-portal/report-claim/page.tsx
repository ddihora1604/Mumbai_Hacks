"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, CheckCircle, Upload } from "lucide-react"

export default function ReportClaim() {
  const [formData, setFormData] = useState({
    claimText: "",
    category: "Health",
    sources: "",
    evidence: "",
    context: "",
    contactEmail: "",
    attachments: [] as File[],
  })

  const [submitted, setSubmitted] = useState(false)

  const categories = ["Health", "Politics", "Finance", "Environment", "Science", "Other"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        attachments: Array.from(e.target.files || []),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        claimText: "",
        category: "Health",
        sources: "",
        evidence: "",
        context: "",
        contactEmail: "",
        attachments: [],
      })
    }, 3000)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Report a Claim</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Help us combat misinformation by reporting suspicious claims. Our agentic AI system will investigate and
          provide a detailed analysis with confidence scoring.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Claim Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for reporting. Our agentic AI system will analyze this claim and provide a verification
                  report within 24 hours.
                </p>
                <p className="text-sm text-gray-500">You will receive updates at the email you provided.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Claim Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">The Claim *</label>
                  <textarea
                    name="claimText"
                    value={formData.claimText}
                    onChange={handleInputChange}
                    placeholder="Describe the claim you want to report..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Be as specific as possible about what claim you're reporting.
                  </p>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sources */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Where Did You See This?</label>
                  <textarea
                    name="sources"
                    value={formData.sources}
                    onChange={handleInputChange}
                    placeholder="List the sources where you encountered this claim (URLs, social media, news outlets, etc.)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                {/* Evidence */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Why Do You Think This Is Misinformation?
                  </label>
                  <textarea
                    name="evidence"
                    value={formData.evidence}
                    onChange={handleInputChange}
                    placeholder="Share any evidence or reasoning that suggests this claim might be false..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                {/* Context */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Additional Context</label>
                  <textarea
                    name="context"
                    value={formData.context}
                    onChange={handleInputChange}
                    placeholder="Any additional information that might help our verification process..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Attach Evidence (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept="image/*,video/*,.pdf,.doc,.docx"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">Images, videos, PDFs, or documents (Max 50MB)</p>
                    </label>
                    {formData.attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.attachments.map((file, index) => (
                          <p key={index} className="text-sm text-gray-600">
                            ✓ {file.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Your Email *</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">We'll send you updates about the verification process.</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit Claim for Verification
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* What Happens Next */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              What Happens Next?
            </h3>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                <span>Our system receives and logs your report</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                <span>Agentic AI agents begin multi-source verification</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                <span>Multimodal analysis (images, videos, text)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
                <span>Confidence scoring and human review</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
                <span>You receive detailed verification report</span>
              </li>
            </ol>
          </div>

          {/* Tips */}
          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Tips for Better Reports</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Be specific about the claim</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Include direct links to sources</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Attach screenshots or evidence</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Provide context about timing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>Include your contact information</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
