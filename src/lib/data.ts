export type Guest = {
  id: string
  name: string
  avatar: string
  source: "Font Desks" | "Web Reservation" | "Group Reservation"
  date: string
  email: string
  mobile: string
  amount: number
  status: "Cash - Paid" | "Online - Paid" | "Pending"
}

export const guests: Guest[] = [
  {
    id: "#102112",
    name: "Raiders Kae",
    avatar: "https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
    source: "Font Desks",
    date: "20/12/2024",
    email: "debra.h@gmail.com",
    mobile: "+88 01766703570",
    amount: 1400.0,
    status: "Cash - Paid",
  },
  {
    id: "#102111",
    name: "Jassy Mac",
    avatar: 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",',
    source: "Web Reservation",
    date: "19/12/2024",
    email: "mark@gmail.com",
    mobile: "+88 01966703578",
    amount: 400.0,
    status: "Cash - Paid",
  },
  {
    id: "#102110",
    name: "Macculam Brad",
    avatar: "https://images.pexels.com/photos/2491933/pexels-photo-2491933.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
    source: "Font Desks",
    date: "18/12/2024",
    email: "brad@gmail.com",
    mobile: "+88 01666703570",
    amount: 9800.0,
    status: "Pending",
  },
  {
    id: "#102109",
    name: "Jhoney Cark",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
    source: "Group Reservation",
    date: "17/12/2024",
    email: "cark@gmail.com",
    mobile: "+88 01966703570",
    amount: 2400.0,
    status: "Online - Paid",
  },
  {
    id: "#102108",
    name: "Jhon Brak",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
    source: "Font Desks",
    date: "16/12/2024",
    email: "jhon@gmail.com",
    mobile: "+88 01766703544",
    amount: 1400.0,
    status: "Pending",
  },
]

