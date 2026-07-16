"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Magnifier, ShoppingBag, Heart, Bars, Xmark, Person } from '@gravity-ui/icons';
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = 0; // Temporary placeholder until cart logic is redefined
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);

  // Sync wishlist count from localStorage
  useEffect(() => {
    const updateWishlistCount = () => {
      try {
        const stored = localStorage.getItem('vestra_wishlist');
        if (stored) {
          const items = JSON.parse(stored);
          setWishlistCount(items.length);
        } else {
          setWishlistCount(0);
        }
      } catch (e) {
        console.error(e);
      }
    };

    updateWishlistCount();

    // Listen to storage events to keep sync if added in another tab/component
    window.addEventListener('storage', updateWishlistCount);
    // Listen to custom wishlist events dispatched inside product cards
    window.addEventListener('wishlist-updated', updateWishlistCount);
    
    return () => {
      window.removeEventListener('storage', updateWishlistCount);
      window.removeEventListener('wishlist-updated', updateWishlistCount);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Men', href: '/products/men' },
    { name: 'Women', href: '/products/women' },
    { name: 'Kids', href: '/products/kids' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Menu Icon */}
          <button 
            type="button" 
            onClick={() => setIsMenuOpen(true)}
            className="text-dark p-2 hover:bg-zinc-100 rounded-full lg:hidden focus:outline-none"
          >
            <Bars className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex lg:flex-1 justify-center lg:justify-start">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo-navbar.png" 
                alt="VESTRA logo"
                width={38}
                height={38}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex lg:gap-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 py-2 hover:text-primary ${
                    isActive ? 'text-dark border-b-2 border-primary font-bold' : 'text-zinc-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Icons Action Row */}
          <div className="flex flex-1 items-center justify-end gap-x-4">
            
            {/* Search Toggle */}
            <button 
              type="button" 
              onClick={() => setIsSearchOpen(true)}
              className="text-dark p-2 hover:bg-zinc-100 rounded-full transition"
            >
              <Magnifier className="w-5 h-5" />
            </button>

            {/* Account Icon (Demo) */}
            <div className="hidden sm:block text-dark p-2 hover:bg-zinc-100 rounded-full cursor-pointer transition">
              <Person className="w-5 h-5" />
            </div>

            {/* Wishlist Link */}
            <Link href="/products?wishlist=true" className="relative text-dark p-2 hover:bg-zinc-100 rounded-full transition">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-dark rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link */}
            <Link href="/cart" className="relative text-dark p-2 hover:bg-zinc-100 rounded-full transition">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-dark bg-primary rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* --- Overlay Search Drawer --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-dark/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsSearchOpen(false)}
          />
          {/* Search Content */}
          <div className="absolute top-0 left-0 right-0 bg-white shadow-md p-6 transition-all duration-300">
            <div className="mx-auto max-w-3xl flex items-center justify-between">
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-3">
                <Magnifier className="text-zinc-400 w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-base font-body border-0 outline-none focus:ring-0 text-dark placeholder-zinc-400"
                  autoFocus
                />
              </form>
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(false)}
                className="text-dark p-2 hover:bg-zinc-100 rounded-full transition focus:outline-none"
              >
                <Xmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Mobile Sidebar Menu --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-dark/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Drawer Menu */}
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl animate-slide-in">
            <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-100">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Image 
                  src="/images/logo-navbar.png" 
                  alt="VESTRA logo"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </Link>
              <button 
                type="button" 
                onClick={() => setIsMenuOpen(false)}
                className="text-dark p-2 hover:bg-zinc-100 rounded-full focus:outline-none"
              >
                <Xmark className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="space-y-4 px-4 py-6 border-b border-zinc-100">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-semibold py-2 transition-colors ${
                      isActive ? 'text-primary' : 'text-dark hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Footer details in menu */}
            <div className="px-4 py-6 text-xs text-zinc-500 font-body">
              <p className="mb-2 font-semibold text-dark">Welcome to VESTRA</p>
              <p>Sign in to unlock personalized deals and fast checkout.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
