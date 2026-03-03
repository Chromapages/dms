'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Heart, Globe, Award } from 'lucide-react';

const awards = [
  { name: "Condé Nast Traveler", year: "2025" },
  { name: "Vogue Italia", year: "2025" },
  { name: "Travel + Leisure", year: "2024" },
  { name: "World Travel Awards", year: "2024" },
];

const values = [
  {
    id: "01",
    title: "Authentic Connection",
    description: "We believe the most powerful imagery comes from genuine moments. We don't just capture places—we capture feelings."
  },
  {
    id: "02",
    title: "Global Perspective",
    description: "With experience across 40+ countries, we understand diverse cultures and know how to tell stories that resonate worldwide."
  },
  {
    id: "03",
    title: "Uncompromising Quality",
    description: "Every image we deliver meets the highest standards. We're detail-obsessed because we know your reputation depends on it."
  },
];

const stats = [
  { value: "150+", label: "Projects Worldwide" },
  { value: "40+", label: "Countries" },
  { value: "25", label: "Industry Awards" },
  { value: "98%", label: "Client Retention" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 selection:text-text-primary pt-32 transition-colors duration-300">

      {/* Header */}
      <header className="max-w-[1440px] mx-auto px-8 pt-16 pb-12 md:pb-24 text-center">
        <p className="section-number text-accent mb-6 uppercase tracking-widest text-sm font-medium">
          DMS / Perspective
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-text-primary mb-8 tracking-tight max-w-4xl mx-auto">
          Beyond the Image
        </h1>
        <p className="text-text-secondary font-light text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
          We exist to help the world&apos;s most beautiful places tell their stories. A collective of visual artists dedicated to the intersection of architecture, nature, and high-end hospitality.
        </p>
      </header>

      {/* Hero Image */}
      <section className="mb-24 md:mb-32">
        <div className="max-w-[1440px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[21/9] bg-bg-elevated overflow-hidden grayscale-[20%]"
          >
            <Image
              src="/hero-dms.png"
              alt="Editorial atmosphere"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </div>
      </section>

      {/* The Story */}
      <section className="max-w-[1440px] mx-auto px-8 mb-32 md:mb-48">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="section-number text-accent mb-6">01 / The Narrative</p>
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary leading-tight">
              Crafting legacy through cinematic vision.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 text-text-secondary font-light text-lg leading-relaxed space-y-8 py-2">
            <p>
              Destination Media Services was born from a simple observation: the world&apos;s most breathtaking destinations deserved imagery as stunning as they are. founded by a collective of visual storytellers, we sought to bridge the gap between commercial photography and fine art.
            </p>
            <p>
              Since our inception in 2019, we have traversed the globe, from the secluded islands of the Pacific to the historic palazzos of Italy. Our approach is rooted in patience and precision—waiting for the exact moment when light and architecture harmonize.
            </p>
            <p>
              We don&apos;t just document properties; we curate digital legacies. Every frame is a deliberate choice, every edit a refinement of the brand&apos;s soul.
            </p>
          </div>
        </div>
      </section>

      {/* Values / Pillars */}
      <section className="bg-bg-elevated py-32 md:py-48 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center mb-24 md:mb-32">
            <p className="section-number text-accent mb-6">02 / Core Pillars</p>
            <h2 className="text-4xl md:text-6xl font-serif text-text-primary mb-8">
              What Defines Us
            </h2>
            <p className="text-text-secondary font-light max-w-xl mx-auto">
              Our work is guided by a set of principles that ensure consistency, quality, and artistic integrity across every project.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-24">
            {values.map((value) => (
              <div key={value.id} className="relative">
                <span className="text-7xl font-serif text-accent/10 absolute -top-10 -left-6 italic select-none">
                  {value.id}
                </span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-serif text-text-primary mb-6">
                    {value.title}
                  </h3>
                  <div className="w-12 h-px bg-accent mb-6" />
                  <p className="text-text-secondary font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32 border-b border-text-primary/5">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <p className="text-4xl md:text-6xl font-serif text-text-primary mb-4 italic">
                  {stat.value}
                </p>
                <p className="text-text-secondary text-xs uppercase tracking-widest font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition / Archive */}
      <section className="py-32 md:py-48">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <p className="section-number text-accent mb-6">03 / Recognition</p>
              <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-8">
                The Archive
              </h2>
              <p className="text-text-secondary font-light leading-relaxed">
                Our pursuit of visual excellence has been recognized by some of the most prestigious voices in travel and design.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="divide-y divide-text-primary/10 border-t border-text-primary/10">
                {awards.map((award, i) => (
                  <li key={i} className="py-8 flex justify-between items-center group">
                    <div>
                      <h4 className="text-xl md:text-2xl font-serif text-text-primary group-hover:text-accent transition-colors">
                        {award.name}
                      </h4>
                      <p className="text-text-secondary text-sm font-light mt-1">
                        Publication & Editorial Feature
                      </p>
                    </div>
                    <span className="text-text-primary/40 text-sm tracking-widest font-mono">
                      {award.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-48 bg-bg-elevated transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <p className="section-number text-accent mb-6">Join the Journey</p>
          <h2 className="text-4xl md:text-7xl font-serif font-light text-text-primary mb-12">
            Let&apos;s create together.
          </h2>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-3 bg-accent text-white px-12 py-5 text-sm tracking-widest uppercase font-medium hover:bg-text-primary transition-colors duration-300"
          >
            Get in Touch
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
}
