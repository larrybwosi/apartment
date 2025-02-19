"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Filter, MoreHorizontal, Search, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { maintenance } from "@/lib/maintenance-data"
import Pagination from "./pagination"

export function MaintenanceList() {
  const [selectedMaker, setSelectedMaker] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly")

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedMaker} onValueChange={setSelectedMaker}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Maker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Maker</SelectItem>
              <SelectItem value="active">Active Maker</SelectItem>
              <SelectItem value="inactive">Inactive Maker</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Monthly" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
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
              <TableHead>Maker Assign</TableHead>
              <TableHead>Cost Maintenance</TableHead>
              <TableHead>Maintenance Status</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenance.map((item) => (
              <TableRow key={item.roomNo} className="hover:bg-gray-50">
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell>#{item.roomNo}</TableCell>
                <TableCell>{item.workType}</TableCell>
                <TableCell>
                  <Select defaultValue={item.priority}>
                    <SelectTrigger
                      className={cn(
                        "w-[100px] h-8",
                        item.priority === "High"
                          ? "bg-red-50 text-red-600 border-red-100"
                          : "bg-emerald-50 text-emerald-600 border-emerald-100",
                      )}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {item.makerAssign.map((maker, index) => (
                      <Avatar key={index} className="w-6 h-6 border-2 border-white -ml-2 first:ml-0">
                        <AvatarImage src={maker.avatar} />
                        <AvatarFallback>{maker.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                    <Button variant="outline" size="icon" className="w-6 h-6 rounded-full">
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>${item.costMaintenance.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-normal",
                      item.status === "Working On" && "bg-emerald-50 text-emerald-600",
                      item.status === "Pending" && "bg-amber-50 text-amber-600",
                      item.status === "Finish Work" && "bg-blue-50 text-blue-600",
                    )}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.note}</TableCell>
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

