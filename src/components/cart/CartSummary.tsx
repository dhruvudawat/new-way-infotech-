import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  total: number;
  onCheckout?: () => void;
  isCheckoutDisabled?: boolean;
}

export function CartSummary({
  subtotal,
  shipping = 0,
  tax = 0,
  total,
  onCheckout,
  isCheckoutDisabled = false,
}: CartSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={onCheckout}
          disabled={isCheckoutDisabled}
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}