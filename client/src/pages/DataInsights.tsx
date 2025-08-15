import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, TrendingDown, Download, Calendar, Zap, Leaf, Droplets, Wind } from "lucide-react";

const DataInsights = () => {
  const trendData = [
    { month: "Jan", ndvi: 0.65, reports: 24, temperature: 22 },
    { month: "Feb", ndvi: 0.68, reports: 31, temperature: 25 },
    { month: "Mar", ndvi: 0.72, reports: 28, temperature: 28 },
    { month: "Apr", ndvi: 0.70, reports: 35, temperature: 32 },
    { month: "May", ndvi: 0.66, reports: 42, temperature: 36 },
    { month: "Jun", ndvi: 0.64, reports: 38, temperature: 34 }
  ];

  const keyMetrics = [
    {
      title: "Average NDVI",
      value: "0.67",
      change: "+2.3%",
      trend: "up",
      icon: <Leaf className="h-5 w-5" />,
      color: "secondary"
    },
    {
      title: "Total Reports",
      value: "198",
      change: "+12.5%",
      trend: "up",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "primary"
    },
    {
      title: "Water Quality Index",
      value: "7.2/10",
      change: "-1.2%",
      trend: "down",
      icon: <Droplets className="h-5 w-5" />,
      color: "accent"
    },
    {
      title: "Air Quality (AQI)",
      value: "142",
      change: "-8.4%",
      trend: "up",
      icon: <Wind className="h-5 w-5" />,
      color: "destructive"
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-secondary" />
    ) : (
      <TrendingDown className="h-4 w-4 text-destructive" />
    );
  };

  const getMetricColor = (color: string) => {
    const colors = {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      accent: "bg-accent text-accent-foreground",
      destructive: "bg-destructive text-destructive-foreground"
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Data Insights Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive environmental trends, reports, and air quality analysis
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Last 6 Months
            </Button>
            <Button variant="outline" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Change View
            </Button>
            <Button variant="vegetation" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <div className={`p-2 rounded-md ${getMetricColor(metric.color)}`}>
                    {metric.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {getTrendIcon(metric.trend)}
                    <span>{metric.change} from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* NDVI Trend Chart */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-secondary" />
                  NDVI Vegetation Health Trends
                </CardTitle>
                <CardDescription>
                  Monthly vegetation health index across monitored areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative">
                  {/* Chart Placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-lg p-4 border border-secondary/20">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      {/* Chart Grid */}
                      <defs>
                        <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      
                      {/* Trend Line */}
                      <polyline
                        fill="none"
                        stroke="hsl(var(--secondary))"
                        strokeWidth="3"
                        points="0,120 60,100 120,80 180,90 240,110 300,115 360,105"
                      />
                      
                      {/* Data Points */}
                      {trendData.map((point, index) => (
                        <g key={index}>
                          <circle
                            cx={index * 60}
                            cy={200 - (point.ndvi * 150)}
                            r="4"
                            fill="hsl(var(--secondary))"
                            className="animate-pulse"
                          />
                          <text
                            x={index * 60}
                            y="190"
                            textAnchor="middle"
                            className="text-xs fill-current"
                          >
                            {point.month}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Frequency Chart */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Community Report Frequency
                </CardTitle>
                <CardDescription>
                  Monthly environmental issue reports from community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-end justify-between h-full">
                      {trendData.map((point, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <div
                            className="bg-primary rounded-t-md w-8 animate-wave"
                            style={{
                              height: `${(point.reports / 50) * 100}%`,
                              animationDelay: `${index * 0.2}s`
                            }}
                          ></div>
                          <span className="text-xs text-muted-foreground">{point.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Air Quality Section */}
          <Card className="bg-gradient-earth text-primary-foreground mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5" />
                Air Quality Analysis
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Real-time air quality monitoring across major Indian cities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Delhi NCR</h4>
                  <div className="text-2xl font-bold">156</div>
                  <Badge className="bg-destructive text-destructive-foreground">Moderate</Badge>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Mumbai</h4>
                  <div className="text-2xl font-bold">89</div>
                  <Badge className="bg-accent text-accent-foreground">Good</Badge>
                </div>
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Bangalore</h4>
                  <div className="text-2xl font-bold">72</div>
                  <Badge className="bg-secondary text-secondary-foreground">Good</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Correlation */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Weather vs NDVI Correlation
              </CardTitle>
              <CardDescription>
                Analyzing the relationship between weather patterns and vegetation health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Key Findings</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      Higher rainfall correlates with +15% NDVI improvement
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Temperature above 35°C shows -8% vegetation health
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Optimal humidity range: 60-75% for riparian zones
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg p-4 border border-accent/20">
                  <h5 className="font-medium mb-2">Prediction Model</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on current weather patterns, vegetation health is expected to:
                  </p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-medium">Improve by 3.2% next month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DataInsights;