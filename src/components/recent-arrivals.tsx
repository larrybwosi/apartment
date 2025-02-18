"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { bookings } from "@/lib/dashboard-data"

export function RecentArrivals() {
  const [search, setSearch] = useState("")

  const filteredBookings = bookings.filter((booking) => booking.guestName.toLowerCase().includes(search.toLowerCase()))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-normal">Recent Arrivals</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guests..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={booking.avatar} />
                <AvatarFallback>
                  {booking.guestName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{booking.guestName}</div>
                <div className="text-sm text-muted-foreground">Room {booking.roomNumber}</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{format(booking.checkIn, "PP")}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

