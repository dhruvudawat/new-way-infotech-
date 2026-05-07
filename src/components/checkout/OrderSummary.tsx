import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/cart";
import { formatPrice } from "@/lib/utils";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2">{item.productName}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          {tax > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}