"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RequestFormProps {
  onSubmit: (data: any) => void
}

export default function RequestForm({ onSubmit }: RequestFormProps) {
  const [formData, setFormData] = useState({
    packageName: "",
    from: "",
    to: "",
    packageType: "documents",
    weight: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      packageName: "",
      from: "",
      to: "",
      packageType: "documents",
      weight: "",
      notes: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground">Package Name</label>
        <Input
          placeholder="e.g., Document Bundle"
          value={formData.packageName}
          onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Pickup Location</label>
        <Input
          placeholder="Enter pickup address"
          value={formData.from}
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Delivery Location</label>
        <Input
          placeholder="Enter delivery address"
          value={formData.to}
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Package Type</label>
        <Select
          value={formData.packageType}
          onValueChange={(value) => setFormData({ ...formData, packageType: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="documents">Documents</SelectItem>
            <SelectItem value="small">Small Package</SelectItem>
            <SelectItem value="medium">Medium Package</SelectItem>
            <SelectItem value="large">Large Package</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Weight (kg)</label>
        <Input
          type="number"
          placeholder="0.5"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Special Instructions</label>
        <Textarea
          placeholder="Any special handling instructions..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="resize-none"
        />
      </div>

      <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
        Submit Request
      </Button>
    </form>
  )
}
