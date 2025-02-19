"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileDown, Filter, MoreHorizontal, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { bookings } from "@/lib/booking-data"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import Pagination from "./pagination"

const bookingData = [
  { value: 1200000 },
  { value: 1300000 },
  { value: 1400000 },
  { value: 1500000 },
  { value: 1600000 },
  { value: 1612132 },
]

const taxData = [
  { value: 100000 },
  { value: 120000 },
  { value: 130000 },
  { value: 140000 },
  { value: 145000 },
  { value: 145520 },
]

const amountData = [
  { value: 1500000 },
  { value: 1600000 },
  { value: 1700000 },
  { value: 1800000 },
  { value: 1900000 },
  { value: 2012132 },
]

export function BookingReport() {
  const [selectedSource, setSelectedSource] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,612,132</div>
            <p className="text-xs text-muted-foreground">Total Booking last 365 days</p>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bookingData}>
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tax</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$145,520</div>
            <p className="text-xs text-muted-foreground">Total Tax last 365 days</p>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={taxData}>
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,012,132</div>
            <p className="text-xs text-muted-foreground">Total Amount last 365 days</p>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={amountData}>
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="All Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Source</SelectItem>
                <SelectItem value="font">Font Desks</SelectItem>
                <SelectItem value="web">Web Reservation</SelectItem>
                <SelectItem value="group">Group Reservation</SelectItem>
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
                <TableHead>Booking No</TableHead>
                <TableHead>Name of Guest</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Booking Date & Time</TableHead>
                <TableHead>Fare</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50">
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">#{booking.id}</TableCell>
                  <TableCell>{booking.guestName}</TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell>{booking.source}</TableCell>
                  <TableCell>{booking.dateTime}</TableCell>
                  <TableCell>${booking.fare.toLocaleString()}</TableCell>
                  <TableCell>${booking.tax.toLocaleString()}</TableCell>
                  <TableCell>${booking.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "font-normal",
                        booking.status === "Booked" && "bg-emerald-50 text-emerald-600",
                        booking.status === "Refund" && "bg-red-50 text-red-600",
                      )}
                    >
                      {booking.status}
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
    </div>
  )
}

