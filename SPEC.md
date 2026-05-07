# New Way Infotech - E-Commerce Website Specification

## Project Overview

**Project Name:** New Way Infotech
**Project Type:** E-Commerce Website
**Core Functionality:** Online store for technology products with shopping cart, checkout, and product catalog
**Target Users:** Tech enthusiasts, professionals, and consumers looking for electronics and accessories

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Icons:** Lucide React

## UI/UX Specification

### Layout Structure

**Header/Navbar:**
- Fixed position at top
- Logo on left
- Navigation links (Home, Products, About, Contact)
- Shopping cart icon with item count badge
- Mobile hamburger menu
- Background blurs on scroll

**Footer:**
- 4-column layout on desktop
- Company info, quick links, contact details, newsletter signup
- Social media links
- Copyright and legal links

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Primary: Slate-900 (#0f172a)
- Primary Foreground: White
- Background: White
- Foreground: Slate-900
- Secondary: Slate-100
- Muted: Slate-500
- Accent: Slate-50
- Destructive: Red-500
- Border: Slate-200

**Typography:**
- Font Family: Inter (Next.js default)
- Headings: Bold, various sizes (h1: 3rem, h2: 2rem, h3: 1.5rem)
- Body: Regular, 1rem (16px)
- Small: 0.875rem (14px)

**Spacing System:**
- Container: max-width 1280px, padding 1rem (mobile), 1.5rem (tablet), 2rem (desktop)
- Sections: py-16 (4rem vertical padding)
- Cards: p-6 (1.5rem padding)
- Grid gap: 1.5rem (6)

**Visual Effects:**
- Card hover: shadow-lg, scale 1.02
- Button hover: opacity-90, scale-105 on icons
- Page transitions: fade-in
- Image hover: scale 1.05

### Components

**Product Card:**
- Image container with aspect-square
- Product name (line-clamp-2)
- Star rating display
- Price (with discount indicator)
- Add to Cart button
- Badge for discounts and stock status
- Hover effects: shadow, scale

**Cart Item:**
- Product image thumbnail
- Product name
- Quantity controls (+/-)
- Remove button
- Item total price

**Forms:**
- Input fields with proper labels
- Focus states with ring
- Error states for validation
- Submit buttons with loading states

## Page Specifications

### Home Page (`/`)
- Hero section with headline, description, CTA buttons
- Search bar component
- Featured products grid (4 items)
- Features section (3 cards: Secure Shopping, Fast Delivery, 24/7 Support)
- Statistics section (Products, Customers, Reviews, Years)

### Products Page (`/products`)
- Page title and description
- Filter sidebar with categories, price range, sort options
- Product grid with pagination
- Loading states with spinner

### Product Detail Page (`/product/[id]`)
- Image gallery with thumbnails
- Product information (name, description, price)
- Feature list
- Quantity selector
- Add to Cart button
- Stock status indicator

### Cart Page (`/cart`)
- Cart items list
- Quantity update controls
- Remove item button
- Order summary with subtotal, shipping, tax, total
- Proceed to Checkout button

### Checkout Page (`/checkout`)
- Shipping information form
- Order summary
- Place Order button with processing state
- Success redirect

### About Page (`/about`)
- Company description
- Feature cards (Our Team, Quality Guarantee, Growth & Innovation, Customer First)
- Mission statement section

### Contact Page (`/contact`)
- Contact form (name, email, subject, message)
- Contact information (address, phone, email, hours)
- Success message after submission

## Functionality Specification

### Core Features

1. **Product Catalog**
   - Display all products with filtering
   - Category filtering
   - Price range filtering
   - Sort by: newest, price (asc/desc), popular
   - Search functionality

2. **Shopping Cart**
   - Add products to cart
   - Update quantities
   - Remove items
   - Persist cart in localStorage
   - Display cart count in header

3. **Checkout Process**
   - Shipping information form
   - Order summary
   - Order confirmation

### User Interactions

- Hover effects on cards and buttons
- Loading states during async operations
- Success/error feedback messages
- Responsive navigation (mobile menu)

### Data Handling

- Mock API with simulated delay
- Product data stored in memory
- Cart persisted in localStorage
- Form validation on required fields

### Edge Cases

- Empty cart display
- No products found message
- Out of stock products
- Form validation errors
- Loading states

## File Structure

```
new-way-infotech/
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.json
├── .gitignore
├── README.md
├── next-env.d.ts
├── SPEC.md
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── products/
    │   │   └── page.tsx
    │   ├── product/
    │   │   └── [id]/
    │   │       ├── page.tsx
    │   │       └── ProductDetailClient.tsx
    │   ├── cart/
    │   │   └── page.tsx
    │   ├── checkout/
    │   │   └── page.tsx
    │   ├── about/
    │   │   └── page.tsx
    │   └── contact/
    │       └── page.tsx
    ├── components/
    │   ├── providers.tsx
    │   ├── ui/
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── card.tsx
    │   │   ├── badge.tsx
    │   │   ├── label.tsx
    │   │   ├── separator.tsx
    │   │   └── textarea.tsx
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── Container.tsx
    │   ├── product/
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductGrid.tsx
    │   │   ├── ProductFilters.tsx
    │   │   ├── ProductSearch.tsx
    │   │   └── ProductGallery.tsx
    │   ├── cart/
    │   │   ├── CartItem.tsx
    │   │   ├── CartSummary.tsx
    │   │   └── CartEmpty.tsx
    │   └── checkout/
    │       ├── CheckoutForm.tsx
    │       ├── OrderSummary.tsx
    │       └── PaymentForm.tsx
    ├── lib/
    │   ├── utils.ts
    │   ├── api.ts
    │   └── constants.ts
    ├── types/
    │   ├── product.ts
    │   ├── cart.ts
    │   └── checkout.ts
    └── public/
        └── images/
```

## Acceptance Criteria

1. **Home Page**
   - [ ] Hero section displays correctly with CTA buttons
   - [ ] Featured products are displayed in a grid
   - [ ] Search bar functions properly

2. **Products Page**
   - [ ] Products load with loading state
   - [ ] Filters work (category, price, sort)
   - [ ] Product grid displays correctly

3. **Product Detail**
   - [ ] Product information displays correctly
   - [ ] Image gallery works with thumbnails
   - [ ] Add to cart functionality works

4. **Cart**
   - [ ] Items can be added to cart
   - [ ] Quantities can be updated
   - [ ] Items can be removed
   - [ ] Cart persists on refresh

5. **Checkout**
   - [ ] Form validates required fields
   - [ ] Order can be placed
   - [ ] Cart clears on successful order

6. **Responsive Design**
   - [ ] Works on mobile devices
   - [ ] Works on tablet devices
   - [ ] Works on desktop devices

7. **Performance**
   - [ ] Pages load without errors
   - [ ] No console errors
   - [ ] Smooth animations and transitions