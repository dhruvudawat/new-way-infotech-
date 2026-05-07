"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product.name);
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />

      <Container className="relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-2">
              Check out our most popular items
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {products.map((product, index) => {
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;
            const discountPercent = hasDiscount
              ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="flex-shrink-0 w-72 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="group relative bg-background rounded-2xl border border-muted overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20"
                  style={{
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image
                        src={product.images?.[0] || "/placeholder-product.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 288px"
                      />

                      {hasDiscount && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full">
                          -{discountPercent}%
                        </div>
                      )}

                      {!product.inStock && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <span className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-full">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-white/90 hover:bg-white text-foreground backdrop-blur-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(product);
                            }}
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="w-4 h-4 mr-1.5" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>

                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-col gap-2">
                          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-base mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3.5 w-3.5 ${
                            star <= Math.round(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice!)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="ghost">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-12 text-center">
          <Link href="/products">
            <Button size="lg" variant="outline" className="px-8">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}