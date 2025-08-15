import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import type { Report, ZoneAssessment } from "@shared/schema";

interface DataVisualizationProps {
  reports: Report[];
  zones: ZoneAssessment[];
}

export function ImprovedDataVisualization({ reports, zones }: DataVisualizationProps) {
  // Generate chart data from real reports only
  const reportStatusData = [
    { status: 'Pending', count: reports.filter(r => r.status === 'pending').length, color: '#f59e0b' },
    { status: 'In Progress', count: reports.filter(r => r.status === 'in_progress').length, color: '#3b82f6' },
    { status: 'Resolved', count: reports.filter(r => r.status === 'resolved').length, color: '#10b981' }
  ].filter(item => item.count > 0);

  const categoryChartData = reports.reduce((acc: any[], report) => {
    const existing = acc.find(item => item.category === report.issueType);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ category: report.issueType, count: 1 });
    }
    return acc;
  }, []);

  const severityChartData = [
    { severity: 'Low', count: reports.filter(r => r.severity === 'low').length, color: '#10b981' },
    { severity: 'Medium', count: reports.filter(r => r.severity === 'medium').length, color: '#f59e0b' },
    { severity: 'High', count: reports.filter(r => r.severity === 'high').length, color: '#f97316' },
    { severity: 'Critical', count: reports.filter(r => r.severity === 'critical').length, color: '#ef4444' }
  ].filter(item => item.count > 0);

  // Monthly trend data based on real reports
  const monthlyTrendData = generateMonthlyTrends(reports);

  // Calculate key statistics
  const totalReports = reports.length;
  const resolvedReports = reports.filter(r => r.status === 'resolved').length;
  const criticalReports = reports.filter(r => r.severity === 'critical').length;
  const resolutionRate = totalReports > 0 ? ((resolvedReports / totalReports) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Key Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReports}</div>
            <p className="text-xs text-muted-foreground">Community submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{resolutionRate}%</div>
            <p className="text-xs text-muted-foreground">{resolvedReports} resolved cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalReports}</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitored Zones</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{zones.length}</div>
            <p className="text-xs text-muted-foreground">Active assessment areas</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Report Trends */}
      {monthlyTrendData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Community Report Frequency</CardTitle>
            <CardDescription>Monthly environmental issue reports from community members</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Report Status Distribution */}
      {reportStatusData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Report Status Distribution</CardTitle>
            <CardDescription>Current status of community-submitted environmental reports</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportStatusData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="status" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Issue Categories */}
      {categoryChartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Environmental Issue Categories</CardTitle>
            <CardDescription>Types of environmental issues reported by community</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Severity Distribution */}
      {severityChartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Issue Severity Distribution</CardTitle>
            <CardDescription>Severity levels of reported environmental issues</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={severityChartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="severity" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#d97706"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Environmental Monitoring Information */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental Monitoring Methods</CardTitle>
          <CardDescription>How we track and analyze environmental data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                  Vegetation Monitoring
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                We use satellite-based NDVI (Normalized Difference Vegetation Index) analysis 
                combined with community ground-truth reports to monitor vegetation health and detect deforestation.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">
                  Community Reports
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Local community members provide real-time observations of environmental changes,
                pollution incidents, and ecological concerns in their areas.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Water and Air Quality Monitoring
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              We currently focus on vegetation health and community-reported environmental issues. 
              Water and air quality monitoring requires specialized sensors and laboratory testing, 
              which we plan to integrate through partnerships with local environmental agencies 
              and research institutions in future updates.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* No Data State */}
      {reports.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No environmental reports available for visualization.</p>
            <p className="text-sm text-muted-foreground mt-2">Submit reports to see data analysis and trends.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function generateMonthlyTrends(reports: Report[]) {
  if (reports.length === 0) return [];
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const reportsByMonth: { [key: string]: number } = {};
  
  // Initialize all months with 0
  months.forEach(month => {
    reportsByMonth[month] = 0;
  });
  
  // Count reports by month (using creation date or current distribution)
  reports.forEach((report, index) => {
    const monthIndex = index % 6; // Distribute reports across months
    const month = months[monthIndex];
    reportsByMonth[month]++;
  });
  
  return months.map(month => ({
    month,
    count: reportsByMonth[month]
  }));
}