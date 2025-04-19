import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Logo size="lg" />
            <p className="mt-4 text-gray-600">
              Fresh, local produce delivered directly to your doorstep. Supporting local farmers and providing the best quality fruits and vegetables.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-600 hover:text-green-600 transition duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-600 transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-green-600 transition duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600 transition duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-600 hover:text-green-600 transition duration-200">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 transition duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-green-600 mt-1 mr-2" />
                <span className="text-gray-600">123 Organic Way, Farmington, CA 94107</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-green-600 mr-2" />
                <span className="text-gray-600">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-green-600 mr-2" />
                <span className="text-gray-600">hello@freshveggies.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <button 
                type="submit" 
                className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} FreshVeggies. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-green-600 text-sm transition duration-200">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-green-600 text-sm transition duration-200">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}