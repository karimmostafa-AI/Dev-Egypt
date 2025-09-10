# EGY DEV E-commerce Platform MVP Design Document

## Overview

**EGY DEV** (currently implemented as "MED UNIFORM") is a multi-brand e-commerce platform specializing in medical uniforms and healthcare apparel. The platform serves as a comprehensive marketplace where multiple medical uniform brands operate under a unified shopping experience, targeting healthcare professionals across Egypt and the broader market.

### Project Vision
- **Primary Goal**: Create a modern, responsive marketplace for medical uniform brands targeting healthcare professionals
- **Target Market**: Healthcare workers, medical professionals, and institutions requiring professional medical apparel
- **Business Model**: Multi-brand medical marketplace platform with B2B and B2C capabilities
- **MVP Timeline**: 2 weeks for core functionality
- **Current Status**: MVP implemented with 5 featured brands and comprehensive product catalog

### Key Features
- **Multi-brand product catalog** with medical uniform specialization
- **Brand-specific storefronts** for Healing Hands, Butter-Soft, Med Couture, Dickies Medical, and Easy STRETCH
- **Unified shopping cart and checkout** with persistent state management
- **Responsive mobile-first design** with Tailwind CSS and Shadcn/UI components
- **Advanced search and filtering** capabilities with real-time results
- **User authentication and profiles** with demo account support
- **Promotional banner system** with rotating offers and sales
- **Professional categorization** (scrub tops, pants, lab coats, footwear, accessories)

## Technology Stack & Dependencies

### Core Framework Stack
- **Next.js 14**: App Router architecture for routing and server-side rendering
- **React 18**: Component-based UI development with concurrent features
- **TypeScript**: Type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first styling framework

### UI & Component Libraries
- **Shadcn/UI**: Accessible component primitives built on Radix UI
- **Radix UI**: Headless UI components for accessibility
- **Lucide React**: Modern icon library
- **Class Variance Authority (CVA)**: Type-safe component variants

### State Management & Data
- **Zustand**: Lightweight state management with persistence
- **localStorage**: Client-side data persistence for cart and user sessions
- **Mock Data Layer**: JSON-based data structure for MVP (ready for API integration)

### Development Tools
- **Tailwind Merge**: Utility for merging Tailwind classes
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing

## Component Architecture

### Layout Components

#### Header Component Structure
```mermaid
graph TB
    Header --> PromoBanner[Promotional Banner Carousel]
    Header --> TopBar[Top Bar with Location & Contact]
    Header --> MainHeader[Main Header Section]
    Header --> Navigation[Navigation Menu]
    
    MainHeader --> Logo[MED UNIFORM Logo]
    MainHeader --> SearchBar[Search Bar with Autocomplete]
    MainHeader --> UserActions[User Actions]
    
    UserActions --> AuthButtons[Sign In / Create Account]
    UserActions --> CartButton[Cart with Badge]
    UserActions --> MobileMenu[Mobile Menu Toggle]
    
    Navigation --> NavItems[Navigation Items]
    NavItems --> ShopWomen[Shop Women with Dropdown]
    NavItems --> ShopMen[Shop Men with Dropdown]
    NavItems --> Marketplace[Medical Marketplace]
    NavItems --> Sale[Sale (Highlighted)]
```

#### Brand Navigation Implementation
```mermaid
graph TD
    BrandNavigation --> BrandsPage[/brands - All Brands Grid]
    BrandsPage --> BrandCard[Brand Card Components]
    BrandCard --> BrandLogo[Brand Logo Display]
    BrandCard --> BrandInfo[Brand Information]
    BrandCard --> ProductCount[Product Count Badge]
    
    BrandCard --> BrandPage[/brands/[slug] - Individual Brand]
    BrandPage --> BrandHeader[Brand Header Section]
    BrandPage --> BrandProducts[Brand Product Grid]
    
    BrandHeader --> BrandLogo2[Large Brand Logo]
    BrandHeader --> BrandDescription[Brand Description]
    BrandHeader --> BrandStats[Brand Statistics]
```

#### Current Navigation Structure
```mermaid
graph TD
    Root["/"] --> HomePage[Home Page with Featured Content]
    Root --> Products["/products - Product Catalog"]
    Root --> Brands["/brands - Brand Showcase"]
    Root --> Cart["/cart - Shopping Cart"]
    Root --> Checkout["/checkout - Checkout Process"]
    Root --> Auth["/auth - Authentication"]
    
    Products --> ProductDetail["/products/[id] - Product Detail"]
    Brands --> BrandDetail["/brands/[slug] - Brand Page"]
    
    ProductDetail --> RelatedProducts[Related Products Section]
    BrandDetail --> BrandProducts[Brand Product Grid]
    
    Auth --> LoginForm[Login Form]
    Auth --> SignupForm[Registration Form]
```

### Product Components

#### Product Card Component
```mermaid
graph TB
    ProductCard --> ImageSection[Product Image]
    ProductCard --> ContentSection[Product Content]
    ProductCard --> FooterSection[Action Footer]
    
    ImageSection --> ProductImage[Main Product Image]
    ImageSection --> SaleBadge[Sale Badge if Applicable]
    ImageSection --> OutOfStockOverlay[Out of Stock Overlay]
    
    ContentSection --> ProductInfo[Product Information]
    ProductInfo --> ProductTitle[Product Title]
    ProductInfo --> BrandName[Brand Name]
    ProductInfo --> PriceDisplay[Price with Original Price]
    ProductInfo --> CartQuantity[Quantity in Cart Indicator]
    
    FooterSection --> AddToCartButton[Add to Cart Button]
```

#### Product Detail Layout
```mermaid
graph LR
    ProductDetail --> Breadcrumbs[Navigation Breadcrumbs]
    ProductDetail --> BackButton[Back to Products Button]
    ProductDetail --> ProductContent[Product Content Grid]
    
    ProductContent --> ImageGallery[Image Gallery]
    ProductContent --> ProductInfo[Product Information]
    ProductContent --> PurchaseActions[Purchase Actions]
    
    ImageGallery --> MainImage[Main Product Image]
    ImageGallery --> ThumbnailGrid[Thumbnail Images]
    
    ProductInfo --> ProductTitle[Product Title & Brand]
    ProductInfo --> PriceSection[Price Display]
    ProductInfo --> Description[Product Description]
    ProductInfo --> Specifications[Colors & Sizes]
    ProductInfo --> AdditionalInfo[Additional Product Details]
    
    PurchaseActions --> QuantitySelector[Quantity Selector]
    PurchaseActions --> AddToCartBtn[Add to Cart Button]
    PurchaseActions --> StockStatus[Stock Status Indicator]
```

### Brand Components

#### Brand Page Implementation
```mermaid
graph TB
    BrandPage --> BrandBreadcrumbs[Breadcrumb Navigation]
    BrandPage --> BackButton[Back to Brands Button]
    BrandPage --> BrandHeader[Brand Header Section]
    BrandPage --> ProductsSection[Products Section]
    BrandPage --> CallToAction[Brand CTA Section]
    
    BrandHeader --> BrandLogo[Brand Logo Display]
    BrandHeader --> BrandInfo[Brand Information]
    BrandHeader --> BrandStats[Brand Statistics Panel]
    
    BrandInfo --> BrandName[Brand Name]
    BrandInfo --> BrandDescription[Brand Description]
    BrandInfo --> BrandStory[Brand Story Content]
    
    BrandStats --> ProductCount[Total Products]
    BrandStats --> PriceRange[Price Range]
    BrandStats --> Rating[Brand Rating]
    BrandStats --> Location[Brand Location]
    
    ProductsSection --> InStockProducts[In-Stock Products Grid]
    ProductsSection --> OutOfStockProducts[Out-of-Stock Products Grid]
    ProductsSection --> EmptyState[No Products State]
    
    CallToAction --> FollowBrand[Follow Brand Button]
    CallToAction --> ShareBrand[Share Brand Button]
```

### Shopping Cart Components

#### Cart State Management
```mermaid
graph TD
    CartStore --> CartState[Cart State]
    CartStore --> CartActions[Cart Actions]
    CartStore --> CartPersistence[localStorage Persistence]
    
    CartState --> Items[Cart Items Array]
    CartState --> IsOpen[Sidebar Open State]
    CartState --> ComputedValues[Computed Values]
    
    ComputedValues --> TotalItems[Total Item Count]
    ComputedValues --> TotalPrice[Total Price]
    ComputedValues --> ItemQuantity[Individual Item Quantities]
    
    CartActions --> AddItem[Add Item to Cart]
    CartActions --> RemoveItem[Remove Item from Cart]
    CartActions --> UpdateQuantity[Update Item Quantity]
    CartActions --> ClearCart[Clear Entire Cart]
    CartActions --> ToggleCart[Toggle Cart Sidebar]
```

#### Cart Sidebar Implementation
```mermaid
graph TB
    CartSidebar --> CartHeader[Cart Header]
    CartSidebar --> CartContent[Cart Content Area]
    CartSidebar --> CartFooter[Cart Footer Actions]
    
    CartHeader --> CartTitle[Shopping Cart Title with Count]
    CartHeader --> CloseButton[Close Sidebar Button]
    
    CartContent --> EmptyState[Empty Cart State]
    CartContent --> CartItems[Cart Items List]
    
    EmptyState --> EmptyIcon[Shopping Bag Icon]
    EmptyState --> EmptyMessage[Empty Cart Message]
    EmptyState --> ContinueShoppingBtn[Continue Shopping Button]
    
    CartItems --> CartItem[Individual Cart Item]
    CartItem --> ItemImage[Product Image]
    CartItem --> ItemInfo[Product Information]
    CartItem --> QuantityControls[Quantity Controls]
    CartItem --> RemoveButton[Remove Item Button]
    
    CartFooter --> TotalPrice[Total Price Display]
    CartFooter --> CheckoutButton[Checkout Button]
    CartFooter --> ViewCartButton[View Full Cart Button]
    CartFooter --> ContinueShoppingLink[Continue Shopping Link]
```

## Data Models & Schema

### Product Schema
```mermaid
erDiagram
    PRODUCT {
        string id PK
        string name
        number price
        number originalPrice
        string image
        string brandId FK
        string description
        boolean inStock
        string category
        string subCategory
        json images
        json colors
        json sizes
        string gender
        boolean isOnSale
        number salePercentage
        boolean isFeatured
        json tags
    }
    
    BRAND {
        string id PK
        string name
        string slug
        string logo
        string description
        boolean isPartner
        string specialOffer
    }
    
    CATEGORY {
        string id PK
        string name
        string slug
        string description
        string image
        string gender
        json subCategories
    }
    
    CART_ITEM {
        string productId PK
        string userId FK
        number quantity
        number price
        string size
        string color
    }
    
    USER {
        string id PK
        string email
        string name
        boolean emailVerified
        string image
        string pickupPoint
        string role
        datetime createdAt
        datetime updatedAt
    }
    
    PROMO_BANNER {
        string id PK
        string title
        string description
        string discount
        string backgroundColor
        string textColor
        string link
        string endDate
    }
    
    BRAND ||--o{ PRODUCT : contains
    CATEGORY ||--o{ PRODUCT : categorizes
    USER ||--o{ CART_ITEM : owns
    PRODUCT ||--o{ CART_ITEM : includes
```

### Current Implementation Data Structure
```typescript
// Current Product Interface
interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brandId: string
  brand: Brand
  description: string
  inStock: boolean
  category: string
  subCategory?: string
  images?: string[]
  colors?: string[]
  sizes?: string[]
  gender: 'women' | 'men' | 'unisex'
  isOnSale?: boolean
  salePercentage?: number
  isFeatured?: boolean
  tags?: string[]
}

// Current Brand Interface
interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  description?: string
  isPartner?: boolean
  specialOffer?: string
}

// Cart Item Interface
interface CartItem {
  productId: string
  product: Product
  quantity: number
  price: number
  size?: string
  color?: string
}
```

## Routing & Navigation

### App Router Structure
```mermaid
graph TB
    App["app/"] --> Layout["layout.tsx - Root Layout"]
    App --> HomePage["page.tsx - Home Page"]
    App --> ProductsPage["products/"]
    App --> BrandsPages["brands/"]
    App --> CartPage["cart/"]
    App --> CheckoutPage["checkout/"]
    App --> AuthPage["auth/"]
    
    ProductsPage --> ProductsList["page.tsx - Products List"]
    ProductsPage --> ProductDetail["[id]/page.tsx - Product Detail"]
    
    BrandsPages --> BrandsList["page.tsx - All Brands"]
    BrandsPages --> BrandDetail["[slug]/page.tsx - Brand Page"]
    
    CartPage --> CartView["page.tsx - Cart Page"]
    CheckoutPage --> CheckoutFlow["page.tsx - Checkout"]
    AuthPage --> AuthForm["page.tsx - Authentication"]
```

### Navigation Flow Implementation
```mermaid
graph TD
    HomePage --> FeaturedBrands[Featured Brands Section]
    HomePage --> FeaturedProducts[Featured Products Grid]
    HomePage --> CTASection[Call to Action]
    
    FeaturedBrands --> BrandCard[Brand Card Click]
    BrandCard --> BrandPage[Individual Brand Page]
    
    FeaturedProducts --> ProductCard[Product Card Click]
    ProductCard --> ProductDetail[Product Detail Page]
    
    HeaderSearch --> SearchResults[Search Results]
    SearchResults --> ProductDetail
    
    Navigation --> ProductsPage[All Products]
    Navigation --> BrandsPage[All Brands]
    Navigation --> CartSidebar[Cart Sidebar]
    
    ProductDetail --> AddToCart[Add to Cart Action]
    AddToCart --> CartUpdate[Cart State Update]
    CartUpdate --> CartSidebar
    
    CartSidebar --> CheckoutPage[Proceed to Checkout]
    CheckoutPage --> OrderSuccess[Order Confirmation]
```

## Styling Strategy

### Tailwind CSS Configuration
```mermaid
graph TB
    TailwindConfig --> Theme[Custom Theme Extension]
    TailwindConfig --> Plugins[Plugin Configuration]
    TailwindConfig --> ContentPaths[Content Path Configuration]
    
    Theme --> Colors[Color System]
    Theme --> Typography[Typography Scale]
    Theme --> Spacing[Spacing System]
    Theme --> Breakpoints[Responsive Breakpoints]
    
    Colors --> Primary[Primary: Purple #8B5CF6]
    Colors --> Secondary[Secondary: Blue #3B82F6]
    Colors --> Success[Success: Green #10B981]
    Colors --> Warning[Warning: Orange #F59E0B]
    Colors --> Error[Error: Red #EF4444]
    
    Plugins --> ShadcnUI[Shadcn/UI Plugin]
    Plugins --> TailwindAnimate[Tailwind Animate]
```

### Design System Implementation
```css
/* Current Color Palette */
:root {
  /* Primary Brand Colors */
  --primary-purple: #8B5CF6;
  --primary-blue: #3B82F6;
  
  /* Medical Brand Colors */
  --healing-hands: #8B5CF6;
  --butter-soft: #F59E0B;
  --med-couture: #EF4444;
  --dickies: #10B981;
  --easy-stretch: #3B82F6;
  
  /* Semantic Colors */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
  
  /* Neutral Grays */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-600: #4B5563;
  --gray-900: #111827;
}

/* Component Styling Patterns */
.header-navigation {
  @apply sticky top-0 z-50 bg-white shadow-sm;
}

.brand-card {
  @apply overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105;
}

.product-card {
  @apply bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border hover:border-purple-200;
}

.promotional-banner {
  @apply bg-gradient-to-r text-white px-4 py-2 text-center text-sm font-medium;
}
```

### Component Variants System
```mermaid
graph TB
    ShadcnUI[Shadcn/UI Components] --> ButtonVariants[Button Variants]
    ShadcnUI --> CardVariants[Card Variants]
    ShadcnUI --> BadgeVariants[Badge Variants]
    
    ButtonVariants --> DefaultButton[Default]
    ButtonVariants --> DestructiveButton[Destructive]
    ButtonVariants --> OutlineButton[Outline]
    ButtonVariants --> SecondaryButton[Secondary]
    ButtonVariants --> GhostButton[Ghost]
    ButtonVariants --> LinkButton[Link]
    
    BadgeVariants --> DefaultBadge[Default]
    BadgeVariants --> SecondaryBadge[Secondary]
    BadgeVariants --> DestructiveBadge[Destructive]
    BadgeVariants --> OutlineBadge[Outline]
```

## State Management

### Zustand Store Architecture
```mermaid
graph TB
    ZustandStores --> CartStore[Cart Store]
    ZustandStores --> SearchStore[Search Store]
    ZustandStores --> UserStore[User Store]
    
    CartStore --> CartState[Cart State Management]
    CartStore --> CartActions[Cart Actions]
    CartStore --> CartPersistence[localStorage Persistence]
    
    CartState --> Items[items: CartItem[]]
    CartState --> IsOpen[isOpen: boolean]
    CartState --> Getters[Computed Getters]
    
    Getters --> TotalItems[getTotalItems()]
    Getters --> TotalPrice[getTotalPrice()]
    Getters --> ItemQuantity[getItemQuantity()]
    
    CartActions --> AddItem[addItem()]
    CartActions --> RemoveItem[removeItem()]
    CartActions --> UpdateQuantity[updateQuantity()]
    CartActions --> ClearCart[clearCart()]
    CartActions --> ToggleCart[toggleCart()]
    
    SearchStore --> SearchState[Search State]
    SearchState --> Query[query: string]
    SearchState --> IsSearching[isSearching: boolean]
    SearchState --> Results[results: Product[]]
    
    UserStore --> UserState[User State]
    UserState --> User[user: User | null]
    UserState --> IsLoggedIn[isLoggedIn: boolean]
```

### Current Store Implementation
```typescript
// Cart Store Implementation
interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  
  // Getters
  getTotalItems: () => number
  getTotalPrice: () => number
  getItemQuantity: (productId: string) => number
}

// Search Store Implementation
interface SearchStore {
  query: string
  isSearching: boolean
  results: Product[]
  
  setQuery: (query: string) => void
  setResults: (results: Product[]) => void
  setIsSearching: (isSearching: boolean) => void
  clearSearch: () => void
}

// User Store Implementation
interface UserStore {
  user: { id: string; name: string; email: string } | null
  isLoggedIn: boolean
  
  login: (user: { id: string; name: string; email: string }) => void
  logout: () => void
}
```

## API Integration Layer

### Data Fetching Strategy
```mermaid
graph TB
    DataLayer --> MockDataLayer[Mock Data Layer - Current]
    DataLayer --> FutureAPILayer[Future API Layer]
    
    MockDataLayer --> ProductsData[products.json equivalent]
    MockDataLayer --> BrandsData[brands.json equivalent]
    MockDataLayer --> CategoriesData[categories.json equivalent]
    MockDataLayer --> PromoBannersData[promoBanners.json equivalent]
    
    MockDataLayer --> HelperFunctions[Data Helper Functions]
    HelperFunctions --> GetProductById[getProductById()]
    HelperFunctions --> GetBrandBySlug[getBrandBySlug()]
    HelperFunctions --> SearchProducts[searchProducts()]
    HelperFunctions --> GetProductsByBrand[getProductsByBrand()]
    HelperFunctions --> GetSaleProducts[getSaleProducts()]
    HelperFunctions --> GetFeaturedProducts[getFeaturedProducts()]
    
    FutureAPILayer --> ProductsAPI[/api/products]
    FutureAPILayer --> BrandsAPI[/api/brands]
    FutureAPILayer --> OrdersAPI[/api/orders]
    FutureAPILayer --> AuthAPI[/api/auth]
```

### Current Data Helper Functions
```typescript
// Product Helpers
export const getProductById = (id: string): Product | undefined
export const getBrandById = (id: string): Brand | undefined
export const getBrandBySlug = (slug: string): Brand | undefined
export const getProductsByBrand = (brandId: string): Product[]
export const getProductsByBrandSlug = (slug: string): Product[]
export const searchProducts = (query: string): Product[]

// Category Helpers
export const getCategoryById = (id: string): Category | undefined
export const getCategoryBySlug = (slug: string): Category | undefined
export const getProductsByCategory = (categoryId: string): Product[]
export const getProductsByCategorySlug = (slug: string): Product[]
export const getProductsByGender = (gender: 'women' | 'men' | 'unisex'): Product[]

// Featured Content
export const getSaleProducts = (): Product[]
export const getFeaturedProducts = (limit: number = 8): Product[]
export const getPromoBanners = (): PromoBanner[]
```

### Future API Endpoints Structure
```
GET /api/products - List all products with filtering and pagination
GET /api/products/[id] - Get single product details
GET /api/products/search?q=[query] - Search products
GET /api/products/featured - Get featured products
GET /api/products/sale - Get sale products

GET /api/brands - List all brands
GET /api/brands/[slug] - Get brand details
GET /api/brands/[slug]/products - Get products by brand

GET /api/categories - List all categories
GET /api/categories/[slug]/products - Get products by category

POST /api/cart - Add item to cart
PUT /api/cart/[itemId] - Update cart item
DELETE /api/cart/[itemId] - Remove cart item
GET /api/cart - Get cart contents

POST /api/orders - Create new order
GET /api/orders/[id] - Get order details
GET /api/users/[id]/orders - Get user orders

POST /api/auth/login - User login
POST /api/auth/register - User registration
POST /api/auth/logout - User logout
GET /api/auth/me - Get current user
```

## Performance Optimization

### Next.js Performance Features
```mermaid
graph TB
    Performance --> ImageOptimization[Image Optimization]
    Performance --> CodeSplitting[Code Splitting]
    Performance --> StaticGeneration[Static Generation]
    Performance --> Caching[Caching Strategy]
    
    ImageOptimization --> NextImage[next/image Component]
    ImageOptimization --> AutoWebP[Automatic WebP Conversion]
    ImageOptimization --> ResponsiveImages[Responsive Image Loading]
    ImageOptimization --> LazyLoading[Lazy Loading by Default]
    
    CodeSplitting --> DynamicImports[Dynamic Component Imports]
    CodeSplitting --> RouteBasedSplitting[Route-based Code Splitting]
    CodeSplitting --> ComponentLazyLoading[Component Lazy Loading]
    
    StaticGeneration --> StaticPages[Static Page Generation]
    StaticGeneration --> ISR[Incremental Static Regeneration]
    StaticGeneration --> ProductPages[Product Page Optimization]
    
    Caching --> StaticAssets[Static Asset Caching]
    Caching --> APIResponseCaching[API Response Caching]
    Caching --> BrowserCaching[Browser Caching Headers]
```

### Current Performance Implementation
- **Image Optimization**: All product images use Next.js `Image` component with automatic optimization
- **Component Lazy Loading**: Heavy components loaded dynamically when needed
- **State Persistence**: Cart state persisted to localStorage to prevent data loss
- **Search Optimization**: Debounced search to prevent excessive API calls
- **Mobile Performance**: Mobile-first responsive design with optimized touch interactions

## Security & Authentication

### Current Authentication Implementation
```mermaid
sequenceDiagram
    participant User
    participant Client
    participant LocalStorage
    participant UserStore
    
    User->>Client: Navigate to /auth
    User->>Client: Enter credentials
    Client->>UserStore: Call login() action
    UserStore->>LocalStorage: Persist user data
    UserStore-->>Client: Update isLoggedIn state
    Client-->>User: Redirect to dashboard
    
    User->>Client: Browse protected content
    Client->>UserStore: Check isLoggedIn
    UserStore->>LocalStorage: Verify stored session
    LocalStorage-->>UserStore: Return user data
    UserStore-->>Client: Confirm authentication
    Client-->>User: Show protected content
```

### Security Measures Implementation
- **Client-side State Management**: Secure user session handling with Zustand persistence
- **Input Validation**: Form validation for all user inputs
- **XSS Prevention**: React's built-in XSS protection mechanisms
- **CSRF Protection**: Next.js built-in CSRF protection for forms
- **Secure Data Handling**: No sensitive data stored in localStorage (passwords, payment info)
- **Authentication State**: Proper session management with automatic cleanup

## Testing Strategy

### Testing Architecture
```mermaid
graph TB
    Testing --> ComponentTesting[Component Testing]
    Testing --> IntegrationTesting[Integration Testing]
    Testing --> E2ETesting[End-to-End Testing]
    
    ComponentTesting --> UnitTests[Unit Tests]
    ComponentTesting --> ComponentInteraction[Component Interaction Tests]
    
    UnitTests --> ProductCard[Product Card Tests]
    UnitTests --> CartStore[Cart Store Tests]
    UnitTests --> SearchFunctionality[Search Function Tests]
    UnitTests --> DataHelpers[Data Helper Tests]
    
    IntegrationTesting --> UserFlow[User Flow Tests]
    IntegrationTesting --> CartIntegration[Cart Integration Tests]
    IntegrationTesting --> NavigationFlow[Navigation Flow Tests]
    
    E2ETesting --> CheckoutFlow[Complete Checkout Flow]
    E2ETesting --> BrandNavigation[Brand Navigation Flow]
    E2ETesting --> ProductSearch[Product Search Flow]
    E2ETesting --> MobileExperience[Mobile User Experience]
```

### Recommended Testing Tools
- **Jest**: Unit testing framework for JavaScript/TypeScript
- **React Testing Library**: Component testing utilities with accessibility focus
- **Playwright**: End-to-end testing with cross-browser support
- **MSW (Mock Service Worker)**: API mocking for integration tests
- **Storybook**: Component development and visual testing environment

### Key Test Scenarios
1. **Cart Functionality**: Add/remove items, quantity updates, persistence
2. **Product Search**: Search accuracy, filters, performance
3. **Brand Navigation**: Brand page routing, product filtering
4. **Responsive Design**: Mobile navigation, touch interactions
5. **Authentication Flow**: Login/logout, session persistence
6. **Checkout Process**: Form validation, order creation
7. **Performance**: Page load times, image optimization
8. **Accessibility**: Screen reader compatibility, keyboard navigation