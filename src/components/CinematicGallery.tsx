'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
  id: string | number;
  title: string;
  location: string;
  category?: string;
  image?: string;
  href?: string;
}

interface CinematicGalleryProps {
  photos: Photo[];
  title?: string;
  subtitle?: string;
}

export default function CinematicGallery({
  photos,
  title,
  subtitle
}: CinematicGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 md:py-32 bg-bg overflow-hidden">
      {/* Section Header */}
      {(title || subtitle) && (
        <div className="max-w-[1440px] mx-auto px-8 mb-12 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              {subtitle && <p className="section-number mb-4">{subtitle}</p>}
              {title && <h2 className="text-4xl md:text-6xl font-serif font-light text-text-primary">{title}</h2>}
            </div>
            <Link href="/stories" className="btn-ghost">
              View All <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Accordion View */}
      <div className="hidden md:flex h-[600px] w-full gap-2 px-4">
        {photos.slice(0, 5).map((photo, index) => (
          <motion.div
            key={photo.id}
            layout
            onMouseEnter={() => setActiveIndex(index)}
            className="relative cursor-pointer overflow-hidden rounded-sm h-full"
            initial={false}
            animate={{
              flex: activeIndex === index ? 4 : 1,
            }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.6
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              {photo.image ? (
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1440px) 100vw, 800px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-bg-elevated to-charcoal" />
              )}
              {/* Overlay for better text legibility */}
              <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${activeIndex === index ? 'opacity-60' : 'opacity-20'
                }`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Vertical Title for Collapsed State */}
            <AnimatePresence>
              {activeIndex !== index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <p className="text-white/40 font-serif text-lg tracking-widest uppercase [writing-mode:vertical-lr] rotate-180 whitespace-nowrap">
                    {photo.title}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content for Expanded State */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute inset-0 flex flex-col justify-end p-10 md:p-12"
                >
                  <div className="max-w-xl">
                    <p className="label text-white/70 mb-3">{photo.category} — {photo.location}</p>
                    <h3 className="text-3xl lg:text-5xl font-serif font-light text-white leading-tight mb-6">
                      {photo.title}
                    </h3>
                    <Link
                      href={photo.href || '#'}
                      className="group inline-flex items-center gap-3 text-accent tracking-widest text-sm uppercase"
                    >
                      Explore Story
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Mobile Swipe View */}
      <div className="flex md:hidden snap-x snap-mandatory overflow-x-auto gap-4 px-6 pb-8 no-scrollbar">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="flex-none w-[85vw] snap-center"
          >
            <Link href={photo.href || '#'} className="block photo-card aspect-[4/5] relative rounded-sm overflow-hidden">
              {photo.image ? (
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover"
                  sizes="85vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-bg-elevated to-charcoal" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="label text-white/70 mb-2">{photo.location}</p>
                <h3 className="font-serif text-2xl text-white">{photo.title}</h3>
                <span className="text-accent text-sm mt-4 tracking-widest uppercase">Explore →</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
