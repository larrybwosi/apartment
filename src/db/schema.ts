// schema.ts
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  decimal,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "resident",
  "manager",
]);
export const roomServiceTypeEnum = pgEnum("service_type", [
  "cleaning",
  "maintenance",
  "concierge",
  "other",
]);
export const repairTypeEnum = pgEnum("repair_type", [
  "plumbing",
  "electrical",
  "appliance",
  "structural",
  "other",
]);
export const requestStatusEnum = pgEnum("request_status", [
  "pending",
  "in_progress",
  "completed",
  "cancelled",
]);

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  role: userRoleEnum("role").default("resident").notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Apartments Table
export const apartments = pgTable("apartments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  size: integer("size").notNull(), // in square feet
  isOccupied: boolean("is_occupied").default(false),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Amenities Table
export const amenities = pgTable("amenities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Junction Table: Apartment Amenities
export const apartmentAmenities = pgTable(
  "apartment_amenities",
  {
    apartmentId: integer("apartment_id").references(() => apartments.id),
    amenityId: integer("amenity_id").references(() => amenities.id),
  },
  (t) => ({
    primaryKey: primaryKey(t.apartmentId, t.amenityId),
  })
);

// Visitor Logs Table
export const visitorLogs = pgTable("visitor_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // Resident being visited
  apartmentId: integer("apartment_id").references(() => apartments.id),
  entryTime: timestamp("entry_time").notNull(),
  exitTime: timestamp("exit_time"),
  status: requestStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Room Service Requests Table
export const roomServiceRequests = pgTable("room_service_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  apartmentId: integer("apartment_id").references(() => apartments.id),
  serviceType: roomServiceTypeEnum("service_type").notNull(),
  description: text("description"),
  status: requestStatusEnum("status").default("pending"),
  requestedAt: timestamp("requested_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Repair Requests Table
export const repairRequests = pgTable("repair_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  apartmentId: integer("apartment_id").references(() => apartments.id),
  repairType: repairTypeEnum("repair_type").notNull(),
  description: text("description"),
  urgency: varchar("urgency", { length: 20 }).default("normal"),
  status: requestStatusEnum("status").default("pending"),
  requestedAt: timestamp("requested_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  apartments: many(apartments),
  visitorLogs: many(visitorLogs),
  serviceRequests: many(roomServiceRequests),
  repairRequests: many(repairRequests),
}));

export const apartmentsRelations = relations(apartments, ({ one, many }) => ({
  user: one(users, {
    fields: [apartments.userId],
    references: [users.id],
  }),
  amenities: many(apartmentAmenities),
  visitorLogs: many(visitorLogs),
  serviceRequests: many(roomServiceRequests),
  repairRequests: many(repairRequests),
}));

export const apartmentAmenitiesRelations = relations(
  apartmentAmenities,
  ({ one }) => ({
    apartment: one(apartments, {
      fields: [apartmentAmenities.apartmentId],
      references: [apartments.id],
    }),
    amenity: one(amenities, {
      fields: [apartmentAmenities.amenityId],
      references: [amenities.id],
    }),
  })
);
