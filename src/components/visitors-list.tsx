"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileDown, Filter, MoreVertical, Search, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { visitors } from "@/lib/visitors-data"
import { VisitorType } from "@/types/visitor"
import { format } from "date-fns"
import { CheckOutDialog } from "./check-out-dialog"
import { CheckInDialog } from "./check-in-dialog"
import Pagination from "./pagination"

export function VisitorsList() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutOpen, setCheckOutOpen] = useState(false)
  const [selectedVisitor, setSelectedVisitor] = useState<(typeof visitors)[0] | null>(null)

  const getVisitorTypeLabel = (type: VisitorType) => {
    switch (type) {
      case VisitorType.GUEST:
        return "Guest"
      case VisitorType.MAINTENANCE:
        return "Maintenance"
      case VisitorType.DELIVERY:
        return "Delivery"
      case VisitorType.TOUR:
        return "Tour"
    }
  }

  const getVisitorTypeColor = (type: VisitorType) => {
    switch (type) {
      case VisitorType.GUEST:
        return "bg-blue-50 text-blue-600"
      case VisitorType.MAINTENANCE:
        return "bg-amber-50 text-amber-600"
      case VisitorType.DELIVERY:
        return "bg-purple-50 text-purple-600"
      case VisitorType.TOUR:
        return "bg-emerald-50 text-emerald-600"
    }
  }

  const handleCheckOut = (visitor: (typeof visitors)[0]) => {
    setSelectedVisitor(visitor)
    setCheckOutOpen(true)
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="guest">Guest</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="tour">Tour</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="bg-white">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="w-[280px] pl-8 bg-white" />
            </div>
            <Button variant="outline" className="bg-white hover:bg-gray-50">
              <FileDown className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" className="bg-white hover:bg-gray-50">
              <FileDown className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-50">
                <TableHead className="w-12">
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableHead>
                <TableHead>Visitor ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Luggage</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitors.map((visitor) => (
                <TableRow key={visitor.id} className="hover:bg-gray-50">
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">{visitor.id}</TableCell>
                  <TableCell>
                    {visitor.firstName} {visitor.lastName}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("font-normal", getVisitorTypeColor(visitor.type))}>
                      {getVisitorTypeLabel(visitor.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(visitor.checkInTime), "MMM d, yyyy h:mm a")}</TableCell>
                  <TableCell>
                    {visitor.checkOutTime ? format(new Date(visitor.checkOutTime), "MMM d, yyyy h:mm a") : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{visitor.email}</div>
                      <div className="text-sm text-muted-foreground">{visitor.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {visitor.type === VisitorType.GUEST && (
                      <div className="space-y-1">
                        <div className="text-sm">Apt: {visitor.apartmentNumber}</div>
                        <div className="text-sm text-muted-foreground">Host: {visitor.residentName}</div>
                      </div>
                    )}
                    {visitor.type === VisitorType.MAINTENANCE && (
                      <div className="space-y-1">
                        <div className="text-sm">WO: {visitor.workOrderNumber}</div>
                        <div className="text-sm text-muted-foreground">{visitor.description}</div>
                      </div>
                    )}
                    {visitor.type === VisitorType.DELIVERY && (
                      <div className="space-y-1">
                        <div className="text-sm">Tracking: {visitor.trackingNumber}</div>
                        <div className="text-sm text-muted-foreground">Apt: {visitor.apartmentNumber}</div>
                      </div>
                    )}
                    {visitor.type === VisitorType.TOUR && (
                      <div className="text-sm">Appointment: {visitor.appointmentId}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {visitor.luggage ? (
                      <Badge variant="outline" className="font-normal">
                        {visitor.luggage.length} items
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {!visitor.checkOutTime && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                          onClick={() => handleCheckOut(visitor)}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Check Out
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Information</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete Record</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination totalPages={14}/>
      </div>

      <CheckInDialog open={checkInOpen} onOpenChange={setCheckInOpen} />
      {selectedVisitor && (
        <CheckOutDialog open={checkOutOpen} onOpenChange={setCheckOutOpen} visitor={selectedVisitor} />
      )}
    </>
  )
}

