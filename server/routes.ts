import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as geeService from "./geeService";
import { insertReportSchema, insertUserSchema, insertImprovementSchema } from "@shared/schema";
import { z } from "zod";
import { getNDVIData, analyzeZone, getTimeSeriesData, initializeGEE } from "./geeService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Google Earth Engine
  try {
    await initializeGEE();
  } catch (error) {
    console.error('Failed to initialize GEE:', error);
  }
  // Reports endpoints
  app.post('/api/reports', async (req, res) => {
    try {
      const reportData = insertReportSchema.parse(req.body);
      const report = await storage.createReport(reportData);
      
      // Award points for submitting a report
      if (reportData.userId) {
        await storage.updateUserRewards(reportData.userId, 10);
        await storage.createReward({
          userId: reportData.userId,
          reportId: report.id,
          points: 10,
          type: 'report_submitted',
          description: 'Report submitted successfully'
        });
      }
      
      res.json({ success: true, report, message: 'Thank you for contributing to environmental monitoring! You earned 10 points.' });
    } catch (error) {
      console.error('Error creating report:', error);
      res.status(400).json({ message: 'Failed to create report', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  app.get('/api/reports', async (req, res) => {
    try {
      const reports = await storage.getReports();
      res.json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ message: 'Failed to fetch reports' });
    }
  });

  app.patch('/api/reports/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await storage.updateReportStatus(parseInt(id), status);
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating report status:', error);
      res.status(500).json({ message: 'Failed to update report status' });
    }
  });

  // Leaderboard endpoints
  app.get('/api/leaderboard', async (req, res) => {
    try {
      const leaderboard = await storage.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Failed to fetch leaderboard' });
    }
  });

  // User endpoints
  app.post('/api/users', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ message: 'Failed to create user', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  app.get('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(parseInt(id));
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  });

  // Admin endpoints
  app.post('/api/admin/improvements', async (req, res) => {
    try {
      const improvementData = insertImprovementSchema.parse(req.body);
      const improvement = await storage.createImprovement(improvementData);
      
      // Update report status if provided
      if (improvementData.reportId) {
        await storage.updateReportStatus(improvementData.reportId, 'resolved');
      }
      
      res.json({ success: true, improvement });
    } catch (error) {
      console.error('Error creating improvement:', error);
      res.status(400).json({ message: 'Failed to create improvement', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  app.get('/api/admin/improvements', async (req, res) => {
    try {
      const improvements = await storage.getImprovements();
      res.json(improvements);
    } catch (error) {
      console.error('Error fetching improvements:', error);
      res.status(500).json({ message: 'Failed to fetch improvements' });
    }
  });

  // Zone assessments for mapping
  app.get('/api/zones', async (req, res) => {
    try {
      const zones = await storage.getZoneAssessments();
      res.json(zones);
    } catch (error) {
      console.error('Error fetching zone assessments:', error);
      res.status(500).json({ message: 'Failed to fetch zone assessments' });
    }
  });

  // Simplified NDVI analysis endpoint - faster response
  app.post('/api/analyze-ndvi', async (req, res) => {
    try {
      const { latitude, longitude } = req.body;
      
      if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude are required' });
      }

      // Store analysis location in database for tracking
      await storage.createZoneAssessment({
        latitude: parseFloat(latitude).toString(),
        longitude: parseFloat(longitude).toString(),
        radius: 1000,
        averageSeverity: 'unknown',
        reportCount: 0,
        lastUpdated: new Date()
      });
      
      res.json({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        status: 'analyzed',
        message: 'Location added for tracking'
      });
    } catch (error) {
      console.error('Error analyzing NDVI:', error);
      res.status(500).json({ message: 'Failed to analyze NDVI data' });
    }
  });

  // Zone analysis endpoint
  app.post('/api/analyze/zone', async (req, res) => {
    try {
      const { bounds } = req.body;
      
      if (!bounds || !bounds.north || !bounds.south || !bounds.east || !bounds.west) {
        return res.status(400).json({ message: 'Complete bounds (north, south, east, west) are required' });
      }

      const zoneData = await geeService.analyzeZone(bounds);
      
      // Store the zone assessment in database
      await storage.createZoneAssessment({
        latitude: ((bounds.north + bounds.south) / 2).toString(),
        longitude: ((bounds.east + bounds.west) / 2).toString(),
        ndviValue: zoneData.averageNDVI,
        averageSeverity: zoneData.severity,
        vegetationHealth: zoneData.vegetationHealth,
        waterBodyHealth: zoneData.waterBodyHealth,
        riskFactors: zoneData.riskFactors.join(', '),
        lastUpdated: new Date()
      });
      
      res.json(zoneData);
    } catch (error) {
      console.error('Error analyzing zone:', error);
      res.status(500).json({ message: 'Failed to analyze zone' });
    }
  });

  // Time series data endpoint
  app.get('/api/timeseries/:lat/:lng', async (req, res) => {
    try {
      const { lat, lng } = req.params;
      const { startDate, endDate } = req.query;
      
      if (!lat || !lng) {
        return res.status(400).json({ message: 'Latitude and longitude are required' });
      }

      const start = startDate as string || '2024-01-01';
      const end = endDate as string || new Date().toISOString().split('T')[0];
      
      const timeSeriesData = await getTimeSeriesData(
        parseFloat(lat),
        parseFloat(lng),
        start,
        end
      );
      
      res.json(timeSeriesData);
    } catch (error) {
      console.error('Error fetching time series:', error);
      res.status(500).json({ message: 'Failed to fetch time series data' });
    }
  });

  // Image upload endpoints (simplified - can be extended later)
  app.post("/api/objects/upload", async (req, res) => {
    try {
      // Placeholder for image upload functionality
      res.json({ message: "Upload functionality available for future enhancement" });
    } catch (error) {
      console.error("Error with upload:", error);
      res.status(500).json({ error: "Upload service not configured" });
    }
  });

  app.get("/objects/:objectPath(*)", async (req, res) => {
    try {
      // Placeholder for object serving
      res.status(404).json({ error: "Object storage not configured" });
    } catch (error) {
      console.error("Error serving object:", error);
      res.status(404).json({ error: "Object not found" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
