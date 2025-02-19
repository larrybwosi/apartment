"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Filter, MoreVertical, Search } from "lucide-react"
import { payroll } from "@/lib/payroll-data"
import Pagination from "./pagination"

export function PayrollList() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly")

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
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
              <TableHead>Staff ID</TableHead>
              <TableHead>Name of Staff</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Working Hour</TableHead>
              <TableHead>Salary Rate</TableHead>
              <TableHead>Paid By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payroll.map((record) => (
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
                <TableCell>{record.role}</TableCell>
                <TableCell>{record.dateTime || "----------"}</TableCell>
                <TableCell>{record.workingHours}</TableCell>
                <TableCell>${record.salaryRate}</TableCell>
                <TableCell>{record.paidBy || "----------"}</TableCell>
                <TableCell>
                  {record.status === "Complete" ? (
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-600">
                      Complete
                    </Badge>
                  ) : (
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-7">
                      Pay Now
                    </Button>
                  )}
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

