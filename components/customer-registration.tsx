"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Phone, Mail } from "lucide-react"

interface CustomerRegistrationProps {
  onBack: () => void
  onComplete: (user: any) => void
}

export default function CustomerRegistration({ onBack, onComplete }: CustomerRegistrationProps) {
  const [step, setStep] = useState<"type" | "guest" | "full">("type")
  const [formData, setFormData] = useState({
    phoneNumber: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleGuestSubmit = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.phoneNumber.match(/^\d{10}$/)) {
      newErrors.phoneNumber = "Enter a valid 10-digit mobile number"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onComplete({
      type: "guest",
      phoneNumber: formData.phoneNumber,
      name: `Guest-${formData.phoneNumber.slice(-4)}`,
    })
  }

  const handleFullSubmit = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.phoneNumber.match(/^\d{10}$/)) {
      newErrors.phoneNumber = "Enter a valid 10-digit mobile number"
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Enter a valid email address"
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onComplete({
      type: "full",
      phoneNumber: formData.phoneNumber,
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  if (step === "type") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 px-4">
        <div className="w-full max-w-2xl">
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Role Selection
          </button>

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">Create Your Account</h1>
            <p className="mt-2 text-muted-foreground">Choose how you want to get started</p>
          </div>

          <div className="grid gap-4">
            {/* Guest Registration */}
            <Card
              onClick={() => setStep("guest")}
              className="cursor-pointer border-2 border-border p-6 transition-all hover:border-secondary hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-foreground">Continue as Guest</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Quick registration with just your mobile number. Perfect for one-time deliveries.
                  </p>
                </div>
                <ChevronRight />
              </div>
            </Card>

            {/* Full Registration */}
            <Card
              onClick={() => setStep("full")}
              className="cursor-pointer border-2 border-border p-6 transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-foreground">Full Account</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete registration with email, password, and profile. Save your preferences and track history.
                  </p>
                </div>
                <ChevronRight />
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 px-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => setStep("type")}
          className="mb-8 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {step === "guest" ? "Guest Registration" : "Full Registration"}
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              {step === "guest" ? "Enter your mobile number to get started" : "Complete your profile information"}
            </p>
          </div>

          <div className="space-y-4">
            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Mobile Number</label>
              <div className="flex gap-2">
                <span className="flex items-center px-3 bg-muted text-muted-foreground border border-border rounded-lg">
                  +91
                </span>
                <Input
                  type="tel"
                  placeholder="10-digit number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value.slice(0, 10))}
                  className="flex-1"
                />
              </div>
              {errors.phoneNumber && <p className="text-sm text-destructive mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Full Registration Fields */}
            {step === "full" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                  {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                  <Input
                    type="password"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                  {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  />
                  {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>}
                </div>
              </>
            )}
          </div>

          <Button
            onClick={step === "guest" ? handleGuestSubmit : handleFullSubmit}
            className="w-full mt-6 bg-primary hover:bg-primary/90"
          >
            Continue
          </Button>
        </Card>
      </div>
    </div>
  )
}

function ChevronRight() {
  return (
    <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}
