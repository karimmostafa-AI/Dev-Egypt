import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/product-card";
import { getFeaturedProducts, mockBrands } from "@/data/mock";
import { ArrowRight, ShoppingBag, Star, Users, Truck } from "lucide-react";

export default function Home() {
  const featuredProducts = getFeaturedProducts(8);
  const featuredBrands = mockBrands.slice(0, 5);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Egypt&apos;s
              <br />
              <span className="text-yellow-300">Leading Brands</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your premier destination for multi-brand fashion. 
              Shop the latest trends from Egypt&apos;s most trusted brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/products">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Shop Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/brands">
                  Explore Brands
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8 mb-2" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-75">Trusted Brands</div>
              </div>
              <div className="flex flex-col items-center">
                <Star className="h-8 w-8 mb-2" />
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-sm opacity-75">Happy Customers</div>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="h-8 w-8 mb-2" />
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm opacity-75">Shipping in Egypt</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Featured Collection
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trending Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular items handpicked from Egypt&apos;s leading brands.
            From fashion-forward pieces to timeless classics.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/products">
              View All Products
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Our Partners
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Brands
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with Egypt&apos;s most innovative and trusted brands to bring you
              the best in fashion, quality, and style.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {featuredBrands.map((brand) => (
              <Link 
                key={brand.id} 
                href={`/brands/${brand.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border group-hover:border-blue-200">
                  <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                    <Image
                      src={brand.logo} 
                      alt={brand.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-semibold text-center group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/brands">
                View All Brands
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and discover your new favorite brands today.
          </p>
          <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-gray-100">
            <Link href="/products">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
