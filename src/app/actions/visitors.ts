"use server";

import { type VisitorInfo, VisitorSchema, AppointmentSchema } from "@/types/visitors";
import { db } from "@/db";

export async function checkInVisitor(visitorData: VisitorInfo) {
  const result = VisitorSchema.safeParse(visitorData);
  if (!result.success) {
    return { success: false, errors: result?.error?.flatten().fieldErrors };
  }

  try {
    const visitor = await db.visitor.create({
      data: {
        ...result.data,
        checkInTime: new Date(),
        type: result.data.type,
      },
    });
    return { success: true, data: visitor };
  } catch (error) {
    console.error("Check-in failed:", error);
    return { success: false, errors: { general: ["Database error"] } };
  }
}

export async function checkOutVisitor(visitorId: string) {
  try {
    const visitor = await db.visitor.update({
      where: { id: visitorId },
      data: { checkOutTime: new Date() },
    });
    return {
      success: true,
      message: "Visitor checked out successfully",
      checkOutTime: visitor.checkOutTime,
    };
  } catch (error) {
    console.error("Error checking out visitor:", error);
    return { success: false, message: "Check-out failed" };
  }
}

export async function handleLuggage(visitorId: string, luggageId: string, checkOut: boolean) {
  try {
    await db.luggage.update({
      where: { id: luggageId, visitorId },
      data: { checkedOut: checkOut },
    });
    return {
      success: true,
      message: `Luggage ${
        checkOut ? "checked out" : "checked in"
      } successfully`,
    };
  } catch (error) {
    console.error("Error handling luggage:", error);
    return { success: false, message: "Luggage update failed" };
  }
}

export async function invalidateAppointment(appointmentId: string) {
  try {
    await db.appointment.update({
      where: { id: appointmentId },
      data: { status: "EXPIRED" },
    });
    return { success: true, message: "Appointment invalidated successfully" };
  } catch (error) {
    console.error("Error invalidating appointment:", error);
    return { success: false, message: "Invalidation failed" };
  }
}

export async function searchResidents(query: string) {
  try {
    const residents = await db.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { apartment: { apartmentNumber: { contains: query } } },
        ],
        type: "RESIDENT",
      },
      include: { apartment: true },
    });
    return residents;
  } catch (error) {
    console.error("Error searching residents:", error);
    return [];
  }
}

export async function verifyAppointment(appointmentId: string) {
  try {
    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return { success: false, message: "Appointment not found" };
    }

    const result = AppointmentSchema.safeParse(appointment);
    if (!result.success) {
      return { success: false, errors: result.error.flatten().fieldErrors };
    }

    const now = new Date();
    const endTime = new Date(appointment.appointmentTime);
    const [hours, minutes] = appointment.duration.split(":").map(Number);
    endTime.setHours(
      endTime.getHours() + hours,
      endTime.getMinutes() + minutes
    );

    if (now > endTime)
      return { success: false, message: "Appointment expired" };
    if (now < appointment.appointmentTime) {
      return { success: false, message: "Appointment is in future" };
    }

    return { success: true, data: appointment };
  } catch (error) {
    console.error("Verification failed:", error);
    return { success: false, message: "Database error" };
  }
}