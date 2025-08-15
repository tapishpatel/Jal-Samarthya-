import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Map, TrendingUp, Users, Zap, ArrowRight, Satellite, Gauge, CloudRain, Activity, Eye, BarChart3, Shield, Leaf } from "lucide-react";

const PreviewSection = () => {
  const [location, navigate] = useLocation();

  const capabilities = [
    {
      icon: <Satellite className="h-6 w-6" />,
      title: "NDVI Satellite Monitoring",
      description: "Vegetation health analysis using satellite imagery and NDVI calculations from Google Earth Engine.",
      color: "vegetation"
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: "Interactive Mapping",
      description: "Click anywhere on the map to analyze vegetation health and environmental conditions.",
      color: "water"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Environmental Analysis",
      description: "Comprehensive NDVI scoring and vegetation health assessment with visual indicators.",
      color: "earth"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Reporting",
      description: "Citizen science platform for reporting environmental issues and observations.",
      color: "hero"
    }
  ];

  return (
    <section className="py-20 bg-gradient-sky">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Advanced Environmental
            <span className="block bg-gradient-vegetation bg-clip-text text-transparent">
              Monitoring Platform
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Track vegetation health through satellite monitoring and participate in 
            environmental conservation through our interactive mapping platform.
          </p>
        </div>

        {/* Enhanced Main Preview Card */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/20 shadow-water overflow-hidden">
            <div className="bg-gradient-hero p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <div className="p-3 bg-primary-foreground/10 rounded-full">
                      <Map className="h-8 w-8 text-primary-foreground animate-pulse-glow" />
                    </div>
                    <Badge className="bg-green-500/20 text-green-100 border-green-400/30">
                      Live Analysis
                    </Badge>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-primary-foreground mb-3">
                    Interactive Map Analysis
                  </h3>
                  <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                    Click anywhere on the map to check vegetation health through satellite monitoring. 
                    View vegetation scores and environmental conditions for any location.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button 
                      variant="water" 
                      size="lg"
                      onClick={() => navigate("/map")}
                      className="group shadow-lg"
                      data-testid="button-launch-map-analysis"
                    >
                      <Map className="h-5 w-5" />
                      Launch Map Analysis
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
                      onClick={() => navigate("/report")}
                      data-testid="button-report-environmental-issue"
                    >
                      <Activity className="h-5 w-5" />
                      Report Issue
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Real-time Stats Preview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <Satellite className="h-6 w-6 text-primary-foreground mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary-foreground">NDVI</div>
                      <div className="text-xs text-primary-foreground/70">Analysis</div>
                    </div>
                    <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <Map className="h-6 w-6 text-primary-foreground mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary-foreground">Click</div>
                      <div className="text-xs text-primary-foreground/70">To Analyze</div>
                    </div>
                  </div>
                  

                </div>
              </div>
            </div>
            
            {/* Mock Map Preview */}
            <div className="h-64 bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-wave"></div>
              <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-sm rounded-lg p-3 border border-primary/30">
                <div className="text-xs text-foreground font-medium">Live Data Stream</div>
                <div className="text-xl font-bold text-primary">Active</div>
              </div>
              <div className="absolute bottom-4 right-4 bg-secondary/20 backdrop-blur-sm rounded-lg p-3 border border-secondary/30">
                <div className="text-xs text-foreground font-medium">NDVI Status</div>
                <div className="text-xl font-bold text-secondary">Healthy</div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-accent/30 backdrop-blur-sm rounded-full p-6 border-2 border-accent/50 animate-float">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {capabilities.map((capability, index) => (
            <Card 
              key={index} 
              className="bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-glow transition-all duration-300 group cursor-pointer"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader className="text-center pb-4">
                <div className={`inline-flex p-3 rounded-lg mb-4 mx-auto bg-gradient-${capability.color} shadow-${capability.color}`}>
                  {capability.icon}
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {capability.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  {capability.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Call to Action with Community Stats */}
        <div className="text-center space-y-8">
          {/* Platform Features Grid */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { 
                  icon: <Satellite className="h-8 w-8" />, 
                  title: "Google Earth", 
                  subtitle: "Satellite Data",
                  color: "bg-blue-500/10 text-blue-600",
                  borderColor: "border-blue-200 dark:border-blue-800"
                },
                { 
                  icon: <Map className="h-8 w-8" />, 
                  title: "Click Analysis", 
                  subtitle: "Interactive",
                  color: "bg-green-500/10 text-green-600",
                  borderColor: "border-green-200 dark:border-green-800"
                },
                { 
                  icon: <Leaf className="h-8 w-8" />, 
                  title: "Vegetation Health", 
                  subtitle: "NDVI",
                  color: "bg-emerald-500/10 text-emerald-600",
                  borderColor: "border-emerald-200 dark:border-emerald-800"
                },
                { 
                  icon: <Users className="h-8 w-8" />, 
                  title: "Open Platform", 
                  subtitle: "Community",
                  color: "bg-purple-500/10 text-purple-600",
                  borderColor: "border-purple-200 dark:border-purple-800"
                }
              ].map((feature, index) => (
                <Card key={index} className={`${feature.borderColor} bg-card/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group cursor-pointer`}>
                  <CardContent className="p-6 text-center">
                    <div className={`${feature.color} rounded-xl p-4 inline-flex mb-4 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Descriptive text */}
            <div className="text-center max-w-3xl mx-auto mb-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Monitor vegetation health through satellite imagery and contribute to 
                environmental conservation through our interactive mapping platform.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate("/map")}
              className="group shadow-xl"
              data-testid="button-explore-interactive-map"
            >
              <Map className="h-5 w-5" />
              Explore Interactive Map
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="vegetation" 
              size="lg"
              onClick={() => navigate("/report")}
              className="shadow-xl"
              data-testid="button-contribute-reports"
            >
              <Users className="h-5 w-5" />
              Contribute Reports
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/insights")}
              className="border-primary/30 hover:bg-primary/10"
              data-testid="button-view-insights"
            >
              <Zap className="h-5 w-5" />
              View Insights
            </Button>
          </div>
          
          {/* Call to Action Message */}
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Monitor vegetation health through satellite imagery and contribute 
            to environmental conservation through our interactive mapping platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;