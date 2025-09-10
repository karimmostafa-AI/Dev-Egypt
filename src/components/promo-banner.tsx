'use client'

import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PromoBanner } from '@/data/mock'
import { Clock, X } from 'lucide-react'

interface PromoBannerProps {
  banner: PromoBanner
  onDismiss?: () => void
  showDismiss?: boolean
  variant?: 'full' | 'compact'
}

export default function PromoBannerComponent({ 
  banner, 
  onDismiss, 
  showDismiss = false,
  variant = 'full' 
}: PromoBannerProps) {
  const formatEndDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  if (variant === 'compact') {
    return (
      <div className={`relative ${banner.backgroundColor} ${banner.textColor} px-4 py-2 text-sm text-center`}>
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {banner.discount}
          </Badge>
          <span className="font-medium">{banner.title}</span>
          <span className="hidden sm:inline">- {banner.description}</span>
          {banner.endDate && (
            <span className="hidden md:inline flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Ends {formatEndDate(banner.endDate)}
            </span>
          )}
        </div>
        {showDismiss && onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${banner.backgroundColor} ${banner.textColor} rounded-lg p-6 text-center`}>
      <div className="space-y-4">
        <div>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2">
            {banner.discount}
          </Badge>
          <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
          <p className="text-lg opacity-90">{banner.description}</p>
        </div>
        
        {banner.endDate && (
          <div className="flex items-center justify-center space-x-2 text-sm opacity-75">
            <Clock className="h-4 w-4" />
            <span>Ends {formatEndDate(banner.endDate)}</span>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            asChild
            variant="secondary" 
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            <Link href={banner.link || '/products'}>
              Shop Now
            </Link>
          </Button>
          <Button 
            asChild
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-gray-900"
          >
            <Link href="/products?sale=true">
              View All Sales
            </Link>
          </Button>
        </div>
      </div>
      
      {showDismiss && onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute right-4 top-4 text-white hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}

// Multi-banner carousel component
interface PromoBannerCarouselProps {
  banners: PromoBanner[]
  variant?: 'full' | 'compact'
}

export function PromoBannerCarousel({ banners, variant = 'compact' }: PromoBannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set())

  React.useEffect(() => {
    if (banners.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [banners.length])

  const visibleBanners = banners.filter(banner => !dismissed.has(banner.id))
  
  if (visibleBanners.length === 0) return null

  const currentBanner = visibleBanners[currentIndex % visibleBanners.length]

  const handleDismiss = (bannerId: string) => {
    setDismissed(prev => new Set(prev).add(bannerId))
  }

  return (
    <div className="relative">
      <PromoBannerComponent 
        banner={currentBanner}
        variant={variant}
        showDismiss={variant === 'compact'}
        onDismiss={() => handleDismiss(currentBanner.id)}
      />
      
      {visibleBanners.length > 1 && variant === 'full' && (
        <div className="flex justify-center space-x-2 mt-4">
          {visibleBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex % visibleBanners.length
                  ? 'bg-white'
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
