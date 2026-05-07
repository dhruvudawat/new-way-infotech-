"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CartEmpty } from "@/components/cart/CartEmpty";
import { useCart } from "@/components/providers";
import { ShippingAddress, PaymentMethod } from "@/types/checkout";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [shipping, setShipping] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [payment, setPayment] = useState<PaymentMethod>({
    type: "card",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = cart.totalPrice > 100 ? 0 : 9.99;
  const tax = cart.totalPrice * 0.08;
  const total = cart.totalPrice + shippingCost + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    router.push("/checkout/success");
  };

  if (cart.items.length === 0) {
    return (
      <div className="py-8">
        <Container>
          <CartEmpty message="Your cart is empty. Add some items before checking out." />
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card rounded-lg border p-6">
              <CheckoutForm
                shipping={shipping}
                onChange={setShipping}
                onSubmit={handlePlaceOrder}
                isSubmitting={isProcessing}
              />
            </div>
          </div>

          <div>
            <OrderSummary
              items={cart.items}
              subtotal={cart.totalPrice}
              shipping={shippingCost}
              tax={tax}
              total={total}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}