import { Button } from "@/components/ui/enhanced-button";
import { useLocation } from "wouter";
import { ArrowRight, Leaf, Droplets, BarChart3, MapPin, Satellite, TrendingUp, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-landscape.jpg";

const HeroSection = () => {
  const [location, navigate] = useLocation();

  const features = [
    {
      icon: <Satellite className="h-5 w-5" />,
      text: "Satellite NDVI Analysis"
    },
    {
      icon: <Leaf className="h-5 w-5" />,
      text: "Vegetation Health Scoring"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      text: "Interactive Map Interface"
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      text: "Community Reporting"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Serene riparian landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent"></div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-4 shadow-glow border border-primary-foreground/10">
          <Droplets className="h-8 w-8 text-primary-foreground" />
        </div>
      </div>
      <div className="absolute top-32 right-16 animate-float" style={{animationDelay: '2s'}}>
        <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-4 shadow-vegetation border border-secondary/20">
          <Leaf className="h-8 w-8 text-secondary" />
        </div>
      </div>
      <div className="absolute top-40 left-1/4 animate-float" style={{animationDelay: '4s'}}>
        <div className="bg-card/15 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-accent/20">
          <Satellite className="h-6 w-6 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-40 right-1/4 animate-float" style={{animationDelay: '1s'}}>
        <div className="bg-card/15 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-primary/20">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
              <span className="block">Jal</span>
              <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent animate-wave">
                Samarthya
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-medium">
              River Bank Vegetation Conservation Platform
            </p>
          </div>

          {/* Enhanced Subtitle with Key Benefits */}
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Monitor river bank vegetation health through satellite imaging and help protect 
              India's precious water ecosystems through community observations.
            </p>
            
            {/* Key Benefits Pills - Only Real Features */}
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {[
                { icon: <Satellite className="h-4 w-4" />, text: "Google Earth Engine Integration", color: "bg-blue-500/20 border-blue-400/30" },
                { icon: <MapPin className="h-4 w-4" />, text: "NDVI Vegetation Analysis", color: "bg-green-500/20 border-green-400/30" },
                { icon: <BarChart3 className="h-4 w-4" />, text: "Community Reports", color: "bg-yellow-500/20 border-yellow-400/30" },
                { icon: <TrendingUp className="h-4 w-4" />, text: "Interactive Mapping", color: "bg-purple-500/20 border-purple-400/30" }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-foreground border ${benefit.color}`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {benefit.icon}
                  {benefit.text}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="space-y-6 pt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => navigate("/map")}
                className="group shadow-2xl"
                data-testid="button-analyze-area"
              >
                <MapPin className="h-5 w-5" />
                Analyze Your Area
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="bg-card/20 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-card/40 shadow-lg"
                onClick={() => navigate("/report")}
                data-testid="button-submit-report"
              >
                <BarChart3 className="h-5 w-5" />
                Submit Report
              </Button>
            </div>
            
            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-4">
              <div 
                className="bg-card/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10 cursor-pointer hover:bg-card/20 transition-all group"
                onClick={() => navigate("/map")}
                data-testid="card-interactive-map"
              >
                <MapPin className="h-6 w-6 text-primary-foreground mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-semibold text-primary-foreground mb-1">Interactive Map</h3>
                <p className="text-xs text-primary-foreground/70">Click anywhere to analyze vegetation health</p>
              </div>
              
              <div 
                className="bg-card/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10 cursor-pointer hover:bg-card/20 transition-all group"
                onClick={() => navigate("/submit")}
                data-testid="card-report-issue"
              >
                <Droplets className="h-6 w-6 text-primary-foreground mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-semibold text-primary-foreground mb-1">Report Issue</h3>
                <p className="text-xs text-primary-foreground/70">Help us monitor environmental changes</p>
              </div>
              
              <div 
                className="bg-card/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/10 cursor-pointer hover:bg-card/20 transition-all group"
                onClick={() => navigate("/leaderboard")}
                data-testid="card-community"
              >
                <TrendingUp className="h-6 w-6 text-primary-foreground mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-sm font-semibold text-primary-foreground mb-1">Community</h3>
                <p className="text-xs text-primary-foreground/70">Join environmental monitoring efforts</p>
              </div>
            </div>
          </div>

          {/* Platform Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-2xl mx-auto">
            {[
              { label: "NDVI Analysis", value: "Google Earth Engine", icon: <Satellite className="h-5 w-5" /> },
              { label: "Map Interface", value: "Click to Analyze", icon: <MapPin className="h-5 w-5" /> },
              { label: "Community", value: "Report Issues", icon: <BarChart3 className="h-5 w-5" /> },
              { label: "Open Source", value: "Transparent", icon: <TrendingUp className="h-5 w-5" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-primary-foreground mx-auto mb-2 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-sm font-bold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-primary-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;