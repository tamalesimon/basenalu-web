"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Upload, CheckCircle2, AlertCircle } from "lucide-react"

interface CompanyRegistrationProps {
  onBack: () => void
  onComplete: (data: any) => void
}

export default function CompanyRegistration({ onBack, onComplete }: CompanyRegistrationProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Company Info
    companyName: "",
    gstNumber: "",
    registrationNumber: "",
    companyEmail: "",
    businessPhone: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessZipCode: "",
    // Step 2: Contact Person
    contactPersonName: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    // Step 3: Banking
    bankAccountName: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankName: "",
    // Step 4: Login
    managerPassword: "",
    confirmPassword: "",
  })

  const [documents, setDocuments] = useState({
    businessLicense: null as File | null,
    gstCertificate: null as File | null,
    panCertificate: null as File | null,
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
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Company name is required"
      }
      if (!formData.gstNumber.match(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z0-9]{3}$/)) {
        newErrors.gstNumber = "Enter a valid GST number"
      }
      if (!formData.registrationNumber.trim()) {
        newErrors.registrationNumber = "Registration number is required"
      }
      if (!formData.companyEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.companyEmail = "Enter a valid email address"
      }
      if (!formData.businessPhone.match(/^\d{10}$/)) {
        newErrors.businessPhone = "Enter a valid 10-digit phone number"
      }
      if (!formData.businessAddress.trim()) {
        newErrors.businessAddress = "Business address is required"
      }
      if (!formData.businessCity.trim()) {
        newErrors.businessCity = "City is required"
      }
      if (!formData.businessState.trim()) {
        newErrors.businessState = "State is required"
      }
      if (!formData.businessZipCode.match(/^\d{6}$/)) {
        newErrors.businessZipCode = "Enter a valid 6-digit postal code"
      }
    } else if (stepNum === 2) {
      if (!formData.contactPersonName.trim()) {
        newErrors.contactPersonName = "Contact person name is required"
      }
      if (!formData.contactPersonPhone.match(/^\d{10}$/)) {
        newErrors.contactPersonPhone = "Enter a valid 10-digit phone number"
      }
      if (!formData.contactPersonEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.contactPersonEmail = "Enter a valid email address"
      }
    } else if (stepNum === 3) {
      if (!formData.bankAccountName.trim()) {
        newErrors.bankAccountName = "Account holder name is required"
      }
      if (!formData.bankAccountNumber.match(/^\d{9,18}$/)) {
        newErrors.bankAccountNumber = "Enter a valid bank account number"
      }
      if (!formData.bankIFSC.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) {
        newErrors.bankIFSC = "Enter a valid IFSC code"
      }
      if (!formData.bankName.trim()) {
        newErrors.bankName = "Bank name is required"
      }
      if (!documents.businessLicense) {
        newErrors.businessLicense = "Business license is required"
      }
      if (!documents.gstCertificate) {
        newErrors.gstCertificate = "GST certificate is required"
      }
      if (!documents.bankProof) {
        newErrors.bankProof = "Bank proof is required"
      }
    } else if (stepNum === 4) {
      if (formData.managerPassword.length < 8) {
        newErrors.managerPassword = "Password must be at least 8 characters"
      }
      if (formData.managerPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
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
        type: "company",
        ...formData,
        documents,
      })
    }
  }

  const stepTitles = ["Company Information", "Contact Details", "Banking Information", "Security Setup"]

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">{stepTitles[0]}</h2>
      <p className="text-sm text-muted-foreground">Tell us about your company</p>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
        <Input
          type="text"
          placeholder="Your company name"
          value={formData.companyName}
          onChange={(e) => handleInputChange("companyName", e.target.value)}
        />
        {errors.companyName && <p className="text-sm text-destructive mt-1">{errors.companyName}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">GST Number</label>
          <Input
            type="text"
            placeholder="15-digit GST number"
            value={formData.gstNumber}
            onChange={(e) => handleInputChange("gstNumber", e.target.value.toUpperCase())}
          />
          {errors.gstNumber && <p className="text-sm text-destructive mt-1">{errors.gstNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Registration Number</label>
          <Input
            type="text"
            placeholder="Company registration number"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
          />
          {errors.registrationNumber && <p className="text-sm text-destructive mt-1">{errors.registrationNumber}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Company Email</label>
          <Input
            type="email"
            placeholder="company@email.com"
            value={formData.companyEmail}
            onChange={(e) => handleInputChange("companyEmail", e.target.value)}
          />
          {errors.companyEmail && <p className="text-sm text-destructive mt-1">{errors.companyEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Business Phone</label>
          <div className="flex gap-2">
            <span className="flex items-center px-3 bg-muted text-muted-foreground border border-border rounded-lg">
              +91
            </span>
            <Input
              type="tel"
              placeholder="10-digit number"
              value={formData.businessPhone}
              onChange={(e) => handleInputChange("businessPhone", e.target.value.slice(0, 10))}
            />
          </div>
          {errors.businessPhone && <p className="text-sm text-destructive mt-1">{errors.businessPhone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Business Address</label>
        <Input
          type="text"
          placeholder="Street address"
          value={formData.businessAddress}
          onChange={(e) => handleInputChange("businessAddress", e.target.value)}
        />
        {errors.businessAddress && <p className="text-sm text-destructive mt-1">{errors.businessAddress}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">City</label>
          <Input
            type="text"
            placeholder="City"
            value={formData.businessCity}
            onChange={(e) => handleInputChange("businessCity", e.target.value)}
          />
          {errors.businessCity && <p className="text-sm text-destructive mt-1">{errors.businessCity}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">State</label>
          <Input
            type="text"
            placeholder="State"
            value={formData.businessState}
            onChange={(e) => handleInputChange("businessState", e.target.value)}
          />
          {errors.businessState && <p className="text-sm text-destructive mt-1">{errors.businessState}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Postal Code</label>
          <Input
            type="text"
            placeholder="6-digit code"
            value={formData.businessZipCode}
            onChange={(e) => handleInputChange("businessZipCode", e.target.value.slice(0, 6))}
          />
          {errors.businessZipCode && <p className="text-sm text-destructive mt-1">{errors.businessZipCode}</p>}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">{stepTitles[1]}</h2>
      <p className="text-sm text-muted-foreground">Who should we contact for shipment inquiries?</p>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Contact Person Name</label>
        <Input
          type="text"
          placeholder="Full name"
          value={formData.contactPersonName}
          onChange={(e) => handleInputChange("contactPersonName", e.target.value)}
        />
        {errors.contactPersonName && <p className="text-sm text-destructive mt-1">{errors.contactPersonName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Contact Person Phone</label>
        <div className="flex gap-2">
          <span className="flex items-center px-3 bg-muted text-muted-foreground border border-border rounded-lg">
            +91
          </span>
          <Input
            type="tel"
            placeholder="10-digit number"
            value={formData.contactPersonPhone}
            onChange={(e) => handleInputChange("contactPersonPhone", e.target.value.slice(0, 10))}
          />
        </div>
        {errors.contactPersonPhone && <p className="text-sm text-destructive mt-1">{errors.contactPersonPhone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Contact Person Email</label>
        <Input
          type="email"
          placeholder="contact@company.com"
          value={formData.contactPersonEmail}
          onChange={(e) => handleInputChange("contactPersonEmail", e.target.value)}
        />
        {errors.contactPersonEmail && <p className="text-sm text-destructive mt-1">{errors.contactPersonEmail}</p>}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">{stepTitles[2]}</h2>
      <p className="text-sm text-muted-foreground">Provide your banking and legal documents</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Account Holder Name</label>
          <Input
            type="text"
            placeholder="Name on bank account"
            value={formData.bankAccountName}
            onChange={(e) => handleInputChange("bankAccountName", e.target.value)}
          />
          {errors.bankAccountName && <p className="text-sm text-destructive mt-1">{errors.bankAccountName}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bank Name</label>
            <Input
              type="text"
              placeholder="E.g., HDFC Bank"
              value={formData.bankName}
              onChange={(e) => handleInputChange("bankName", e.target.value)}
            />
            {errors.bankName && <p className="text-sm text-destructive mt-1">{errors.bankName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bank Account Number</label>
            <Input
              type="text"
              placeholder="Account number"
              value={formData.bankAccountNumber}
              onChange={(e) => handleInputChange("bankAccountNumber", e.target.value)}
            />
            {errors.bankAccountNumber && <p className="text-sm text-destructive mt-1">{errors.bankAccountNumber}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">IFSC Code</label>
          <Input
            type="text"
            placeholder="E.g., HDFC0000001"
            value={formData.bankIFSC}
            onChange={(e) => handleInputChange("bankIFSC", e.target.value.toUpperCase())}
          />
          {errors.bankIFSC && <p className="text-sm text-destructive mt-1">{errors.bankIFSC}</p>}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <p className="font-semibold text-foreground">Required Documents</p>

        <DocumentUpload
          label="Business License / Registration Certificate"
          value={documents.businessLicense?.name}
          onChange={(file) => handleFileChange("businessLicense", file)}
          error={errors.businessLicense}
        />

        <DocumentUpload
          label="GST Certificate"
          value={documents.gstCertificate?.name}
          onChange={(file) => handleFileChange("gstCertificate", file)}
          error={errors.gstCertificate}
        />

        <DocumentUpload
          label="PAN Certificate (Optional)"
          value={documents.panCertificate?.name}
          onChange={(file) => handleFileChange("panCertificate", file)}
          error={errors.panCertificate}
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

  const renderStep4 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">{stepTitles[3]}</h2>
      <p className="text-sm text-muted-foreground">Set up your manager login credentials</p>

      <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
        <p className="text-sm text-foreground">
          Create a strong password to secure your company account. This will be used for all managers in your company.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Manager Password</label>
        <Input
          type="password"
          placeholder="At least 8 characters with mix of letters and numbers"
          value={formData.managerPassword}
          onChange={(e) => handleInputChange("managerPassword", e.target.value)}
        />
        {errors.managerPassword && <p className="text-sm text-destructive mt-1">{errors.managerPassword}</p>}
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-500/5 to-orange-500/5 px-4 py-8">
      <div className="w-full max-w-2xl">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Role Selection
        </button>

        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${s <= step ? "bg-amber-500" : "bg-border"}`}
            />
          ))}
        </div>

        <Card className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white font-semibold">
                {step}
              </div>
              <h1 className="text-2xl font-bold text-foreground">Company Registration</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Step {step} of 4</p>
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button onClick={() => setStep(step - 1)} variant="outline" className="flex-1">
                Previous
              </Button>
            )}
            {step < 4 && (
              <Button onClick={handleNext} className="flex-1 bg-amber-500 hover:bg-amber-600">
                Next
              </Button>
            )}
            {step === 4 && (
              <Button onClick={handleSubmit} className="flex-1 bg-amber-500 hover:bg-amber-600">
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
          dragActive ? "border-amber-500 bg-amber-500/5" : "border-border hover:border-amber-500/50"
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
