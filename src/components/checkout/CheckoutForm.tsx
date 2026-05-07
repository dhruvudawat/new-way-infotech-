"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ShippingAddress } from "@/types/checkout";

interface CheckoutFormProps {
  shipping: ShippingAddress;
  onChange: (shipping: ShippingAddress) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function CheckoutForm({
  shipping,
  onChange,
  onSubmit,
  isSubmitting = false,
}: CheckoutFormProps) {
  const handleChange = (field: keyof ShippingAddress, value: string) => {
    onChange({ ...shipping, [field]: value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={shipping.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={shipping.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={shipping.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={shipping.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={shipping.address}
              onChange={(e) => handleChange("address", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={shipping.city}
              onChange={(e) => handleChange("city", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={shipping.state}
              onChange={(e) => handleChange("state", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={shipping.zipCode}
              onChange={(e) => handleChange("zipCode", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={shipping.country}
              onChange={(e) => handleChange("country", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
}