import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/product-card";
import PromoBannerComponent from "@/components/promo-banner";
import { getFeaturedProducts, getSaleProducts, mockBrands, mockCategories, getPromoBanners } from "@/data/mock";
import { ArrowRight, ShoppingBag, Star, Users, Truck, Heart, Shield, Award } from "lucide-react";

export default function Home() {
  const featuredProducts = getFeaturedProducts(8);
  const saleProducts = getSaleProducts().slice(0, 4);
  const featuredBrands = mockBrands.slice(0, 5);
  const featuredCategories = mockCategories.slice(0, 4);
  const promoBanners = getPromoBanners();

  return (
    <div className="space-y-12">
      {/* Promotional Banners */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoBanners.map((banner) => (
            <PromoBannerComponent key={banner.id} banner={banner} variant="full" />
          ))}
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Medical Uniforms & Scrubs
              <br />
              <span className="text-yellow-300">That Don&apos;t Conform</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Great brands, styles and values. Curated for healthcare professionals.
              Shop the latest medical uniforms from Egypt&apos;s leading brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-gray-100">
                <Link href="/products">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Shop Medical Uniforms
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-purple-600">
                <Link href="/products?sale=true">
                  View Sale Items
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Shield className="h-8 w-8 mb-2" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-75">Authentic Brands</div>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8 mb-2" />
                <div className="text-2xl font-bold">50k+</div>
                <div className="text-sm opacity-75">Healthcare Professionals</div>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="h-8 w-8 mb-2" />
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm opacity-75">Shipping in Egypt</div>
              </div>
              <div className="flex flex-col items-center">
                <Award className="h-8 w-8 mb-2" />
                <div className="text-2xl font-bold">30-Day</div>
                <div className="text-sm opacity-75">Easy Returns</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-purple-200 text-purple-600">
            Shop by Category
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Medical Uniform Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find exactly what you need with our organized categories.
            From scrubs to lab coats, we have everything for healthcare professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredCategories.map((category) => (
            <Link 
              key={category.id} 
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <ShoppingBag className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sale Products */}
      {saleProducts.length > 0 && (
        <section className="bg-red-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-red-600 text-white">
                Limited Time Offers
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sale Items - Up to 25% OFF
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't miss out on these amazing deals! Stock up on your favorite medical uniforms
                while supplies last.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="/products?sale=true">
                  View All Sale Items
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-purple-200 text-purple-600">
            Featured Collection
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Healthcare Professionals' Choice
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most popular medical uniforms trusted by healthcare professionals.
            Comfort, quality, and style in every piece.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
            <Link href="/products">
              View All Products
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Brands - The Medical Marketplace */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-purple-200 text-purple-600">
              The Medical Marketplace
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted Medical Uniform Brands
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We partner with Egypt&apos;s most innovative medical uniform brands to bring you
              the best in comfort, quality, and professional style for healthcare workers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredBrands.map((brand) => (
              <Link 
                key={brand.id} 
                href={`/brands/${brand.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border group-hover:border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="aspect-video bg-gray-50 rounded-lg p-4 flex items-center justify-center flex-1">
                      <Image
                        src={brand.logo} 
                        alt={brand.name}
                        width={200}
                        height={100}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    {brand.specialOffer && (
                      <Badge className="ml-3 bg-red-600 text-white">
                        {brand.specialOffer}
                      </Badge>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {brand.description}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-purple-600">
                      <Heart className="h-4 w-4" />
                      <span>Trusted by healthcare pros</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
              <Link href="/brands">
                Explore All Brands
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Upgrade Your Medical Uniforms?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of healthcare professionals who trust us for their uniform needs.
            Quality, comfort, and style for those who care for others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/products">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Shop Medical Uniforms
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-purple-600">
              <Link href="/products?sale=true">
                View Current Sales
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
