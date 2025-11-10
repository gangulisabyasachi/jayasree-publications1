# Cornerstone Books - Literary Bookstore Website

## Overview

Cornerstone Books is an independent bookstore web application built with a modern full-stack architecture. The application serves as a digital storefront for a curated literary bookstore, featuring book browsing, detailed book information, contact forms, and administrative book management capabilities. The design philosophy emphasizes sophisticated minimalism with a literary aesthetic, drawing inspiration from premium independent bookstores.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing (alternative to React Router)

**UI Component System**
- shadcn/ui component library with Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom color system using CSS variables for theme consistency
- Typography system featuring Playfair Display (serif) for headings and Inter (sans-serif) for body text

**State Management**
- TanStack Query (React Query) for server state management, caching, and data fetching
- Local component state with React hooks for UI state

**Form Handling**
- React Hook Form with Zod schema validation via @hookform/resolvers
- Type-safe form validation integrated with backend schemas

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Custom Vite middleware integration for development with HMR
- Request logging middleware for API monitoring

**API Design**
- RESTful API architecture with the following endpoints:
  - `GET /api/books` - Retrieve all books
  - `GET /api/books/:id` - Retrieve single book
  - `POST /api/books` - Create new book (with file upload)
  - `PUT /api/books/:id` - Update existing book
  - `DELETE /api/books/:id` - Delete book
  - `POST /api/contact` - Submit contact form
- Multer middleware for handling book cover image uploads
- Static file serving for uploaded images via `/uploads` route

**Data Layer**
- In-memory storage implementation (MemStorage class) with seeded sample data
- Interface-based storage abstraction (IStorage) allowing future database integration
- Drizzle ORM configured for PostgreSQL (prepared for future database migration)
- Schema-driven approach with shared types between frontend and backend

### Database Schema (Prepared)

**Books Table**
- id: UUID primary key with auto-generation
- title: Text field for book title
- author: Text field for author name
- synopsis: Text field for book description
- coverImage: Text field storing image path/URL
- publicationDate: Text field for publication information

**Contact Submissions Table**
- id: UUID primary key with auto-generation
- name: Text field for contact name
- email: Text field for contact email
- message: Text field for message content

**Schema Validation**
- Drizzle-Zod integration for automatic TypeScript schema generation
- Shared schema definitions in `/shared/schema.ts` for type consistency across frontend and backend

### File Upload System

**Configuration**
- Multer with disk storage strategy
- Upload directory: `/uploads` (created automatically)
- File size limit: 10MB
- Allowed file types: JPEG, JPG, PNG, GIF, WebP
- Unique filename generation using timestamp and random suffix

### Project Structure

**Monorepo Organization**
- `/client` - Frontend React application
  - `/src/components` - Reusable UI components
  - `/src/pages` - Route-specific page components
  - `/src/hooks` - Custom React hooks
  - `/src/lib` - Utility functions and configurations
- `/server` - Backend Express application
  - `routes.ts` - API route definitions
  - `storage.ts` - Data storage abstraction
  - `vite.ts` - Development server configuration
- `/shared` - Shared TypeScript types and schemas
- `/attached_assets` - Static image assets

**Path Aliases**
- `@/` maps to `client/src/`
- `@shared/` maps to `shared/`
- `@assets/` maps to `attached_assets/`

## External Dependencies

### Core Framework Dependencies
- **React & React DOM** (v18+) - Frontend UI framework
- **Express.js** - Backend web server framework
- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework with PostCSS and Autoprefixer
- **shadcn/ui** - Component library built on Radix UI primitives
- **@radix-ui/* packages** - Accessible unstyled UI primitives (accordion, dialog, dropdown, navigation, toast, etc.)
- **class-variance-authority** - CSS class variant management
- **clsx & tailwind-merge** - Conditional className utility
- **lucide-react** - Icon library

### Data Management
- **@tanstack/react-query** - Server state management and data fetching
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **drizzle-zod** - Zod schema generation from Drizzle schemas
- **Zod** - Schema validation library

### Form Handling
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Form validation resolvers

### File Upload
- **multer** - Multipart form data handling for file uploads
- **@types/multer** - TypeScript definitions

### Routing
- **wouter** - Lightweight client-side routing

### Database (Configured, Not Active)
- **@neondatabase/serverless** - Neon serverless PostgreSQL driver
- PostgreSQL dialect configured in Drizzle

### Development Tools
- **@replit/vite-plugin-*** - Replit-specific development plugins (runtime errors, cartographer, dev banner)
- **tsx** - TypeScript execution for development server
- **esbuild** - Server bundling for production builds

### Fonts (External CDN)
- **Google Fonts** - Playfair Display and Inter font families loaded via CDN