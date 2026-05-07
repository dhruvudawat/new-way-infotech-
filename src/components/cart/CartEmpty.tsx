import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartEmptyProps {
  message?: string;
}

export function CartEmpty({ message = "Your cart is empty" }: CartEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ShoppingBag className="h-16 w-16 text-muted mb-4" />
      <h2 className="text-xl font-semibold mb-2">{message}</h2>
      <p className="text-muted-foreground mb-6">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link href="/products">
        <Button>Start Shopping</Button>
      </Link>
    </div>
  );
}