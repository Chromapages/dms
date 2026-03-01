'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-[#0A0A0A]">
      {/* Section Header */}
      {(title || subtitle) && (
        <div className="max-w-[1440px] mx-auto px-8 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              {subtitle && <p className="section-number mb-4">{subtitle}</p>}
              {title && <h2 className="text-4xl md:text-6xl font-serif font-light text-white">{title}</h2>}
            </div>
            <Link href="/stories" className="btn-ghost">
              View All <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="photo-card aspect-[3/4] md:aspect-[4/5] relative group"
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="absolute inset-0 bg-[#1A1A1A]">
                {photo.image ? (
                  <img 
                    src={photo.image} 
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A]" />
                )}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

              {/* Location Pill */}
              <div className="location-pill opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.location}
              </div>

              {/* Content on Hover */}
              <div className={`absolute inset-0 flex flex-col justify-end p-8 transition-opacity duration-300 ${
                hoveredId === photo.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <p className="label text-white/60 mb-2">{photo.category}</p>
                <h3 className="font-serif text-2xl text-white font-light">{photo.title}</h3>
                {photo.href && (
                  <Link href={photo.href} className="mt-4 text-[#C4A962] text-sm tracking-wider">
                    Explore →
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
