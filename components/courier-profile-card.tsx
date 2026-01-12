import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle } from "lucide-react"
import { calculatePerformanceScore, getPerformanceLevel } from "@/lib/courier-management"
import type { CourierProfile, CourierStats } from "@/lib/courier-management"

interface CourierProfileCardProps {
  profile: CourierProfile
  stats: CourierStats
}

export default function CourierProfileCard({ profile, stats }: CourierProfileCardProps) {
  const performanceScore = calculatePerformanceScore(stats)
  const performanceLevel = getPerformanceLevel(performanceScore)

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-foreground">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">
              {profile.vehicleType.charAt(0).toUpperCase() + profile.vehicleType.slice(1)}
            </p>
          </div>
          <Badge className={performanceLevel.color}>{performanceLevel.level}</Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-foreground">{profile.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({stats.completedDeliveries} deliveries)</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-border pt-4">
        {/* Verification Status */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Verification Status</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle
                className={`h-4 w-4 ${profile.documentVerified ? "text-green-500" : "text-muted-foreground"}`}
              />
              <span className={profile.documentVerified ? "text-foreground" : "text-muted-foreground"}>
                Documents {profile.documentVerified ? "Verified" : "Pending"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle
                className={`h-4 w-4 ${profile.backgroundCheckPassed ? "text-green-500" : "text-muted-foreground"}`}
              />
              <span className={profile.backgroundCheckPassed ? "text-foreground" : "text-muted-foreground"}>
                Background Check {profile.backgroundCheckPassed ? "Passed" : "Pending"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle
                className={`h-4 w-4 ${profile.bankAccountVerified ? "text-green-500" : "text-muted-foreground"}`}
              />
              <span className={profile.bankAccountVerified ? "text-foreground" : "text-muted-foreground"}>
                Bank Account {profile.bankAccountVerified ? "Verified" : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-1 border-t border-border pt-3 text-sm">
          <p className="text-muted-foreground">Email: {profile.email}</p>
          <p className="text-muted-foreground">Phone: {profile.phone}</p>
          <p className="text-muted-foreground">Joined: {profile.joinedDate.toLocaleDateString()}</p>
        </div>
      </div>
    </Card>
  )
}
