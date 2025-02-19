import { BookingReport } from "@/components/booking-report"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, BarChart2 } from "lucide-react"

export default function BookingReportPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <BarChart2 className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Booking Report</h1>
            <p className="text-sm text-muted-foreground">Auto-updates in 2 min</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <BookingReport />
    </div>
  )
}

