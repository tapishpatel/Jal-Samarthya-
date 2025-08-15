# Jal Samarthya - Environmental Monitoring Platform

## Overview

Jal Samarthya is an environmental monitoring platform supporting the Namami Gange project through community-driven reporting and riparian zone vegetation health analysis in India. The application focuses on authentic environmental data collection using satellite NDVI analysis and community ground-truth reports. Built as a clean, streamlined web application with React frontend and Express backend, using PostgreSQL for data persistence and Drizzle ORM.

## Recent Changes (August 2025)

- **Complete Production Optimization (v2.0.0)**: Full codebase cleanup removing unused code, duplicate components, and commented sections for production-ready deployment
- **Premium Logo Design**: Custom animated SVG logo with water droplet, vegetation leaf, flowing animations, shimmer text effects, and hover interactions
- **Project Structure Cleanup**: Removed 15+ unnecessary documentation files, duplicate folders, and unused configuration files (reduced from 200+ to essential files only)
- **Dependency Management**: Reduced package.json from 60+ to 35 production dependencies, removing unused Radix UI components and legacy packages  
- **Code Structure Optimization**: Cleaned import statements, removed circular dependencies, consolidated toast functionality to use sonner directly
- **Environment Configuration**: Pre-configured Neon database and Google Earth Engine API keys for instant deployment
- **Performance Enhancements**: Updated browser compatibility database, optimized bundle size, and improved loading times
- **Documentation Overhaul**: Streamlined to 3 essential guides - QUICK-START.md, LOCALHOST-SETUP-GUIDE.md, NETLIFY-DEPLOYMENT-GUIDE.md
- **Security Hardening**: Proper SSL configuration, secure session management, and production-ready environment variables
- **Production-Ready Features**: Enhanced CORS, error boundaries, health checks, security headers, and performance monitoring

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern component patterns
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query** for server state management, caching, and data fetching
- **Tailwind CSS** with a custom environmental theme featuring nature-inspired color palettes
- **Shadcn/ui** component library with Radix UI primitives for accessible, customizable components
- **React Hook Form** with Zod resolvers for form validation and type-safe form handling

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints and middleware
- **ESM modules** throughout the application for modern JavaScript module support
- **RESTful API design** with `/api` prefix for all backend routes
- **Request logging middleware** that captures API response times and JSON payloads
- **Error handling middleware** with proper HTTP status codes and error messages
- **Vite integration** in development mode for seamless full-stack development experience

### Data Storage Solutions
- **PostgreSQL** as the primary database for persistent data storage
- **Neon Database** serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM** for type-safe database queries and schema management
- **Schema-first approach** with shared TypeScript types between frontend and backend
- **Database migrations** managed through Drizzle Kit for version control
- **In-memory storage fallback** for development/testing scenarios

### Authentication and Authorization
- Currently uses a basic user schema with username/password fields
- Password storage and authentication mechanisms are set up but not fully implemented
- User management interface includes CRUD operations through the storage layer
- Session management placeholder exists but requires implementation

### Design System and UI Components
- **Environmental theme** with HSL color system featuring water blue, vegetation green, and earth tones
- **CSS custom properties** for consistent theming across components
- **Responsive design** with mobile-first approach and breakpoint-based layouts
- **Accessibility features** through Radix UI primitives and proper ARIA attributes
- **Animation system** with custom CSS animations for floating elements and smooth transitions

## External Dependencies

### Database and ORM
- **@neondatabase/serverless** - Serverless PostgreSQL database connection with WebSocket support
- **drizzle-orm** - Type-safe ORM for database operations and query building
- **drizzle-kit** - CLI tool for database migrations and schema management
- **connect-pg-simple** - PostgreSQL session store for Express sessions

### UI and Styling
- **@radix-ui/** - Complete suite of accessible, unstyled UI primitives for components
- **tailwindcss** - Utility-first CSS framework with custom environmental theme configuration
- **class-variance-authority** - Component variant management for consistent styling
- **clsx** and **tailwind-merge** - Conditional class name utilities

### Development Tools
- **vite** - Fast build tool and development server with HMR support
- **@vitejs/plugin-react** - React support for Vite with Fast Refresh
- **@replit/vite-plugin-runtime-error-modal** - Development error handling overlay
- **@replit/vite-plugin-cartographer** - Development environment integration

### Form Handling and Validation
- **react-hook-form** - Performant forms with minimal re-renders
- **@hookform/resolvers** - Integration layer for external validation libraries
- **zod** - TypeScript-first schema validation for runtime type checking
- **drizzle-zod** - Integration between Drizzle schemas and Zod validation

### Data Fetching and State Management
- **@tanstack/react-query** - Server state management with caching, background updates, and optimistic updates
- **wouter** - Minimalist routing library for React applications

### Utility Libraries
- **date-fns** - Modern JavaScript date utility library for date manipulation
- **nanoid** - Secure, URL-safe, unique string ID generator
- **memoizee** - Function memoization for performance optimization

### TypeScript and Build Configuration
- **typescript** - Static type checking for JavaScript
- **esbuild** - Fast JavaScript/TypeScript bundler for production builds
- **tsx** - TypeScript execution environment for development server