"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { IdType, VisitorType } from "@/types/visitor"

interface CheckInDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CheckInDialog({ open, onOpenChange }: CheckInDialogProps) {
  const [visitorType, setVisitorType] = useState<VisitorType>(VisitorType.GUEST)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Check In New Visitor</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input placeholder="Enter first name" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input placeholder="Enter last name" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ID Type</Label>
              <Select defaultValue={IdType.PASSPORT}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={IdType.PASSPORT}>Passport</SelectItem>
                  <SelectItem value={IdType.DRIVING_LICENSE}>Driving License</SelectItem>
                  <SelectItem value={IdType.NATIONAL_ID}>National ID</SelectItem>
                  <SelectItem value={IdType.OTHER}>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>ID Number</Label>
              <Input placeholder="Enter ID number" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="Enter email address" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input type="tel" placeholder="Enter phone number" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Visitor Type</Label>
            <Select value={visitorType} onValueChange={(value) => setVisitorType(value as VisitorType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={VisitorType.GUEST}>Guest</SelectItem>
                <SelectItem value={VisitorType.MAINTENANCE}>Maintenance</SelectItem>
                <SelectItem value={VisitorType.DELIVERY}>Delivery</SelectItem>
                <SelectItem value={VisitorType.TOUR}>Tour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {visitorType === VisitorType.GUEST && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Apartment Number</Label>
                <Input placeholder="Enter apartment number" />
              </div>
              <div className="space-y-2">
                <Label>Resident Name</Label>
                <Input placeholder="Enter resident name" />
              </div>
            </div>
          )}

          {visitorType === VisitorType.MAINTENANCE && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Work Order Number</Label>
                <Input placeholder="Enter work order number" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Enter work description" />
              </div>
            </div>
          )}

          {visitorType === VisitorType.DELIVERY && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tracking Number</Label>
                <Input placeholder="Enter tracking number" />
              </div>
              <div className="space-y-2">
                <Label>Apartment Number</Label>
                <Input placeholder="Enter apartment number" />
              </div>
            </div>
          )}

          {visitorType === VisitorType.TOUR && (
            <div className="space-y-2">
              <Label>Appointment ID</Label>
              <Input placeholder="Enter appointment ID" />
            </div>
          )}

          <div className="space-y-2">
            <Label>Luggage Items</Label>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Enter luggage description" />
                <Button variant="outline" className="shrink-0">
                  Add Item
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Check In</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

