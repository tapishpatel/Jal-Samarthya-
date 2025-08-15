import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Satellite, X } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDEwQzIxIDE3IDEyIDIzIDEyIDIzUzMgMTcgMyAxMEMzIDUuMDI5NDQgNy4wMjk0NCAxIDEyIDFTMjEgNS4wMjk0NCAyMSAxMFoiIHN0cm9rZT0iIzMzOWFmMCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiIGZpbGw9IiMzMzlhZjAiLz4KPC9zdmc+',
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDEwQzIxIDE3IDEyIDIzIDEyIDIzUzMgMTcgMyAxMEMzIDUuMDI5NDQgNy4wMjk0NCAxIDEyIDFTMjEgNS4wMjk0NCAyMSAxMFoiIHN0cm9rZT0iIzMzOWFmMCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiIGZpbGw9IiMzMzlhZjAiLz4KPC9zdmc+',
  shadowUrl: '',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Zone {
  id: string;
  latitude: number;
  longitude: number;
  ndvi: number;
  vegetationHealth: number;
  waterBodyHealth: number;
  soilMoisture: number;
  lastUpdated: string;
  reportCount: number;
}

interface LeafletMapProps {
  className?: string;
}

function LeafletMap({ className }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const queryClient = useQueryClient();
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  // Fetch analysis zones
  const { data: zones = [], isLoading } = useQuery<Zone[]>({
    queryKey: ['/api/zones'],
    refetchInterval: 10000,
  });

  // NDVI Analysis mutation
  const analyzeNDVIMutation = useMutation({
    mutationFn: async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
      return await apiRequest(`/api/analyze-ndvi`, {
        method: 'POST',
        body: JSON.stringify({ latitude, longitude }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/zones'] });
    },
  });

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on India with zoom controls
    const map = L.map(mapRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
      boxZoom: true,
      keyboard: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      minZoom: 3,
    }).addTo(map);

    // Click handler for NDVI analysis
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Ensure click is within India bounds
      if (lat >= 6 && lat <= 38 && lng >= 68 && lng <= 98) {
        analyzeNDVIMutation.mutate({ latitude: lat, longitude: lng });
      }
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [analyzeNDVIMutation]);

  // Update markers when zones change - but don't show them by default
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Only add small circle markers, no popups to keep map clean
    zones.forEach((zone: Zone) => {
      const circle = L.circleMarker([zone.latitude, zone.longitude], {
        radius: 4,
        fillColor: '#3B82F6',
        color: '#1E40AF',
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.6
      })
        .addTo(mapInstanceRef.current!)
        .on('click', () => {
          setSelectedZone(zone);
        });

      markersRef.current.push(circle as any);
    });
  }, [zones]);

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg overflow-hidden border-2 border-primary/20 z-0"
        data-testid="leaflet-map"
        style={{ minHeight: '400px' }}
      />

      {/* Loading Overlay - smaller, less intrusive */}
      {analyzeNDVIMutation.isPending && (
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 border border-primary/20 shadow-lg z-[1000]">
          <div className="flex items-center gap-2 text-sm">
            <Satellite className="h-4 w-4 text-primary animate-pulse" />
            <span>Analyzing...</span>
          </div>
        </div>
      )}



      {/* Map Info - smaller and less intrusive */}
      <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur-sm rounded-md p-2 border border-border shadow-md z-[1000]">
        <div className="flex items-center gap-2 text-xs">
          <Satellite className="h-3 w-3 text-primary" />
          <span>{zones.length} points</span>
        </div>
      </div>

      {/* Selected Zone Info */}
      {selectedZone && (
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border max-w-sm z-[1000]">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Satellite className="h-4 w-4 text-primary" />
              NDVI Analysis Details
            </h4>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setSelectedZone(null)}
              className="p-1 h-auto"
              data-testid="button-close-analysis-info"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">NDVI Index</div>
                <div className="font-bold text-lg">{selectedZone.ndvi.toFixed(3)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Vegetation Health</div>
                <div className="font-bold text-lg text-green-600">{Math.round(selectedZone.vegetationHealth)}%</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Water Health</div>
                <div className="font-medium">{Math.round(selectedZone.waterBodyHealth)}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Soil Moisture</div>
                <div className="font-medium">{Math.round(selectedZone.soilMoisture)}%</div>
              </div>
            </div>
            
            <div className="pt-3 border-t border-border/50">
              <div className="text-xs text-muted-foreground">
                Location: {selectedZone.latitude.toFixed(4)}°, {selectedZone.longitude.toFixed(4)}°
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Analyzed: {new Date(selectedZone.lastUpdated).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { LeafletMap };
export default LeafletMap;