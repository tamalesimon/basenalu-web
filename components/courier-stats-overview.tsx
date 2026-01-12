import { Card } from "@/components/ui/card"
import { Truck, TrendingUp, DollarSign, Clock } from "lucide-react"
import { formatEarnings } from "@/lib/courier-management"
import type { CourierStats } from "@/lib/courier-management"

interface CourierStatsOverviewProps {
  stats: CourierStats
}

export default function CourierStatsOverview({ stats }: CourierStatsOverviewProps) {
  const statCards = [
    {
      label: "Completed Deliveries",
      value: stats.completedDeliveries,
      icon: Truck,
      color: "text-primary",
    },
    {
      label: "Acceptance Rate",
      value: `${(stats.acceptanceRate * 100).toFixed(0)}%`,
      icon: TrendingUp,
      color: "text-secondary",
    },
    {
      label: "Total Earnings",
      value: formatEarnings(stats.totalEarnings),
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      label: "Avg Response Time",
      value: `${stats.responseTime}m`,
      icon: Clock,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <Icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
