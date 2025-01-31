import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import {
  users,
  apartment,
  amenities,
  apartmentAmenities,
  visitorLogs,
  roomServiceRequests,
  repairRequests,
  serviceRequests,
  servicePriorityEnum,
  serviceStatusEnum,
  user,
} from "@/db/schema";
import bcrypt from "bcryptjs";
import {
  userRoleEnum,
  roomServiceTypeEnum,
  repairTypeEnum,
  requestStatusEnum,
} from "@/db/schema";
import type {
  NewUser,
  User,
  NewApartment,
  Apartment,
  NewVisitorLog,
  VisitorLog,
  NewServiceRequest,
  ServiceRequest,
  NewRepairRequest,
  RepairRequest,
} from "@/types";

// Utility type for service request comments
type ServiceRequestComment = {
  userId: number;
  comment: string;
  timestamp: Date;
};

// Enhanced User Operations
export async function createUser(
  user: Omit<NewUser, "passwordHash">
): Promise<User[]> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return db
    .insert(users)
    .values({
      ...user,
      passwordHash: hashedPassword,
      role: user.role || "resident",
    })
    .returning();
}

export async function getUserById(id: number): Promise<User | undefined> {
  const [res] = await db.select().from(user).where(eq(users.id, id));
  return res;
}

export async function updateUser(
  id: number,
  updates: Partial<Omit<User, "id" | "passwordHash">>
): Promise<User[]> {
  return db
    .update(users)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
}

// Enhanced Apartment Operations
export async function createApartment(
  req: NewApartment
): Promise<Apartment[]> {
  return await db.insert(apartment).values(req).returning();
}

export async function getApartmentById(
  id: number
): Promise<Apartment | undefined> {
  return await db.query.apartment.findFirst({
    where: eq(apartment.id, id),
    with: { amenities: true },
  });
}

// Enhanced Service Request Operations
export async function createServiceRequest(
  request: NewServiceRequest & {
    attachments?: string[];
    scheduledAt?: Date;
  }
): Promise<ServiceRequest[]> {
  return await db
    .insert(serviceRequests)
    .values({
      ...request,
      status: "pending",
      attachments: request.attachments || [],
      comments: [],
    })
    .returning();
}


export async function updateServiceRequest(
  id: number,
  updates: {
    status?: (typeof serviceStatusEnum.enumValues)[number];
    priority?: (typeof servicePriorityEnum.enumValues)[number];
    assignedTo?: number | null;
    attachments?: string[];
    comments?: ServiceRequestComment[];
  }
): Promise<ServiceRequest[]> {
  return db
    .update(serviceRequests)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(serviceRequests.id, id))
    .returning();
}


// Enhanced Repair Request Operations
export async function escalateRepairRequest(
  id: number,
  priority: (typeof servicePriorityEnum.enumValues)[number]
): Promise<RepairRequest[]> {
  return db
    .update(repairRequests)
    .set({
      urgency: priority,
    })
    .where(eq(repairRequests.id, id))
    .returning();
}


export async function addServiceRequestComment(
  requestId: number,
  comment: ServiceRequestComment
): Promise<ServiceRequest[]> {
  const [request] = await db
    .select()
    .from(serviceRequests)
    .where(eq(serviceRequests.id, requestId));

  if (!request) throw new Error("Service request not found");

  const updatedComments = [
    ...(request.comments as ServiceRequestComment[]),
    { ...comment, timestamp: new Date() },
  ];

  return db
    .update(serviceRequests)
    .set({ comments: updatedComments, updatedAt: new Date() })
    .where(eq(serviceRequests.id, requestId))
    .returning();
}

// Enhanced Visitor Log Operations
export async function getActiveVisitors(
  apartmentId: number
): Promise<VisitorLog[]> {
  return db
    .select()
    .from(visitorLogs)
    .where(
      and(
        eq(visitorLogs.apartmentId, apartmentId),
        eq(visitorLogs.status, "pending")
      )
    );
}

// Enhanced Authentication
export async function loginUser(
  email: string,
  password: string
): Promise<Omit<User, "passwordHash">> {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error("Invalid credentials");
  }

  const { passwordHash, ...userData } = user;
  return userData;
}

// Enhanced Dashboard Data with Pagination
export async function getUserDashboardData(
  userId: number,
  options?: { limit?: number; offset?: number }
): Promise<{
  user: User;
  apartment: Apartment[];
  serviceRequests: ServiceRequest[];
  repairRequests: RepairRequest[];
}> {
  const [user] = await db.select().from(users).where(eq(users.id, userId));
  if (!user) throw new Error("User not found");

  const userApartment = await db
    .select()
    .from(apartment)
    .where(eq(apartment.userId, userId))
    .limit(options?.limit || 10)
    .offset(options?.offset || 0);

  const userServiceRequests = await db
    .select()
    .from(serviceRequests)
    .where(eq(serviceRequests.userId, userId))
    .limit(options?.limit || 5)
    .offset(options?.offset || 0);

  const userRepairRequests = await db
    .select()
    .from(repairRequests)
    .where(eq(repairRequests.userId, userId))
    .limit(options?.limit || 5)
    .offset(options?.offset || 0);

  return {
    user,
    apartment: userApartment,
    serviceRequests: userServiceRequests,
    repairRequests: userRepairRequests,
  };
}

// Maintenance Scheduling
export async function scheduleMaintenance(
  apartmentId: number,
  details: {
    repairType: (typeof repairTypeEnum.enumValues)[number];
    scheduledDate: Date;
    description: string;
    assignedStaff?: number;
  }
): Promise<RepairRequest[]> {
  return db
    .insert(repairRequests)
    .values({
      apartmentId,
      repairType: details.repairType,
      description: details.description,
      userId: details.assignedStaff, // Assuming this is the assigned staff's user ID
      status: "pending",
      requestedAt: new Date(),
    })
    .returning();
}

// Service Request Analytics
export async function getServiceRequestAnalytics(apartmentId: number): Promise<{
  totalRequests: number;
  completed: number;
  averageResolutionTime: number;
}> {
  const requests = await db
    .select()
    .from(serviceRequests)
    .where(eq(serviceRequests.apartmentId, apartmentId));

  const completedRequests = requests.filter((r) => r.status === "completed");

  const resolutionTimes = completedRequests
    .filter((r) => r.completedAt !== null)
    .map(
      (r) => (r.completedAt!.getTime() - r.createdAt.getTime()) / (1000 * 60)
    );

  return {
    totalRequests: requests.length,
    completed: completedRequests.length,
    averageResolutionTime:
      resolutionTimes.length > 0
        ? resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length
        : 0,
  };
}