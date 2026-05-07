import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Container } from "./Container";
import { COMPANY_INFO, NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold">New Way Infotech</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Your one-stop shop for the latest tech products and services.
              Quality guaranteed, prices unbeatable.
            </p>
            <div className="flex space-x-4">
              <a
                href={COMPANY_INFO.social.facebook}
                className="hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={COMPANY_INFO.social.twitter}
                className="hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={COMPANY_INFO.social.instagram}
                className="hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={COMPANY_INFO.social.linkedin}
                className="hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="text-sm opacity-80">{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm opacity-80">{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm opacity-80">{COMPANY_INFO.email}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm opacity-80">{COMPANY_INFO.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm opacity-80 mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-foreground text-primary rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
            <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:opacity-100">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:opacity-100">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}