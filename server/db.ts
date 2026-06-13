import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, cvAnalyses, InsertCVAnalysis, jobRoles, InsertJobRole } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * CV Analysis database helpers
 */
export async function createCVAnalysis(analysis: InsertCVAnalysis) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(cvAnalyses).values(analysis);
  return result;
}

export async function getUserCVAnalyses(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(cvAnalyses).where(eq(cvAnalyses.userId, userId)).orderBy(desc(cvAnalyses.createdAt));
}

export async function getCVAnalysisById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(cvAnalyses).where(eq(cvAnalyses.id, id)).limit(1);
  return result[0];
}

export async function deleteCVAnalysis(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.delete(cvAnalyses).where(eq(cvAnalyses.id, id));
}

/**
 * Job roles database helpers
 */
export async function getAllJobRoles() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.select().from(jobRoles);
}

export async function getJobRoleByName(name: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(jobRoles).where(eq(jobRoles.name, name)).limit(1);
  return result[0];
}

export async function seedJobRoles() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existingRoles = await db.select().from(jobRoles);
  if (existingRoles.length > 0) return; // Already seeded
  
  const defaultRoles: InsertJobRole[] = [
    {
      name: "Data Scientist",
      description: "Analyze data and build predictive models",
      requiredSkills: JSON.stringify(["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization"]),
      preferredSkills: JSON.stringify(["Deep Learning", "Apache Spark", "Tableau", "AWS", "Docker"]),
      experienceYearsRequired: 2,
      educationRequirement: "Bachelor's in Computer Science or related field",
    },
    {
      name: "Software Engineer",
      description: "Develop and maintain software applications",
      requiredSkills: JSON.stringify(["JavaScript", "React", "Node.js", "Git", "REST APIs"]),
      preferredSkills: JSON.stringify(["TypeScript", "Docker", "AWS", "CI/CD", "Microservices"]),
      experienceYearsRequired: 2,
      educationRequirement: "Bachelor's in Computer Science or related field",
    },
    {
      name: "Product Manager",
      description: "Lead product strategy and development",
      requiredSkills: JSON.stringify(["Product Strategy", "Data Analysis", "Communication", "Project Management", "User Research"]),
      preferredSkills: JSON.stringify(["Agile", "SQL", "Analytics", "Design Thinking", "Market Research"]),
      experienceYearsRequired: 3,
      educationRequirement: "Bachelor's degree",
    },
    {
      name: "UX Designer",
      description: "Design user experiences and interfaces",
      requiredSkills: JSON.stringify(["Figma", "User Research", "Wireframing", "Prototyping", "Design Thinking"]),
      preferredSkills: JSON.stringify(["Adobe XD", "Usability Testing", "CSS", "HTML", "Animation"]),
      experienceYearsRequired: 2,
      educationRequirement: "Bachelor's in Design or related field",
    },
    {
      name: "DevOps Engineer",
      description: "Manage infrastructure and deployment pipelines",
      requiredSkills: JSON.stringify(["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"]),
      preferredSkills: JSON.stringify(["Terraform", "Jenkins", "Monitoring", "Python", "Networking"]),
      experienceYearsRequired: 3,
      educationRequirement: "Bachelor's in Computer Science or related field",
    },
  ];
  
  for (const role of defaultRoles) {
    await db.insert(jobRoles).values(role);
  }
}


