"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Package, Truck, MapPin, Building2, ChevronLeft } from "lucide-react"

interface RoleSelectionProps {
  onSelectRole: (role: "user" | "courier" | "company") => void
  onBack?: () => void
  onSignIn?: () => void // Added onSignIn prop
}

export default function RoleSelection({ onSelectRole, onBack, onSignIn }: RoleSelectionProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 px-4 relative">
      {onBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="absolute top-8 left-8 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Button>
      )}
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            <MapPin className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">CourierFlow</h1>
          <p className="mt-2 text-lg text-muted-foreground">Fast, reliable courier service at your fingertips</p>
          {onSignIn && ( // Added sign in prompt
            <p className="mt-4 text-sm text-muted-foreground">
              Already have an account?{" "}
              <button onClick={onSignIn} className="text-primary font-bold hover:underline">
                Sign In
              </button>
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Customer Role */}
          <Card className="flex cursor-pointer flex-col justify-between border-2 border-border p-8 transition-all hover:border-secondary hover:shadow-lg">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <Package className="h-6 w-6 text-secondary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Send a Package</h2>
              <p className="text-muted-foreground">
                Request a courier, track your delivery in real-time, and get your items delivered safely.
              </p>
            </div>
            <Button onClick={() => onSelectRole("user")} className="mt-6 w-full bg-secondary hover:bg-secondary/90">
              Continue as Customer
            </Button>
          </Card>

          {/* Courier Role */}
          <Card className="flex cursor-pointer flex-col justify-between border-2 border-border p-8 transition-all hover:border-primary hover:shadow-lg">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Deliver Packages</h2>
              <p className="text-muted-foreground">
                Accept delivery requests nearby, manage your route, and earn money with flexible hours.
              </p>
            </div>
            <Button onClick={() => onSelectRole("courier")} className="mt-6 w-full bg-primary hover:bg-primary/90">
              Continue as Courier
            </Button>
          </Card>

          {/* Company Role */}
          <Card className="flex cursor-pointer flex-col justify-between border-2 border-border p-8 transition-all hover:border-amber-500 hover:shadow-lg">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                <Building2 className="h-6 w-6 text-amber-500" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Manage Deliveries</h2>
              <p className="text-muted-foreground">
                Register your company, manage multiple couriers, track shipments, and scale your delivery operations.
              </p>
            </div>
            <Button onClick={() => onSelectRole("company")} className="mt-6 w-full bg-amber-500 hover:bg-amber-600">
              Continue as Company
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
