import type { AppointmentInfo } from "@/types/visitors";

export const formatTime = (isoString: string) => {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const mockAppointments: AppointmentInfo[] = [
  {
    id: "appt1",
    visitorName: "John Doe",
    appointmentTime: "2023-06-15T10:00:00Z",
    duration: "1 hour",
    purpose: "Tour",
  },
  {
    id: "appt2",
    visitorName: "Jane Smith",
    appointmentTime: "2023-06-15T14:30:00Z",
    duration: "30 minutes",
    purpose: "Maintenance",
  },
];

export const findAppointment = (
  appointmentId: string
): AppointmentInfo | undefined => {
  return mockAppointments.find(
    (appointment) => appointment.id === appointmentId
  );
};
