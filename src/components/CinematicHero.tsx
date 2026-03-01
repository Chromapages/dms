'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  cta?: { label: string; href: string };
  location?: string;
}

export default function CinematicHero({ 
  title, 
  subtitle, 
  image = '/hero-dms.png',
  cta,
  location 
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center ken-burns"
          style={{ backgroundImage: `url('${image}')` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        {/* Noise Texture */}
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-32 px-8 md:px-16 max-w-[1440px] mx-auto"
      >
        <div className="max-w-4xl">
          {/* Location Label */}
          {location && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="label mb-6"
            >
              {location}
            </motion.div>
          )}

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-text text-white mb-8"
          >
            {title}
          </motion.h1>

          {/* Separator */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-24 h-px bg-white/20 mb-8"
          />

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/70 max-w-xl font-light leading-relaxed mb-12"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA */}
          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href={cta.href} className="btn-ghost">
                {cta.label}
                <span className="arrow">→</span>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="label text-white/50">Scroll</div>
        <div className="scroll-indicator w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </div>
  );
}
