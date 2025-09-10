'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, ChevronDown, MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/lib/store'
import { useSearchStore } from '@/lib/store'
import { useUserStore } from '@/lib/store'
import { searchProducts, mockCategories, getPromoBanners } from '@/data/mock'
import { PromoBannerCarousel } from '@/components/promo-banner'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  const { getTotalItems, toggleCart } = useCartStore()
  const { user, isLoggedIn } = useUserStore()
  const { setQuery, setResults } = useSearchStore()
  const promoBanners = getPromoBanners()

  const totalItems = getTotalItems()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const results = searchProducts(searchQuery.trim())
      setQuery(searchQuery.trim())
      setResults(results)
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const navigationItems = [
    { 
      label: 'Shop Women', 
      href: '/products?gender=women',
      dropdown: 'women',
      categories: mockCategories.filter(cat => cat.gender === 'both' || cat.gender === 'women')
    },
    { 
      label: 'Shop Men', 
      href: '/products?gender=men',
      dropdown: 'men',
      categories: mockCategories.filter(cat => cat.gender === 'both' || cat.gender === 'men')
    },
    { 
      label: 'The Medical Marketplace', 
      href: '/brands',
      dropdown: 'marketplace'
    },
    { 
      label: 'Sale', 
      href: '/products?sale=true',
      isHighlight: true
    }
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Promotional Banner */}
        <PromoBannerCarousel banners={promoBanners} variant="compact" />
      
      {/* Top Bar */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Ship to: Egypt</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>Help: +20 123 456 7890</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/groups" className="hover:text-blue-600">Groups</Link>
              <Link href="/locator" className="hover:text-blue-600">Store Locator</Link>
              <span>العربية</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
            MED UNIFORM
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search medical uniforms, scrubs & more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth" className="text-sm hover:text-purple-600">Sign In</Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/auth" className="text-sm hover:text-purple-600">Create Account</Link>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4">
          <nav className="hidden md:flex items-center space-x-8 h-12">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  onClick={() => item.dropdown && handleDropdownToggle(item.dropdown)}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                    item.isHighlight 
                      ? 'text-red-600 hover:text-red-700' 
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  <Link href={item.href}>{item.label}</Link>
                  {item.dropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      activeDropdown === item.dropdown ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.dropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-md shadow-lg z-50">
                    <div className="p-4">
                      {item.categories && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                          {item.categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/products?category=${category.slug}&gender=${item.dropdown}`}
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      )}
                      
                      {item.dropdown === 'marketplace' && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 mb-3">Marketplace</h4>
                          <Link
                            href="/brands"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded"
                            onClick={() => setActiveDropdown(null)}
                          >
                            All Brands
                          </Link>
                          <Link
                            href="/products?featured=true"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Featured Products
                          </Link>
                          <Link
                            href="/products?sale=true"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Sale Items
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search medical uniforms, scrubs & more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={`block py-3 text-base font-medium transition-colors ${
                      item.isHighlight 
                        ? 'text-red-600 hover:text-red-700' 
                        : 'text-gray-700 hover:text-purple-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  
                  {/* Mobile Dropdown Categories */}
                  {item.categories && (
                    <div className="ml-4 space-y-1">
                      {item.categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/products?category=${category.slug}&gender=${item.dropdown}`}
                          className="block py-2 text-sm text-gray-600 hover:text-purple-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile User Menu */}
              <div className="border-t pt-4 mt-4">
                {isLoggedIn ? (
                  <div className="py-2 text-gray-700">
                    Welcome, {user?.name}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/auth"
                      className="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth"
                      className="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
      </header>
    </>
  )
}
