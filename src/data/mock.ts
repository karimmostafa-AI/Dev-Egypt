// Mock data for MVP - Replace with real API calls later

export interface Product {
  id: string
  name: string
  price: number
  image: string
  brandId: string
  brand: Brand
  description: string
  inStock: boolean
  category?: string
  images?: string[]
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  description?: string
}

export interface CartItem {
  productId: string
  product: Product
  quantity: number
  price: number
}

export interface User {
  id: string
  email: string
  name: string
}

export const mockBrands: Brand[] = [
  {
    id: 'brand1',
    name: 'Urban Style',
    slug: 'urban-style',
    logo: 'https://via.placeholder.com/150x100/3B82F6/FFFFFF?text=Urban+Style',
    description: 'Modern urban fashion for the contemporary lifestyle'
  },
  {
    id: 'brand2',
    name: 'Street Wear',
    slug: 'street-wear',
    logo: 'https://via.placeholder.com/150x100/EF4444/FFFFFF?text=Street+Wear',
    description: 'Bold street fashion with attitude'
  },
  {
    id: 'brand3',
    name: 'Classic Collection',
    slug: 'classic-collection',
    logo: 'https://via.placeholder.com/150x100/10B981/FFFFFF?text=Classic',
    description: 'Timeless pieces that never go out of style'
  },
  {
    id: 'brand4',
    name: 'Sport Elite',
    slug: 'sport-elite',
    logo: 'https://via.placeholder.com/150x100/F59E0B/FFFFFF?text=Sport+Elite',
    description: 'High-performance sportswear and activewear'
  },
  {
    id: 'brand5',
    name: 'Eco Fashion',
    slug: 'eco-fashion',
    logo: 'https://via.placeholder.com/150x100/8B5CF6/FFFFFF?text=Eco+Fashion',
    description: 'Sustainable fashion for the environmentally conscious'
  }
]

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: 'https://via.placeholder.com/400x400/F3F4F6/374151?text=White+T-Shirt',
    brandId: 'brand1',
    brand: mockBrands[0],
    description: 'Premium cotton t-shirt with a comfortable fit. Perfect for casual wear.',
    inStock: true,
    category: 'T-Shirts',
    images: [
      'https://via.placeholder.com/400x400/F3F4F6/374151?text=White+T-Shirt',
      'https://via.placeholder.com/400x400/F3F4F6/374151?text=Back+View',
    ]
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://via.placeholder.com/400x400/1F2937/F9FAFB?text=Denim+Jacket',
    brandId: 'brand2',
    brand: mockBrands[1],
    description: 'Classic denim jacket with a modern twist. Durable and stylish.',
    inStock: true,
    category: 'Jackets',
    images: [
      'https://via.placeholder.com/400x400/1F2937/F9FAFB?text=Denim+Jacket',
      'https://via.placeholder.com/400x400/1F2937/F9FAFB?text=Side+View',
    ]
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 129.99,
    image: 'https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Running+Shoes',
    brandId: 'brand4',
    brand: mockBrands[3],
    description: 'High-performance running shoes with advanced cushioning technology.',
    inStock: true,
    category: 'Shoes',
    images: [
      'https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Running+Shoes',
      'https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Side+Profile',
    ]
  },
  {
    id: '4',
    name: 'Wool Sweater',
    price: 79.99,
    image: 'https://via.placeholder.com/400x400/10B981/FFFFFF?text=Wool+Sweater',
    brandId: 'brand3',
    brand: mockBrands[2],
    description: 'Cozy wool sweater perfect for colder weather. Available in multiple colors.',
    inStock: true,
    category: 'Sweaters',
    images: [
      'https://via.placeholder.com/400x400/10B981/FFFFFF?text=Wool+Sweater',
      'https://via.placeholder.com/400x400/10B981/FFFFFF?text=Detail+View',
    ]
  },
  {
    id: '5',
    name: 'Eco-Friendly Hoodie',
    price: 69.99,
    image: 'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Eco+Hoodie',
    brandId: 'brand5',
    brand: mockBrands[4],
    description: 'Made from recycled materials. Comfortable and environmentally responsible.',
    inStock: true,
    category: 'Hoodies',
    images: [
      'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Eco+Hoodie',
      'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Back+Logo',
    ]
  },
  {
    id: '6',
    name: 'Skinny Jeans',
    price: 59.99,
    image: 'https://via.placeholder.com/400x400/374151/F9FAFB?text=Skinny+Jeans',
    brandId: 'brand2',
    brand: mockBrands[1],
    description: 'Premium denim with a modern skinny fit. Comfortable stretch fabric.',
    inStock: true,
    category: 'Jeans',
    images: [
      'https://via.placeholder.com/400x400/374151/F9FAFB?text=Skinny+Jeans',
      'https://via.placeholder.com/400x400/374151/F9FAFB?text=Detail+Shot',
    ]
  },
  {
    id: '7',
    name: 'Sport Tank Top',
    price: 34.99,
    image: 'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Tank+Top',
    brandId: 'brand4',
    brand: mockBrands[3],
    description: 'Lightweight and breathable tank top for workouts and active lifestyle.',
    inStock: false,
    category: 'Athletic Wear',
    images: [
      'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Tank+Top',
      'https://via.placeholder.com/400x400/F59E0B/FFFFFF?text=Fit+View',
    ]
  },
  {
    id: '8',
    name: 'Vintage Bomber Jacket',
    price: 119.99,
    image: 'https://via.placeholder.com/400x400/6B7280/FFFFFF?text=Bomber+Jacket',
    brandId: 'brand1',
    brand: mockBrands[0],
    description: 'Vintage-inspired bomber jacket with modern details and premium materials.',
    inStock: true,
    category: 'Jackets',
    images: [
      'https://via.placeholder.com/400x400/6B7280/FFFFFF?text=Bomber+Jacket',
      'https://via.placeholder.com/400x400/6B7280/FFFFFF?text=Zipped+Up',
    ]
  },
  {
    id: '9',
    name: 'Organic Cotton Dress',
    price: 94.99,
    image: 'https://via.placeholder.com/400x400/EC4899/FFFFFF?text=Cotton+Dress',
    brandId: 'brand5',
    brand: mockBrands[4],
    description: '100% organic cotton dress. Comfortable, stylish, and sustainable.',
    inStock: true,
    category: 'Dresses',
    images: [
      'https://via.placeholder.com/400x400/EC4899/FFFFFF?text=Cotton+Dress',
      'https://via.placeholder.com/400x400/EC4899/FFFFFF?text=Full+Length',
    ]
  },
  {
    id: '10',
    name: 'Leather Sneakers',
    price: 149.99,
    image: 'https://via.placeholder.com/400x400/7C3AED/FFFFFF?text=Leather+Sneakers',
    brandId: 'brand3',
    brand: mockBrands[2],
    description: 'Premium leather sneakers with classic styling and modern comfort.',
    inStock: true,
    category: 'Shoes',
    images: [
      'https://via.placeholder.com/400x400/7C3AED/FFFFFF?text=Leather+Sneakers',
      'https://via.placeholder.com/400x400/7C3AED/FFFFFF?text=Side+Detail',
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

export const getFeaturedProducts = (limit: number = 8): Product[] => {
  return mockProducts.slice(0, limit)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.name.toLowerCase().includes(lowercaseQuery)
  )
}
