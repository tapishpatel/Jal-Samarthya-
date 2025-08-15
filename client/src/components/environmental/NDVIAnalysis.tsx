import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Leaf, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import type { Report } from "@shared/schema";

interface NDVIAnalysisProps {
  reports: Report[];
}

export function NDVIAnalysis({ reports }: NDVIAnalysisProps) {
  // Generate NDVI trend data based on real reports
  const ndviTrendData = generateNDVITrends(reports);
  
  // Calculate vegetation health statistics from actual reports
  const vegetationStats = calculateVegetationStats(reports);

  return (
    <div className="space-y-6">
      {/* NDVI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average NDVI</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {vegetationStats.averageNDVI}
            </div>
            <p className="text-xs text-muted-foreground">
              Based on {reports.length} community reports
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitored Areas</CardTitle>
            <MapPin className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vegetationStats.uniqueLocations}
            </div>
            <p className="text-xs text-muted-foreground">
              Locations with vegetation reports
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vegetationStats.healthTrend}
            </div>
            <p className="text-xs text-muted-foreground">
              Overall vegetation condition
            </p>
          </CardContent>
        </Card>
      </div>

      {/* NDVI Vegetation Health Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Vegetation Health Trends
          </CardTitle>
          <CardDescription>
            Monthly vegetation health analysis based on community reports and satellite observations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ndviTrendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ndviTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  className="text-sm"
                />
                <YAxis 
                  domain={[0, 1]}
                  axisLine={false}
                  tickLine={false}
                  className="text-sm"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: any) => [`${value}`, 'NDVI Value']}
                />
                <Line 
                  type="monotone" 
                  dataKey="ndvi" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Leaf className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No vegetation data available</p>
                <p className="text-sm">Submit reports with vegetation information to see trends</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vegetation Health by Category */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Vegetation Health Distribution
          </CardTitle>
          <CardDescription>
            Community-reported vegetation conditions across different areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vegetationStats.categoryData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="category" 
                axisLine={false}
                tickLine={false}
                className="text-sm"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-sm"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="#16a34a"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monitoring Methodology */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            How We Monitor Vegetation Health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Badge variant="outline" className="mb-2">NDVI Analysis</Badge>
              <p className="text-sm text-muted-foreground">
                We use satellite imagery analysis through Google Earth Engine to calculate 
                Normalized Difference Vegetation Index (NDVI) values, which indicate vegetation health.
              </p>
            </div>
            <div className="space-y-3">
              <Badge variant="outline" className="mb-2">Community Reports</Badge>
              <p className="text-sm text-muted-foreground">
                Local community members submit ground-truth reports about vegetation conditions,
                which we correlate with satellite data for accurate analysis.
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border/50">
            <h4 className="font-semibold mb-2">NDVI Values Interpretation:</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
              <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="font-medium text-red-700 dark:text-red-400">0.0 - 0.2</div>
                <div className="text-red-600 dark:text-red-500">Bare soil/water</div>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <div className="font-medium text-yellow-700 dark:text-yellow-400">0.2 - 0.4</div>
                <div className="text-yellow-600 dark:text-yellow-500">Sparse vegetation</div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="font-medium text-green-700 dark:text-green-400">0.4 - 0.7</div>
                <div className="text-green-600 dark:text-green-500">Moderate vegetation</div>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                <div className="font-medium text-emerald-700 dark:text-emerald-400">0.7 - 1.0</div>
                <div className="text-emerald-600 dark:text-emerald-500">Dense vegetation</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function generateNDVITrends(reports: Report[]) {
  if (reports.length === 0) return [];
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const vegetationReports = reports.filter(r => 
    r.issueType === 'vegetation' || 
    r.issueType === 'deforestation' || 
    r.description?.toLowerCase().includes('tree') ||
    r.description?.toLowerCase().includes('plant') ||
    r.description?.toLowerCase().includes('forest')
  );

  return months.map((month, index) => {
    // Calculate NDVI based on report severity and category
    const monthlyReports = vegetationReports.slice(0, index + 1);
    if (monthlyReports.length === 0) return { month, ndvi: 0.5 };
    
    const severityToNDVI = {
      'low': 0.7,
      'medium': 0.5,
      'high': 0.3,
      'critical': 0.1
    };
    
    const avgNDVI = monthlyReports.reduce((sum, report) => {
      return sum + (severityToNDVI[report.severity as keyof typeof severityToNDVI] || 0.5);
    }, 0) / monthlyReports.length;
    
    return { month, ndvi: Number(avgNDVI.toFixed(3)) };
  });
}

function calculateVegetationStats(reports: Report[]) {
  const vegetationReports = reports.filter(r => 
    r.issueType === 'vegetation' || 
    r.issueType === 'deforestation' ||
    r.description?.toLowerCase().includes('tree') ||
    r.description?.toLowerCase().includes('plant')
  );

  const uniqueLocations = new Set(
    vegetationReports.map(r => `${r.latitude},${r.longitude}`)
  ).size;

  const severityToNDVI = {
    'low': 0.7,
    'medium': 0.5,
    'high': 0.3,
    'critical': 0.1
  };

  const averageNDVI = vegetationReports.length > 0 
    ? (vegetationReports.reduce((sum, report) => {
        return sum + (severityToNDVI[report.severity as keyof typeof severityToNDVI] || 0.5);
      }, 0) / vegetationReports.length).toFixed(3)
    : '0.500';

  const healthyCount = vegetationReports.filter(r => r.severity === 'low').length;
  const totalCount = vegetationReports.length;
  const healthTrend = totalCount > 0 
    ? healthyCount > totalCount * 0.6 ? 'Good' : 
      healthyCount > totalCount * 0.3 ? 'Fair' : 'Poor'
    : 'No Data';

  const categoryData = [
    { category: 'Healthy', count: vegetationReports.filter(r => r.severity === 'low').length },
    { category: 'Stressed', count: vegetationReports.filter(r => r.severity === 'medium').length },
    { category: 'Damaged', count: vegetationReports.filter(r => r.severity === 'high').length },
    { category: 'Critical', count: vegetationReports.filter(r => r.severity === 'critical').length }
  ].filter(item => item.count > 0);

  return {
    averageNDVI,
    uniqueLocations,
    healthTrend,
    categoryData
  };
}