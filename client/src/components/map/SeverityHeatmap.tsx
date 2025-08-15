import { Badge } from "@/components/ui/badge";

interface SeverityData {
  id: number;
  latitude: number;
  longitude: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ndvi: number;
  reportCount: number;
  location?: string;
  vegetationHealth: number;
  waterBodyHealth: number;
}

interface SeverityHeatmapProps {
  data: SeverityData[];
  onMarkerClick?: (data: SeverityData) => void;
}

// This is a placeholder component that would normally render leaflet markers
// For now it returns null since we're using the simplified map visualization
const SeverityHeatmap = ({ data, onMarkerClick }: SeverityHeatmapProps) => {
  // This component is not used in the simplified map implementation
  // The markers are rendered directly in RealTimeMap component
  return null;
};

export default SeverityHeatmap;