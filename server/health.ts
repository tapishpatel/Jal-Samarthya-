// Health check endpoint for Fly.io deployment monitoring
import type { Request, Response } from "express";

export function healthCheck(req: Request, res: Response) {
  const healthData = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "jal-samarthya",
    version: "2.0.0",
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
    },
    database: process.env.DATABASE_URL ? "connected" : "not_configured",
    gee_api: process.env.GEE_API_KEY ? "configured" : "not_configured",
  };

  res.status(200).json(healthData);
}