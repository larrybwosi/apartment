"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Filter, MoreVertical, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { attendance } from "@/lib/attendance-data"
import Pagination from "./pagination"

export function AttendanceList() {
  const [selectedStaff, setSelectedStaff] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<string>("today")

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedStaff} onValueChange={setSelectedStaff}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Staff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Staff</SelectItem>
              <SelectItem value="active">Active Staff</SelectItem>
              <SelectItem value="inactive">Inactive Staff</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="working">Working On</SelectItem>
              <SelectItem value="check-out">Check Out</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
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
              <TableHead>Staff ID</TableHead>
              <TableHead>Staff Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Stay Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.map((record) => (
              <TableRow key={record.id} className="hover:bg-gray-50">
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell>#{record.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={record.avatar} />
                      <AvatarFallback>{record.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {record.name}
                  </div>
                </TableCell>
                <TableCell>{record.position}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.checkIn || "----------"}</TableCell>
                <TableCell>{record.checkOut || "----------"}</TableCell>
                <TableCell>{record.stayTime || "----------"}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-normal",
                      record.status === "Working On" && "bg-emerald-50 text-emerald-600",
                      record.status === "Check Out" && "bg-amber-50 text-amber-600",
                      record.status === "On Vacation" && "bg-blue-50 text-blue-600",
                    )}
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4" />
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

