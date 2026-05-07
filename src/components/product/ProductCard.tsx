"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const productImage = product.images?.[0] || "/placeholder-product.jpg";
  const originalPrice = product.comparePrice || product.price;
  const hasDiscount = originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 left-2" variant="destructive">
              -{discountPercent}%
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= Math.round(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
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
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={!product.inStock}
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}