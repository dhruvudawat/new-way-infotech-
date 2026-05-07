export type UserRole = "customer" | "admin" | "staff";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface UserProfile extends User {
  addresses: ShippingAddress[];
  defaultAddressId?: string;
  wishlist: string[];
  orders: string[];
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

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface PasswordReset {
  email: string;
  token?: string;
  newPassword?: string;
}

export interface UserSession {
  user: User;
  token: string;
  expiresAt: Date;
}