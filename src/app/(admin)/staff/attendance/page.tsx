import { AttendanceList } from "@/components/attendance-list"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Clock } from "lucide-react"

export default function AttendancePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Clock className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Staff Attendance</h1>
            <p className="text-sm text-muted-foreground">Auto-updates in 2 min</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Check In
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Check Out
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <AttendanceList />
    </div>
  )
}

