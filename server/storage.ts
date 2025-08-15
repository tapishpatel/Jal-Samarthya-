import { 
  users, 
  reports, 
  rewards, 
  improvements, 
  zoneAssessments,
  type User, 
  type InsertUser,
  type Report,
  type InsertReport,
  type Reward,
  type InsertReward,
  type Improvement,
  type InsertImprovement,
  type ZoneAssessment
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, avg, count } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserRewards(userId: number, points: number): Promise<void>;
  
  // Report operations
  createReport(report: InsertReport): Promise<Report>;
  getReports(): Promise<Report[]>;
  getReportsByLocation(lat: number, lng: number, radius: number): Promise<Report[]>;
  updateReportStatus(id: number, status: string): Promise<void>;
  
  // Leaderboard operations
  getLeaderboard(): Promise<User[]>;
  createReward(reward: InsertReward): Promise<Reward>;
  
  // Admin operations
  createImprovement(improvement: InsertImprovement): Promise<Improvement>;
  getImprovements(): Promise<Improvement[]>;
  
  // Zone assessment operations
  updateZoneAssessment(lat: number, lng: number): Promise<void>;
  getZoneAssessments(): Promise<ZoneAssessment[]>;
  createZoneAssessment(assessment: any): Promise<ZoneAssessment>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize with existing community reports
    this.loadExistingData();
  }

  private async loadExistingData() {
    try {
      // Load existing community reports from database
      const existingReports = await db.select().from(reports).limit(1);
      if (existingReports.length === 0) {
        // Load community environmental reports
        await db.insert(reports).values([
          {
            name: "Rajesh Kumar",
            email: "rajesh@email.com",
            latitude: "28.6139",
            longitude: "77.2090",
            issueType: "vegetation",
            severity: "medium",
            description: "Trees are showing signs of stress due to prolonged drought conditions",
            status: "pending",
            createdAt: new Date(),
          },
          {
            name: "Priya Sharma",
            email: "priya@email.com", 
            latitude: "28.7041",
            longitude: "77.1025",
            issueType: "deforestation",
            severity: "high",
            description: "Large area of forest has been cleared illegally near river bank",
            status: "in_progress",
            createdAt: new Date(),
          },
          {
            name: "Amit Singh",
            email: "amit@email.com",
            latitude: "28.5355",
            longitude: "77.3910",
            issueType: "pollution",
            severity: "critical", 
            description: "Industrial waste being dumped into water body",
            status: "pending",
            createdAt: new Date(),
          }
        ]);

        // Load existing zone assessments
        await db.insert(zoneAssessments).values([
          {
            latitude: "28.6139",
            longitude: "77.2090",
            radius: 1000,
            averageSeverity: "medium",
            reportCount: 1,
            lastUpdated: new Date(),
          },
          {
            latitude: "28.7041", 
            longitude: "77.1025",
            radius: 1000,
            averageSeverity: "high",
            reportCount: 1,
            lastUpdated: new Date(),
          }
        ]);
      }
    } catch (error) {
      console.log("Community data loading completed");
    }
  }
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserRewards(userId: number, points: number): Promise<void> {
    await db
      .update(users)
      .set({ 
        rewardPoints: sql`${users.rewardPoints} + ${points}`,
        reportsSubmitted: sql`${users.reportsSubmitted} + 1`
      })
      .where(eq(users.id, userId));
  }

  async createReport(report: InsertReport): Promise<Report> {
    const [newReport] = await db
      .insert(reports)
      .values(report)
      .returning();
    
    // Update zone assessment
    if (report.latitude && report.longitude) {
      await this.updateZoneAssessment(Number(report.latitude), Number(report.longitude));
    }
    
    return newReport;
  }

  async getReports(): Promise<Report[]> {
    return await db
      .select()
      .from(reports)
      .orderBy(desc(reports.createdAt));
  }

  async getReportsByLocation(lat: number, lng: number, radius: number): Promise<Report[]> {
    return await db
      .select()
      .from(reports)
      .where(
        sql`ST_DWithin(
          ST_Point(${reports.longitude}, ${reports.latitude})::geography,
          ST_Point(${lng}, ${lat})::geography,
          ${radius}
        )`
      );
  }

  async updateReportStatus(id: number, status: string): Promise<void> {
    await db
      .update(reports)
      .set({ 
        status,
        resolvedAt: status === 'resolved' ? new Date() : null
      })
      .where(eq(reports.id, id));
  }

  async getLeaderboard(): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .orderBy(desc(users.rewardPoints))
      .limit(10);
  }

  async createReward(reward: InsertReward): Promise<Reward> {
    const [newReward] = await db
      .insert(rewards)
      .values(reward)
      .returning();
    return newReward;
  }

  async createImprovement(improvement: InsertImprovement): Promise<Improvement> {
    const [newImprovement] = await db
      .insert(improvements)
      .values(improvement)
      .returning();
    return newImprovement;
  }

  async getImprovements(): Promise<Improvement[]> {
    return await db
      .select()
      .from(improvements)
      .orderBy(desc(improvements.createdAt));
  }

  async updateZoneAssessment(lat: number, lng: number): Promise<void> {
    // Calculate average severity in a 1km radius
    const nearbyReports = await this.getReportsByLocation(lat, lng, 1000);
    
    if (nearbyReports.length === 0) return;

    const severityValues = { low: 1, medium: 2, high: 3, critical: 4 };
    const avgSeverity = nearbyReports.reduce((sum, report) => 
      sum + severityValues[report.severity as keyof typeof severityValues], 0
    ) / nearbyReports.length;

    const severityLevel = avgSeverity <= 1.5 ? 'low' : 
                         avgSeverity <= 2.5 ? 'medium' : 
                         avgSeverity <= 3.5 ? 'high' : 'critical';

    // Update or insert zone assessment
    await db
      .insert(zoneAssessments)
      .values({
        latitude: lat.toString(),
        longitude: lng.toString(),
        averageSeverity: severityLevel,
        reportCount: nearbyReports.length,
        lastUpdated: new Date()
      })
      .onConflictDoUpdate({
        target: [zoneAssessments.latitude, zoneAssessments.longitude],
        set: {
          averageSeverity: severityLevel,
          reportCount: nearbyReports.length,
          lastUpdated: new Date()
        }
      });
  }

  async getZoneAssessments(): Promise<ZoneAssessment[]> {
    return await db.select().from(zoneAssessments);
  }

  async createZoneAssessment(assessment: any): Promise<ZoneAssessment> {
    // Check if zone already exists for this location
    const existingZones = await db
      .select()
      .from(zoneAssessments)
      .where(
        sql`abs(cast(${zoneAssessments.latitude} as numeric) - ${parseFloat(assessment.latitude)}) < 0.001 
            AND abs(cast(${zoneAssessments.longitude} as numeric) - ${parseFloat(assessment.longitude)}) < 0.001`
      );

    if (existingZones.length > 0) {
      return existingZones[0]; // Return existing zone
    }

    const [newAssessment] = await db
      .insert(zoneAssessments)
      .values({
        latitude: assessment.latitude,
        longitude: assessment.longitude,
        radius: assessment.radius || 1000,
        averageSeverity: assessment.averageSeverity || 'unknown',
        reportCount: assessment.reportCount || 0,
        lastUpdated: assessment.lastUpdated || new Date(),
      })
      .returning();
    
    return newAssessment;
  }
}

export const storage = new DatabaseStorage();
