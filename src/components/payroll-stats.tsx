import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

export function PayrollStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4 mb-6">
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employee</CardTitle>
          <span className="text-xs text-emerald-600 flex items-center">
            <ArrowUpIcon className="w-4 h-4 mr-1" />
            +10%
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,920</div>
          <p className="text-xs text-muted-foreground">Total Employee last 365 days</p>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Salary</CardTitle>
          <span className="text-xs text-emerald-600 flex items-center">
            <ArrowUpIcon className="w-4 h-4 mr-1" />
            +10%
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$565,630</div>
          <p className="text-xs text-muted-foreground">Total Salary last 365 days</p>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Pay</CardTitle>
          <span className="text-xs text-red-600 flex items-center">
            <ArrowDownIcon className="w-4 h-4 mr-1" />
            -15%
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$82,190</div>
          <p className="text-xs text-muted-foreground">Net Pay last 365 days</p>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Salary</CardTitle>
          <span className="text-xs text-emerald-600 flex items-center">
            <ArrowUpIcon className="w-4 h-4 mr-1" />
            +10%
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$51,920</div>
          <p className="text-xs text-muted-foreground">Pending Salary last 365 days</p>
        </CardContent>
      </Card>
    </div>
  )
}

