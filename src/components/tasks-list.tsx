"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Filter, MoreVertical, Search, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { tasks } from "@/lib/tasks-data"
import Pagination from "./pagination"

export function TasksList() {
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
              <SelectItem value="pending">Pending</SelectItem>
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
              <TableHead>Room No</TableHead>
              <TableHead>Work Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Housekeeping Status</TableHead>
              <TableHead>Staff Assign</TableHead>
              <TableHead>Room Status</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.roomNo} className="hover:bg-gray-50">
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell>#{task.roomNo}</TableCell>
                <TableCell className="font-bold">{task.workType}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-semibold",
                      task.priority === "High" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600",
                    )}
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200">
                    {task.housekeepingStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {task.staffAssign.map((staff, index) => (
                      <Avatar key={index} className="w-6 h-6 border-2 border-white -ml-2 first:ml-0">
                        <AvatarImage src={staff.avatar} />
                        <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                    <Button variant="outline" size="icon" className="w-6 h-6 rounded-full">
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-bold",
                      task.roomStatus === "Working On" && "bg-emerald-50 text-emerald-600 font-bold",
                      task.roomStatus === "Pending" && "bg-amber-50 text-amber-600 font-bold",
                      task.roomStatus === "Clean and Finish" && "bg-blue-50 text-blue-600 font-bold",
                    )}
                  >
                    <p className='font-bold'>{task.roomStatus}</p>
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{task.note}</TableCell>
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

