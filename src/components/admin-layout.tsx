"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-[#FFF8F0]">
        <aside
        className={cn(
            "bg-white border-r transition-all duration-300 ease-in-out",
            isSidebarCollapsed ? "w-16" : "w-64",
        )}
        >
        <SidebarNav isCollapsed={isSidebarCollapsed} />
        </aside>
        <Button
        variant="ghost"
        size="icon"
        className="absolute left-[252px] top-4 z-50 transition-all duration-300 ease-in-out"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
        {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  )
}

