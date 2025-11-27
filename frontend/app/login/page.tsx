"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, CheckCircle2, Shield, Zap } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"analyst" | "public">("analyst")
  const [tab, setTab] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (tab === "signup") {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password"
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Redirect based on role
      if (role === "analyst") {
        window.location.href = "/analyst"
      } else {
        window.location.href = "/public-portal"
      }
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[calc(100vh-64px)]">
          {/* Left Side - Form */}
          <div className="flex items-center justify-center px-4 py-12 lg:py-0">
            <Card className="w-full max-w-md p-8 border-border/50 shadow-lg">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {tab === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {tab === "login"
                    ? "Sign in to your FactGuard account"
                    : "Join FactGuard to research and verify trusted content"}
                </p>
              </div>

              <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "signup")} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Role Selection */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">I am a</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("analyst")}
                    className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                      role === "analyst"
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border bg-background text-muted-foreground hover:border-accent/50"
                    }`}
                  >
                    Analyst
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("public")}
                    className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                      role === "public"
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border bg-background text-muted-foreground hover:border-accent/50"
                    }`}
                  >
                    Viewer
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors({ ...errors, email: "" })
                    }}
                    className={`mt-1 ${errors.email ? "border-destructive" : ""}`}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (errors.password) setErrors({ ...errors, password: "" })
                      }}
                      className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password Field (Sign Up Only) */}
                {tab === "signup" && (
                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" })
                        }}
                        className={`pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Remember Me / Forgot Password */}
                {tab === "login" && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <Link href="#" className="text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
                >
                  {tab === "login" ? "Sign In" : "Create Account"}
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {tab === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <button onClick={() => setTab("signup")} className="text-primary hover:underline font-medium">
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button onClick={() => setTab("login")} className="text-primary hover:underline font-medium">
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Right Side - Trust & Security Info */}
          <div className="hidden lg:flex flex-col justify-center px-8 py-12 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
            <div className="max-w-md">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Why FactGuard?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Join thousands of researchers and analysts building a more trustworthy information ecosystem.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Shield className="w-6 h-6 text-accent mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Enterprise Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Your data is protected with industry-leading encryption and compliance standards.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Zap className="w-6 h-6 text-accent mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Real-Time Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered analysis delivers instant misinformation detection and verification results.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-accent mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Trusted by Experts</h3>
                    <p className="text-sm text-muted-foreground">
                      Used by journalists, analysts, and organizations worldwide to combat misinformation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-xs text-muted-foreground mb-4">Trusted by leading organizations</p>
                <div className="grid grid-cols-2 gap-4">
                  {["Reuters", "AP News", "BBC", "NPR"].map((org) => (
                    <div key={org} className="text-xs font-medium text-muted-foreground">
                      {org}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
