"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { frontDeskBookings } from "@/lib/front-desk-data"

const days = Array.from({ length: 30 }, (_, i) => i + 1)
const months = ["November", "December"]

export function FrontDeskView() {
  const [selectedRoom, setSelectedRoom] = useState("100-103")
  const [selectedBed, setSelectedBed] = useState("all")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={selectedRoom} onValueChange={setSelectedRoom}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Room #100-103" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100-103">Room #100-103</SelectItem>
              <SelectItem value="104-106">Room #104-106</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex bg-white rounded-lg border p-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-md",
                selectedBed === "all" && "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600",
              )}
              onClick={() => setSelectedBed("all")}
            >
              All Beds
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-md",
                selectedBed === "1" && "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600",
              )}
              onClick={() => setSelectedBed("1")}
            >
              1 Bed (10)
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-md",
                selectedBed === "2" && "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600",
              )}
              onClick={() => setSelectedBed("2")}
            >
              2 Beds (6)
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-md",
                selectedBed === "3" && "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600",
              )}
              onClick={() => setSelectedBed("3")}
            >
              3 Beds (5)
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="bg-white">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">30 days of November 2024</div>
          <Button variant="outline" size="icon" className="bg-white">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-4 bg-white rounded-lg border p-4">
        <div className="space-y-6">
          <div className="grid grid-cols-[100px_repeat(30,_40px)] gap-1 items-center">
            <div className="text-sm font-medium">Date</div>
            {days.map((day) => (
              <div
                key={day}
                className={cn(
                  "flex flex-col items-center justify-center h-14 text-sm",
                  day === 24 && "bg-emerald-50 text-emerald-600 rounded-md",
                )}
              >
                <div className="font-medium">{day}</div>
                <div className="text-xs text-muted-foreground">Sat</div>
              </div>
            ))}
          </div>

          {frontDeskBookings.map((room) => (
            <div key={room.number} className="space-y-2">
              <div className="grid grid-cols-[100px_repeat(30,_40px)] gap-1 items-center">
                <div className="text-sm font-medium">Room #{room.number}</div>
                {days.map((day) => (
                  <div
                    key={day}
                    className={cn("h-20 border rounded-md", day === 24 && "border-emerald-200 bg-emerald-50/30")}
                  />
                ))}
              </div>
              <div className="ml-[100px] space-y-2">
                {room.bookings.map((booking, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 bg-gray-50/80 rounded-md border border-gray-100"
                    style={{
                      marginLeft: `${(booking.startDay - 1) * 41}px`,
                      width: `${(booking.endDay - booking.startDay + 1) * 40}px`,
                    }}
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={booking.avatar} />
                      <AvatarFallback>{booking.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{booking.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Check-in at {booking.checkIn}, Out at {booking.checkOut}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

