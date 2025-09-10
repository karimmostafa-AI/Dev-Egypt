# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

EGY DEV is a multi-brand e-commerce platform MVP showcasing Egypt's leading fashion brands. It's built with Next.js 14, TypeScript, and Tailwind CSS, featuring a modern responsive design and complete shopping experience.

## Development Commands

### Core Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server  
npm start

# Run linter
npm run lint
```

### Running Single Tests
Currently no test framework is configured. To add testing:
```bash
# For Jest + React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom

# For Vitest (faster alternative)
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

## Architecture Overview

### Application Structure
- **Next.js App Router**: Uses modern App Router with `src/app/` directory structure
- **State Management**: Zustand for global state (cart, search, user) with localStorage persistence
- **UI Components**: Shadcn/UI component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and CSS variables

### Key Architectural Patterns

#### State Management Architecture
The app uses Zustand stores in `src/lib/store.ts` with three main stores:
- `useCartStore`: Shopping cart with localStorage persistence
- `useSearchStore`: Search functionality state
- `useUserStore`: Basic user authentication state

#### Data Layer
Mock data architecture in `src/data/mock.ts`:
- TypeScript interfaces for Product, Brand, CartItem, User
- Helper functions for data retrieval (getProductById, searchProducts, etc.)
- Ready for API integration - simply replace mock functions with API calls

#### Component Architecture
- **Layout**: Root layout with Header, Footer, CartSidebar
- **Page Components**: Route-specific pages in `src/app/`
- **Reusable Components**: `src/components/` with UI components and business logic components
- **Dynamic Routes**: `[id]` and `[slug]` for product and brand pages

### Directory Structure Logic
```
src/
├── app/                 # Next.js App Router pages
│   ├── (auth)/         # Route groups (future implementation)
│   ├── products/[id]/  # Dynamic product pages
│   └── brands/[slug]/  # Dynamic brand pages
├── components/         # Reusable components
│   └── ui/            # Shadcn/UI components
├── data/              # Mock data and types
├── lib/               # Utilities and stores
└── styles/            # Global styles
```

## Development Patterns

### Component Development
- Use TypeScript interfaces from `src/data/mock.ts` for type safety
- Follow Shadcn/UI patterns for consistent styling
- Implement loading states with skeleton components
- Use `'use client'` directive only when necessary (client-side interactivity)

### State Updates
- Cart operations through `useCartStore` actions
- Search functionality through `useSearchStore`
- User authentication through `useUserStore`
- All stores have localStorage persistence where appropriate

### Routing and Navigation
- Use Next.js `Link` component for client-side navigation
- Implement breadcrumbs for better user experience
- Handle 404 states with `notFound()` for dynamic routes

### Image Handling
- Next.js Image component with optimized loading
- Remote patterns configured in `next.config.mjs` for placeholder services
- Responsive image sizing with Tailwind CSS classes

## Data Flow

### Product Data Flow
1. Mock data defined in `src/data/mock.ts`
2. Helper functions retrieve data (getProductById, searchProducts)
3. Components consume data through props or direct function calls
4. State updates happen through Zustand store actions

### Shopping Cart Flow
1. Add/remove items through `useCartStore` actions
2. Cart state persisted to localStorage automatically
3. Cart sidebar shows real-time updates
4. Checkout process (basic implementation in place)

## Configuration Files

### Build Configuration
- `next.config.mjs`: Next.js configuration with image domains
- `tailwind.config.ts`: Tailwind with Shadcn/UI design system
- `tsconfig.json`: TypeScript configuration with path mapping (`@/*`)
- `postcss.config.mjs`: PostCSS for Tailwind processing

### Code Quality
- `.eslintrc.json`: ESLint with Next.js and TypeScript rules
- TypeScript strict mode enabled
- Path aliases: `@/` maps to `src/`

## Future Development Considerations

### API Integration Ready
- Mock data functions in `src/data/mock.ts` can be replaced with API calls
- TypeScript interfaces already define data contracts
- Loading states and error handling patterns in place

### Authentication Enhancement
- Basic user store exists, ready for NextAuth.js integration
- Auth routes structure prepared in `src/app/auth/`

### Database Integration
- Data types defined for easy Prisma/database integration
- Helper functions abstract data access patterns

### Testing Strategy
When adding tests, focus on:
- Component rendering and user interactions
- Cart functionality and state management
- Search and filtering logic
- Form submissions and validation

## Brand Design System

### Colors (defined in Tailwind config)
- Primary: Blue theme with HSL custom properties
- Uses CSS custom properties for theme customization
- Full design token system via Shadcn/UI

### Typography
- Geist Sans and Geist Mono fonts loaded locally
- Responsive text sizing with Tailwind utilities

This MVP architecture is designed for rapid development and easy scaling to production with real APIs and enhanced features.
