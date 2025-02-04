import { Apartment, RepairRequest, ServiceRequest, User, VisitorLog, ServicePriority, ServiceStatus, RepairType } from "@prisma/client";
import { db } from "@/db";
import { NewApartment, NewServiceRequest } from "@/types/validation";

// Utility type for service request comments
type ServiceRequestComment = {
  userId: string;
  comment: string;
  timestamp: Date;
};

export async function getUserById(id: string): Promise<User | null> {
  return await db.user.findUnique({
    where: { id },
    include: { apartment: true },
  });
}

export async function updateUser(
  id: string,
  updates: Partial<Omit<User, "id" | "passwordHash">>
): Promise<User> {
  return await db.user.update({
    where: { id },
    data: { ...updates, updatedAt: new Date() },
  });
}

// Apartment Operations
export async function createApartment(req: NewApartment): Promise<Apartment> {
  return await db.apartment.create({
    data: {
      ...req,
    },
  });
}

export async function getApartmentById(id: number): Promise<Apartment | null> {
  return await db.apartment.findUnique({
    where: { id },
    include: { visitors: true },
  });
}

// Service Request Operations
export async function createServiceRequest(
  request: NewServiceRequest & {
    attachments?: string[];
    scheduledAt?: Date;
  }
): Promise<ServiceRequest> {
  return await db.serviceRequest.create({
    data: {
      ...request,
      status: "PENDING",
      priority: "MEDIUM",
      attachments: request.attachments || [],
      comments: [],
    },
  });
}

export async function updateServiceRequest(
  id: string,
  updates: {
    status?: ServiceStatus;
    priority?: ServicePriority;
    assignedTo?: string | null;
    attachments?: string[];
    comments?: ServiceRequestComment[];
  }
): Promise<ServiceRequest> {
  return await db.serviceRequest.update({
    where: { id },
    data: {
      ...updates,
      updatedAt: new Date(),
    },
  });
}

// Repair Request Operations
export async function escalateRepairRequest(
  id: string,
  priority: ServicePriority
): Promise<RepairRequest> {
  return await db.repairRequest.update({
    where: { id },
    data: { priority },
  });
}

export async function addServiceRequestComment(
  requestId: string,
  comment: ServiceRequestComment
): Promise<ServiceRequest> {
  return await db.serviceRequest.update({
    where: { id: requestId },
    data: {
      comments: {
        push: { ...comment, timestamp: new Date() },
      },
      updatedAt: new Date(),
    },
  });
}

// Visitor Operations
export async function getActiveVisitors(
  apartmentId: number
): Promise<VisitorLog[]> {
  return await db.visitorLog.findMany({
    where: {
      apartmentId,
      status: "PENDING",
    },
  });
}

// Dashboard Data
export async function getUserDashboardData(
  userId: string,
  options?: { take?: number; skip?: number }
): Promise<{
  user: User | null;
  apartments: Apartment[];
  serviceRequests: ServiceRequest[];
  repairRequests: RepairRequest[];
}> {
  const [user, apartments, serviceRequests, repairRequests] = await Promise.all(
    [
      db.user.findUnique({ where: { id: userId } }),
      db.apartment.findMany({
        where: { users:{some:{id: userId}} },
        take: options?.take || 10,
        skip: options?.skip || 0,
      }),
      db.serviceRequest.findMany({
        where: { userId },
        take: options?.take || 5,
        skip: options?.skip || 0,
      }),
      db.repairRequest.findMany({
        where: { userId },
        take: options?.take || 5,
        skip: options?.skip || 0,
      }),
    ]
  );

  return {
    user,
    apartments,
    serviceRequests,
    repairRequests,
  };
}

// Maintenance Scheduling
export async function scheduleMaintenance(
  apartmentId: number,
  details: {
    repairType: RepairType;
    scheduledDate: Date;
    description: string;
    assignedStaff?: string;
  }
): Promise<RepairRequest> {
  return await db.repairRequest.create({
    data: {
      apartmentId,
      repairType: details.repairType,
      description: details.description,
      userId: details.assignedStaff,
      status: "PENDING",
      scheduledAt: details.scheduledDate,
    },
  });
}

// Service Analytics
export async function getServiceRequestAnalytics(apartmentId: number): Promise<{
  totalRequests: number;
  completed: number;
  averageResolutionTime: number;
}> {
  const requests = await db.serviceRequest.findMany({
    where: { apartmentId },
  });

  const completedRequests = requests.filter((r) => r.status === "COMPLETED");
  const resolutionTimes = completedRequests
    .filter((r) => r.createdAt && r.updatedAt)
    .map((r) => r.updatedAt.getTime() - r.createdAt.getTime());

  return {
    totalRequests: requests.length,
    completed: completedRequests.length,
    averageResolutionTime:
      resolutionTimes.length > 0
        ? resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length
        : 0,
  };
}
