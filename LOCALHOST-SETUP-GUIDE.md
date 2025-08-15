# 🏠 Localhost Setup Guide - Jal Samarthya

## Prerequisites

Before starting, ensure you have:
- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **Git** installed ([Download here](https://git-scm.com/))
- **Code editor** (VS Code recommended)

## Step 1: Get the Project

### Option A: Download from Replit
1. Download the entire project folder from Replit
2. Extract to your desired location (e.g., `C:\jal-samarthya` or `~/jal-samarthya`)

### Option B: Clone from Git (if available)
```bash
git clone your-repository-url
cd jal-samarthya
```

## Step 2: Install Dependencies

Open terminal/command prompt in the project folder:

```bash
# Install all dependencies
npm install

# This will install 35 optimized packages
```

**Expected output:**
```
added 200+ packages in 30s
```

## Step 3: Environment Setup

```bash
# Copy environment template
cp .env.example .env

# On Windows:
copy .env.example .env
```

The `.env` file contains pre-configured credentials:
- Neon PostgreSQL database (already working)
- Google Earth Engine API key (already working)
- Session secret for security

## Step 4: Database Setup

```bash
# Push database schema (one-time setup)
npm run db:push
```

**Expected output:**
```
✅ Schema changes applied successfully
```

## Step 5: Start Development Server

```bash
# Start the development server
npm run dev
```

**Expected output:**
```
Google Earth Engine API initialized successfully
4:16:19 AM [express] serving on port 5000
```

## Step 6: Open Your Application

1. Open browser and go to: **http://localhost:5000**
2. You should see the Jal Samarthya homepage with:
   - New custom logo in header
   - Interactive satellite map
   - Environmental monitoring features

## Features to Test

### ✅ Core Features
- **Interactive Map**: Click anywhere for vegetation analysis
- **Community Reports**: Submit environmental issues
- **Data Visualization**: View charts and analytics
- **Admin Panel**: Manage reports and users
- **Leaderboard**: See community contributions

### ✅ Development Features
- **Hot Reload**: Changes update instantly
- **Error Display**: Clear error messages
- **API Logging**: See requests in terminal
- **TypeScript**: Full type checking

## Development Commands

```bash
# Development with hot reload
npm run dev

# Build for production testing
npm run build

# Run production build locally
npm run start

# Type checking
npm run check

# Database schema updates
npm run db:push

# Clean rebuild if issues
npm run clean && npm install
```

## Project Structure

```
jal-samarthya/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Route pages
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilities
├── server/              # Express backend
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Database operations
│   └── geeService.ts    # Satellite data
├── shared/              # Shared types
├── .env                 # Environment variables
└── package.json         # Dependencies
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000
# Then restart
npm run dev
```

### Database Connection Issues
```bash
# Retry database setup
npm run db:push
```

### Build Errors
```bash
# Clean and reinstall
npm run clean
npm install
npm run dev
```

### Missing Dependencies
```bash
# Force clean install
rm -rf node_modules package-lock.json
npm install
```

## Performance Expectations

- **Startup Time**: 3-5 seconds
- **Hot Reload**: <1 second
- **API Responses**: <100ms
- **Map Loading**: 2-3 seconds
- **Build Time**: ~20 seconds

## Development Tips

1. **VS Code Extensions**: Install Tailwind CSS IntelliSense
2. **Browser DevTools**: Use F12 for debugging
3. **Terminal Logs**: Watch for API request timing
4. **Hot Reload**: Save files to see instant updates
5. **Type Safety**: TypeScript catches errors before runtime

## Environment Variables Explained

```env
# Database - Neon PostgreSQL (pre-configured)
DATABASE_URL=postgresql://neondb_owner:npg_zf5e4wxbyFWc@...

# Google Earth Engine API (pre-configured) 
GEE_API_KEY=963435663114-sqn02ilohrkq64nql6oldp8up57dt98m...

# Security
SESSION_SECRET=jal_samarthya_secure_session_key_2024

# Environment
NODE_ENV=development
PORT=5000
```

## Success Indicators

Your localhost setup is working when:
- ✅ Server starts without errors
- ✅ Browser shows logo and homepage
- ✅ Map loads with satellite imagery
- ✅ Clicking map shows vegetation data
- ✅ Forms submit successfully
- ✅ Hot reload works on file changes

**Your local development environment is now ready for Namami Gange environmental monitoring!**