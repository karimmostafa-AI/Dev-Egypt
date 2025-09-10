# EGY DEV - Multi-Brand E-commerce Platform MVP

A modern, responsive e-commerce platform showcasing Egypt's leading fashion brands. Built with Next.js 14, TypeScript, and Tailwind CSS.

![EGY DEV Platform](https://img.shields.io/badge/Status-MVP_Complete-success)
![Next.js](https://img.shields.io/badge/Next.js-14.2.32-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## 🚀 Live Demo

The MVP is ready for deployment and can be viewed at: `http://localhost:3000`

## ✨ Features

### 🏪 Core Marketplace Functionality
- **Multi-Brand Showcase**: Display products from multiple Egyptian brands
- **Product Catalog**: Complete product listing with search and filters
- **Product Details**: Individual product pages with image gallery
- **Brand Pages**: Dedicated pages for each brand with their products

### 🛒 Shopping Experience  
- **Shopping Cart**: Add, remove, and update product quantities
- **Cart Sidebar**: Quick access to cart contents
- **Checkout Flow**: 2-step checkout process with order confirmation
- **Responsive Design**: Mobile-first design that works on all devices

### 👤 User Management
- **Authentication**: Sign in/up with email and demo account option
- **User State**: Persistent user sessions with Zustand
- **Guest Checkout**: Complete purchases without account requirement

### 🎨 Modern UI/UX
- **Shadcn/UI Components**: Professional, accessible component library
- **Tailwind CSS**: Utility-first styling with custom design system
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Graceful error states and 404 pages

## 🛠 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Re-usable component library

### State Management
- **Zustand**: Lightweight state management
- **localStorage**: Persistent cart and user sessions

### UI/UX
- **Lucide React**: Modern icon library
- **Next/Image**: Optimized image loading
- **Responsive Grid**: CSS Grid and Flexbox layouts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd egy-dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📱 Key Pages

- **Home** (`/`) - Hero section, featured products, brand showcase
- **Products** (`/products`) - Product catalog with search and filters
- **Product Detail** (`/products/[id]`) - Individual product pages
- **Brands** (`/brands`) - All brands showcase
- **Brand Detail** (`/brands/[slug]`) - Brand-specific product catalog
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - 2-step checkout process
- **Auth** (`/auth`) - Sign in/up with demo account

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Geist Sans (Bold/Semibold)
- **Body**: Geist Sans (Regular/Medium)
- **Monospace**: Geist Mono

## 📊 Mock Data

The MVP includes comprehensive mock data:
- **5 Egyptian Brands**: Urban Style, Street Wear, Classic Collection, Sport Elite, Eco Fashion
- **10 Products**: Various categories (T-shirts, Jackets, Shoes, etc.)
- **Brand Information**: Logos, descriptions, and stories
- **Product Images**: Placeholder images with proper sizing

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔜 Next Steps (Phase 2+)

### Phase 2: Enhanced MVP
- Real database integration (Prisma + PostgreSQL)
- Authentication with NextAuth
- Stripe payment integration
- Advanced search and filters

### Phase 3: Growth Features
- Admin dashboard
- Brand portal
- Reviews and ratings
- User profiles and order history

### Phase 4: Advanced Features
- Analytics and reporting
- Inventory management
- Marketing tools
- Mobile app

## 📈 Performance

- **Bundle Size**: ~115KB First Load JS
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: Pre-rendered pages where possible

---

**EGY DEV** - Bringing Egypt's fashion brands to the world 🇪🇬

Made with ❤️ using Next.js, TypeScript, and Tailwind CSS
