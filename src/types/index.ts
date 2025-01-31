import { apartment, repairRequest, serviceRequest, user, visitorLogs } from "@/db/schema";

// types.ts

export type User = typeof user.$inferSelect;
export type NewUser = Omit<User, "id" | "createdAt" | "updatedAt"> & {
  password: string;
};

export type Apartment = typeof apartment.$inferSelect;
export type NewApartment = Omit<Apartment, "id" | "createdAt" | "updatedAt">;

export type ServiceRequest = typeof serviceRequest.$inferSelect;
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
