"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  User,
  ChevronDown,
  Cpu,
  Laptop,
  Headphones,
  Package,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "./Container";
import { NAV_ITEMS, CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface HeaderProps {
  cartCount?: number;
}

const MOCK_SUGGESTIONS = [
  { name: "Laptop Pro 15", category: "computers" },
  { name: "Wireless Headphones", category: "accessories" },
  { name: "Smartphone X12", category: "electronics" },
  { name: "Gaming Keyboard", category: "accessories" },
  { name: "4K Monitor", category: "electronics" },
  { name: "Wireless Mouse", category: "accessories" },
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  electronics: Cpu,
  computers: Laptop,
  accessories: Headphones,
  software: Package,
  services: Settings,
};

export function Header({ cartCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = MOCK_SUGGESTIONS.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-primary/5"
          : "bg-background"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
                New Way Infotech
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center flex-1 max-w-xl mx-8 relative" ref={searchRef}>
            <div className="relative w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products, brands..."
                  className="w-full pl-11 pr-4 h-11 bg-muted/50 backdrop-blur-sm border border-muted rounded-full focus:bg-background transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => searchQuery && setShowSearchSuggestions(true)}
                />
              </div>

              {showSearchSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-muted overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
                      onClick={() => {
                        setSearchQuery(suggestion.name);
                        setShowSearchSuggestions(false);
                      }}
                    >
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{suggestion.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground capitalize">
                        {suggestion.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            <div className="relative">
              <button
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1",
                  isMegaMenuOpen
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              >
                Categories
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isMegaMenuOpen && "rotate-180"
                )} />
              </button>

              {isMegaMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-muted p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-5 gap-4">
                    {CATEGORIES.map((category) => {
                      const Icon = CATEGORY_ICONS[category.slug] || Package;
                      return (
                        <Link
                          key={category.id}
                          href={`/products?category=${category.slug}`}
                          className="group flex flex-col items-center p-4 rounded-xl hover:bg-muted/50 transition-all duration-200"
                          onClick={() => setIsMegaMenuOpen(false)}
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                            {category.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-muted">
                    <Link
                      href="/products"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMegaMenuOpen(false)}
                    >
                      View all categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {NAV_ITEMS.filter(item => item.href !== "/").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative" ref={userDropdownRef}>
              <button
                className={cn(
                  "hidden md:flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                  isUserDropdownOpen
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium hidden lg:block">Account</span>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200 hidden lg:block",
                  isUserDropdownOpen && "rotate-180"
                )} />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-background/95 backdrop-blur-xl rounded-xl shadow-xl border border-muted overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2">
                    <button className="w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-muted/50 transition-colors">
                      Sign In
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-muted/50 transition-colors">
                      My Account
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-muted/50 transition-colors">
                      My Orders
                    </button>
                    <div className="my-1 border-t border-muted" />
                    <button className="w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-muted/50 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link href="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-muted/50"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-muted/50 animate-in slide-in-from-top-2 duration-200">
            <div className="relative mb-4" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-11 h-11 bg-muted/50 rounded-xl"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(e.target.value.length > 0);
                }}
              />
              {showSearchSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl shadow-xl border border-muted overflow-hidden">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
                      onClick={() => {
                        setSearchQuery(suggestion.name);
                        setShowSearchSuggestions(false);
                      }}
                    >
                      <Search className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{suggestion.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-2 border-t border-muted/50">
                <p className="px-4 text-xs font-medium text-muted-foreground mb-2">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-2 px-4">
                  {CATEGORIES.map((category) => {
                    const Icon = CATEGORY_ICONS[category.slug] || Package;
                    return (
                      <Link
                        key={category.id}
                        href={`/products?category=${category.slug}`}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-sm">{category.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-muted/50">
                <button className="w-full px-4 py-3 text-left text-sm font-medium rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Sign In / My Account
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}