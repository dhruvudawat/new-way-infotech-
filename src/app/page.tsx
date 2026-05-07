"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X, Phone, Star, CheckCircle, Shield, Truck, CreditCard, RefreshCw, Headphones, Laptop, Box, Zap } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* ===== TOP BAR ===== */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <span>Best Refurbished Laptops With 6 Months Warranty | COD available on prepayment of Rs 500</span>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <a href="tel:+91931736826" className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91-9310736826
            </a>
          </div>
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Laptop className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-gray-900">NewWayInfotech</span>
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search laptops..."
                  className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-gray-900 placeholder:text-gray-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 rounded-md">
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/account" className="hidden md:flex items-center gap-2 text-gray-900 hover:text-orange-600">
                <User className="w-5 h-5" />
                <span className="text-sm">My Account</span>
              </Link>
              <Link href="/cart" className="p-2 text-gray-900 hover:text-orange-600 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
              </Link>
              <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Nav */}
        <div className="hidden md:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-8 text-sm font-medium overflow-x-auto">
              <button className="text-gray-900 whitespace-nowrap">Shop By Usage ▼</button>
              <button className="text-gray-900 whitespace-nowrap">Shop By Brands ▼</button>
              <button className="text-gray-900 whitespace-nowrap">Shop By Processor ▼</button>
              <button className="text-gray-900 whitespace-nowrap">Shop By Price ▼</button>
              <Link href="#products" className="text-gray-500 whitespace-nowrap">All Products</Link>
            </div>
          </div>
        </div>
      </header>

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
                <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all">
                  Shop Now
                </button>
                <button className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all">
                  View Details
                </button>
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

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Laptop className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black text-gray-900">NewWayInfotech</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Premium Import Laptops in A+++ Condition. Your trusted source for professionally tested refurbished and new import business laptops.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Categories</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Dell Laptops</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">HP Laptops</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Lenovo Laptops</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Apple Products</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">📞</span> +91-9310736826
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">✉️</span> info@newwayinfotech.com
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">📍</span> Mumbai, India
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            © 2025 NewWayInfotech. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}