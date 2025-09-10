'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ShoppingCart, Heart } from 'lucide-react'
import { Product } from '@/data/mock'
import { useCartStore } from '@/lib/store'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact'
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem, getItemQuantity } = useCartStore()
  const itemQuantity = getItemQuantity(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  if (variant === 'compact') {
    return (
      <Link href={`/products/${product.id}`} className="group">
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <div className="relative">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {!product.inStock && (
              <Badge
                variant="secondary"
                className="absolute top-2 left-2 bg-red-100 text-red-800"
              >
                Out of Stock
              </Badge>
            )}
          </div>
          <CardContent className="p-3">
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{product.brand.name}</p>
            <p className="font-bold text-sm mt-1">{formatPrice(product.price)}</p>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {!product.inStock && (
            <Badge
              variant="secondary"
              className="absolute top-3 left-3 bg-red-100 text-red-800"
            >
              Out of Stock
            </Badge>
          )}
          {product.category && (
            <Badge
              variant="outline"
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm"
            >
              {product.category}
            </Badge>
          )}
          
          {/* Wishlist button - Future feature */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm hover:bg-white"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // TODO: Implement wishlist functionality
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{product.brand.name}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {itemQuantity > 0 && (
                <span className="text-xs text-green-600 font-medium">
                  {itemQuantity} in cart
                </span>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full"
            variant={product.inStock ? "default" : "secondary"}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

// Loading skeleton component for better UX
export function ProductCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const height = variant === 'compact' ? 'h-40' : 'h-64'
  
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className={`bg-gray-200 w-full ${height}`} />
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          {variant === 'default' && (
            <>
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-6 bg-gray-200 rounded w-1/4" />
            </>
          )}
        </div>
      </CardContent>
      {variant === 'default' && (
        <CardFooter className="p-4 pt-0">
          <div className="h-10 bg-gray-200 rounded w-full" />
        </CardFooter>
      )}
    </Card>
  )
}
