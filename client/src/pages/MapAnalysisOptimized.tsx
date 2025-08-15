import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Satellite, CheckCircle2, AlertTriangle } from "lucide-react";
import type { ZoneAssessment, Report } from "@shared/schema";
import { LeafletMap } from "@/components/map/LeafletMap";
import { ImprovedDataVisualization } from '@/components/charts/ImprovedDataVisualization';
import { NDVIAnalysis } from '@/components/environmental/NDVIAnalysis';

const MapAnalysisOptimized = () => {
  const { data: zones = [], isLoading: zonesLoading } = useQuery<ZoneAssessment[]>({
    queryKey: ["/api/zones"],
  });

  const { data: reports = [], isLoading: reportsLoading } = useQuery<Report[]>({
    queryKey: ["/api/reports"],
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "border-green-500 bg-green-50 text-green-800";
      case "medium":
        return "border-yellow-500 bg-yellow-50 text-yellow-800";
      case "high":
        return "border-orange-500 bg-orange-50 text-orange-800";
      case "critical":
        return "border-red-500 bg-red-50 text-red-800";
      default:
        return "border-gray-500 bg-gray-50 text-gray-800";
    }
  };

  if (zonesLoading || reportsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Satellite className="h-8 w-8 mx-auto mb-4 animate-pulse text-primary" />
                <p>Loading environmental data...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4" data-testid="heading-main">
              Real-Time Environmental Analysis
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive map with authentic data from community reports and satellite analysis
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{reports.length}</div>
                <p className="text-sm text-muted-foreground">Community Reports</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">{zones.length}</div>
                <p className="text-sm text-muted-foreground">Analyzed Locations</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {zones.filter(z => z.averageSeverity === 'low').length}
                </div>
                <p className="text-sm text-muted-foreground">Healthy Zones</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {zones.filter(z => ['medium', 'high', 'critical'].includes(z.averageSeverity)).length}
                </div>
                <p className="text-sm text-muted-foreground">Alert Zones</p>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Map */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Interactive Map Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px]">
                    <LeafletMap className="w-full h-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              {reports.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {reports.slice(0, 3).map((report) => (
                      <div key={report.id} className="border-l-4 border-primary/20 pl-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{report.issueType.replace('_', ' ')}</p>
                          <Badge className={getSeverityColor(report.severity)} variant="outline">
                            {report.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{report.locationName || 'Unknown location'}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Analyzed Zones */}
              {zones.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Analyzed Zones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {zones.slice(0, 3).map((zone) => (
                      <div key={zone.id} className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">
                            {zone.latitude}, {zone.longitude}
                          </p>
                          <Badge className={getSeverityColor(zone.averageSeverity)} variant="outline">
                            {zone.averageSeverity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {zone.reportCount} reports
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Data Visualization - Only show if there's data */}
          {(reports.length > 0 || zones.length > 0) && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Data Analytics</h2>
              <NDVIAnalysis reports={reports} />
          <ImprovedDataVisualization reports={reports} zones={zones} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MapAnalysisOptimized;