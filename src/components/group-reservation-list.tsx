"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Filter, MoreHorizontal, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { groupReservations } from "@/lib/group-reservation-data"
import Pagination from "./pagination"

export function GroupReservationList() {
  const [selectedBooking, setSelectedBooking] = useState<string>("all")
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedBooking} onValueChange={setSelectedBooking}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Booking" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Booking</SelectItem>
              <SelectItem value="today">Today's Booking</SelectItem>
              <SelectItem value="upcoming">Upcoming Booking</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Group</SelectItem>
              <SelectItem value="travel">Travel Agency</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Type & Room" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="single">Single Room</SelectItem>
              <SelectItem value="double">Double Room</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
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
              <TableHead>Booking No</TableHead>
              <TableHead>Type & Room</TableHead>
              <TableHead>Group Name</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Paid Amount</TableHead>
              <TableHead>Due Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupReservations.map((reservation) => (
              <TableRow key={reservation.id} className="hover:bg-gray-50">
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell>#{reservation.id}</TableCell>
                <TableCell>
                  {reservation.type}
                  <Badge variant="secondary" className="ml-2 bg-gray-100">
                    +{reservation.additionalRooms}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={reservation.groupAvatar} />
                      <AvatarFallback>{reservation.groupName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {reservation.groupName}
                  </div>
                </TableCell>
                <TableCell>{reservation.checkIn}</TableCell>
                <TableCell>{reservation.checkOut}</TableCell>
                <TableCell>${reservation.paidAmount}</TableCell>
                <TableCell>${reservation.dueAmount}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-normal",
                      reservation.status === "Cash - Paid" && "bg-emerald-50 text-emerald-600",
                      reservation.status === "Online - Paid" && "bg-emerald-50 text-emerald-600",
                      reservation.status === "Pending" && "bg-amber-50 text-amber-600",
                    )}
                  >
                    {reservation.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      
      <Pagination totalPages={15}/>
    </div>
  )
}

