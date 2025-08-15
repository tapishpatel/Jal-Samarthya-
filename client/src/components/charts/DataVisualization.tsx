import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Report, ZoneAssessment } from "@shared/schema";

interface DataVisualizationProps {
  reports: Report[];
  zones: ZoneAssessment[];
}

export function DataVisualization({ reports, zones }: DataVisualizationProps) {
  // Only show charts if we have real data
  if (reports.length === 0 && zones.length === 0) {
    return (
      <div className="w-full p-8 text-center text-muted-foreground">
        <p>No data available for visualization.</p>
        <p className="text-sm">Data will appear here when users submit reports or analyze locations on the map.</p>
      </div>
    );
  }

  // Report status distribution (authentic data only)
  const reportStatusData = reports.reduce((acc, report) => {
    const status = report.status || 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = Object.entries(reportStatusData).map(([status, count]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    count,
  }));

  // Report categories distribution (using issueType from schema)
  const categoryData = reports.reduce((acc, report) => {
    const category = report.issueType || 'other';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryData).map(([category, count]) => ({
    category: category.replace('_', ' ').toUpperCase(),
    count,
  }));

  // NDVI analysis data (only from real analyses) - using actual zone schema properties
  const ndviData = zones.map((zone, index) => ({
    location: `Location ${zone.latitude}, ${zone.longitude}`,
    severity: zone.averageSeverity || 'unknown',
    reportCount: zone.reportCount || 0,
  }));



  return (
    <div className="space-y-6">
      {/* Report Status Chart */}
      {reports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Community Reports Status</CardTitle>
            <CardDescription>Distribution of report statuses from community submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Report Categories Chart - Simplified */}
      {reports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Report Categories</CardTitle>
            <CardDescription>Types of environmental issues reported by community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categoryChartData.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">{item.count} reports</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Location Analysis Chart */}
      {zones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Analyzed Locations</CardTitle>
            <CardDescription>Report count and severity from analyzed locations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ndviData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reportCount" fill="#059669" name="Reports Count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{reports.length}</div>
            <p className="text-sm text-muted-foreground">Community Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">{zones.length}</div>
            <p className="text-sm text-muted-foreground">NDVI Analyses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">
              {zones.length > 0 ? Math.round(zones.reduce((sum, zone) => sum + (zone.reportCount || 0), 0) / zones.length) : 0}
            </div>
            <p className="text-sm text-muted-foreground">Avg Reports per Location</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}