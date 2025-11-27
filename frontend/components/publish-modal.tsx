"use client"

import { useState } from "react"
import { X, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PublishModalProps {
  claim: any
  onClose: () => void
  onPublish: (data: any) => void
}

export default function PublishModal({ claim, onClose, onPublish }: PublishModalProps) {
  const [step, setStep] = useState<"preview" | "settings" | "confirm">("preview")
  const [publishSettings, setPublishSettings] = useState({
    includeEvidence: true,
    includeSourceLinks: true,
    allowComments: true,
    notifyFollowers: true,
  })

  const handlePublish = () => {
    onPublish({
      claimId: claim.id,
      settings: publishSettings,
      publishedAt: new Date().toISOString(),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div>
            <CardTitle>Publish Verification</CardTitle>
            <CardDescription>Share this verification to the public portal</CardDescription>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Step Indicator */}
          <div className="flex gap-2 mb-8">
            {["preview", "settings", "confirm"].map((s, idx) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step === s
                      ? "bg-blue-600 text-white"
                      : ["preview", "settings", "confirm"].indexOf(step) > idx
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {["preview", "settings", "confirm"].indexOf(step) > idx ? "✓" : idx + 1}
                </div>
                {idx < 2 && <div className="w-8 h-0.5 bg-gray-200" />}
              </div>
            ))}
          </div>

          {/* Preview Step */}
          {step === "preview" && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Claim Title</h3>
                <p className="text-gray-700">{claim.title}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{claim.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold text-gray-900">{claim.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    {claim.status === "false" ? (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="font-semibold text-red-600">Verified False</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span className="font-semibold text-amber-600">Under Review</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Confidence</p>
                  <p className="font-semibold text-gray-900">{claim.confidence}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sources</p>
                  <p className="font-semibold text-gray-900">{claim.sources}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Engagement</p>
                  <p className="font-semibold text-gray-900">{claim.engagement}</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Step */}
          {step === "settings" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Publication Settings</h3>
              <div className="space-y-3">
                {[
                  {
                    key: "includeEvidence",
                    label: "Include Evidence & Sources",
                    description: "Show detailed verification evidence to public",
                  },
                  {
                    key: "includeSourceLinks",
                    label: "Include Source Links",
                    description: "Allow public to access original sources",
                  },
                  {
                    key: "allowComments",
                    label: "Allow Public Comments",
                    description: "Enable discussion on this verification",
                  },
                  {
                    key: "notifyFollowers",
                    label: "Notify Followers",
                    description: "Send notification to your followers",
                  },
                ].map((setting) => (
                  <label
                    key={setting.key}
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={publishSettings[setting.key as keyof typeof publishSettings]}
                      onChange={(e) =>
                        setPublishSettings({
                          ...publishSettings,
                          [setting.key]: e.target.checked,
                        })
                      }
                      className="mt-1 w-4 h-4 rounded border-gray-300"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{setting.label}</p>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Confirm Step */}
          {step === "confirm" && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">Ready to Publish</p>
                  <p className="text-sm text-green-800 mt-1">
                    This verification will be published to the public portal and visible to all users.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Publication Summary</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Claim:</span> {claim.title}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span>{" "}
                    {claim.status === "false" ? "Verified False" : "Under Review"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Include Evidence:</span>{" "}
                    {publishSettings.includeEvidence ? "Yes" : "No"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Allow Comments:</span> {publishSettings.allowComments ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t">
            {step !== "preview" && (
              <Button
                variant="outline"
                onClick={() => {
                  if (step === "settings") setStep("preview")
                  else if (step === "confirm") setStep("settings")
                }}
              >
                Back
              </Button>
            )}
            <div className="flex-1" />
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {step !== "confirm" && (
              <Button
                onClick={() => {
                  if (step === "preview") setStep("settings")
                  else if (step === "settings") setStep("confirm")
                }}
              >
                Next
              </Button>
            )}
            {step === "confirm" && (
              <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
                Publish Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
