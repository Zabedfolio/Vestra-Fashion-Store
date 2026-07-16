import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, ArrowRotateLeft, Shield } from '@gravity-ui/icons';

export default function Hero() {
  return (
    <section className="flex flex-col w-full">
      {/* Main Dark Hero Banner */}
      <div className="relative bg-dark text-white overflow-hidden py-24 sm:py-32 lg:py-40 flex items-center min-h-[480px] sm:min-h-[560px]">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/hero.png" 
            alt="VESTRA Fashion Collection" 
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          {/* Subtle gradient vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/70 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="max-w-2xl text-left">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase leading-[1.1] mb-6">
              Defining <br/>
              <span className="text-primary">Modern Style</span>
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base md:text-lg font-body max-w-lg mb-10 leading-relaxed">
              Explore our premium minimalist wardrobe collection. Clean cuts, high-end details, and bold silhouettes made to feel like yourself, only sharper.
            </p>
            <div>
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center font-bold tracking-wider uppercase text-xs md:text-sm bg-primary text-dark hover:bg-[#b5e656] shadow-md rounded-full py-4 px-8 transition-all duration-200 active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Row */}
      <div className="bg-gray-light py-6 border-b border-zinc-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            
            {/* Free Shipping Badge */}
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-5 h-5 text-dark flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-dark font-heading uppercase tracking-wider">
                Free Shipping Worldwide
              </span>
            </div>

            {/* Returns Badge */}
            <div className="flex items-center justify-center gap-3 border-y sm:border-y-0 sm:border-x border-zinc-200/80 py-3 sm:py-0">
              <ArrowRotateLeft className="w-5 h-5 text-dark flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-dark font-heading uppercase tracking-wider">
                Easy 30-Day Returns
              </span>
            </div>

            {/* Secure Checkout Badge */}
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-5 h-5 text-dark flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-dark font-heading uppercase tracking-wider">
                100% Secure Checkout
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
