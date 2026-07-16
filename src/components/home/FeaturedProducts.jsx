'use client';

import Link from 'next/link';
import { products } from '../../data/products';
import ProductCard from '../ui/ProductCard';

export default function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section className="w-full py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] font-heading font-bold tracking-[0.2em] text-zinc-400 uppercase mb-2">
              Curated for you
            </p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#111111] uppercase tracking-tight leading-none">
              Featured <span className="text-[#C9FA75]">Picks</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-heading font-bold tracking-widest text-[#111111] uppercase hover:text-zinc-500 transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#111111] text-[#111111] font-heading font-bold text-sm tracking-widest uppercase rounded-full hover:bg-[#111111] hover:text-white transition-colors duration-200"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
