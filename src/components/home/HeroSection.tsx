"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Headphones, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Premium Tech Products",
    subtitle: "Discover cutting-edge electronics and accessories",
    icon: Cpu,
    gradient: "from-slate-900 via-slate-800 to-cyan-900",
  },
  {
    id: 2,
    title: "Professional Services",
    subtitle: "Expert technical support for your business",
    icon: Headphones,
    gradient: "from-slate-900 via-purple-900 to-slate-900",
  },
  {
    id: 3,
    title: "Fast Delivery",
    subtitle: "Get your orders delivered within 24 hours",
    icon: Truck,
    gradient: "from-slate-900 via-teal-900 to-slate-900",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const goToNextSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 500);
    }
  };

  const currentData = SLIDES[currentSlide];
  const Icon = currentData.icon;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />

        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0v60M0 30h60" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-cyan-500" />
              <circle cx="30" cy="30" r="2" fill="currentColor" className="text-cyan-400" />
              <circle cx="0" cy="30" r="1.5" fill="currentColor" className="text-cyan-400" />
              <circle cx="60" cy="30" r="1.5" fill="currentColor" className="text-cyan-400" />
              <circle cx="30" cy="0" r="1.5" fill="currentColor" className="text-cyan-400" />
              <circle cx="30" cy="60" r="1.5" fill="currentColor" className="text-cyan-400" />
            </pattern>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          <circle cx="50%" cy="50%" r="40%" fill="url(#glow)" className="text-cyan-500" />
        </svg>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                opacity: 0.3 + Math.random() * 0.5,
              }}
            />
          ))}
        </div>

        <div className={`absolute inset-0 transition-opacity duration-1000 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${currentData.gradient} opacity-50`} />
        </div>
      </div>

      <Container className="relative z-10">
        <div className={`max-w-4xl transition-all duration-700 ${isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-cyan-500/50 to-transparent" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              {currentData.title}
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            {currentData.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button
                size="lg"
                className="group relative px-8 py-6 text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>

            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base font-semibold text-white border-white/20 hover:bg-white/10 hover:border-white/40 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-slate-950 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold text-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm text-slate-400">
              <span className="text-white font-semibold">10K+</span> happy customers
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`relative h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-12 bg-cyan-500"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-50" />
            )}
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-sm text-slate-500">
        <span className="hidden lg:inline">Press</span>
        <kbd className="px-2 py-1 rounded bg-white/10 text-slate-400 text-xs">←</kbd>
        <kbd className="px-2 py-1 rounded bg-white/10 text-slate-400 text-xs">→</kbd>
        <span className="hidden lg:inline">to navigate</span>
      </div>

      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:flex flex-col gap-3">
        <button
          onClick={goToNextSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}