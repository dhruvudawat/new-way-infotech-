"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductSearchProps {
  initialValue?: string;
  onSearch?: (query: string) => void;
}

export function ProductSearch({ initialValue = "", onSearch }: ProductSearchProps) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg mx-auto">
      <div className="relative flex-1">
        <Input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-r-none pr-10"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button type="submit" className="rounded-l-none">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
}