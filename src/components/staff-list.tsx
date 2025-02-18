"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Filter, MoreVertical, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { staff } from "@/lib/staff-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function StaffList() {
  const [selectedPosition, setSelectedPosition] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedStaff, setSelectedStaff] = useState<Staff>(null)
  const [showModal, setShowModal] = useState(false)

  const handleViewDetails = (member) => {
    setSelectedStaff(member)
    setShowModal(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedPosition} onValueChange={setSelectedPosition}>
            <SelectTrigger className="w-[180px] bg-white border-gray-200">
              <SelectValue placeholder="All Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Position</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px] bg-white border-gray-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="bg-white border-gray-200">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="w-[280px] pl-8 bg-white border-gray-200" />
          </div>
          <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-200">
            <FileDown className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-200">
            <FileDown className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-100">
              <TableHead className="w-12 py-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableHead>
              <TableHead className="py-3 text-sm font-medium">Staff ID</TableHead>
              <TableHead className="py-3 text-sm font-medium">Staff Name</TableHead>
              <TableHead className="py-3 text-sm font-medium">Position</TableHead>
              <TableHead className="py-3 text-sm font-medium">Hire Date</TableHead>
              <TableHead className="py-3 text-sm font-medium">Agreement</TableHead>
              <TableHead className="py-3 text-sm font-medium">Hire Type</TableHead>
              <TableHead className="py-3 text-sm font-medium">Salary Rate</TableHead>
              <TableHead className="py-3 text-sm font-medium">Status</TableHead>
              <TableHead className="w-12 py-3"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id} className="hover:bg-gray-50 transition-colors border-t border-gray-200">
                <TableCell className="py-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell className="font-medium text-gray-600 py-3">{member.id}</TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 border border-gray-200">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gray-100 text-gray-600">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-600 font-medium">{member.position}</TableCell>
                <TableCell className="py-3 text-gray-600">{member.hireDate}</TableCell>
                <TableCell className="py-3 text-gray-600">{member.agreement}</TableCell>
                <TableCell className="py-3 text-gray-600">{member.hireType}</TableCell>
                <TableCell className="py-3 text-gray-600 font-medium">${member.salaryRate}</TableCell>
                <TableCell className="py-3">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-normal px-3 py-1 rounded-full",
                      member.status === "Active Staff" && "bg-emerald-50 text-emerald-600 border border-emerald-200",
                      member.status === "Pending Staff" && "bg-amber-50 text-amber-600 border border-amber-200",
                      member.status === "Inactive Staff" && "bg-red-50 text-red-600 border border-red-200",
                    )}
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border border-gray-200 shadow-md">
                      <DropdownMenuItem onClick={() => handleViewDetails(member)} className="cursor-pointer hover:bg-gray-50">
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">Edit Staff</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 cursor-pointer hover:bg-red-50">Delete Staff</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <Button variant="outline" className="w-[100px] bg-white hover:bg-gray-50 border-gray-200">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {[1, 2, "...", 12, 13, 14].map((page, i) => (
            <Button
              key={i}
              variant="outline"
              size="icon"
              className={cn(
                "w-8 h-8 transition-colors",
                page === 1 ? "bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600" : "bg-white hover:bg-gray-50 border-gray-200",
              )}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button variant="outline" className="w-[100px] bg-white hover:bg-gray-50 border-gray-200">
          Next
        </Button>
      </div>

      {/* Staff Details Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Staff Details</DialogTitle>
            <DialogDescription>Comprehensive information about the selected staff member</DialogDescription>
            <DialogClose className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </DialogHeader>
          
          {selectedStaff && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Left Column - Personal Info */}
              <div className="col-span-1">
                <Card className="border border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center mb-6">
                      <Avatar className="w-24 h-24 mb-4 border-2 border-gray-200">
                        <AvatarImage src={selectedStaff.avatar} alt={selectedStaff.name} />
                        <AvatarFallback className="text-2xl">{selectedStaff.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-medium">{selectedStaff.name}</h3>
                      <p className="text-gray-500">{selectedStaff.position}</p>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "mt-2 font-normal px-3 py-1 rounded-full",
                          selectedStaff.status === "Active Staff" && "bg-emerald-50 text-emerald-600 border border-emerald-200",
                          selectedStaff.status === "Pending Staff" && "bg-amber-50 text-amber-600 border border-amber-200",
                          selectedStaff.status === "Inactive Staff" && "bg-red-50 text-red-600 border border-red-200",
                        )}
                      >
                        {selectedStaff.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Staff ID</p>
                        <p className="font-medium">{selectedStaff.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedStaff.email || `${selectedStaff.name.toLowerCase().replace(/\s+/g, '.')}@example.com`}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{selectedStaff.phone || "+1 (555) 123-4567"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Middle Column - Employment Details */}
              <div className="col-span-1">
                <Card className="border border-gray-200 h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Employment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-medium">{selectedStaff.department || "Operations"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Position</p>
                        <p className="font-medium">{selectedStaff.position}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hire Date</p>
                        <p className="font-medium">{selectedStaff.hireDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Agreement</p>
                        <p className="font-medium">{selectedStaff.agreement}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hire Type</p>
                        <p className="font-medium">{selectedStaff.hireType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Manager</p>
                        <p className="font-medium">{selectedStaff.manager || "Anderson Dark"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Compensation */}
              <div className="col-span-1">
                <Card className="border border-gray-200 h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Compensation & Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Salary Rate</p>
                        <p className="font-medium">${selectedStaff.salaryRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pay Frequency</p>
                        <p className="font-medium">{selectedStaff.payFrequency || "Monthly"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bank Account</p>
                        <p className="font-medium">••••••{Math.floor(Math.random() * 10000)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Review</p>
                        <p className="font-medium">{selectedStaff.lastReview || "Jan 15, 2025"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Next Review</p>
                        <p className="font-medium">{selectedStaff.nextReview || "Jul 15, 2025"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setShowModal(false)} className="border-gray-200">
              Close
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Edit Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}