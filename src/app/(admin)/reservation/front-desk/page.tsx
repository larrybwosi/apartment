'use client';
import { useState } from "react";

const FrontDeskView = () => {
  // Mock data for rooms and guests
  const [rooms, setRooms] = useState([
    {
      id: "100",
      guests: [
        {
          id: 1,
          name: "Guy Hawkins",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 2,
          name: "Esther Howard",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 3,
          name: "Kristin Watson",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 4,
          name: "Marvin McKinney",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
      ],
    },
    {
      id: "101",
      guests: [
        {
          id: 5,
          name: "Hamid Khan",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 6,
          name: "Darlene Robertson",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 7,
          name: "Jane Cooper",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 8,
          name: "Leslie Alexander",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
          age: 6,
          tag: "child",
        },
      ],
    },
    {
      id: "102",
      guests: [
        {
          id: 9,
          name: "Jenny Wilson",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 10,
          name: "Savannah Nguyen",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 11,
          name: "Marvin McKinney",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 12,
          name: "Brooklyn Simmons",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 13,
          name: "Cameron Williamson",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
      ],
    },
    {
      id: "103",
      guests: [
        {
          id: 14,
          name: "Annette Black",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 15,
          name: "Jenny Wilson",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 16,
          name: "Leslie Alexander",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 17,
          name: "Marvin McKinney",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
        {
          id: 18,
          name: "Brooklyn Simmons",
          checkIn: "08:00 PM",
          checkOut: "11:30 PM",
          isCheckedIn: true,
        },
      ],
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState("#100-103");
  const [daysInMonth, setDaysInMonth] = useState(
    Array.from({ length: 30 }, (_, i) => i + 1)
  );
  const [currentDay, setCurrentDay] = useState(24);
  const [bedFilterSelected, setBedFilterSelected] = useState([
    true,
    true,
    true,
  ]);

  // Calculate days of the week
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Function to add a new guest
  const addGuest = (roomId:string) => {
    const newGuestName = prompt("Enter new guest name:");
    if (newGuestName) {
      const updatedRooms = rooms.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            guests: [
              ...room.guests,
              {
                id:
                  Math.max(...rooms.flatMap((r) => r.guests.map((g) => g.id))) +
                  1,
                name: newGuestName,
                checkIn: "08:00 PM",
                checkOut: "11:30 PM",
                isCheckedIn: true,
              },
            ],
          };
        }
        return room;
      });
      setRooms(updatedRooms);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="bg-gray-200 w-16 h-16 rounded-lg flex items-center justify-center mr-4">
            <div className="text-lg font-bold">24</div>
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              Front Desk - view <span className="text-yellow-400 ml-2">★</span>
            </h1>
            <p className="text-gray-500">Auto-updates in 2 min</p>
          </div>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200">
          <span className="mr-1">+</span> Add Booking
        </button>
      </div>

      <div className="mb-6">
        <div className="flex mb-4">
          <div className="relative">
            <select
              className="appearance-none bg-white border rounded-md px-4 py-2 pr-8"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              <option value="#100-103">Room #100-103</option>
              <option value="#100">Room #100</option>
              <option value="#101">Room #101</option>
              <option value="#102">Room #102</option>
              <option value="#103">Room #103</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <div className="ml-4 flex">
            <button
              className={`px-3 py-2 border rounded-l-md ${bedFilterSelected[0] ? "bg-blue-50 border-blue-200" : "bg-white"} hover:bg-gray-100 transition-colors duration-200`}
              onClick={() =>
                setBedFilterSelected([
                  !bedFilterSelected[0],
                  bedFilterSelected[1],
                  bedFilterSelected[2],
                ])
              }
            >
              1 Bed (10)
            </button>
            <button
              className={`px-3 py-2 border-t border-b ${bedFilterSelected[1] ? "bg-blue-50 border-blue-200" : "bg-white"} hover:bg-gray-100 transition-colors duration-200`}
              onClick={() =>
                setBedFilterSelected([
                  bedFilterSelected[0],
                  !bedFilterSelected[1],
                  bedFilterSelected[2],
                ])
              }
            >
              2 Beds (8)
            </button>
            <button
              className={`px-3 py-2 border rounded-r-md ${bedFilterSelected[2] ? "bg-blue-50 border-blue-200" : "bg-white"} hover:bg-gray-100 transition-colors duration-200`}
              onClick={() =>
                setBedFilterSelected([
                  bedFilterSelected[0],
                  bedFilterSelected[1],
                  !bedFilterSelected[2],
                ])
              }
            >
              3 Beds (5)
            </button>
          </div>

          <div className="ml-auto flex items-center text-gray-500 text-sm">
            <span>Every Check-out at 12:00 PM</span>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex overflow-x-auto pb-2">
            {daysInMonth.map((day, index) => {
              const isSelected = day === currentDay;
              return (
                <div
                  key={day}
                  className={`flex flex-col items-center min-w-12 mx-1 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${isSelected ? "bg-green-50" : ""}`}
                  onClick={() => setCurrentDay(day)}
                >
                  <div
                    className={`text-sm ${isSelected ? "text-green-600" : "text-gray-500"}`}
                  >
                    {day.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-400">
                    {weekdays[index % 7]}
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <div className="text-xs text-green-800">Today</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex">
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="px-3 py-2">30 days of November 2024</div>
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Room Listings */}
      {rooms.map((room) => (
        <div key={room.id} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">Room #{room.id}</div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {room.guests.map((guest) => (
              <div
                key={guest.id}
                className="bg-pink-50 rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                  <div>
                    <div className="font-medium">{guest.name}</div>
                    <div className="text-xs text-gray-500">
                      Check in at {guest.checkIn}, Out at {guest.checkOut}
                      {guest.age && (
                        <span className="ml-2 text-xs bg-gray-200 px-1 rounded">
                          {guest.age} years old
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              onClick={() => addGuest(room.id)}
            >
              <div className="text-gray-400 text-2xl">+</div>
            </div>
          </div>
          {room.id === "101" && (
            <div className="text-xs text-gray-400 mt-2 tracking-widest text-center">
              F A M I L Y
            </div>
          )}
          {(room.id === "102" || room.id === "103") && (
            <div className="text-xs text-gray-400 mt-2 tracking-widest text-center">
              F R I E N D S
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FrontDeskView;
