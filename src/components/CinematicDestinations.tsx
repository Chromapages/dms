'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface Destination {
  id: number;
  name: string;
  region: string;
  count: number;
  image: string;
  thumb: string;
}

interface CinematicDestinationsProps {
  destinations: Destination[];
}

export default function CinematicDestinations({ destinations }: CinematicDestinationsProps) {
  const [hoveredDest, setHoveredDest] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-24 bg-bg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {destinations.map((dest) =>
            hoveredDest === dest.id ? (
              <motion.div
                key={dest.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <Image
                  src={dest.image}
                  alt={`${dest.name} destination backdrop`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={dest.id === destinations[0]?.id}
                />
                <div className="absolute inset-0 bg-black/55" />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-8">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="section-number mb-4">003 / Destinations</p>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-text-primary">
              Where We Work
            </h2>
          </div>
          <Link href="/destinations" className="btn-ghost hidden md:inline-flex">
            All Destinations <span className="arrow">→</span>
          </Link>
        </div>

        <div className="border-t border-black/10 dark:border-white/10">
          {destinations.map((dest) => {
            const slug = dest.name.toLowerCase().replace(' ', '-');
            const isHovered = hoveredDest === dest.id;
            return (
              <Link
                key={dest.id}
                href={`/destinations/${slug}`}
                className={`group flex items-center justify-between gap-6 py-6 md:py-7 border-b border-black/10 dark:border-white/10 transition-colors ${isHovered ? 'text-white' : 'text-text-primary'
                  }`}
                onMouseEnter={() => setHoveredDest(dest.id)}
                onMouseLeave={() => setHoveredDest(null)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-black/10 dark:border-white/20 md:hidden">
                    <Image
                      src={dest.thumb}
                      alt={`${dest.name} thumbnail`}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className={`font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-wide transition-colors ${isHovered ? 'text-white' : 'text-text-primary'
                      }`}>
                      {dest.name.toUpperCase()}
                    </p>
                    <p className={`text-sm md:text-base font-light transition-colors ${isHovered ? 'text-white/70' : 'text-text-secondary'
                      }`}>
                      {dest.region}
                    </p>
                  </div>
                </div>
                <div className={`text-sm md:text-base font-light tracking-wider transition-colors ${isHovered ? 'text-[#C4A962]' : 'text-accent'
                  }`}>
                  {dest.count} Stories
                </div>
              </Link>
            );
          })}
        </div>

        <Link href="/destinations" className="btn-ghost md:hidden mt-8">
          All Destinations <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
