"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X, Share2, Download, ChevronLeft, ChevronRight, Globe, MapPin, Camera, Star, Shield, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";

const filters = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Weddings" },
  { id: "hotel", label: "Hotels" },
  { id: "resort", label: "Resorts" },
  { id: "editorial", label: "Editorial" },
  { id: "destination", label: "Destinations" },
];

const galleryItems = [
  { id: 1, title: "Four Seasons Bora Bora", category: "hotel", location: "Bora Bora", year: "2025" },
  { id: 2, title: "Sarah & Michael Wedding", category: "wedding", location: "Amalfi Coast", year: "2025" },
  { id: 3, title: "Aman Tokyo Launch", category: "editorial", location: "Tokyo", year: "2025" },
  { id: 4, title: "Ritz Paris Campaign", category: "hotel", location: "Paris", year: "2024" },
  { id: 5, title: "Bali Bliss Retreat", category: "resort", location: "Bali", year: "2024" },
  { id: 6, title: "Tuscan Villa Estate", category: "wedding", location: "Tuscany", year: "2024" },
  { id: 7, title: "Santorini Sunset Shoot", category: "destination", location: "Santorini", year: "2024" },
  { id: 8, title: "Maldives Paradise", category: "resort", location: "Maldives", year: "2024" },
  { id: 9, title: "Swiss Alps Adventure", category: "destination", location: "Switzerland", year: "2024" },
  { id: 10, title: "Lake Como Elegance", category: "hotel", location: "Lake Como", year: "2023" },
  { id: 11, title: "Provence Lavender Fields", category: "editorial", location: "Provence", year: "2023" },
  { id: 12, title: "Greek Island Elopement", category: "wedding", location: "Greek Islands", year: "2023" },
];

const stats = [
  { value: "150+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "40+", label: "Destinations" },
  { value: "25+", label: "Awards Won" },
];

const logos = ["Condé Nast Traveler", "Vogue", "Travel + Leisure", "Town & Country", "Brides"];

const trustBadges = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Users, label: "500+ Clients" },
  { icon: Camera, label: "Professional Gear" },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const filteredItems = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#FAF9F7] dark:bg-[#0A0A0A]">
        <div className="container-main">
          <AnimatedSection>
            <Link href="/" className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#C4A962] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">Our Work</h1>
            <p className="text-[#6B6B6B] dark:text-gray-400 max-w-2xl text-lg">
              A curated collection of our finest moments captured across the world&apos;s most beautiful destinations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#1A1A1A]">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-serif text-[#C4A962]">{stat.value}</p>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 bg-white dark:bg-[#1A1A1A] border-b border-gray-100 dark:border-gray-800">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-8">
            {trustBadges.map((badge, index) => (
              <div key={badge.label} className="flex items-center gap-2 text-[#6B6B6B] dark:text-gray-400 text-sm">
                <badge.icon className="w-4 h-4 text-[#C4A962]" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-[#FAF9F7] dark:bg-[#0A0A0A] border-b border-gray-100 dark:border-gray-800 py-4">
        <div className="container-main">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter.id
                    ? "bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A]"
                    : "bg-gray-100 dark:bg-gray-800 text-[#6B6B6B] dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container-main">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <StaggerItem key={item.id}>
                <button
                  onClick={() => openLightbox(index)}
                  className="group block w-full text-left relative overflow-hidden rounded-lg aspect-[4/5] img-zoom"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                  <div className="absolute inset-0 bg-[#E8E4DC] dark:bg-gray-800" />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white capitalize">{item.category}</span>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">{item.year}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-medium">View Project</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <p className="text-white/70 text-sm mb-1 flex items-center gap-1"><Globe className="w-3 h-3" /> {item.location}</p>
                    <h3 className="text-white text-xl font-serif">{item.title}</h3>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* As Seen In */}
      <section className="py-16 bg-white dark:bg-[#1A1A1A]">
        <div className="container-main">
          <AnimatedSection className="text-center mb-8">
            <p className="text-[#6B6B6B] dark:text-gray-400 text-sm uppercase tracking-wider">Featured In</p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            {logos.map((logo, index) => (
              <span key={index} className="font-serif text-xl">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#C4A962]">
        <div className="container-main">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif text-white mb-4">Let's Create Together</h2>
            <p className="text-white/80 mb-8">Ready to add your project to our portfolio?</p>
            <Link href="/inquiry" className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 p-2 text-white/70 hover:text-white z-10">
            <X className="w-8 h-8" />
          </button>
          <button onClick={() => setCurrentImage((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)} className="absolute left-6 p-3 text-white/70 hover:text-white">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button onClick={() => setCurrentImage((prev) => (prev + 1) % filteredItems.length)} className="absolute right-6 p-3 text-white/70 hover:text-white">
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="max-w-6xl max-h-[80vh] w-full px-20">
            <div className="aspect-[4/3] bg-[#1A1A1A] rounded-lg flex items-center justify-center">
              <p className="text-white/50 text-lg">{filteredItems[currentImage]?.title}</p>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70">
            {currentImage + 1} / {filteredItems.length}
          </div>
        </div>
      )}
    </>
  );
}
