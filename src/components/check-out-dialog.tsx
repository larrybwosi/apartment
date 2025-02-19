"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Check, Package } from "lucide-react"
import type { VisitorInfo } from "@/types/visitor"
import { cn } from "@/lib/utils"

interface CheckOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  visitor: VisitorInfo
}

export function CheckOutDialog({ open, onOpenChange, visitor }: CheckOutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Check Out Visitor</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Visitor Information</Label>
            <div className="rounded-lg border bg-muted/40 p-4">
              <div className="text-sm">
                <div className="font-medium">
                  {visitor.firstName} {visitor.lastName}
                </div>
                <div className="text-muted-foreground">{visitor.id}</div>
              </div>
            </div>
          </div>

          {visitor.luggage && visitor.luggage.length > 0 && (
            <div className="space-y-4">
              <Label>Luggage Items</Label>
              <div className="space-y-2">
                {visitor.luggage.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border bg-muted/40 p-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{item.description}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "font-normal",
                        item.checkedOut ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600",
                      )}
                    >
                      {item.checkedOut ? "Checked Out" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Check className="mr-2 h-4 w-4" />
              Confirm Check Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

