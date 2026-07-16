'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group relative flex flex-col bg-white">
      {/* Image wrapper */}
      <Link href={`/products/${product.id}`} className="relative block overflow-hidden bg-[#F5F5F5] aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-[#C9FA75] text-[#111111] text-[10px] font-heading font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
              New
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-[#111111] text-white text-[10px] font-heading font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setWishlisted((prev) => !prev);
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 active:scale-95"
        >
          <svg
            className={`w-4 h-4 transition-colors duration-200 ${wishlisted ? 'text-red-500 fill-red-500' : 'text-zinc-400 fill-none'}`}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick-view slide-up overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link
            href={`/products/${product.id}`}
            className="block w-full bg-[#111111] text-white text-center text-xs font-heading font-bold tracking-widest uppercase py-3 hover:bg-[#C9FA75] hover:text-[#111111] transition-colors duration-200"
          >
            Quick View
          </Link>
        </div>
      </Link>

      {/* Info */}
      <div className="pt-3 pb-1">
        <p className="text-[10px] font-heading font-semibold tracking-widest text-zinc-400 uppercase mb-0.5">
          {product.subCategory}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-body text-sm font-semibold text-[#111111] truncate hover:text-zinc-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-heading font-bold text-[#111111] text-sm">
            ৳{product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="font-body text-xs text-zinc-400 line-through">
              ৳{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
