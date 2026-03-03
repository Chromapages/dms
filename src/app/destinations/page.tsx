'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const destinations = [
  { id: 1, name: 'Bora Bora', region: 'French Polynesia', projects: 24, description: 'Where emerald lagoons meet an endless Pacific horizon.', image: '/hero-dms.png', aspect: 'portrait' },
  { id: 2, name: 'Tuscany', region: 'Italy', projects: 18, description: 'Rolling hills, golden light, and timeless romance.', image: '/hero-dms.png', aspect: 'landscape' },
  { id: 3, name: 'Santorini', region: 'Greece', projects: 15, description: 'White-washed villages perched above the caldera.', image: '/hero-dms.png', aspect: 'square' },
  { id: 4, name: 'Bali', region: 'Indonesia', projects: 21, description: 'Spiritual tranquility woven into verdant landscapes.', image: '/hero-dms.png', aspect: 'portrait' },
  { id: 5, name: 'Amalfi Coast', region: 'Italy', projects: 12, description: 'Dramatic cliffs cascading into azure seas.', image: '/hero-dms.png', aspect: 'landscape' },
  { id: 6, name: 'Maldives', region: 'Maldives', projects: 19, description: 'Crystal-clear waters and overwater bliss.', image: '/hero-dms.png', aspect: 'square' },
  { id: 7, name: 'Japan', region: 'Asia', projects: 14, description: 'Ancient traditions meeting modern elegance.', image: '/hero-dms.png', aspect: 'portrait' },
  { id: 8, name: 'The Swiss Alps', region: 'Switzerland', projects: 9, description: 'Majestic peaks and pristine snowscapes.', image: '/hero-dms.png', aspect: 'landscape' },
];

const regions = ['All', 'Europe', 'Asia', 'Pacific', 'Indian Ocean'];

const getAspectClass = (aspect: string) => {
  switch (aspect) {
    case 'portrait': return 'aspect-[3/4]';
    case 'landscape': return 'aspect-[16/9]';
    default: return 'aspect-square';
  }
};

export default function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = activeRegion === 'All'
    ? destinations
    : destinations.filter(d => d.region.includes(activeRegion) || d.name.includes(activeRegion));

  return (
    <div className="min-h-screen bg-bg pt-32 selection:bg-accent/30">

      {/* Page Header */}
      <header className="max-w-[1440px] mx-auto px-6 pt-16 pb-12 md:pb-24">
        <p className="section-number text-accent mb-6 uppercase tracking-widest text-sm font-medium">
          Where We Work
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-text-primary tracking-tight">
            Destinations
          </h1>
          <p className="text-text-secondary font-light text-lg max-w-md leading-relaxed md:pb-2">
            From secluded island resorts to alpine retreats — we&apos;ve captured
            the world&apos;s most extraordinary places.
          </p>
        </div>
      </header>

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
                  href={`/destinations/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group block relative overflow-hidden bg-bg-elevated"
                  onMouseEnter={() => setHoveredId(dest.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className={`relative w-full ${getAspectClass(dest.aspect)}`}>
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Permanent subtle gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
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

      {/* Closing CTA Strip */}
      <div className="bg-bg-elevated border-t border-text-primary/10 py-24">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="section-number text-accent mb-4 uppercase tracking-widest text-xs font-medium">
              Global Reach
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-text-primary">
              Have destination, will travel.
            </h2>
            <p className="text-text-secondary font-light mt-4 max-w-md leading-relaxed">
              Whether it&apos;s on this list or somewhere entirely new, we&apos;d
              love to capture your story.
            </p>
          </div>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-3 bg-accent text-white px-10 py-4 text-sm tracking-widest uppercase font-medium hover:bg-text-primary transition-colors duration-300 whitespace-nowrap"
          >
            Start a Project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

    </div>
  );
}
