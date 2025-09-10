'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ProductCard, { ProductCardSkeleton } from '@/components/product-card'
import { mockProducts, searchProducts, mockBrands, Product } from '@/data/mock'
import { Search, Grid, List } from 'lucide-react'

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const [products] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading] = useState(false)

  // Apply filters and search
  useEffect(() => {
    let filtered = [...products]

    // Apply search filter
    if (searchQuery) {
      filtered = searchProducts(searchQuery)
    }

    // Apply brand filter
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brandId === selectedBrand)
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'brand':
        filtered.sort((a, b) => a.brand.name.localeCompare(b.brand.name))
        break
      default: // newest
        break
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedBrand, sortBy, products])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedBrand('')
    setSortBy('newest')
  }

  const hasActiveFilters = searchQuery || selectedBrand || sortBy !== 'newest'

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600">
          Discover our complete collection from Egypt&apos;s leading brands
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Brands</option>
            {mockBrands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
            <option value="brand">Brand A-Z</option>
          </select>

          {/* View Mode and Clear */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex-1"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex-1"
            >
              <List className="h-4 w-4" />
            </Button>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="whitespace-nowrap"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary">
                Search: &quot;{searchQuery}&quot;
              </Badge>
            )}
            {selectedBrand && (
              <Badge variant="secondary">
                Brand: {mockBrands.find(b => b.id === selectedBrand)?.name}
              </Badge>
            )}
            {sortBy !== 'newest' && (
              <Badge variant="secondary">
                Sort: {sortBy.replace('-', ' ')}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
        
        {searchQuery && (
          <p className="text-sm text-gray-500">
            Search results for &quot;{searchQuery}&quot;
          </p>
        )}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className={`grid ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        } gap-6`}>
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} variant={viewMode === 'list' ? 'compact' : 'default'} />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className={`grid ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        } gap-6`}>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              variant={viewMode === 'list' ? 'compact' : 'default'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
          {hasActiveFilters && (
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          )}
        </div>
      )}

      {/* Load More - For future implementation */}
      {filteredProducts.length > 0 && filteredProducts.length >= 12 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8"><div className="text-center">Loading...</div></div>}>
      <ProductsPageContent />
    </Suspense>
  )
}
