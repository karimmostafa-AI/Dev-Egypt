import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/product-card'
import { getBrandBySlug, getProductsByBrandSlug } from '@/data/mock'
import { ArrowLeft, Package, Star, MapPin } from 'lucide-react'

interface BrandPageProps {
  params: {
    slug: string
  }
}

export default function BrandPage({ params }: BrandPageProps) {
  const brand = getBrandBySlug(params.slug)
  const products = getProductsByBrandSlug(params.slug)

  if (!brand) {
    notFound()
  }

  const inStockProducts = products.filter(product => product.inStock)
  const outOfStockProducts = products.filter(product => !product.inStock)

  // Calculate price range
  const prices = products.map(p => p.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 text-sm">
        <div className="flex items-center space-x-2 text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/brands" className="hover:text-blue-600">Brands</Link>
          <span>/</span>
          <span className="text-gray-900">{brand.name}</span>
        </div>
      </nav>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/brands">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Brands
        </Link>
      </Button>

      {/* Brand Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2">
          {/* Brand Logo */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8">
            <div className="aspect-video flex items-center justify-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={400}
                height={200}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Brand Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{brand.name}</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {brand.description || `${brand.name} is one of Egypt's leading fashion brands, known for quality and style.`}
            </p>

            {/* Additional brand story */}
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Founded with a vision to bring contemporary Egyptian fashion to the world, 
                {brand.name} has become synonymous with quality, innovation, and style. 
                Each piece in their collection reflects the rich cultural heritage of Egypt 
                while embracing modern design principles.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Stats */}
        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Brand Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Products</span>
                </div>
                <span className="font-medium">{products.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Origin</span>
                </div>
                <span className="font-medium">Egypt</span>
              </div>

              {products.length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Price Range</span>
                  </div>
                  <span className="font-medium">
                    {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">Rating</span>
                </div>
                <span className="font-medium">4.8 (125 reviews)</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border rounded-lg p-6">
            <h4 className="font-semibold mb-2">Why Choose {brand.name}?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Premium quality materials</li>
              <li>• Authentic Egyptian craftsmanship</li>
              <li>• Sustainable production practices</li>
              <li>• Free shipping on all orders</li>
              <li>• 30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="space-y-12">
        {/* In Stock Products */}
        {inStockProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Available Products ({inStockProducts.length})
                </h2>
                <p className="text-gray-600">
                  Explore the latest collection from {brand.name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {inStockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Out of Stock Products */}
        {outOfStockProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-500">
                  Coming Soon ({outOfStockProducts.length})
                </h2>
                <p className="text-gray-500">
                  These products will be available soon
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-60">
              {outOfStockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* No Products */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600 mb-6">
              {brand.name} will be adding products soon. Stay tuned!
            </p>
            <Button variant="outline" asChild>
              <Link href="/brands">
                Explore Other Brands
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      {products.length > 0 && (
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Love {brand.name}?
          </h2>
          <p className="text-blue-100 mb-6">
            Follow us to stay updated with the latest products and exclusive offers from {brand.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Follow Brand
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Share with Friends
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
