import { pgTable, text, serial, integer, boolean, timestamp, decimal, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table with community features
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // user, admin
  rewardPoints: integer("reward_points").notNull().default(0),
  reportsSubmitted: integer("reports_submitted").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Environmental reports table
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  issueType: text("issue_type").notNull(), // water_pollution, vegetation_loss, air_quality, etc.
  severity: text("severity").notNull(), // low, medium, high, critical
  description: text("description").notNull(),
  suggestions: text("suggestions"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  locationName: text("location_name"),
  status: text("status").notNull().default("pending"), // pending, in_progress, resolved
  imageUrl: text("image_url"), // Single image upload for the report
  proofOfWork: jsonb("proof_of_work"), // Array of proof documents/images
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zone assessments for mapping
export const zoneAssessments = pgTable("zone_assessments", {
  id: serial("id").primaryKey(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  radius: integer("radius").notNull().default(1000), // meters
  averageSeverity: text("average_severity").notNull(),
  reportCount: integer("report_count").notNull().default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Rewards and leaderboard
export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  reportId: integer("report_id").references(() => reports.id),
  points: integer("points").notNull(),
  type: text("type").notNull(), // report_submitted, issue_resolved, quality_report
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Admin improvements tracking
export const improvements = pgTable("improvements", {
  id: serial("id").primaryKey(),
  reportId: integer("report_id").references(() => reports.id),
  adminId: integer("admin_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  proofImages: jsonb("proof_images"), // Array of image URLs
  workStarted: timestamp("work_started"),
  workCompleted: timestamp("work_completed"),
  location: text("location"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  reports: many(reports),
  rewards: many(rewards),
}));

export const reportsRelations = relations(reports, ({ one, many }) => ({
  user: one(users, {
    fields: [reports.userId],
    references: [users.id],
  }),
  improvements: many(improvements),
}));

export const rewardsRelations = relations(rewards, ({ one }) => ({
  user: one(users, {
    fields: [rewards.userId],
    references: [users.id],
  }),
  report: one(reports, {
    fields: [rewards.reportId],
    references: [reports.id],
  }),
}));

export const improvementsRelations = relations(improvements, ({ one }) => ({
  report: one(reports, {
    fields: [improvements.reportId],
    references: [reports.id],
  }),
  admin: one(users, {
    fields: [improvements.adminId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  createdAt: true,
  status: true,
  resolvedAt: true,
  proofOfWork: true,
});

export const insertImprovementSchema = createInsertSchema(improvements).omit({
  id: true,
  createdAt: true,
});

export const insertRewardSchema = createInsertSchema(rewards).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;
export type InsertImprovement = z.infer<typeof insertImprovementSchema>;
export type Improvement = typeof improvements.$inferSelect;
export type InsertReward = z.infer<typeof insertRewardSchema>;
export type Reward = typeof rewards.$inferSelect;
export type ZoneAssessment = typeof zoneAssessments.$inferSelect;
