'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export interface HeroSlide {
  image: string;
  location: string;
  category: 'Hotel' | 'Wedding' | 'Resort' | 'Editorial';
}

interface HeroProps {
  slides: HeroSlide[];
  title: string;
  subtitle?: string;
  cta?: { 
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  stats?: { label: string; value: string }[];
}

export default function CinematicHero({ 
  slides,
  title, 
  subtitle, 
  cta,
  stats
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  // Parallax effects (disabled on reduced motion)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', shouldReduceMotion ? '0%' : '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const activeSlide = slides[currentSlide] || slides[0];

  if (!activeSlide) return null;

  return (
    <div 
      ref={containerRef}
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Image Slideshow with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={`${activeSlide.category} in ${activeSlide.location}`}
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              quality={90}
              className="object-cover ken-burns"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dual Gradient Overlay for Legibility */}
        {/* Left-to-right fade for text readability on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent hidden md:block" />
        
        {/* Bottom-to-top fade for all devices */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/30 to-black/0" />
        
        {/* Noise Texture */}
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end md:justify-center pb-32 md:pb-0 px-6 md:px-16 max-w-[1440px] mx-auto pointer-events-none"
      >
        <div className="max-w-3xl w-full pointer-events-auto">
          {/* Location Label (Dynamic based on slide) */}
          <div className="h-6 mb-4 md:mb-6 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`loc-${currentSlide}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="label text-[#C4A962] absolute"
              >
                {activeSlide.location} · {activeSlide.category}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-title text-4xl md:text-6xl lg:text-7xl text-white mb-6 md:mb-8"
          >
            {title}
          </motion.h1>

          {/* Separator */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-24 h-px bg-[#C4A962] mb-6 md:mb-8 origin-left"
          />

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-white/65 max-w-xl font-light leading-relaxed mb-8 md:mb-12"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTAs */}
          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto"
            >
              {cta.primary && (
                <Link href={cta.primary.href} className="btn-primary w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-white outline-none">
                  {cta.primary.label}
                  <span className="arrow">→</span>
                </Link>
              )}
              {cta.secondary && (
                <Link href={cta.secondary.href} className="btn-ghost btn-ghost-hero w-full sm:w-auto justify-center focus-visible:ring-2 focus-visible:ring-white outline-none">
                  {cta.secondary.label}
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Social Proof / Stats Bar (Desktop only, positioned absolute bottom-left) */}
      {stats && stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-6 md:left-16 hidden md:flex"
        >
          <div className="stats-bar">
            {stats.map((stat, i) => (
              <span key={i}>
                <strong className="text-white font-medium mr-1">{stat.value}</strong> 
                {stat.label}
                {i < stats.length - 1 && <span className="mx-3 text-white/30">·</span>}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
