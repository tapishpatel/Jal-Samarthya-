import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/enhanced-button";
import { MapPin, Satellite, RefreshCw, Activity, AlertTriangle, Eye } from 'lucide-react';
import type { Report } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import LeafletMap from "./LeafletMap";

interface NDVIData {
  latitude: number;
  longitude: number;
  ndvi: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  vegetationHealth: number;
  waterBodyHealth: number;
  soilMoisture: number;
}

interface SeverityZone extends NDVIData {
  id: number;
  reportCount: number;
  location?: string;
  lastUpdated: string;
}

const RealTimeMap = () => {
  const [selectedZone, setSelectedZone] = useState<SeverityZone | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [severityZones, setSeverityZones] = useState<SeverityZone[]>([]);

  // Fetch user reports
  const { data: reports = [], isLoading: reportsLoading } = useQuery<Report[]>({
    queryKey: ["/api/reports"],
  });

  // Mutation to analyze NDVI data
  const analyzeNDVIMutation = useMutation({
    mutationFn: async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
      return await apiRequest(`/api/analyze-ndvi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, radius: 1000 })
      });
    },
    onSuccess: (data: NDVIData, variables) => {
      // Add the analyzed zone to our severity zones
      const newZone: SeverityZone = {
        ...data,
        id: Date.now(),
        reportCount: reports.filter(r => 
          r.latitude && r.longitude &&
          Math.abs(Number(r.latitude) - variables.latitude) < 0.01 &&
          Math.abs(Number(r.longitude) - variables.longitude) < 0.01
        ).length,
        lastUpdated: new Date().toISOString()
      };
      
      setSeverityZones(prev => {
        const filtered = prev.filter(zone => 
          !(Math.abs(zone.latitude - variables.latitude) < 0.005 &&
            Math.abs(zone.longitude - variables.longitude) < 0.005)
        );
        return [...filtered, newZone];
      });
    }
  });

  // Process reports to create severity zones
  const processReportsForAnalysis = useMutation({
    mutationFn: async (reportLocations: Array<{ latitude: number; longitude: number }>) => {
      setIsAnalyzing(true);
      const analysisPromises = reportLocations.map(location =>
        apiRequest(`/api/analyze-ndvi`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            latitude: location.latitude, 
            longitude: location.longitude,
            radius: 1500 
          })
        })
      );
      
      return await Promise.all(analysisPromises);
    },
    onSuccess: (analysisResults: NDVIData[]) => {
      const newZones: SeverityZone[] = analysisResults.map((data, index) => {
        const reportLocation = uniqueReportLocations[index];
        const reportsInArea = reports.filter(r =>
          r.latitude && r.longitude &&
          Math.abs(Number(r.latitude) - data.latitude) < 0.01 &&
          Math.abs(Number(r.longitude) - data.longitude) < 0.01
        );
        
        return {
          ...data,
          id: Date.now() + index,
          reportCount: reportsInArea.length,
          location: reportsInArea[0]?.description || undefined,
          lastUpdated: new Date().toISOString()
        };
      });
      
      setSeverityZones(newZones);
      setIsAnalyzing(false);
    },
    onError: () => {
      setIsAnalyzing(false);
    }
  });

  // Get unique report locations for analysis
  const uniqueReportLocations = useMemo(() => {
    const locations = new Map();
    reports.forEach(report => {
      if (report.latitude && report.longitude) {
        const key = `${Number(report.latitude).toFixed(3)},${Number(report.longitude).toFixed(3)}`;
        if (!locations.has(key)) {
          locations.set(key, {
            latitude: Number(report.latitude),
            longitude: Number(report.longitude)
          });
        }
      }
    });
    return Array.from(locations.values());
  }, [reports]);

  // Auto-analyze when reports load
  useEffect(() => {
    if (uniqueReportLocations.length > 0 && severityZones.length === 0 && !isAnalyzing) {
      processReportsForAnalysis.mutate(uniqueReportLocations);
    }
  }, [uniqueReportLocations.length, severityZones.length, isAnalyzing]);

  const getSeverityStats = () => {
    const stats = {
      low: severityZones.filter(z => z.severity === 'low').length,
      medium: severityZones.filter(z => z.severity === 'medium').length,
      high: severityZones.filter(z => z.severity === 'high').length,
      critical: severityZones.filter(z => z.severity === 'critical').length
    };
    return stats;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-green-500';
      case 'medium': return 'border-yellow-500';
      case 'high': return 'border-orange-500';
      case 'critical': return 'border-red-500';
      default: return 'border-gray-500';
    }
  };

  const refreshAnalysis = () => {
    if (uniqueReportLocations.length > 0) {
      processReportsForAnalysis.mutate(uniqueReportLocations);
    }
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (analyzeNDVIMutation.isPending) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert pixel coordinates to lat/lng (India region: lat 8-37, lng 68-97)
    const latitude = 37 - (y / rect.height) * 29; // 8-37 lat range for India
    const longitude = 68 + (x / rect.width) * 29; // 68-97 lng range for India
    
    // Validate coordinates are within India bounds
    if (latitude >= 8 && latitude <= 37 && longitude >= 68 && longitude <= 97) {
      analyzeNDVIMutation.mutate({ latitude, longitude });
    }
  };

  const stats = getSeverityStats();

  return (
    <Card className="h-[600px] bg-card/50 backdrop-blur-sm border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Satellite className="h-5 w-5" />
              Real-Time NDVI Analysis Map
            </CardTitle>
            <CardDescription>
              Click anywhere to analyze vegetation health • Based on user reports with Google Earth Engine data
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={refreshAnalysis} 
              disabled={isAnalyzing || uniqueReportLocations.length === 0}
              data-testid="button-refresh-analysis"
            >
              <RefreshCw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            </Button>
            <Button size="sm" variant="outline" data-testid="button-analysis-info">
              <Activity className="h-4 w-4" />
              {severityZones.length}
            </Button>
          </div>
        </div>
        
        {/* Analysis Stats */}
        <div className="flex gap-4 pt-2">
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-3 w-3 text-primary" />
            <span>{severityZones.length} Analysis Points</span>
          </div>
          {severityZones.length > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <Satellite className="h-3 w-3 text-secondary" />
              <span>Last Updated: {new Date(severityZones[severityZones.length - 1]?.lastUpdated).toLocaleTimeString()}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="h-[480px] relative">
        {reportsLoading || isAnalyzing ? (
          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <RefreshCw className="h-6 w-6 animate-spin" />
                <span className="text-lg font-medium">
                  {reportsLoading ? 'Loading reports...' : 'Analyzing vegetation health...'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Using Google Earth Engine to analyze NDVI data from satellite imagery
              </p>
              {isAnalyzing && (
                <div className="flex items-center gap-2 bg-card/90 rounded-lg px-3 py-2">
                  <Satellite className="h-4 w-4 text-primary" />
                  <span className="text-sm">Processing {uniqueReportLocations.length} locations</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <LeafletMap className="w-full h-full" />
        )}
        

            
            {/* Analysis Instructions */}
            {severityZones.length === 0 && !isAnalyzing && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-lg flex items-center justify-center pointer-events-none">
                <div className="bg-card/95 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-primary/20 max-w-md text-center animate-pulse-glow">
                  <div className="relative mb-4">
                    <MapPin className="h-12 w-12 mx-auto text-primary animate-bounce" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">Click to Analyze</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Click anywhere on this map to get instant vegetation health analysis using 
                    real satellite data from Google Earth Engine
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium mb-4">
                    <Satellite className="h-5 w-5 animate-pulse" />
                    <span>Google Earth Engine Ready</span>
                  </div>
                  {uniqueReportLocations.length > 0 && (
                    <Button
                      size="sm"
                      onClick={refreshAnalysis}
                      className="pointer-events-auto"
                      variant="hero"
                      data-testid="button-start-analysis"
                    >
                      <Activity className="h-4 w-4" />
                      Analyze {uniqueReportLocations.length} Report Locations
                    </Button>
                  )}
                </div>
              </div>
            )}
            
            {/* Loading Analysis Overlay */}
            {analyzeNDVIMutation.isPending && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center z-20">
                <div className="bg-card/95 backdrop-blur-sm rounded-xl p-6 border border-primary/20 shadow-xl text-center">
                  <RefreshCw className="h-10 w-10 text-primary mx-auto mb-4 animate-spin" />
                  <h3 className="font-semibold text-lg mb-2">Analyzing Location</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Processing satellite NDVI data from Google Earth Engine...
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-primary">
                    <Satellite className="h-4 w-4 animate-pulse" />
                    <span>Connecting to satellite data</span>
                  </div>
                </div>
              </div>
            )}
            
      </CardContent>
    </Card>
  );
};

export default RealTimeMap;