import { repairRequest, user, visitorLogs } from "@/db/schema";
import { Apartment, ServiceRequest } from "@prisma/client";

export type User = typeof user.$inferSelect;
export type NewUser = Omit<User, "id" | "createdAt" | "updatedAt"> & {
  password: string;
};

export type NewApartment = Omit<Apartment, "id" | "createdAt" | "updatedAt">;

export type NewServiceRequest = Omit<
  ServiceRequest,
  "id" | "createdAt" | "updatedAt" | "completedAt" | "comments" | "attachments"
>;

export type RepairRequest = typeof repairRequest.$inferSelect;
export type NewRepairRequest = Omit<
  RepairRequest,
  "id" | "requestedAt" | "completedAt"
>;

export type VisitorLog = typeof visitorLogs.$inferSelect;
export type NewVisitorLog = Omit<VisitorLog, "id" | "createdAt" | "updatedAt">;
