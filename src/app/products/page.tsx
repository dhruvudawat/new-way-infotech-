"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Star, CheckCircle, Filter, X } from "lucide-react";
import { useCart } from "@/components/providers";

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

export default function ProductsPage() {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addItem(product as any, 1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="opacity-90">Browse our collection of premium refurbished laptops</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="border-b border-gray-200 sticky top-16 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-orange-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-sm text-gray-500 mb-6">
          Showing {filteredProducts.length} products
        </p>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const discount = Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100);
              
              return (
                <Link key={product.id} href={`/product/${product.id}`} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group block">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 inline-block absolute top-0 left-0 z-10">
                      -{discount}% Hot
                    </div>
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
                    <button 
                      onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                      className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold text-sm transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}