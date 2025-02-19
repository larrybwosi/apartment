import { staff } from "./staff-data";

export const payroll = [
  {
    id: "80123010",
    name: "Fateh Md",
    avatar: staff[0].avatar,
    role: "General Manager",
    dateTime: "02 July 2024, 10:00",
    workingHours: "150 Hours 20 Min",
    salaryRate: "2184.00",
    paidBy: "Bank Transfer",
    status: "Complete",
  },
  {
    id: "80123009",
    name: "Bessie Cooper",
    avatar: staff[1].avatar,
    role: "Cleaner",
    dateTime: null,
    workingHours: "220 Hours 12 Min",
    salaryRate: "1184.00",
    paidBy: null,
    status: "Pending",
  },
  {
    id: "80123008",
    name: "Mark Anderson",
    avatar: staff[2].avatar,
    role: "Designer",
    dateTime: null,
    workingHours: "320 Hours 20 Min",
    salaryRate: "2304.00",
    paidBy: null,
    status: "Pending",
  },
  {
    id: "80123007",
    name: "Sashi Tandikar",
    avatar: staff[3].avatar,
    role: "Marketer",
    dateTime: "01 July 2024, 14:00",
    workingHours: "180 Hours 50 Min",
    salaryRate: "1034.00",
    paidBy: "Cash Paid",
    status: "Complete",
  },
]

