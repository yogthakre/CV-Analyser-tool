import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * CV Analysis table - stores parsed CV data and analysis results
 */
export const cvAnalyses = mysqlTable("cvAnalyses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 255 }).notNull(), // S3 storage key
  fileUrl: varchar("fileUrl", { length: 500 }), // S3 URL
  targetRole: varchar("targetRole", { length: 100 }).notNull(),
  
  // Parsed CV data (JSON)
  personalInfo: text("personalInfo"), // JSON: name, email, phone, location
  skills: text("skills"), // JSON array of skills
  experience: text("experience"), // JSON array of work experiences
  education: text("education"), // JSON array of education entries
  certifications: text("certifications"), // JSON array of certifications
  
  // Scoring results
  overallScore: int("overallScore").notNull(), // 0-100
  skillsScore: int("skillsScore").notNull(), // 0-100, 30% weight
  experienceScore: int("experienceScore").notNull(), // 0-100, 25% weight
  educationScore: int("educationScore").notNull(), // 0-100, 15% weight
  certificationsScore: int("certificationsScore").notNull(), // 0-100, 15% weight
  completenessScore: int("completenessScore").notNull(), // 0-100, 15% weight
  
  // Skill gap analysis
  matchedSkills: text("matchedSkills"), // JSON array of matched skills
  missingSkills: text("missingSkills"), // JSON array of missing skills
  skillGapPercentage: int("skillGapPercentage").notNull(), // 0-100
  
  // Recommendations
  recommendations: text("recommendations"), // JSON array of recommendations
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CVAnalysis = typeof cvAnalyses.$inferSelect;
export type InsertCVAnalysis = typeof cvAnalyses.$inferInsert;

/**
 * Job roles reference table - stores industry-standard role definitions
 */
export const jobRoles = mysqlTable("jobRoles", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  requiredSkills: text("requiredSkills"), // JSON array of required skills
  preferredSkills: text("preferredSkills"), // JSON array of preferred skills
  experienceYearsRequired: int("experienceYearsRequired"),
  educationRequirement: varchar("educationRequirement", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type JobRole = typeof jobRoles.$inferSelect;
export type InsertJobRole = typeof jobRoles.$inferInsert;