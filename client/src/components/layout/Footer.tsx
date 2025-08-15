import { Droplets, Github, Twitter, Mail, Leaf, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-water rounded-lg p-2 shadow-water">
                <Droplets className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Jal Samarthya</h3>
                <p className="text-xs text-muted-foreground">Environmental Monitoring</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced riparian zone and vegetation health monitoring platform for sustainable water resource management in India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="/map" className="text-muted-foreground hover:text-primary transition-colors">Map Analysis</a></li>
              <li><a href="/insights" className="text-muted-foreground hover:text-primary transition-colors">Data Insights</a></li>
              <li><a href="/submit" className="text-muted-foreground hover:text-primary transition-colors">Submit Data</a></li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                Real-time NDVI Analysis
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Leaf className="h-3 w-3" />
                Vegetation Health Monitoring
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Droplets className="h-3 w-3" />
                Water Quality Assessment
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-muted rounded-md hover:bg-primary hover:text-primary-foreground transition-all">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-muted rounded-md hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-muted rounded-md hover:bg-primary hover:text-primary-foreground transition-all">
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Built for environmental conservation and sustainable development.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Jal Samarthya. Advancing environmental monitoring for a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;