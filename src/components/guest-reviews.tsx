"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, MoreVertical, Search, Star } from "lucide-react"
import { reviews } from "@/lib/reviews-data"
import ReviewReplyDialog from "./review-reply-dialog"
import Pagination from "./pagination"

export function GuestReviews() {
  const [selectedStaff, setSelectedStaff] = useState<string>("all")
  const [selectedReview, setSelectedReview] = useState<(typeof reviews)[0] | null>(null)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)

  const handleReplyClick = (review: (typeof reviews)[0]) => {
    setSelectedReview(review)
    setReplyDialogOpen(true)
  }

  return (
    <>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Review Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold">4.5</div>
                </div>
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="45" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                  <circle
                    cx="48"
                    cy="48"
                    r="45"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="6"
                    strokeDasharray="283"
                    strokeDashoffset="70"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-center">Based on 365 days</p>
            </CardContent>
          </Card>
          <Card className="bg-white col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">All Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">654</div>
                <div className="h-16 w-2 bg-emerald-500 rounded-full" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">All time total feedback</p>
            </CardContent>
          </Card>
          <Card className="bg-white col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Satisfaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>Poor</span>
                </div>
                <span>5%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full" />
                  <span>Average</span>
                </div>
                <span>20%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span>Excellent</span>
                </div>
                <span>75%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: "75%" }} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="All Staff" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Staff</SelectItem>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
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
                  <TableHead>Name of review</TableHead>
                  <TableHead>Total spent</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {review.name}
                      </div>
                    </TableCell>
                    <TableCell>${review.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>{review.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4"
                            fill={i < review.rating ? "#facc15" : "none"}
                            stroke={i < review.rating ? "#facc15" : "currentColor"}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">{review.rating} out of 5</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate">{review.text}</p>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className={
                          review.replied ? "bg-gray-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        }
                        onClick={() => !review.replied && handleReplyClick(review)}
                      >
                        {review.replied ? "Replied" : "Reply Review"}
                      </Button>
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
                          <DropdownMenuItem>Mark as Replied</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete Review</DropdownMenuItem>
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
      </div>

      {selectedReview && (
        <ReviewReplyDialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen} review={selectedReview} />
      )}
    </>
  )
}

