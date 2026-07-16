import React from 'react';

export default function BrandHook() {
  const tickerPhrases = [
    "NEW SEASON",
    "BOLD STYLE",
    "MADE TO MOVE",
    "WARDROBE ESSENTIALS",
    "CURATED FASHION",
    "VESTRA STUDIO",
  ];

  // Repeat phrases for seamless horizontal looping coverage
  const doubledPhrases = [...tickerPhrases, ...tickerPhrases, ...tickerPhrases, ...tickerPhrases];

  return (
    <section className="bg-dark text-white py-20 sm:py-28 overflow-hidden relative">
      
      {/* scrolling marquee ticker */}
      <div className="border-y border-zinc-800 py-3 mb-12 select-none">
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
            {doubledPhrases.map((phrase, idx) => (
              <React.Fragment key={idx}>
                <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase font-heading">
                  {phrase}
                </span>
                <span className="text-primary text-xs">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* manifesto content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-4xl">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.1] mb-6">
            We don't just sell clothes. <br className="hidden sm:inline" />
            We sell <span className="text-primary">fashion</span>.
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base md:text-lg font-body max-w-xl leading-relaxed">
            Every piece is chosen to make you feel like yourself, only sharper.
          </p>
        </div>
      </div>

    </section>
  );
}
