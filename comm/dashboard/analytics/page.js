"use client"

import { BarChart, LineChart, PieChart, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data
const overviewStats = [
  {
    name: "Total Revenue",
    value: "$12,345",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Orders",
    value: "156",
    change: "+12.2%",
    trend: "up",
    icon: ShoppingBag,
  },
  {
    name: "Customers",
    value: "832",
    change: "+5.4%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Conversion Rate",
    value: "2.4%",
    change: "-0.8%",
    trend: "down",
    icon: TrendingUp,
  },
]

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your store's performance and growth</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {overviewStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center pt-1 text-xs">
                <span className={`flex items-center ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}{" "}
                  {stat.trend === "up" ? (
                    <TrendingUp className="ml-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="ml-1 h-3 w-3" />
                  )}
                </span>
                <span className="text-muted-foreground ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Sales Chart */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Compare sales performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg">
                <div className="flex flex-col items-center text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Sales chart visualization would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Distribution */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Sales Distribution</CardTitle>
              <CardDescription>Sales by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg">
                <div className="flex flex-col items-center text-center">
                  <PieChart className="h-16 w-16 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Distribution chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Traffic Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Where your customers are coming from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg">
            <div className="flex flex-col items-center text-center">
              <BarChart className="h-16 w-16 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Traffic sources chart would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

