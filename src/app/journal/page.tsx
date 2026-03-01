"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, Star, Shield, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";

const categories = ["All", "Technique", "Behind the Scenes", "Weddings", "Adventure", "Industry"];
const posts = [
  { slug: "art-of-golden-hour", title: "The Art of Golden Hour in Santorini", category: "Technique", date: "January 15, 2026", readTime: "5 min read", excerpt: "Discovering the magic of light in one of the world's most photographed destinations." },
  { slug: "vogue-italia-shoot", title: "Behind the Scenes: Vogue Italia Shoot", category: "Behind the Scenes", date: "January 8, 2026", readTime: "8 min read", excerpt: "A peek into our most ambitious editorial campaign to date." },
  { slug: "love-stories-amalfi", title: "Love Stories: An Amalfi Wedding", category: "Weddings", date: "December 12, 2025", readTime: "6 min read", excerpt: "Sarah and Michael's intimate celebration in Positano." },
  { slug: "finding-light-patagonia", title: "Finding Light in Patagonia", category: "Adventure", date: "December 20, 2025", readTime: "7 min read", excerpt: "Chasing the perfect shot through nature's most dramatic landscapes." },
  { slug: "future-destination-marketing", title: "The Future of Destination Marketing", category: "Industry", date: "November 28, 2025", readTime: "6 min read", excerpt: "How luxury brands are reimagining visual storytelling." },
  { slug: "capturing-authentic-moments", title: "Capturing Authentic Moments", category: "Technique", date: "November 15, 2025", readTime: "5 min read", excerpt: "Why the best photos happen when everyone forgets the camera is there." },
];

const trustBadges = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Users, label: "Trusted by 500+" },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</motion.div>;
}

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredPosts = activeCategory === "All" ? posts : posts.filter(post => post.category === activeCategory);

  return (
    <>
      <section className="pt-32 pb-16 bg-[#FAF9F7] dark:bg-[#0A0A0A]">
        <div className="container-main">
          <AnimatedSection>
            <Link href="/" className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#C4A962] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">Journal</h1>
            <p className="text-[#6B6B6B] dark:text-gray-400 max-w-2xl text-lg">Stories from our journeys, insights on craft, and glimpses into the art of visual storytelling</p>
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

      <section className="sticky top-20 z-30 bg-[#FAF9F7] dark:bg-[#0A0A0A] border-b border-gray-100 dark:border-gray-800 py-4">
        <div className="container-main">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A]" : "bg-gray-100 dark:bg-gray-800 text-[#6B6B6B] dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-main">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <StaggerItem key={post.slug}>
                <Link href={`/journal/${post.slug}`} className="group block">
                  <div className="aspect-[3/2] rounded-lg overflow-hidden mb-4 img-zoom">
                    <div className="w-full h-full bg-[#E8E4DC] dark:bg-gray-800 group-hover:scale-105 transition-transform duration-600" />
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#6B6B6B] dark:text-gray-400 mb-3">
                    <span className="text-[#C4A962] font-medium">{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-serif mb-2 group-hover:text-[#C4A962] transition-colors">{post.title}</h2>
                  <p className="text-[#6B6B6B] dark:text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 text-[#C4A962] text-sm font-medium">Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-[#1A1A1A] text-white">
        <div className="container-main">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-4">Stay Inspired</h2>
            <p className="text-white/60 mb-8">Subscribe to our journal for stories, tips, and destination inspiration.</p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Your email" className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#C4A962]" />
              <button type="submit" className="px-6 py-3 bg-[#C4A962] text-white rounded-full font-medium hover:bg-[#A88B4A] transition-colors">Subscribe</button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
