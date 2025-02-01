import { ApartmentInfo, AppointmentInfo } from "@/types/visitors";

export const mockApartments: ApartmentInfo[] = [
  { id: "apt1", number: "101", tenantName: "John Doe" },
  { id: "apt2", number: "102", tenantName: "Jane Smith" },
  { id: "apt3", number: "201", tenantName: "Alice Johnson" },
  { id: "apt4", number: "202", tenantName: "Bob Williams" },
  { id: "apt5", number: "301", tenantName: "Charlie Brown" },
];

export const mockAppointments: AppointmentInfo[] = [
  {
    id: "appt1",
    visitorName: "Eva Green",
    appointmentTime: "2023-06-15T10:00:00Z",
    duration: "1 hour",
    type: "tour",
    description: "Apartment tour for potential new tenant",
  },
  {
    id: "appt2",
    visitorName: "Mike Ross",
    appointmentTime: "2023-06-15T14:30:00Z",
    duration: "30 minutes",
    type: "maintenance",
    description: "Fix leaky faucet in apartment 202",
  },
  {
    id: "appt3",
    visitorName: "Rachel Zane",
    appointmentTime: "2023-06-16T11:00:00Z",
    duration: "45 minutes",
    type: "delivery",
    description: "Large package delivery for apartment 301",
  },
];
