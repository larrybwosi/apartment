// schema.ts
import {
  pgTable,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  decimal,
  primaryKey,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["admin", "resident", "manager"]);
export const roomServiceTypeEnum = pgEnum("service_type", ["cleaning", "maintenance", "concierge", "other"]);
export const repairTypeEnum = pgEnum("repair_type", ["plumbing", "electrical", "appliance", "structural", "other"]);
export const requestStatusEnum = pgEnum("request_status", ["pending", "in_progress", "completed", "cancelled"]);
export const serviceTypeEnum = pgEnum('service_type', ['cleaning', 'maintenance', 'concierge', 'delivery', 'other']);
export const servicePriorityEnum = pgEnum('service_priority', ['low', 'medium', 'high', 'urgent']);
export const serviceStatusEnum = pgEnum('service_status', ['pending', 'assigned', 'in_progress', 'completed', 'cancelled']);

// User Table
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  emailVerified: boolean("email_verified").notNull(),
  role: userRoleEnum("role").default("resident"),
  passwordHash: varchar("password_hash", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Apartment Table
export const apartment = pgTable("apartment", {
  id: text("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  size: integer("size").notNull(),
  isOccupied: boolean("is_occupied").default(false),
  userId: text("user_id").references(() => user.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Visitor Logs Table
export const visitorLogs = pgTable("visitor_logs", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id").references(() => user.id),
  apartmentId: text("apartment_id").references(() => apartment.id),
  entryTime: timestamp("entry_time").notNull(),
  exitTime: timestamp("exit_time"),
  status: requestStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Room Service Requests Table
export const roomServiceRequest = pgTable("room_service_requests", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id").references(() => user.id),
  apartmentId: text("apartment_id").references(() => apartment.id),
  serviceType: roomServiceTypeEnum("service_type").notNull(),
  description: text("description"),
  status: requestStatusEnum("status").default("pending"),
  requestedAt: timestamp("requested_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Repair Requests Table
export const repairRequest = pgTable("repair_requests", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id").references(() => user.id),
  apartmentId: text("apartment_id").references(() => apartment.id),
  repairType: repairTypeEnum("repair_type").notNull(),
  description: text("description"),
  urgency: varchar("urgency", { length: 20 }).default("normal"),
  status: requestStatusEnum("status").default("pending"),
  requestedAt: timestamp("requested_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Service Requests Table
export const serviceRequest = pgTable("service_requests", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  apartmentId: text("apartment_id")
    .references(() => apartment.id)
    .notNull(),
  type: serviceTypeEnum("type").notNull(),
  description: text("description").notNull(),
  priority: servicePriorityEnum("priority").default("medium").notNull(),
  status: serviceStatusEnum("status").default("pending").notNull(),
  assignedTo: text("assigned_to").references(() => user.id),
  attachments: jsonb("attachments").default([]),
  comments: jsonb("comments").default([]),
  scheduledAt: timestamp("scheduled_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Amenitie Table
export const amenitie = pgTable("amenitie", {
  id: text("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});


export const session = pgTable("session", {
					id: text("id").primaryKey(),
					expiresAt: timestamp('expires_at').notNull(),
 token: text('token').notNull().unique(),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull(),
 ipAddress: text('ip_address'),
 userAgent: text('user_agent'),
 userId: text('user_id').notNull().references(()=> user.id)
				});

export const account = pgTable("account", {
					id: text("id").primaryKey(),
					accountId: text('account_id').notNull(),
 providerId: text('provider_id').notNull(),
 userId: text('user_id').notNull().references(()=> user.id),
 accessToken: text('access_token'),
 refreshToken: text('refresh_token'),
 idToken: text('id_token'),
 accessTokenExpiresAt: timestamp('access_token_expires_at'),
 refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
 scope: text('scope'),
 password: text('password'),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull()
				});

export const verification = pgTable("verification", {
					id: text("id").primaryKey(),
					identifier: text('identifier').notNull(),
 value: text('value').notNull(),
 expiresAt: timestamp('expires_at').notNull(),
 createdAt: timestamp('created_at'),
 updatedAt: timestamp('updated_at')
				});

// Junction Table: Apartment Amenitie
export const apartmentAmenities = pgTable(
  "apartment_amenitie",
  {
    apartmentId: text("apartment_id").references(() => apartment.id),
    amenityId: text("amenity_id").references(() => amenitie.id),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.apartmentId, t.amenityId] }),
    },
  ]
);

// Relationships
export const userRelations = relations(user, ({ many }) => ({
  apartment: many(apartment),
  visitorLogs: many(visitorLogs),
  serviceRequest: many(roomServiceRequest),
  repairRequest: many(repairRequest),
}));

export const apartmentRelations = relations(apartment, ({ one, many }) => ({
  user: one(user, {
    fields: [apartment.userId],
    references: [user.id],
  }),
  amenitie: many(apartmentAmenities),
  visitorLogs: many(visitorLogs),
  serviceRequest: many(roomServiceRequest),
  repairRequest: many(repairRequest),
}));

export const apartmentAmenitiesRelations = relations(
  apartmentAmenities,
  ({ one }) => ({
    apartment: one(apartment, {
      fields: [apartmentAmenities.apartmentId],
      references: [apartment.id],
    }),
    amenity: one(amenitie, {
      fields: [apartmentAmenities.amenityId],
      references: [amenitie.id],
    }),
  })
);

export const serviceRequestRelations = relations(serviceRequest, ({ one }) => ({
  user: one(user, {
    fields: [serviceRequest.userId],
    references: [user.id],
  }),
  apartment: one(apartment, {
    fields: [serviceRequest.apartmentId],
    references: [apartment.id],
  }),
  assignedStaff: one(user, {
    fields: [serviceRequest.assignedTo],
    references: [user.id],
  }),
}));