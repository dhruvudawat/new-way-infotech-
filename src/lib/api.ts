import { Product, ProductCategory, ProductFilters, ProductReview } from "@/types/product";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_REVIEWS } from "./data";

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let products = [...MOCK_PRODUCTS];

  if (filters?.category) {
    products = products.filter((p) => p.category === filters.category);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower) ||
p.tags?.some((t: string) => t.toLowerCase().includes(searchLower))
    );
  }

  if (filters?.minPrice !== undefined) {
    products = products.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    products = products.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters?.inStock) {
    products = products.filter((p) => p.stock > 0);
  }

  if (filters?.brand && filters.brand.length > 0) {
    products = products.filter((p) => filters.brand!.includes(p.brand));
  }

  if (filters?.minRating !== undefined) {
    products = products.filter((p) => p.rating >= filters.minRating!);
  }

  if (filters?.sort) {
    switch (filters.sort) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "popular":
        products.sort((a, b) => b.reviews - a.reviews);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_PRODUCTS.find((p) => p.id === id) || null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const product = MOCK_PRODUCTS.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === slug
  );
  return product || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_PRODUCTS.filter((p) => p.isFeatured);
}

export async function getNewProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_PRODUCTS.filter((p) => p.isNew);
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_PRODUCTS.filter((p) => p.category === category);
}

export async function getCategories() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_CATEGORIES;
}

export async function getProductReviews(productId: string): Promise<ProductReview[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_REVIEWS.filter((r) => r.productId === productId);
}

export async function getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
  const product = await getProductById(productId);
  if (!product) return [];

  await new Promise((resolve) => setTimeout(resolve, 200));
  
  return MOCK_PRODUCTS
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const searchLower = query.toLowerCase();
  
  return MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower) ||
      p.category.includes(searchLower) ||
      p.tags?.some((t) => t.toLowerCase().includes(searchLower))
  ).slice(0, 10);
}

export async function getBrands(): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const brandSet = new Set(MOCK_PRODUCTS.map((p) => p.brand));
  return Array.from(brandSet).sort();
}

export async function getPriceRange(): Promise<{ min: number; max: number }> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const prices = MOCK_PRODUCTS.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}