'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export interface DestinationItem {
  id: string | number;
  name: string;
  slug?: string;
  region: string;
  projects: number;
  description: string;
  image: string;
  aspect?: string;
}

interface DestinationsGridProps {
  destinations: DestinationItem[];
  regions: string[];
}

const getAspectClass = (aspect: string) => {
  switch (aspect) {
    case 'portrait': return 'aspect-[3/4]';
    case 'landscape': return 'aspect-[16/9]';
    default: return 'aspect-square';
  }
};

export default function DestinationsGrid({ destinations, regions }: DestinationsGridProps) {
  const [activeRegion, setActiveRegion] = useState('All');

  const filtered = activeRegion === 'All'
    ? destinations
    : destinations.filter(d => d.region.includes(activeRegion) || d.name.includes(activeRegion));

  return (
    <>
      {/* Region Filter */}
      <div className="sticky top-[80px] z-40 bg-[var(--bg)] border-b border-text-primary/10 py-4 mb-12 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-6">
          <ul className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {regions.map((region) => (
              <li key={region}>
                <button
                  onClick={() => setActiveRegion(region)}
                  className={`text-sm tracking-widest uppercase pb-1 border-b-2 transition-colors whitespace-nowrap ${activeRegion === region
                      ? 'border-accent text-text-primary font-medium'
                      : 'border-transparent text-text-secondary hover:text-text-primary font-light'
                    }`}
                >
                  {region}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1440px] mx-auto px-6 pb-32">
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="break-inside-avoid"
              >
                <Link
                  href={`/destinations/${dest.slug || dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group block relative overflow-hidden bg-bg-elevated"
                >
                  <div className={`relative w-full ${getAspectClass(dest.aspect || 'square')}`}>
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                      <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-accent text-xs tracking-widest uppercase mb-2 font-medium">
                          {dest.region}
                        </p>
                        <h2 className="text-white text-2xl md:text-3xl font-serif font-light mb-2">
                          {dest.name}
                        </h2>
                        <p className="text-white/0 group-hover:text-white/70 text-sm font-light transition-colors duration-500 leading-relaxed mb-4 line-clamp-2">
                          {dest.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-white/60 text-xs tracking-widest uppercase">
                            {dest.projects} Projects
                          </span>
                          <ArrowUpRight
                            size={20}
                            className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center py-32 text-text-secondary font-light">
            No destinations found for this region.
          </p>
        )}
      </div>
    </>
  );
}
