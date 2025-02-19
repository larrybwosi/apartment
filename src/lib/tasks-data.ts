import { staff } from "./staff-data";

export const tasks = [
  {
    roomNo: "102",
    workType: "Room Clean",
    priority: "High",
    housekeepingStatus: "Dirty Room",
    staffAssign: [
      { name: "John", avatar: staff[0].avatar },
      { name: "Sarah", avatar: staff[1].avatar },
      { name: "Mike", avatar: staff[2].avatar },
    ],
    roomStatus: "Working On",
    note: "Quick work needed",
  },
  {
    roomNo: "605",
    workType: "Clothes Clean",
    priority: "Low",
    housekeepingStatus: "Clean",
    staffAssign: [
      { name: "Emma", avatar: staff[3].avatar },
      { name: "James", avatar: staff[4].avatar },
    ],
    roomStatus: "Pending",
    note: "Daily Cleaning",
  },
  {
    roomNo: "107",
    workType: "Change Everything",
    priority: "High",
    housekeepingStatus: "Check Out",
    staffAssign: [
      { name: "Lisa", avatar: staff[5].avatar },
      { name: "Tom", avatar: staff[6].avatar },
      { name: "Alex", avatar: staff[1].avatar },
    ],
    roomStatus: "Pending",
    note: "Sound Problem",
  },
]

