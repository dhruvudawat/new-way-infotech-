"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PRODUCT_sortOptions, CATEGORIES } from "@/lib/constants";
import { ProductFilters as ProductFiltersType } from "@/types/product";

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFilterChange: (filters: ProductFiltersType) => void;
}

export function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? undefined : category as ProductFiltersType["category"],
    });
  };

  const handleSortChange = (sort: string) => {
    onFilterChange({
      ...filters,
      sort: sort as ProductFiltersType["sort"],
    });
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const price = value ? parseFloat(value) : undefined;
    onFilterChange({
      ...filters,
      [type === "min" ? "minPrice" : "maxPrice"]: price,
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters =
    filters.category ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.inStock !== undefined;

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-3 block">Search</Label>
        <Input
          placeholder="Search products..."
          value={filters.search || ""}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value || undefined })
          }
        />
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Categories</Label>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors ${
                filters.category === category.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Price Range</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            min={0}
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            min={0}
          />
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Sort By</Label>
        <div className="space-y-2">
          {PRODUCT_sortOptions.map((option) => (
            <button
              key={option.value}
              className={`flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors ${
                filters.sort === option.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
}