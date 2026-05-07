"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartEmpty } from "@/components/cart/CartEmpty";
import { useCart } from "@/components/providers";

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();

  const shipping = cart.totalPrice > 100 ? 0 : 9.99;
  const tax = cart.totalPrice * 0.08;
  const total = cart.totalPrice + shipping + tax;

  if (cart.items.length === 0) {
    return (
      <div className="py-8">
        <Container>
          <CartEmpty />
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border p-6">
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          <div>
            <CartSummary
              subtotal={cart.totalPrice}
              shipping={shipping}
              tax={tax}
              total={total}
              onCheckout={() => (window.location.href = "/checkout")}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}