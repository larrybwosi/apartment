import { addDays, format, subDays } from "date-fns"
import type { Booking, DailyOccupancy, RevenueByPlatform, Room } from "@/types"

export const rooms: Room[] = Array.from({ length: 20 }, (_, i) => ({
  id: `room-${i + 100}`,
  number: `${i + 100}`,
  type: i % 3 === 0 ? "Single" : i % 3 === 1 ? "Double" : "Suite",
  beds: i % 3 === 0 ? 1 : i % 3 === 1 ? 2 : 3,
  status: i % 4 === 0 ? "available" : i % 4 === 1 ? "occupied" : "not-ready",
}))

export const bookings: Booking[] = [
  {
    id: "booking-1",
    guestName: "Ariana McCoy",
    roomNumber: "100",
    checkIn: new Date(),
    checkOut: addDays(new Date(), 3),
    platform: "Booking.com",
    status: "checked-in",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "booking-2",
    guestName: "Hamid Khan",
    roomNumber: "101",
    checkIn: subDays(new Date(), 1),
    checkOut: addDays(new Date(), 2),
    platform: "Airbnb.com",
    status: "checked-in",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  // Add more mock bookings...
]

export const occupancyData: DailyOccupancy[] = Array.from({ length: 30 }, (_, i) => ({
  date: format(addDays(new Date(), i), "dd"),
  available: Math.floor(Math.random() * 100),
  occupied: Math.floor(Math.random() * 100),
  notReady: Math.floor(Math.random() * 50),
}))

export const revenueByPlatform: RevenueByPlatform[] = [
  { platform: "Booking.com", amount: 612120, percentage: 90 },
  { platform: "Airbnb.com", amount: 300000, percentage: 70 },
  { platform: "Agoda.com", amount: 150000, percentage: 50 },
  { platform: "Hotels.com", amount: 100000, percentage: 40 },
]

