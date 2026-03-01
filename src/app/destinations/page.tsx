"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Globe, Star, Shield, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";

const destinations = [
  { name: "Bora Bora", region: "French Polynesia", projects: 24, description: "Where emerald lagoons meet endless blue." },
  { name: "Tuscany", region: "Italy", projects: 18, description: "Rolling hills and timeless romance." },
  { name: "Santorini", region: "Greece", projects: 15, description: "White-washed villages above the caldera." },
  { name: "Bali", region: "Indonesia", projects: 21, description: "Spiritual tranquility meets landscapes." },
  { name: "Amalfi Coast", region: "Italy", projects: 12, description: "Dramatic cliffs and azure seas." },
  { name: "Maldives", region: "Maldives", projects: 19, description: "Crystal waters and overwater villas." },
  { name: "Paris", region: "France", projects: 16, description: "The City of Light." },
  { name: "Japan", region: "Asia", projects: 14, description: "Ancient traditions meet modern elegance." },
  { name: "Swiss Alps", region: "Switzerland", projects: 9, description: "Majestic peaks year-round." },
];

const trustBadges = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Users, label: "40+ Countries" },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</motion.div>;
}

export default function Destinations() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[#FAF9F7] dark:bg-[#0A0A0A]">
        <div className="container-main">
          <AnimatedSection>
            <Link href="/" className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#C4A962] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">Destinations</h1>
            <p className="text-[#6B6B6B] dark:text-gray-400 max-w-2xl text-lg">We&apos;ve captured beauty in the world&apos;s most extraordinary places</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8 bg-white dark:bg-[#1A1A1A] border-b border-gray-100 dark:border-gray-800">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-8">
            {trustBadges.map((badge, index) => (
              <div key={badge.label} className="flex items-center gap-2 text-[#6B6B6B] dark:text-gray-400">
                <badge.icon className="w-5 h-5 text-[#C4A962]" />
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-main">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <StaggerItem key={dest.name}>
                <Link href={`/destinations/${dest.name.toLowerCase().replace(" ", "-")}`} className="group block relative overflow-hidden rounded-xl aspect-[4/5] img-zoom">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                  <div className="absolute inset-0 bg-[#E8E4DC] dark:bg-gray-800 group-hover:scale-105 transition-transform duration-600" />
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                      <Globe className="w-4 h-4" /> {dest.region}
                    </div>
                    <h3 className="text-3xl font-serif text-white mb-2">{dest.name}</h3>
                    <p className="text-white/80 text-sm mb-4">{dest.description}</p>
                    <div className="inline-flex items-center gap-2 text-[#C4A962] text-sm font-medium">
                      {dest.projects} Projects <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#1A1A1A]">
        <div className="container-main">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Global Reach</h2>
            <p className="text-[#6B6B6B] dark:text-gray-400 max-w-2xl mx-auto">While these are our most frequently visited destinations, we work worldwide</p>
          </AnimatedSection>
          <div className="aspect-[21/9] bg-[#FAF9F7] dark:bg-[#242424] rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-[#C4A962] mx-auto mb-4" />
              <p className="text-[#6B6B6B] dark:text-gray-400">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#C4A962]">
        <div className="container-main">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Have Destination, Will Travel</h2>
            <p className="text-white/80 mb-8">Whether it&apos;s on this list or somewhere entirely new, we&apos;d love to capture your story.</p>
            <Link href="/inquiry" className="inline-flex bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors">
              Tell Us About Your Destination
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
