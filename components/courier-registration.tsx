"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Upload, CheckCircle2, AlertCircle } from "lucide-react"

interface CourierRegistrationProps {
  onBack: () => void
  onComplete: (data: any) => void
}

export default function CourierRegistration({ onBack, onComplete }: CourierRegistrationProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    phoneNumber: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Step 2: Vehicle Info
    vehicleType: "motorcycle",
    vehicleNumber: "",
    licenseNumber: "",
    // Step 3: KYC & Documents
    aadharNumber: "",
    panNumber: "",
    bankAccount: "",
    bankIFSC: "",
  })

  const [documents, setDocuments] = useState({
    aadharFile: null as File | null,
    panFile: null as File | null,
    licenseFile: null as File | null,
    vehicleRC: null as File | null,
    bankProof: null as File | null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileChange = (field: string, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [field]: file }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (stepNum === 1) {
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
    } else if (stepNum === 2) {
      if (!formData.vehicleNumber.trim()) {
        newErrors.vehicleNumber = "Vehicle number is required"
      }
      if (!formData.licenseNumber.trim()) {
        newErrors.licenseNumber = "License number is required"
      }
    } else if (stepNum === 3) {
      if (!formData.aadharNumber.match(/^\d{12}$/)) {
        newErrors.aadharNumber = "Enter a valid 12-digit Aadhar number"
      }
      if (!formData.panNumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) {
        newErrors.panNumber = "Enter a valid PAN number"
      }
      if (!documents.aadharFile) {
        newErrors.aadharFile = "Aadhar document is required"
      }
      if (!documents.panFile) {
        newErrors.panFile = "PAN document is required"
      }
      if (!documents.licenseFile) {
        newErrors.licenseFile = "License document is required"
      }
      if (!documents.vehicleRC) {
        newErrors.vehicleRC = "Vehicle RC document is required"
      }
      if (!documents.bankProof) {
        newErrors.bankProof = "Bank proof is required"
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }
    return true
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleSubmit = () => {
    if (validateStep(step)) {
      onComplete({
        ...formData,
        documents,
      })
    }
  }

  const stepTitles = ["Account Information", "Vehicle Details", "KYC & Documents"]

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">{stepTitles[0]}</h2>
      <p className="text-sm text-muted-foreground">Create your courier account</p>

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
          />
        </div>
        {errors.phoneNumber && <p className="text-sm text-destructive mt-1">{errors.phoneNumber}</p>}
      </div>

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
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">{stepTitles[1]}</h2>
      <p className="text-sm text-muted-foreground">Tell us about your delivery vehicle</p>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Vehicle Type</label>
        <select
          value={formData.vehicleType}
          onChange={(e) => handleInputChange("vehicleType", e.target.value)}
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
        >
          <option value="motorcycle">Motorcycle/Scooter</option>
          <option value="car">Car</option>
          <option value="van">Van</option>
          <option value="bicycle">Bicycle</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Vehicle Number / Registration</label>
        <Input
          type="text"
          placeholder="e.g., DL-01-AB-1234"
          value={formData.vehicleNumber}
          onChange={(e) => handleInputChange("vehicleNumber", e.target.value)}
          className="uppercase"
        />
        {errors.vehicleNumber && <p className="text-sm text-destructive mt-1">{errors.vehicleNumber}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Driving License Number</label>
        <Input
          type="text"
          placeholder="Your license number"
          value={formData.licenseNumber}
          onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
        />
        {errors.licenseNumber && <p className="text-sm text-destructive mt-1">{errors.licenseNumber}</p>}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">{stepTitles[2]}</h2>
      <p className="text-sm text-muted-foreground">Please provide your KYC details and documents</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Aadhar Number</label>
          <Input
            type="text"
            placeholder="12-digit number"
            value={formData.aadharNumber}
            onChange={(e) => handleInputChange("aadharNumber", e.target.value.slice(0, 12))}
          />
          {errors.aadharNumber && <p className="text-sm text-destructive mt-1">{errors.aadharNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">PAN Number</label>
          <Input
            type="text"
            placeholder="ABCDE1234F"
            value={formData.panNumber}
            onChange={(e) => handleInputChange("panNumber", e.target.value.toUpperCase())}
          />
          {errors.panNumber && <p className="text-sm text-destructive mt-1">{errors.panNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Bank Account Number</label>
          <Input
            type="text"
            placeholder="Your account number"
            value={formData.bankAccount}
            onChange={(e) => handleInputChange("bankAccount", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Bank IFSC Code</label>
          <Input
            type="text"
            placeholder="BANK0001234"
            value={formData.bankIFSC}
            onChange={(e) => handleInputChange("bankIFSC", e.target.value.toUpperCase())}
          />
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-semibold text-foreground">Required Documents</p>

        <DocumentUpload
          label="Aadhar Card (Photo/PDF)"
          value={documents.aadharFile?.name}
          onChange={(file) => handleFileChange("aadharFile", file)}
          error={errors.aadharFile}
        />

        <DocumentUpload
          label="PAN Card (Photo/PDF)"
          value={documents.panFile?.name}
          onChange={(file) => handleFileChange("panFile", file)}
          error={errors.panFile}
        />

        <DocumentUpload
          label="Driving License (Photo/PDF)"
          value={documents.licenseFile?.name}
          onChange={(file) => handleFileChange("licenseFile", file)}
          error={errors.licenseFile}
        />

        <DocumentUpload
          label="Vehicle RC (Registration Certificate)"
          value={documents.vehicleRC?.name}
          onChange={(file) => handleFileChange("vehicleRC", file)}
          error={errors.vehicleRC}
        />

        <DocumentUpload
          label="Bank Proof (Passbook/Cancelled Cheque)"
          value={documents.bankProof?.name}
          onChange={(file) => handleFileChange("bankProof", file)}
          error={errors.bankProof}
        />
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 px-4 py-8">
      <div className="w-full max-w-2xl">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Role Selection
        </button>

        {/* Progress Indicator */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                {step}
              </div>
              <h1 className="text-2xl font-bold text-foreground">Courier Registration</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Step {step} of 3</p>
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button onClick={() => setStep(step - 1)} variant="outline" className="flex-1">
                Previous
              </Button>
            )}
            {step < 3 && (
              <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90">
                Next
              </Button>
            )}
            {step === 3 && (
              <Button onClick={handleSubmit} className="flex-1 bg-primary hover:bg-primary/90">
                Complete Registration
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

interface DocumentUploadProps {
  label: string
  value?: string
  onChange: (file: File | null) => void
  error?: string
}

function DocumentUpload({ label, value, onChange, error }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) {
      onChange(e.dataTransfer.files[0])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        } ${error ? "border-destructive" : ""}`}
      >
        <input
          type="file"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="hidden"
          id={label}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <label htmlFor={label} className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload className="h-5 w-5 text-muted-foreground" />
          {value ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm text-foreground font-medium">{value}</span>
            </div>
          ) : (
            <>
              <span className="text-sm font-medium text-foreground">Click to upload or drag and drop</span>
              <span className="text-xs text-muted-foreground">PDF, JPG, or PNG (max 5MB)</span>
            </>
          )}
        </label>
      </div>
      {error && (
        <div className="flex items-center gap-1 text-sm text-destructive mt-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  )
}
