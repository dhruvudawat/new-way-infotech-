"use client";

import { useState } from "react";
import { Star, Minus, Plus, ShoppingCart, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/providers";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const originalPrice = product.comparePrice || product.price;
  const hasDiscount = originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 0;

  const inStock = product.stock > 0;
  const features = product.specifications 
    ? Object.entries(product.specifications)
        .filter(([_, v]) => typeof v === "string")
        .map(([k, v]) => `${k}: ${v}`)
    : [];

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {hasDiscount && (
            <Badge variant="destructive">-{discountPercent}% OFF</Badge>
          )}
          {!inStock && <Badge variant="secondary">Out of Stock</Badge>}
        </div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= Math.round(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-muted-foreground">
          {product.rating} ({product.reviews} reviews)
        </span>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-primary">
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>

      <p className="text-muted-foreground">{product.description}</p>

      {features.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <Separator />

      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleIncrement}
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          {product.inStock ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-green-500">In Stock</span>
            </>
          ) : (
            <>
              <X className="h-4 w-4 text-red-500" />
              <span className="text-red-500">Out of Stock</span>
            </>
          )}
        </div>
        <span className="text-muted-foreground">
          {product.stock} items available
        </span>
      </div>
    </div>
  );
}