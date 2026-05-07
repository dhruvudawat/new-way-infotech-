export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: "card" | "paypal" | "cod";
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
  cardName?: string;
}

export interface Order {
  id: string;
  items: Array<{
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
  }>;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
}

export interface CheckoutFormData {
  shipping: ShippingAddress;
  payment: PaymentMethod;
}