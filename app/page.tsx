"use client"

import { useState } from "react"
import Header from "@/components/header"
import RoleSelection from "@/components/role-selection"
import UserDashboard from "@/components/user-dashboard"
import CourierDashboard from "@/components/courier-dashboard"
import CustomerRegistration from "@/components/customer-registration"
import CourierRegistration from "@/components/courier-registration"
import LandingPage from "@/components/landing-page"
import CompanyRegistration from "@/components/company-registration"
import CompanyDashboard from "@/components/company-dashboard"
import SignIn from "@/components/sign-in" // Added sign-in component import

export default function Home() {
  const [userRole, setUserRole] = useState<"user" | "courier" | "company" | null>(null)
  const [registrationStep, setRegistrationStep] = useState<
    "landing" | "role" | "register" | "signin" | "dashboard" | null
  >(
    "landing", // Added 'signin' to registrationStep type
  )
  const [user, setUser] = useState<any>(null)

  if (registrationStep === "landing") {
    return (
      <LandingPage
        onGetStarted={() => {
          setRegistrationStep("role")
        }}
        onSignIn={() => {
          // Added sign in handler for landing page
          setRegistrationStep("signin")
        }}
      />
    )
  }

  if (registrationStep === "signin") {
    return (
      <SignIn
        onBack={() => setRegistrationStep("landing")}
        onRegister={() => setRegistrationStep("role")}
        onComplete={(userData, role) => {
          setUser(userData)
          setUserRole(role)
          setRegistrationStep("dashboard")
        }}
      />
    )
  }

  // Initial state - show role selection
  if (!registrationStep || registrationStep === "role") {
    return (
      <RoleSelection
        onSelectRole={(role) => {
          setUserRole(role)
          setRegistrationStep("register")
        }}
        onBack={() => setRegistrationStep("landing")}
        onSignIn={() => setRegistrationStep("signin")} // Added sign in handler for role selection
      />
    )
  }

  // Customer Registration Flow
  if (userRole === "user" && registrationStep === "register") {
    return (
      <CustomerRegistration
        onBack={() => {
          setUserRole(null)
          setRegistrationStep("role")
        }}
        onComplete={(userData) => {
          setUser(userData)
          setRegistrationStep("dashboard")
        }}
      />
    )
  }

  // Courier Registration Flow
  if (userRole === "courier" && registrationStep === "register") {
    return (
      <CourierRegistration
        onBack={() => {
          setUserRole(null)
          setRegistrationStep("role")
        }}
        onComplete={(courierData) => {
          setUser(courierData)
          setRegistrationStep("dashboard")
        }}
      />
    )
  }

  // Company Registration Flow
  if (userRole === "company" && registrationStep === "register") {
    return (
      <CompanyRegistration
        onBack={() => {
          setUserRole(null)
          setRegistrationStep("role")
        }}
        onComplete={(companyData) => {
          setUser(companyData)
          setRegistrationStep("dashboard")
        }}
      />
    )
  }

  // Dashboard after registration
  if (registrationStep === "dashboard" && userRole) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          role={userRole}
          onChangeRole={() => {
            setUserRole(null)
            setRegistrationStep("landing")
            setUser(null)
          }}
        />
        {userRole === "user" ? <UserDashboard /> : userRole === "courier" ? <CourierDashboard /> : <CompanyDashboard />}
      </div>
    )
  }

  return null
}
