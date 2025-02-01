"use server";

import { type VisitorInfo, VisitorSchema, AppointmentSchema } from "@/types/visitors";
import { mockApartments, mockAppointments } from "./mockData";

export async function checkInVisitor(visitorData: VisitorInfo) {
  const result = VisitorSchema.safeParse(visitorData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  // In a real application, you would save this to a database
  console.log("Visitor checked in:", result.data);
  return { success: true, data: result.data };
}

export async function checkOutVisitor(visitorId: string) {
  // In a real application, you would update this in a database
  const checkOutTime = new Date().toISOString();
  console.log("Visitor checked out:", visitorId, "at", checkOutTime);
  return {
    success: true,
    message: "Visitor checked out successfully",
    checkOutTime,
  };
}

export async function handleLuggage(
  visitorId: string,
  luggageId: string,
  checkOut: boolean
) {
  // In a real application, you would update this in a database
  console.log(
    `Luggage ${luggageId} ${
      checkOut ? "checked out" : "checked in"
    } for visitor ${visitorId}`
  );
  return {
    success: true,
    message: `Luggage ${checkOut ? "checked out" : "checked in"} successfully`,
  };
}

export async function invalidateAppointment(appointmentId: string) {
  // In a real application, you would update this in a database
  console.log("Appointment invalidated:", appointmentId);
  return { success: true, message: "Appointment invalidated successfully" };
}

export async function verifyAppointment(appointmentId: string) {
  const appointment = mockAppointments.find((a) => a.id === appointmentId);

  if (!appointment) {
    return { success: false, message: "Appointment not found" };
  }

  const result = AppointmentSchema.safeParse(appointment);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const now = new Date();
  const appointmentTime = new Date(appointment.appointmentTime);
  const [hours, minutes] = appointment.duration.split(":").map(Number);
  const endTime = new Date(
    appointmentTime.getTime() + (hours * 60 + minutes) * 60000
  );

  if (now > endTime) {
    return { success: false, message: "Appointment has expired" };
  }

  if (now < appointmentTime) {
    return { success: false, message: "Appointment is in the future" };
  }

  return { success: true, data: result.data };
}

export async function searchResidents(query: string) {
  const matchingApartments = mockApartments.filter(
    (apt) =>
      apt.tenantName.toLowerCase().includes(query.toLowerCase()) ||
      apt.number.includes(query)
  );

  return matchingApartments;
}
