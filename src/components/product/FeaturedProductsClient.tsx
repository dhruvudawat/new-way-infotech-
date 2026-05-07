"use client";

import { Product } from "@/types/product";
import { ProductGrid } from "./ProductGrid";

interface FeaturedProductsClientProps {
  products: Product[];
}

export function FeaturedProductsClient({ products }: FeaturedProductsClientProps) {
  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product.name);
  };

  return <ProductGrid products={products} onAddToCart={handleAddToCart} />;
}