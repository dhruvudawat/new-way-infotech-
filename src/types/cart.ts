import { Product, ProductCategory } from "./product";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  addedAt: Date;
  // Backward compatibility - use optional with fallbacks
  productId: string;
  productName: string;
  productImage: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  total: number;
  // Alias for backward compatibility
  totalPrice: number;
}

export interface CartContextType {
  cart: Cart;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLoading: boolean;
}

export interface Coupon {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  expiresAt: Date;
  description: string;
}

export interface ShippingAddress {
  id: string;
  userId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface BillingAddress extends ShippingAddress {}