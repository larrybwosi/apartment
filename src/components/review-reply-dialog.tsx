"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Sparkles, X } from "lucide-react"
import { useState } from "react"

interface ReviewReplyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  review: {
    name: string
    avatar: string
    totalSpent: number
    rating: number
    text: string
    date: string
  }
}

export function ReviewReplyDialog({ open, onOpenChange, review }: ReviewReplyDialogProps) {
  const [replyText, setReplyText] = useState("")
  const [useAI, setUseAI] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="relative p-6">
          <div className="absolute right-4 top-4 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{review.date}</span>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <Avatar className="w-16 h-16">
              <AvatarImage src={review.avatar} />
              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1">{review.name}</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <span className="font-medium mr-1">{review.rating}</span>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        fill={i < review.rating ? "#facc15" : "none"}
                        stroke={i < review.rating ? "#facc15" : "currentColor"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">out of 5</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">${review.totalSpent.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {review.text.split("\n").map((paragraph, index) => (
              <p key={index} className="text-sm text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="Reply Review"
              className="min-h-[120px] resize-none"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <button
                onClick={() => setUseAI(!useAI)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  useAI
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Reply by AI generator ✨
              </button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}