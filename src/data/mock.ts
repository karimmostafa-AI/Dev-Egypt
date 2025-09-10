// Mock data for medical uniforms marketplace - Replace with real API calls later

export interface Product {
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

export interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  description?: string
  isPartner?: boolean
  specialOffer?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  gender: 'women' | 'men' | 'both'
  subCategories?: SubCategory[]
}

export interface SubCategory {
  id: string
  name: string
  slug: string
  parentId: string
}

export interface CartItem {
  productId: string
  product: Product
  quantity: number
  price: number
  size?: string
  color?: string
}

export interface User {
  id: string
  email: string
  name: string
}

export interface PromoBanner {
  id: string
  title: string
  description: string
  discount: string
  backgroundColor: string
  textColor: string
  link?: string
  endDate?: string
}

export const mockCategories: Category[] = [
  {
    id: 'tops',
    name: 'Scrub Tops',
    slug: 'tops',
    description: 'Comfortable and stylish scrub tops',
    gender: 'both',
    subCategories: [
      { id: 'solid-tops', name: 'Solid Tops', slug: 'solid-tops', parentId: 'tops' },
      { id: 'print-tops', name: 'Print Tops', slug: 'print-tops', parentId: 'tops' }
    ]
  },
  {
    id: 'pants',
    name: 'Scrub Pants', 
    slug: 'pants',
    description: 'Professional scrub pants and bottoms',
    gender: 'both'
  },
  {
    id: 'jackets',
    name: 'Lab Coats & Jackets',
    slug: 'jackets', 
    description: 'Professional lab coats and medical jackets',
    gender: 'both',
    subCategories: [
      { id: 'lab-coats', name: 'Lab Coats', slug: 'lab-coats', parentId: 'jackets' },
      { id: 'scrub-jackets', name: 'Scrub Jackets', slug: 'scrub-jackets', parentId: 'jackets' }
    ]
  },
  {
    id: 'footwear',
    name: 'Medical Footwear',
    slug: 'footwear',
    description: 'Comfortable shoes for healthcare professionals',
    gender: 'both'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Medical accessories and essentials',
    gender: 'both'
  }
]

export const mockBrands: Brand[] = [
  {
    id: 'brand1',
    name: 'Healing Hands',
    slug: 'healing-hands',
    logo: 'https://via.placeholder.com/150x100/8B5CF6/FFFFFF?text=Healing+Hands',
    description: 'Premium medical uniforms with superior comfort',
    isPartner: true,
    specialOffer: '20% off'
  },
  {
    id: 'brand2',
    name: 'Butter-Soft STRETCH',
    slug: 'butter-soft',
    logo: 'https://via.placeholder.com/150x100/F59E0B/FFFFFF?text=Butter+Soft',
    description: 'Ultra-soft and stretchy scrubs for all-day comfort',
    isPartner: true,
    specialOffer: '25% off'
  },
  {
    id: 'brand3',
    name: 'Med Couture',
    slug: 'med-couture',
    logo: 'https://via.placeholder.com/150x100/EF4444/FFFFFF?text=Med+Couture',
    description: 'Fashion-forward medical apparel',
    isPartner: true,
    specialOffer: '20% off'
  },
  {
    id: 'brand4',
    name: 'Dickies Medical',
    slug: 'dickies-medical',
    logo: 'https://via.placeholder.com/150x100/10B981/FFFFFF?text=Dickies',
    description: 'Durable and professional medical uniforms',
    isPartner: true,
    specialOffer: '20% off'
  },
  {
    id: 'brand5',
    name: 'Easy STRETCH',
    slug: 'easy-stretch',
    logo: 'https://via.placeholder.com/150x100/3B82F6/FFFFFF?text=Easy+Stretch',
    description: 'Flexible and comfortable stretch scrubs',
    isPartner: true,
    specialOffer: '20% off'
  }
]

export const promoBanners: PromoBanner[] = [
  {
    id: 'spotlight',
    title: 'Spotlight Sale',
    description: 'Healing Hands, Butter-Soft & more',
    discount: '20% OFF',
    backgroundColor: 'bg-purple-600',
    textColor: 'text-white',
    endDate: '2025-09-15'
  },
  {
    id: 'autumn',
    title: 'Echoes of Autumn Color Drop',
    description: 'New seasonal colors available now',
    discount: '20% OFF',
    backgroundColor: 'bg-orange-500',
    textColor: 'text-white',
    endDate: '2025-09-15'
  },
  {
    id: 'great-deals',
    title: 'Great Deals',
    description: 'While supplies last',
    discount: 'Up to 50% OFF',
    backgroundColor: 'bg-red-600',
    textColor: 'text-white'
  }
]

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Healing Hands Purple Label V-Neck Top',
    price: 24.99,
    originalPrice: 31.24,
    image: 'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Purple+V-Neck',
    brandId: 'brand1',
    brand: mockBrands[0],
    description: 'Comfortable v-neck scrub top with moisture-wicking fabric. Features 4 pockets.',
    inStock: true,
    category: 'tops',
    subCategory: 'solid-tops',
    gender: 'women',
    isOnSale: true,
    salePercentage: 20,
    isFeatured: true,
    colors: ['Purple', 'Navy', 'White', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Purple+V-Neck',
      'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Back+View',
    ]
  },
  {
    id: '2',
    name: 'Butter-Soft STRETCH Jogger Pants',
    price: 19.99,
    originalPrice: 26.65,
    image: 'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Jogger+Pants',
    brandId: 'brand2',
    brand: mockBrands[1],
    description: 'Ultra-soft jogger style scrub pants with stretch fabric and 7 pockets.',
    inStock: true,
    category: 'pants',
    gender: 'women',
    isOnSale: true,
    salePercentage: 25,
    isFeatured: true,
    colors: ['Navy', 'Black', 'Ceil Blue', 'Wine'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Jogger+Pants',
      'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Side+View',
    ]
  },
  {
    id: '3',
    name: 'Med Couture Insight Lab Coat',
    price: 35.99,
    originalPrice: 44.99,
    image: 'https://via.placeholder.com/400x400/FFFFFF/374151?text=Lab+Coat',
    brandId: 'brand3',
    brand: mockBrands[2],
    description: 'Professional 32-inch lab coat with embroidered logo. Unisex fit.',
    inStock: true,
    category: 'jackets',
    subCategory: 'lab-coats',
    gender: 'unisex',
    isOnSale: true,
    salePercentage: 20,
    colors: ['White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    images: [
      'https://via.placeholder.com/400x400/FFFFFF/374151?text=Lab+Coat',
      'https://via.placeholder.com/400x400/FFFFFF/374151?text=Side+Profile',
    ]
  },
  {
    id: '4',
    name: 'Dickies Medical V-Neck Print Top',
    price: 19.99,
    originalPrice: 24.99,
    image: 'https://via.placeholder.com/400x400/10B981/FFFFFF?text=Print+Top',
    brandId: 'brand4',
    brand: mockBrands[3],
    description: 'Fun floral print v-neck top with side vents and chest pocket.',
    inStock: true,
    category: 'tops',
    subCategory: 'print-tops',
    gender: 'women',
    isOnSale: true,
    salePercentage: 20,
    colors: ['Floral Multi', 'Butterfly Print', 'Hearts'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://via.placeholder.com/400x400/10B981/FFFFFF?text=Print+Top',
      'https://via.placeholder.com/400x400/10B981/FFFFFF?text=Detail+View',
    ]
  },
  {
    id: '5',
    name: 'Easy STRETCH Cargo Pants',
    price: 23.99,
    originalPrice: 29.99,
    image: 'https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Cargo+Pants',
    brandId: 'brand5',
    brand: mockBrands[4],
    description: 'Flexible stretch fabric cargo pants with multiple pockets and drawstring waist.',
    inStock: true,
    category: 'pants',
    gender: 'unisex',
    isOnSale: true,
    salePercentage: 20,
    colors: ['Navy', 'Black', 'Royal Blue', 'Burgundy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Cargo+Pants',
      'https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Back+Logo',
    ]
  },
  {
    id: '6',
    name: 'Healing Hands Warm-Up Scrub Jacket',
    price: 31.99,
    originalPrice: 39.99,
    image: 'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Warm+Up',
    brandId: 'brand1',
    brand: mockBrands[0],
    description: 'Zip-up warm-up jacket with rib knit cuffs and multiple pockets.',
    inStock: true,
    category: 'jackets',
    subCategory: 'scrub-jackets',
    gender: 'unisex',
    isOnSale: true,
    salePercentage: 20,
    colors: ['Navy', 'Black', 'Wine', 'Forest'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Warm+Up',
      'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Detail+Shot',
    ]
  },
  {
    id: '7',
    name: 'Professional Nursing Clogs',
    price: 45.99,
    image: 'https://via.placeholder.com/400x400/374151/FFFFFF?text=Nursing+Clogs',
    brandId: 'brand4',
    brand: mockBrands[3],
    description: 'Comfortable slip-resistant clogs perfect for long shifts. Easy to clean.',
    inStock: false,
    category: 'footwear',
    gender: 'unisex',
    colors: ['White', 'Black', 'Navy'],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    images: [
      'https://via.placeholder.com/400x400/374151/FFFFFF?text=Nursing+Clogs',
      'https://via.placeholder.com/400x400/374151/FFFFFF?text=Fit+View',
    ]
  },
  {
    id: '8',
    name: 'Butter-Soft STRETCH Polo Top',
    price: 21.99,
    originalPrice: 29.32,
    image: 'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Polo+Top',
    brandId: 'brand2',
    brand: mockBrands[1],
    description: 'Moisture-wicking polo-style scrub top with antimicrobial finish.',
    inStock: true,
    category: 'tops',
    subCategory: 'solid-tops',
    gender: 'men',
    isOnSale: true,
    salePercentage: 25,
    isFeatured: true,
    colors: ['Navy', 'Black', 'White', 'Hunter Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Polo+Top',
      'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Zipped+Up',
    ]
  },
  {
    id: '9',
    name: 'Med Couture Touch Yoga Waist Pant',
    price: 27.99,
    originalPrice: 34.99,
    image: 'https://via.placeholder.com/400x400/EF4444/FFFFFF?text=Yoga+Pant',
    brandId: 'brand3',
    brand: mockBrands[2],
    description: 'Yoga-style waistband scrub pants with 6 pockets and tapered leg.',
    inStock: true,
    category: 'pants',
    gender: 'women',
    isOnSale: true,
    salePercentage: 20,
    colors: ['Black', 'Navy', 'Ceil Blue', 'Wine'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://via.placeholder.com/400x400/EF4444/FFFFFF?text=Yoga+Pant',
      'https://via.placeholder.com/400x400/EF4444/FFFFFF?text=Full+Length',
    ]
  },
  {
    id: '10',
    name: 'Compression Nursing Socks',
    price: 14.99,
    image: 'https://via.placeholder.com/400x400/10B981/FFFFFF?text=Compression+Socks',
    brandId: 'brand5',
    brand: mockBrands[4],
    description: 'Graduated compression socks for improved circulation during long shifts.',
    inStock: true,
    category: 'accessories',
    gender: 'unisex',
    colors: ['White', 'Black', 'Navy', 'Pink'],
    sizes: ['S/M', 'L/XL'],
    images: [
      'https://via.placeholder.com/400x400/10B981/FFFFFF?text=Compression+Socks',
      'https://via.placeholder.com/400x400/10B981/FFFFFF?text=Side+Detail',
    ]
  }
]

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id)
}

export const getBrandById = (id: string): Brand | undefined => {
  return mockBrands.find(brand => brand.id === id)
}

export const getBrandBySlug = (slug: string): Brand | undefined => {
  return mockBrands.find(brand => brand.slug === slug)
}

export const getProductsByBrand = (brandId: string): Product[] => {
  return mockProducts.filter(product => product.brandId === brandId)
}

export const getProductsByBrandSlug = (slug: string): Product[] => {
  const brand = getBrandBySlug(slug)
  if (!brand) return []
  return getProductsByBrand(brand.id)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.name.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  )
}

// Category helpers
export const getCategoryById = (id: string): Category | undefined => {
  return mockCategories.find(category => category.id === id)
}

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return mockCategories.find(category => category.slug === slug)
}

export const getProductsByCategory = (categoryId: string): Product[] => {
  return mockProducts.filter(product => product.category === categoryId)
}

export const getProductsByCategorySlug = (slug: string): Product[] => {
  const category = getCategoryBySlug(slug)
  if (!category) return []
  return getProductsByCategory(category.id)
}

export const getProductsByGender = (gender: 'women' | 'men' | 'unisex'): Product[] => {
  return mockProducts.filter(product => product.gender === gender || product.gender === 'unisex')
}

export const getSaleProducts = (): Product[] => {
  return mockProducts.filter(product => product.isOnSale)
}

export const getFeaturedProducts = (limit: number = 8): Product[] => {
  return mockProducts.filter(product => product.isFeatured).slice(0, limit)
}

export const getPromoBanners = (): PromoBanner[] => {
  return promoBanners
}
