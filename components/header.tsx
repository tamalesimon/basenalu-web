"use client"

import { Button } from "@/components/ui/button"
import { MapPin, LogOut } from "lucide-react"

interface HeaderProps {
  role: "user" | "courier"
  onChangeRole: () => void
}

export default function Header({ role, onChangeRole }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            <MapPin className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">CourierFlow</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            {role === "user" ? "Customer" : "Courier"} Mode
          </span>
          <Button variant="outline" size="sm" onClick={onChangeRole} className="flex items-center gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Switch Role
          </Button>
        </div>
      </div>
    </header>
  )
}
