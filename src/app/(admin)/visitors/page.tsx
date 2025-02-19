import { VisitorsList } from "@/components/visitors-list"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Users } from "lucide-react"

export default function VisitorsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Users className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Visitors</h1>
            <p className="text-sm text-muted-foreground">Auto-updates in 2 min</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Check In Visitor
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <VisitorsList />
    </div>
  )
}

// Add the checkin visitor, search filtre and more. Also add the view, edit and delete modals. In the checkin modal, you can add the necessary fields for each type. The modal should have tabs for each typeof visitor and the apartment field should be a select, guest visitors can also shave the option to search a room by using the users who are in the current apartment.