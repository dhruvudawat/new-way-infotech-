"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import { PaymentMethod } from "@/types/checkout";

interface PaymentFormProps {
  payment: PaymentMethod;
  onChange: (payment: PaymentMethod) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const paymentMethods = [
  { value: "card", label: "Credit/Debit Card", icon: CreditCard },
  { value: "paypal", label: "PayPal", icon: Wallet },
  { value: "cod", label: "Cash on Delivery", icon: Banknote },
] as const;

export function PaymentForm({
  payment,
  onChange,
  onSubmit,
  isSubmitting = false,
}: PaymentFormProps) {
  const handleMethodChange = (type: PaymentMethod["type"]) => {
    onChange({ ...payment, type });
  };

  const handleCardChange = (field: keyof PaymentMethod, value: string) => {
    onChange({ ...payment, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.value}
              type="button"
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                payment.type === method.value
                  ? "border-primary bg-primary/5"
                  : "border-input hover:border-muted-foreground"
              }`}
              onClick={() => handleMethodChange(method.value)}
            >
              <method.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{method.label}</span>
            </button>
          ))}
        </div>
      </div>

      {payment.type === "card" && (
        <>
          <Separator />
          <div className="space-y-4">
            <h4 className="font-medium">Card Details</h4>
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                value={payment.cardName || ""}
                onChange={(e) => handleCardChange("cardName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={payment.cardNumber || ""}
                onChange={(e) => handleCardChange("cardNumber", e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardExpiry">Expiry Date</Label>
                <Input
                  id="cardExpiry"
                  value={payment.cardExpiry || ""}
                  onChange={(e) => handleCardChange("cardExpiry", e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardCVC">CVC</Label>
                <Input
                  id="cardCVC"
                  value={payment.cardCVC || ""}
                  onChange={(e) => handleCardChange("cardCVC", e.target.value)}
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        </>
      )}

      <Button
        className="w-full"
        size="lg"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Complete Payment"}
      </Button>
    </div>
  );
}