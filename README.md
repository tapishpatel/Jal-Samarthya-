# 🌊 Jal Samarthya - Environmental Monitoring Platform

**Protecting India's waterways through community-driven monitoring and satellite-powered analysis**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/your-repo/jal-samarthya)
[![Node](https://img.shields.io/badge/node-18.x-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![Neon](https://img.shields.io/badge/database-Neon_PostgreSQL-blue.svg)](https://neon.tech/)

## 🚀 Quick Start (2 minutes)

### Prerequisites
- Node.js 18+ and npm
- VS Code (recommended)

### Installation
```bash
# 1. Extract and navigate to project
cd jal-samarthya

# 2. Install dependencies
npm install

# 3. Create environment file
node setup.js

# 4. Initialize database
npm run db:push

# 5. Start development server
npm run dev
```

**🎉 Open [http://localhost:5000](http://localhost:5000) to view your environmental monitoring platform!**

---

## 🌍 Features

### Real-time Environmental Monitoring
- **Satellite Analysis**: Click anywhere for instant vegetation health using Google Earth Engine
- **NDVI Calculation**: Normalized Difference Vegetation Index from real satellite imagery
- **Interactive Maps**: Powered by Leaflet.js with custom environmental overlays
- **Historical Data**: Track changes over time with trend analysis

### Community Engagement
- **Issue Reporting**: Upload photos and descriptions with GPS coordinates
- **Progress Tracking**: Visual dashboards showing community contributions
- **Leaderboard**: Gamified environmental monitoring with user rankings
- **Data Insights**: Charts and analytics for environmental trends

### Technical Excellence
- **Serverless Database**: Neon PostgreSQL with SSL encryption
- **Modern Stack**: React 18, TypeScript, Express.js, Drizzle ORM
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live data synchronization across all users
- **Secure**: Built-in security headers, input validation, session management

---

## 🏗️ Architecture

```
jal-samarthya/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
│   └── public/             # Static assets
├── server/                 # Express.js backend
│   ├── db.ts              # Database connection
│   ├── geeService.ts      # Google Earth Engine integration
│   ├── routes.ts          # API endpoints
│   └── storage.ts         # Data access layer
├── shared/                 # Shared TypeScript types
│   └── schema.ts          # Database schema
└── docs/                  # Documentation
```

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite + Wouter + TanStack Query
- **Backend**: Express.js + TypeScript + Drizzle ORM
- **Database**: PostgreSQL (Neon serverless)
- **Maps**: Leaflet.js + OpenStreetMap
- **Satellite Data**: Google Earth Engine API
- **Styling**: Tailwind CSS + Radix UI + Shadcn/ui
- **Charts**: Recharts for data visualization

---

## 🛠️ Development

### Environment Variables
All credentials are pre-configured in your deployment package:

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://[pre-configured-url]

# Google Earth Engine API
GEE_API_KEY=[your-api-key]

# Application
NODE_ENV=development
PORT=5000
```

### Available Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run db:push    # Update database schema
npm run check      # TypeScript type checking
npm run clean      # Clean build artifacts
```

### Database Schema
The application uses Drizzle ORM with PostgreSQL. Key tables:
- `users` - User accounts and profiles
- `reports` - Environmental issue reports
- `zones` - Monitored geographical areas
- `improvements` - Progress tracking
- `sessions` - Secure session storage

---

## 🌊 Namami Gange Integration

This platform directly supports India's **Namami Gange Mission** by:

- **River Bank Monitoring**: Satellite analysis of riparian vegetation health
- **Community Reports**: Citizens can report pollution and conservation issues
- **Data Collection**: Structured data for government environmental agencies
- **Educational Content**: Information about river conservation efforts
- **Progress Tracking**: Visual evidence of conservation improvements

---

## 🚀 Deployment

### Production Deployment
1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Set production environment**:
   ```bash
   export NODE_ENV=production
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

### Replit Deployment
Your project is pre-configured for Replit Deployments:
- Database credentials are already set
- Google Earth Engine API is configured
- SSL and security settings are optimized
- Simply click "Deploy" in your Replit workspace

---

## 🔧 API Endpoints

### Environmental Data
```
GET  /api/zones           # Get monitored zones
POST /api/zones/analyze   # Analyze vegetation health
GET  /api/gee/ndvi       # Get NDVI data for coordinates
```

### Community Features
```
GET  /api/reports        # Get community reports
POST /api/reports        # Submit new report
GET  /api/leaderboard    # User contribution rankings
```

### Data Insights
```
GET  /api/insights       # Environmental analytics
GET  /api/trends         # Historical trend data
```

---

## 📊 Performance

- **Database**: Neon serverless PostgreSQL with connection pooling
- **Frontend**: Vite build system with code splitting
- **Backend**: Express.js with efficient middleware stack
- **Caching**: TanStack Query for client-side caching
- **Images**: Optimized compression and lazy loading
- **Maps**: Tile caching and efficient rendering

---

## 🤝 Contributing

This project supports environmental conservation in India. Contributions are welcome:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Ministry of Water Resources** - Namami Gange Mission
- **Google Earth Engine** - Satellite imagery and analysis
- **OpenStreetMap** - Open source mapping data
- **Neon Database** - Serverless PostgreSQL hosting
- **Replit** - Development and deployment platform

---

## 📞 Support

- 📧 Email: support@jalsamarthya.org
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/jal-samarthya/issues)
- 📖 Docs: [Documentation](docs/)

---

**Together, we can protect India's precious water resources! 🌊🌱**