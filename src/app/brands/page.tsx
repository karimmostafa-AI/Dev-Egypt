import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { mockBrands, getProductsByBrand } from '@/data/mock'
import { ArrowRight, Package } from 'lucide-react'

export default function BrandsPage() {
  const brandsWithStats = mockBrands.map(brand => {
    const products = getProductsByBrand(brand.id)
    return {
      ...brand,
      productCount: products.length,
      hasProducts: products.length > 0
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4">
          Our Partners
        </Badge>
        <h1 className="text-4xl font-bold mb-4">
          Featured Brands
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover Egypt&apos;s most innovative and trusted fashion brands.
          Each brand brings unique style, quality, and craftsmanship to our marketplace.
        </p>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {brandsWithStats.map((brand) => (
          <Link key={brand.id} href={`/brands/${brand.slug}`} className="group">
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <div className="relative">
                {/* Brand Logo/Image */}
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Product Count Badge */}
                {brand.hasProducts && (
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm"
                  >
                    <Package className="h-3 w-3 mr-1" />
                    {brand.productCount} Products
                  </Badge>
                )}
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {brand.description || `${brand.name} is one of Egypt's leading fashion brands, known for quality and style.`}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {brand.productCount} {brand.productCount === 1 ? 'Product' : 'Products'}
                  </div>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span className="text-sm font-medium mr-1">Explore</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Growing Community of Brands
        </h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          We&apos;re constantly expanding our network of premium Egyptian brands.
          Join us in supporting local businesses and discovering unique fashion.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="text-3xl font-bold mb-1">{mockBrands.length}+</div>
            <div className="text-blue-100">Active Brands</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">500+</div>
            <div className="text-blue-100">Products Available</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">10k+</div>
            <div className="text-blue-100">Happy Customers</div>
          </div>
        </div>

        <Button 
          size="lg" 
          className="bg-white text-blue-600 hover:bg-gray-100"
          asChild
        >
          <Link href="/products">
            Shop All Products
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </div>

      {/* Partner With Us Section */}
      <div className="mt-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Partner With EGY DEV
          </h2>
          <p className="text-gray-600 mb-8">
            Are you an Egyptian brand looking to expand your reach? 
            Join our marketplace and connect with thousands of customers across Egypt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
            <Button size="lg">
              Apply to Sell
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
