"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  Users,
  Star,
  Bell,
  HelpCircle,
  Settings,
  ChevronRight,
  LayoutDashboard,
  ClipboardList,
  Clock,
  DollarSign,
  MessageSquare,
  Hotel,
  ScrollText,
  Wrench,
  Monitor,
  ChartNoAxesColumnIncreasingIcon,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const sidebarItems = [
  {
    title: "DAILY OPERATION",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
      {
        title: "Reservation",
        icon: Monitor,
        href: "/reservation",
        subItems: [
          { title: "Front Desk", href: "/reservation/front-desk" },
          { title: "Group Reservations", href: "/reservation/group-reservation" },
          { title: "Web Reservations", href: "/reservation/web-reservation" },
        ],
      },
      {
        title: "Room Operation",
        icon: Hotel,
        href: "/room-operation",
      },
      {
        title: "Manage Staff",
        icon: Users,
        href: "/staff",
        subItems: [
          { title: "Staff List", href: "/staff/list" },
          { title: "Attendance", href: "/staff/attendance" },
          { title: "Tasks Management", href: "/staff/tasks" },
          { title: "Payroll", href: "/staff/payroll" },
        ],
      },
      {
        title: "Manage Guests",
        icon: Users,
        href: "/guests",
        subItems: [
          { title: "Guests List", href: "/guests" },
          { title: "Guests Reviews", href: "/guests/reviews" },
        ],
      },
      {
        title: "Promotions",
        icon: Star,
        href: "/promotions",
      },
    ],
  },
  {
    title: "ACCOUNTING",
    items: [
      {
        title: "Report",
        icon: ChartNoAxesColumnIncreasingIcon,
        href: "/report",
        subItems:[
          { title: "Overview", href: "/report" },
          { title: "Booking Report", href: "/report/booking" },
          { title: "Purchase Report", href: "/report/purchase" },
        ]
      },
      {
        title: "Maintenance",
        icon: Wrench,
        href: "/maintenance",
      },
    ],
  },
  {
    title: "SYSTEM OPTIONS",
    items: [
      {
        title: "Manage Platform",
        icon: Settings,
        href: "/platform",
      },
      {
        title: "Upgrade Plan",
        icon: Star,
        href: "/upgrade",
      },
      {
        title: "Settings",
        icon: Settings,
        href: "/settings",
      },
    ],
  },
]

// Helper function to get the icon for specific routes
const getRouteIcon = (route: string) => {
  switch (route) {
    case "/staff/list":
      return ScrollText
    case "/staff/tasks":
      return ClipboardList
    case "/staff/attendance":
      return Clock
    case "/staff/payroll":
      return DollarSign
    case "/guests":
      return ClipboardList
    case "/guests/reviews":
      return MessageSquare
    default:
      return null
  }
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
}

export function SidebarNav({ className, isCollapsed, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>(["Manage Staff"]) // Default open for current page

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const isSubItemActive = (href: string) => {
    return pathname === href
  }

  const toggleItem = (title: string) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(title) ? prevOpenItems.filter((item) => item !== title) : [...prevOpenItems, title],
    )
  }

  // Automatically expand the section that has the active route
  const initializeOpenItems = () => {
    sidebarItems.forEach(section => {
      section.items.forEach(item => {
        if (item.subItems && item.subItems.some(subItem => pathname === subItem.href)) {
          if (!openItems.includes(item.title)) {
            toggleItem(item.title)
          }
        }
      })
    })
  }

  // Call this function when component mounts or pathname changes
  useEffect(() => {
    initializeOpenItems()
  }, [pathname])

  return (
    <div className={cn("flex flex-col gap-4 border-r border-gray-200 bg-gray-50 h-screen", className)} {...props}>
      <div className={cn("flex items-center gap-2 px-4 py-2", isCollapsed && "justify-center")}>
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-semibold">C</span>
        </div>
        {!isCollapsed && (
          <div>
            <h2 className="font-semibold">Convo™</h2>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm">
            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-xs text-emerald-600">G</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Grand Sylhet Hotel</p>
              <p className="text-xs text-muted-foreground">3 admin added</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {sidebarItems.map((section, i) => (
          <div key={i} className="px-2">
            {!isCollapsed && (
              <h3 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">{section.title}</h3>
            )}
            <div className="space-y-1">
              {section.items.map((item, j) => {
                const isItemActive = isActive(item.href)
                const hasSubItems = item.subItems && item.subItems.length > 0
                const isExpanded = openItems.includes(item.title)
                const anySubItemActive = item.subItems && item.subItems.some(si => isSubItemActive(si.href))

                return (
                  <Collapsible key={j} open={isExpanded || (hasSubItems && anySubItemActive)}>
                    <CollapsibleTrigger
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors relative",
                        (isItemActive || anySubItemActive)
                          ? "bg-emerald-50 text-emerald-600 font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        isCollapsed && "justify-center",
                      )}
                      onClick={() => hasSubItems && toggleItem(item.title)}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left">{item.title}</span>
                          {hasSubItems && (
                            <ChevronRight className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-90")} />
                          )}
                          {(isItemActive || anySubItemActive) && !hasSubItems && (
                            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 h-6 w-2 bg-emerald-600 rounded-l-full" />
                          )}
                        </>
                      )}
                    </CollapsibleTrigger>
                    {!isCollapsed && item.subItems && (
                      <CollapsibleContent className="animation-out">
                        <div className="ml-4 mt-1 space-y-1 border-l border-slate-200 pl-3">
                          {item.subItems.map((subItem, k) => {
                            const RouteIcon = getRouteIcon(subItem.href)
                            const isSubItemActive = pathname === subItem.href

                            return (
                              <Link
                                key={k}
                                href={subItem.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors relative",
                                  isSubItemActive
                                    ? "text-emerald-600 font-medium bg-emerald-50"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                                )}
                              >
                                {RouteIcon && <RouteIcon className="w-4 h-4" />}
                                {subItem.title}
                                {isSubItemActive && (
                                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 h-6 w-2 bg-emerald-600 rounded-l-full" />
                                )}
                              </Link>
                            )
                          })}
                        </div>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {!isCollapsed && (
        <div className="mt-auto px-4 py-2 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button>
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Larry Dean</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}