"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, ChevronLeft, ChevronRight, Heart, Share2, Minus, Plus, 
  ShoppingCart, Zap, Truck, Shield, CheckCircle, X, RotateCcw,
  MessageCircle, ThumbsUp, AlertCircle, ZoomIn, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers";

const PRODUCT = {
  id: "1",
  name: "Dell 5400 i7-8th Gen",
  specs: "8GB RAM | 256GB SSD",
  price: 18300,
  oldPrice: 22000,
  badge: "NEW IMPORT",
  inStock: true,
  rating: 4.5,
  image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/t/3/y/dell-5400-touch-laptop-dell-original-imahdffyhnmdhmtz.jpeg?q=90",
  reviews: 128,
  brand: "Dell",
  model: "Latitude 5400",
  warranty: "1 Year Warranty",
  description: "Professionally refurbished Dell Latitude 5400 with Intel Core i7 8th Gen processor. Perfect for business professionals and students. Features 8GB RAM, 256GB SSD, and Windows 11 Pro pre-installed.",
  specsDetail: {
    processor: "Intel Core i7-8650U (8th Gen)",
    ram: "8GB DDR4",
    storage: "256GB SSD",
    display: "14-inch FHD",
    battery: "Original Battery",
    os: "Windows 11 Pro",
    condition: "A+++ Grade"
  }
};

const IMAGES = [
  "https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/t/3/y/dell-5400-touch-laptop-dell-original-imahdffyhnmdhmtz.jpeg?q=90",
  "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/g/4/8/dell-laptop-8th-gen-original-imagf5fh9kqfgbg5z.jpeg?q=80",
  "https://lapmall.in/wp-content/uploads/2024/12/61NnI0-IhL._AC_UF10001000_QL80_.jpg",
];

const REVIEWS = [
  { name: "Rahul S.", rating: 5, date: "2 weeks ago", comment: "Excellent condition! Better than expected. Very happy with the purchase.", helpful: 24 },
  { name: "Priya M.", rating: 4, date: "1 month ago", comment: "Good product, slight scratches on the body but overall fine.", helpful: 12 },
  { name: "Amit K.", rating: 5, date: "1 month ago", comment: "Best deal in market. Works perfectly.", helpful: 18 },
  { name: "Sneha J.", rating: 5, date: "2 months ago", comment: "Amazing quality for the price. Recommended!", helpful: 8 },
];

const RELATED_PRODUCTS = [
  { id: "2", name: "Dell 5400 i5-8th Gen", price: 16000, image: "https://lapmall.in/wp-content/uploads/2024/12/61NnI0-IhL._AC_UF10001000_QL80_.jpg" },
  { id: "3", name: "Dell 5480 i5-7th Gen", price: 14500, image: "https://vedabyte.com/wp-content/uploads/2022/07/DELL-5580-I7-7TH-4GB-500HDD.jpg" },
  { id: "4", name: "HP EliteBook 840 G8", price: 24000, image: "https://support.hp.com/wcc-assets/document/images/521/c06980424.png" },
];

const FREQUENTLY_BOUGHT = [
  { id: "a", name: "Windows 11 Pro", price: 4999 },
  { id: "b", name: "16GB RAM Upgrade", price: 3500 },
  { id: "c", name: "Laptop Bag", price: 1499 },
];

function StarRating({ rating, showCount }: { rating: number; showCount?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
      ))}
      {showCount !== undefined && <span className="text-sm text-gray-500 ml-1">({showCount})</span>}
    </div>
  );
}

function ReviewBar({ stars, count }: { stars: number; count: number }) {
  const maxCount = REVIEWS.length * 10;
  const width = (count / maxCount) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs w-8">{stars} star</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-orange-500 rounded-full" style={{ width: `${width}%` }} />
      </div>
      <span className="text-xs w-8 text-gray-500">{count}</span>
    </div>
  );
}

export default function ProductDetailPage() {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");
  const [isZoomed, setIsZoomed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const discount = Math.round(((PRODUCT.oldPrice! - PRODUCT.price) / PRODUCT.oldPrice!) * 100);

  const tabs = [
    { id: "specs", label: "Specifications" },
    { id: "desc", label: "Description" },
    { id: "reviews", label: "Reviews" },
    { id: "qa", label: "Q&A" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-orange-500">Laptops</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{PRODUCT.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
              <div className="relative aspect-square flex items-center justify-center p-4">
                <Image
                  src={IMAGES[selectedImage]}
                  alt={PRODUCT.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
                {/* Zoom Button */}
                <button 
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100"
                >
                  <ZoomIn className="w-5 h-5 text-gray-600" />
                </button>
                {/* 360 View Button */}
                <button className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm font-medium hover:bg-gray-100">
                  <RotateCcw className="w-4 h-4" /> 360°
                </button>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImage === i ? "border-orange-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image src={img} alt="" width={80} height={80} className="object-cover w-full h-full" unoptimized />
                </button>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="w-8 h-8 text-orange-500" />
                <div>
                  <h4 className="font-semibold text-sm">1 Year Warranty</h4>
                  <p className="text-xs text-gray-500">On all products</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Truck className="w-8 h-8 text-orange-500" />
                <div>
                  <h4 className="font-semibold text-sm">Free Shipping</h4>
                  <p className="text-xs text-gray-500">Across India</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-orange-500" />
                <div>
                  <h4 className="font-semibold text-sm">A+++ Condition</h4>
                  <p className="text-xs text-gray-500">Certified quality</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                {PRODUCT.badge}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{PRODUCT.name}</h1>
              <p className="text-sm text-gray-500 mt-1">
                Brand: {PRODUCT.brand} | Model: {PRODUCT.model}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <StarRating rating={PRODUCT.rating} showCount={PRODUCT.reviews} />
              <span className="text-sm text-gray-500">|</span>
              <span className="text-orange-600 font-medium text-sm hover:underline cursor-pointer">
                {PRODUCT.reviews} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">₹{PRODUCT.price.toLocaleString()}</span>
                <span className="text-lg text-gray-400 line-through">₹{PRODUCT.oldPrice.toLocaleString()}</span>
                <span className="text-sm text-orange-600 font-semibold">-{discount}% OFF</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* EMI */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">EMI Starting from ₹{Math.round(PRODUCT.price / 12)}/month</h4>
              <p className="text-xs text-gray-500">No cost EMI available on select cards</p>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {PRODUCT.inStock ? (
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" /> In Stock ({Math.floor(Math.random() * 10) + 5} left)
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 text-sm font-medium">
                  <X className="w-4 h-4" /> Out of Stock
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => addItem(PRODUCT as any, quantity)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                <Zap className="w-5 h-5" /> Buy Now
              </button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                <Heart className="w-5 h-5" /> Add to Wishlist
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                <Share2 className="w-5 h-5" /> Share
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Free Delivery to Mumbai</p>
                  <p className="text-xs text-gray-500">Delivery by Tomorrow</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{PRODUCT.warranty}</p>
                  <p className="text-xs text-gray-500">Covers manufacturing defects</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {/* Specifications Tab */}
            {activeTab === "specs" && (
              <div className="overflow-x-auto">
                <table className="w-full max-w-2xl">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(PRODUCT.specsDetail).map(([key, value]) => (
                      <tr key={key}>
                        <td className="py-3 text-sm text-gray-500 capitalize w-48">{key.replace(/([A-Z])/g, ' $1')}</td>
                        <td className="py-3 text-sm font-medium">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Description Tab */}
            {activeTab === "desc" && (
              <div className="max-w-3xl">
                <p className="text-gray-600 leading-relaxed">{PRODUCT.description}</p>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{PRODUCT.rating}</div>
                      <StarRating rating={PRODUCT.rating} />
                      <p className="text-sm text-gray-500 mt-1">{PRODUCT.reviews} reviews</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <ReviewBar key={stars} stars={stars} count={Math.floor(Math.random() * 30) + 5} />
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {REVIEWS.map((review, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-sm font-medium">{review.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-orange-500">
                          <ThumbsUp className="w-3 h-3" /> Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Q&A Tab */}
            {activeTab === "qa" && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Have a question?</h4>
                  <p className="text-sm text-gray-500 mb-3">Get answers from other buyers who have purchased this item</p>
                  <button className="text-orange-500 text-sm font-medium flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> Ask a Question
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">A</span>
                    <span className="text-sm font-medium">Does it come with Windows 11 Pro?</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Yes! Windows 11 Pro is pre-installed and activated.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Frequently Bought Together */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Frequently Bought Together</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {FREQUENTLY_BOUGHT.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  💻
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm font-bold">₹{item.price.toLocaleString()}</p>
                </div>
                <input type="checkbox" className="w-4 h-4 accent-orange-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {RELATED_PRODUCTS.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.id}`}
                className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-40 flex items-center justify-center bg-gray-50 p-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={100}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold mt-1">₹{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden flex items-center gap-4 z-50">
        <button className="p-3 border border-gray-300 rounded-lg">
          <Heart className="w-5 h-5" />
        </button>
        <button 
          onClick={() => addItem(PRODUCT as any, quantity)}
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" /> Add to Cart
        </button>
      </div>
    </div>
  );
}