"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types/cart";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex gap-4 py-4 border-b">
      <Link href={`/product/${item.productId}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted">
          <Image
            src={item.productImage || "/placeholder-product.jpg"}
            alt={item.productName || "Product"}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          href={`/product/${item.productId}`}
          className="font-medium hover:text-primary transition-colors line-clamp-2"
        >
          {item.productName}
        </Link>

        <p className="text-sm text-muted-foreground mt-1">
          {formatPrice(item.price)}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncrement}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}