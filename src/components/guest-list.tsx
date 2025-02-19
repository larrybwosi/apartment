"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileDown, Filter, MoreVertical, Search } from "lucide-react"
import { guests } from "@/lib/data"
import Pagination from "./pagination"

export function GuestList() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedStaff, setSelectedStaff] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof (typeof guests)[0] | null
    direction: "asc" | "desc"
  }>({ key: null, direction: "asc" })

  const filteredAndSortedGuests = useMemo(() => {
    let filtered = [...guests]

    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((guest) => guest.status.toLowerCase().includes(selectedStatus.toLowerCase()))
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((guest) =>
        Object.values(guest).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [selectedStatus, searchQuery, sortConfig])

  const handleSort = (key: keyof (typeof guests)[0]) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cash - Paid":
        return "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
      case "Online - Paid":
        return "bg-blue-50 text-blue-600 hover:bg-blue-100"
      case "Pending":
        return "bg-amber-50 text-amber-600 hover:bg-amber-100"
      default:
        return "bg-gray-50 text-gray-600"
    }
  }

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
              <SelectItem value="paid">Paid</SelectItem>
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
            <Input
              placeholder="Search..."
              className="w-[280px] pl-8 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50">
              <TableHead className="w-12">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("id")}>
                Booking No
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("name")}>
                Name of Guest
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("source")}>
                Source
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("date")}>
                Date
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("email")}>
                Email
              </TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("amount")}>
                Amount
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("status")}>
                Status
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedGuests.map((guest) => (
              <TableRow key={guest.id} className="hover:bg-gray-50 transition-colors">
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell className="font-medium">{guest.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={guest.avatar} />
                      <AvatarFallback>{guest.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {guest.name}
                  </div>
                </TableCell>
                <TableCell>{guest.source}</TableCell>
                <TableCell>{guest.date}</TableCell>
                <TableCell>{guest.email}</TableCell>
                <TableCell>{guest.mobile}</TableCell>
                <TableCell>${guest.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn("font-normal", getStatusColor(guest.status))}>
                    {guest.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Guest</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete Guest</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

