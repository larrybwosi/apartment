"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer } from "recharts"

const data = [
  { value: 10000 },
  { value: 11200 },
  { value: 10800 },
  { value: 11500 },
  { value: 12000 },
  { value: 12500 },
  { value: 12920 },
]

const revenueData = [
  { value: 10000 },
  { value: 10500 },
  { value: 11000 },
  { value: 11800 },
  { value: 12200 },
  { value: 12500 },
  { value: 12920 },
]

const engagementData = [
  { value: 20 },
  { value: 22 },
  { value: 25 },
  { value: 27 },
  { value: 28 },
  { value: 29 },
  { value: 30 },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Promotions</CardTitle>
          <span className="text-xs text-muted-foreground">last 365 days</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,920</div>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue from Promotions</CardTitle>
          <span className="text-xs text-muted-foreground">last 365 days</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,920</div>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
          <span className="text-xs text-muted-foreground">last 365 days</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">30%</div>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

