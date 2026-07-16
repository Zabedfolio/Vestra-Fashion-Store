import React from 'react';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import BrandHook from '../components/home/BrandHook';
import FeaturedProducts from '../components/home/FeaturedProducts';

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <CategoryGrid />
      <BrandHook />
      <FeaturedProducts />
    </div>
  );
}
