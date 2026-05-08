"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle, Truck, CreditCard, RefreshCw, Headphones } from "lucide-react";

const PRODUCTS = [
  {
    id: "1",
    name: "Dell 5400 i7-8th Gen",
    specs: "8GB RAM | 256GB SSD",
    price: 18300,
    oldPrice: 22000,
    badge: "NEW IMPORT",
    inStock: true,
    rating: 4.5,
    image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/t/3/y/dell-5400-touch-laptop-dell-original-imahdffyhnmdhmtz.jpeg?q=90"
  },
  {
    id: "2",
    name: "Dell 5400 i5-8th Gen",
    specs: "8GB RAM | 256GB SSD",
    price: 16000,
    oldPrice: 19000,
    badge: "NEW IMPORT",
    inStock: true,
    rating: 4.5,
    image: "https://lapmall.in/wp-content/uploads/2024/12/61NnI0-IhL._AC_UF10001000_QL80_.jpg"
  },
  {
    id: "3",
    name: "Dell 5480 i5-7th Gen",
    specs: "8GB RAM | 256GB SSD",
    price: 14500,
    oldPrice: 18000,
    badge: "NEW IMPORT",
    inStock: true,
    rating: 4.7,
    image: "https://vedabyte.com/wp-content/uploads/2022/07/DELL-5580-I7-7TH-4GB-500HDD.jpg"
  },
  {
    id: "4",
    name: "HP EliteBook 840 G8",
    specs: "i5 11th Gen | 8GB RAM | 256GB SSD",
    price: 24000,
    oldPrice: 32000,
    badge: "NEW IMPORT",
    inStock: true,
    rating: 5,
    image: "https://support.hp.com/wcc-assets/document/images/521/c06980424.png"
  },
  {
    id: "5",
    name: "Dell 5410 i5-10th Gen",
    specs: "8GB RAM | 256GB SSD",
    price: 18500,
    oldPrice: 25000,
    badge: "NEW IMPORT",
    inStock: true,
    rating: 4.3,
    image: "https://cdn.dotpe.in/longtail/store-items/8142569/zu5UswcR.webp"
  },
  {
    id: "6",
    name: "Dell 5420 i5-11th Gen",
    specs: "8GB RAM | 256GB SSD",
    price: 20500,
    oldPrice: 28000,
    badge: "BEST VALUE",
    isSpecial: true,
    inStock: true,
    rating: 5,
    image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/u/l/w/latitude-5420-business-laptop-dell-original-imagn6hrwnfuakfp.jpeg?q=90"
  }
];

const CATEGORIES = [
  { name: "Corporate Laptops", icon: "💼", count: "48" },
  { name: "Student Laptops", icon: "🎓", count: "32" },
  { name: "Coding Laptops", icon: "💻", count: "25" },
  { name: "Gaming Laptops", icon: "🎮", count: "18" },
  { name: "Mini PC", icon: "🖥️", count: "12" },
  { name: "Macbooks", icon: "🍎", count: "8" },
];

const TRUST_BADGES = [
  { icon: CheckCircle, label: "Guaranteed Quality", color: "#f97316" },
  { icon: RefreshCw, label: "100% Money Back", color: "#f97316" },
  { icon: CreditCard, label: "EMI Available", color: "#f97316" },
  { icon: Truck, label: "Pan India Delivery", color: "#f97316" },
  { icon: Headphones, label: "Dedicated Support", color: "#f97316" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const discount = Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100);

  return (
    <Link href={`/product/${product.id}`} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group block">
      {/* Badge */}
      <div className="relative">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 inline-block absolute top-0 left-0 z-10">
          -{discount}% Hot
        </div>

        {/* Image */}
        <div className="h-48 flex items-center justify-center bg-gray-50 p-2">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={150}
            className="object-contain w-full h-full hover:scale-110 transition-transform duration-300"
            unoptimized
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 mb-2">{product.specs}</p>

        <StarRating rating={product.rating} />

        <div className="mt-3">
          <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          <span className="text-sm text-gray-400 line-through ml-2">₹{product.oldPrice?.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          {product.inStock ? (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> In stock
            </span>
          ) : (
            <span className="text-xs text-red-500">Out of stock</span>
          )}
        </div>

        <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold text-sm transition-all">
          Add to Cart
        </button>
      </div>
    </Link>
  );
}

export default function NewWayInfotechB2() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* ===== HERO BANNER ===== */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                Certified Refurbished Laptops
                <br />
                <span className="text-3xl md:text-4xl">Best Price in India</span>
              </h1>
              <p className="text-lg opacity-90 mb-8">
                6 Month Warranty | 100% Tested & Cleaned | Best Quality Guaranteed
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all inline-block">
                  Shop Now
                </Link>
                <Link href="/products" className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all inline-block">
                  View Details
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/heroimage.jpeg"
                alt="Laptop"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl object-cover max-w-md w-full h-auto"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={i}
                href="#"
                className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:border-orange-500 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.count} Products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Laptops</h2>
            <button className="text-orange-600 font-medium hover:underline">
              View All Products →
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Why Buy From NewWayInfotech?</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {TRUST_BADGES.map((badge, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <badge.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold">{badge.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}