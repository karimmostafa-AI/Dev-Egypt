'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ProductCard, { ProductCardSkeleton } from '@/components/product-card'
import { mockProducts, searchProducts, mockBrands, mockCategories, getProductsByCategory, getProductsByGender, getSaleProducts, Product } from '@/data/mock'
import { Search, Grid, List } from 'lucide-react'

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const [products] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams?.get('category') || '')
  const [selectedGender, setSelectedGender] = useState<string>(searchParams?.get('gender') || '')
  const [showSaleOnly, setShowSaleOnly] = useState<boolean>(searchParams?.get('sale') === 'true')
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

    // Apply sale filter
    if (showSaleOnly) {
      filtered = filtered.filter(product => product.isOnSale)
    }

    // Apply brand filter
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brandId === selectedBrand)
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Apply gender filter
    if (selectedGender) {
      filtered = filtered.filter(product => 
        product.gender === selectedGender || product.gender === 'unisex'
      )
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
  }, [searchQuery, selectedBrand, selectedCategory, selectedGender, showSaleOnly, sortBy, products])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedBrand('')
    setSelectedCategory('')
    setSelectedGender('')
    setShowSaleOnly(false)
    setSortBy('newest')
  }

  const hasActiveFilters = searchQuery || selectedBrand || selectedCategory || selectedGender || showSaleOnly || sortBy !== 'newest'

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
      <div className="bg-white rounded-lg border p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Input
              type="search"
              placeholder="Search medical uniforms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Categories</option>
            {mockCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Gender Filter */}
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Genders</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="unisex">Unisex</option>
          </select>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
            <option value="brand">Brand A-Z</option>
          </select>
        </div>

        {/* Second Row - Sale Filter, View Mode, Clear */}
        <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-4">
            {/* Sale Filter */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showSaleOnly}
                onChange={(e) => setShowSaleOnly(e.target.checked)}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm font-medium text-red-600">Sale Items Only</span>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode */}
            <div className="flex gap-1 border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Search: &quot;{searchQuery}&quot;
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Category: {mockCategories.find(c => c.id === selectedCategory)?.name}
              </Badge>
            )}
            {selectedGender && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Gender: {selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)}
              </Badge>
            )}
            {selectedBrand && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Brand: {mockBrands.find(b => b.id === selectedBrand)?.name}
              </Badge>
            )}
            {showSaleOnly && (
              <Badge className="bg-red-600 text-white">
                Sale Items Only
              </Badge>
            )}
            {sortBy !== 'newest' && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
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
