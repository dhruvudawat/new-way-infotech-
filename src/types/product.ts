export type ProductCategory =
  | "laptops"
  | "desktops"
  | "computer-accessories"
  | "networking-equipment"
  | "software"
  | "printers-scanners"
  | "gaming-gear"
  | "office-equipment";

export const CATEGORIES: Record<ProductCategory, { name: string; slug: string }> = {
  "laptops": { name: "Laptops", slug: "laptops" },
  "desktops": { name: "Desktops", slug: "desktops" },
  "computer-accessories": { name: "Computer Accessories", slug: "computer-accessories" },
  "networking-equipment": { name: "Networking Equipment", slug: "networking-equipment" },
  "software": { name: "Software", slug: "software" },
  "printers-scanners": { name: "Printers & Scanners", slug: "printers-scanners" },
  "gaming-gear": { name: "Gaming Gear", slug: "gaming-gear" },
  "office-equipment": { name: "Office Equipment", slug: "office-equipment" },
};

export interface ProductSpecifications {
  processor?: string;
  ram?: string;
  storage?: string;
  display?: string;
  graphics?: string;
  battery?: string;
  warranty?: string;
  connectivity?: string;
  weight?: string;
  dimensions?: string;
color?: string;
  operatingSystem?: string;
  ports?: string | string[];
  additionalSpecs?: Record<string, string>;
  [key: string]: string | string[] | Record<string, string> | undefined;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: ProductCategory;
  images: string[];
  specifications: ProductSpecifications;
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  brand: string;
  model: string;
  warranty: string;
  sku?: string;
  tags?: string[];
  createdAt: Date;
  // Backward compatibility - optional
  image?: string;
  originalPrice?: number;
  inStock?: boolean;
  features?: string[];
}

export interface ProductCategoryData {
  id: ProductCategory;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
}

export interface ProductFilters {
  category?: ProductCategory;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: "newest" | "price-asc" | "price-desc" | "popular" | "rating";
  brand?: string[];
  minRating?: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: Date;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}