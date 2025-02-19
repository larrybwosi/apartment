"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Filter, MoreVertical, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { promotions } from "@/lib/promotions-data"
import Pagination from "./pagination"

export function PromotionsTable() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            className={cn(
              "hover:bg-muted",
              activeTab === "active" && "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600",
            )}
            onClick={() => setActiveTab("active")}
          >
            Active Promotions
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "hover:bg-muted",
              activeTab === "upcoming" && "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600",
            )}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Promotions
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "hover:bg-muted",
              activeTab === "ended" && "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600",
            )}
            onClick={() => setActiveTab("ended")}
          >
            Ended Promotions
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="w-[280px] pl-8 bg-white" />
          </div>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[130px] bg-white">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="bg-white">
            <Filter className="w-4 h-4" />
          </Button>
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
              <TableHead>Promotions Name</TableHead>
              <TableHead>Discount Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Gross Booking</TableHead>
              <TableHead>Average Rate</TableHead>
              <TableHead>Gross Revenue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.map((promotion) => (
              <TableRow key={promotion.name} className="hover:bg-gray-50">
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell className="font-medium">{promotion.name}</TableCell>
                <TableCell>{promotion.discountType}</TableCell>
                <TableCell>{promotion.startDate}</TableCell>
                <TableCell>{promotion.endDate}</TableCell>
                <TableCell>{promotion.grossBooking}</TableCell>
                <TableCell>{promotion.averageRate}%</TableCell>
                <TableCell>${promotion.grossRevenue}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-normal",
                      promotion.status === "Active Now" && "bg-emerald-50 text-emerald-600",
                      promotion.status === "Ending Soon" && "bg-amber-50 text-amber-600",
                    )}
                  >
                    {promotion.status}
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
                      <DropdownMenuItem>Edit Promotion</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete Promotion</DropdownMenuItem>
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

