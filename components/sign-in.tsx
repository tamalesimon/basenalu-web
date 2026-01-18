"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react"

interface SignInProps {
  onBack: () => void
  onComplete: (user: any, role: "user" | "courier" | "company") => void
  onRegister: () => void
}

export default function SignIn({ onBack, onComplete, onRegister }: SignInProps) {
  const [role, setRole] = useState<"user" | "courier" | "company">("user")
  const [loginType, setLoginType] = useState<"phone" | "email">("email")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    identifier: "", // email or phone
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.identifier.trim()) {
      newErrors.identifier = `${loginType === "email" ? "Email" : "Mobile number"} is required`
    } else if (loginType === "email" && !formData.identifier.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.identifier = "Enter a valid email address"
    } else if (loginType === "phone" && !formData.identifier.match(/^\d{10}$/)) {
      newErrors.identifier = "Enter a valid 10-digit mobile number"
    }

    if (loginType === "email" && !formData.password) {
      newErrors.password = "Password is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Mock successful sign in
    onComplete(
      {
        ...formData,
        name: formData.identifier.split("@")[0],
      },
      role,
    )
  }

  const handleBorderColor = (role:string) => {
    if (role == "user") return "border-secondary";
    if (role == "courier") return "border-primary";
    if (role == "company") return "border-amber-500"
  }

  const handleTabButtonColor = (role:string) => {
    if (role == "user") return "bg-secondary hover:bg-secondary/90";
    if (role == "courier") return "bg-primary hover:bg-primary/90";
    if (role == "company") return "bg-amber-500 hover:bg-amber-600"
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 px-4 py-8">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <Card className={`p-8 border-2 border-border/50 shadow-xl bg-card/80 backdrop-blur-sm border-2 border-border ${handleBorderColor(role)}`}>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">Sign in to your <b><u>Basenalu</u></b> account</p>
          </div>

          {/* Role Selector */}
          <div className="mb-6 grid grid-cols-3 gap-2 p-1 bg-muted rounded-lg">
            {(["user", "courier", "company"] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r)
                  if (r !== "user") setLoginType("email")
                }}
                // className={`py-2 text-xs font-semibold rounded-md transition-all capitalize ${
                //   role === r ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                // }`}
                  className={`py-2 text-xs font-semibold rounded-md transition-all capitalize ${
                  role === r ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Login Type Switcher (only for user)
            {role === "user" && (
              <div className="flex justify-center gap-4 mb-2">
                <button
                  type="button"
                  onClick={() => setLoginType("email")}
                  className={`text-sm pb-1 border-b-2 transition-all ${
                    loginType === "email" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType("phone")}
                  className={`text-sm pb-1 border-b-2 transition-all ${
                    loginType === "phone" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                  }`}
                >
                  Mobile
                </button>
              </div>
            )} */}

            {/* Identifier Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                {loginType === "email" ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                {loginType === "email" ? "Email Address" : "Mobile Number"}
              </label>
              <div className="relative">
                {loginType === "phone" && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground border-r border-border pr-3">
                    +91
                  </span>
                )}
                <Input
                  type={loginType === "email" ? "email" : "tel"}
                  placeholder={loginType === "email" ? "your@email.com" : "10-digit number"}
                  className={loginType === "phone" ? "pl-16" : ""}
                  value={formData.identifier}
                  onChange={(e) =>
                    handleInputChange(
                      "identifier",
                      loginType === "phone" ? e.target.value.slice(0, 10) : e.target.value,
                    )
                  }
                />
              </div>
              {errors.identifier && <p className="text-xs text-destructive mt-1 font-medium">{errors.identifier}</p>}
            </div>

            {/* Password Input (not for guest phone login) */}
            {loginType === "email" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </label>
                  <button type="button" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pr-10"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive mt-1 font-medium">{errors.password}</p>}
              </div>
            )}

            <Button type="submit" className={`w-full h-11 text-base ${handleTabButtonColor(role)}`}>
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <button onClick={onRegister} className="text-primary font-bold hover:underline">
                Create Account
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
