"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, Filter, MoreHorizontal, Search } from "lucide-react"
import { purchases } from "@/lib/purchase-data"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Pagination from "./pagination"

export function PurchaseReport() {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly")

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Supplier</SelectItem>
              <SelectItem value="ikea">Ikea Store</SelectItem>
              <SelectItem value="hatil">Hatil Furniture</SelectItem>
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
              <TableHead>Invoice No</TableHead>
              <TableHead>Name of Product</TableHead>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id} className="hover:bg-gray-50">
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell>#{purchase.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={purchase.productIcon} />
                    <AvatarFallback>{purchase.productName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {purchase.productName}
                </TableCell>
                <TableCell>{purchase.supplierName}</TableCell>
                <TableCell>{purchase.purchaseDate}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>${purchase.price.toLocaleString()}</TableCell>
                <TableCell>${purchase.totalAmount.toLocaleString()}</TableCell>
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
  )
}

