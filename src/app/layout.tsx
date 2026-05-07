import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "New Way Infotech | Your Tech Partner",
  description: "Your one-stop shop for the latest tech products and services. Quality guaranteed, prices unbeatable.",
  keywords: ["electronics", "computers", "accessories", "tech", "shopping"],
  authors: [{ name: "New Way Infotech" }],
  openGraph: {
    title: "New Way Infotech | Your Tech Partner",
    description: "Your one-stop shop for the latest tech products and services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16 md:pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}