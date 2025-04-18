import { PayrollList } from "@/components/payroll-list"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, DollarSign } from "lucide-react"
import { PayrollStats } from "@/components/payroll-stats"

export default function PayrollPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <DollarSign className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Payroll</h1>
            <p className="text-sm text-muted-foreground">Auto-updates in 2 min</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            New Payroll
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <PayrollStats />
      <PayrollList />
    </div>
  )
}

