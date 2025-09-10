'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import ProductCard from '@/components/product-card'
import { getProductById, mockProducts } from '@/data/mock'
import { useCartStore } from '@/lib/store'
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ArrowLeft, 
  Truck,
  RotateCcw,
  Shield,
  Plus,
  Minus
} from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  
  const { addItem, getItemQuantity } = useCartStore()
  const currentQuantityInCart = getItemQuantity(productId)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>
    )
  }

  const relatedProducts = mockProducts
    .filter(p => p.id !== product.id && p.brandId === product.brandId)
    .slice(0, 4)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta)
    setQuantity(newQuantity)
  }

  const images = product.images || [product.image]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 text-sm">
        <div className="flex items-center space-x-2 text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <Link href={`/brands/${product.brand.slug}`} className="hover:text-blue-600">
            {product.brand.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </nav>

      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/products">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={images[selectedImageIndex]}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-md overflow-hidden ${
                    selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand */}
          <Link 
            href={`/brands/${product.brand.slug}`}
            className="inline-block text-blue-600 hover:text-blue-700 font-medium"
          >
            {product.brand.name}
          </Link>

          {/* Product Name */}
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Category */}
          {product.category && (
            <Badge variant="outline" className="w-fit">
              {product.category}
            </Badge>
          )}

          {/* Price */}
          <div className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            {product.inStock ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">In Stock</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-700 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          {product.inStock && (
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-16 text-center font-medium">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  className="h-10 w-10 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {currentQuantityInCart > 0 && (
                <span className="text-sm text-green-600">
                  {currentQuantityInCart} in cart
                </span>
              )}
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="flex space-x-4">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="lg"
              className="flex-1"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {!product.inStock ? 'Out of Stock' : `Add ${quantity} to Cart`}
            </Button>
            
            {/* Wishlist Button */}
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Share Button */}
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium text-sm">Free Shipping</div>
                <div className="text-xs text-gray-500">Orders over $50</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium text-sm">30-Day Returns</div>
                <div className="text-xs text-gray-500">Easy returns</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium text-sm">Secure Payment</div>
                <div className="text-xs text-gray-500">SSL protected</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              
              {/* Additional product details would go here */}
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Features:</h4>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    <li>• Premium quality materials</li>
                    <li>• Comfortable fit</li>
                    <li>• Durable construction</li>
                    <li>• Easy care instructions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">About {product.brand.name}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {product.brand.description || `${product.brand.name} is one of Egypt's leading fashion brands, known for quality and style.`}
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href={`/brands/${product.brand.slug}`}>
                  View All Products
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">More from {product.brand.name}</h2>
            <p className="text-gray-600">Discover other products from this brand</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
