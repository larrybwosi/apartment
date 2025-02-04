import { IdType, VisitorType } from "@prisma/client";
import { z } from "zod";

const BaseVisitorSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  idType: z.nativeEnum(IdType),
  idNumber: z.string().min(1, "ID number is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  checkInTime: z.string(),
  checkOutTime: z.string().nullable(),
  luggage: z
    .array(
      z.object({
        id: z.string(),
        description: z.string(),
        checkedOut: z.boolean(),
      })
    )
    .optional(),
});

export const GuestVisitorSchema = BaseVisitorSchema.extend({
  type: z.literal(VisitorType.GUEST),
  apartmentNumber: z.string().min(1, "Apartment number is required"),
  residentName: z.string().min(1, "Resident name is required"),
});

export const MaintenanceVisitorSchema = BaseVisitorSchema.extend({
  type: z.literal(VisitorType.MAINTENANCE),
  workOrderNumber: z.string().min(1, "Work order number is required"),
  description: z.string().min(1, "Description is required"),
});

export const DeliveryVisitorSchema = BaseVisitorSchema.extend({
  type: z.literal(VisitorType.DELIVERY),
  trackingNumber: z.string().min(1, "Tracking number is required"),
  apartmentNumber: z.string().min(1, "Apartment number is required"),
});

export const TourVisitorSchema = BaseVisitorSchema.extend({
  type: z.literal(VisitorType.TOUR),
  appointmentId: z.string().min(1, "Appointment ID is required"),
});

export const VisitorSchema = z.discriminatedUnion("type", [
  GuestVisitorSchema,
  MaintenanceVisitorSchema,
  DeliveryVisitorSchema,
  TourVisitorSchema,
]);

export const VisitorWithLuggageSchema = VisitorSchema.and(
  z.object({
    luggage: z.array(
      z.object({
        id: z.string(),
        description: z.string(),
        checkedOut: z.boolean(),
        visitorId: z.string(),
      })
    ).optional()
  })
);

export type VisitorInfo = z.infer<typeof VisitorSchema>;

export const AppointmentSchema = z.object({
  id: z.string(),
  visitorName: z.string(),
  appointmentTime: z.string(),
  duration: z.string(),
  type: z.enum(["maintenance", "delivery", "tour"]),
  description: z.string(),
  status: z.enum(["active", "completed", "expired"]),
});

export type AppointmentInfo = z.infer<typeof AppointmentSchema>;

export const ApartmentSchema = z.object({
  id: z.string(),
  number: z.string(),
  tenantName: z.string(),
});

export type ApartmentInfo = z.infer<typeof ApartmentSchema>;
