'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface JournalPost {
  id: string | number;
  slug: string;
  title: string;
  category: string;
  date: string;
  aspect: string;
  image: string;
}

interface JournalGridProps {
  posts: JournalPost[];
  categories: string[];
}

const getAspectClass = (aspect: string) => {
  switch (aspect) {
    case 'portrait': return 'aspect-[3/4]';
    case 'landscape': return 'aspect-[16/9]';
    default: return 'aspect-square';
  }
};

export default function JournalGrid({ posts, categories }: JournalGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter(post => post.category === activeCategory);

  return (
    <>
      {/* Sticky Filter Nav */}
      <div className="sticky top-[80px] z-40 bg-[var(--bg)] border-b border-text-primary/10 py-4 mb-12 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8">
          <ul className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm tracking-widest uppercase pb-1 border-b-2 transition-colors whitespace-nowrap ${activeCategory === cat
                      ? 'border-accent text-text-primary font-medium'
                      : 'border-transparent text-text-secondary hover:text-text-primary font-light'
                    }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1440px] mx-auto px-8 pb-32">
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="break-inside-avoid"
              >
                <Link
                  href={`/journal/${post.slug}`}
                  className="group block relative overflow-hidden bg-bg-elevated"
                >
                  <div className={`relative w-full ${getAspectClass(post.aspect)}`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-3 text-[#C4A962] text-[10px] tracking-[0.2em] uppercase font-bold mb-3">
                          <span>{post.category}</span>
                          <span className="w-4 h-px bg-[#C4A962]/30" />
                          <span className="text-white/60">{post.date}</span>
                        </div>
                        <h3 className="text-white text-2xl md:text-3xl font-serif font-light mb-6 leading-tight">
                          {post.title}
                        </h3>
                        <div className="flex items-center justify-between pointer-events-none">
                          <span className="text-white/0 group-hover:text-white/60 text-[10px] tracking-widest uppercase transition-colors duration-500">
                            Read Story
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

        {filteredPosts.length === 0 && (
          <div className="text-center py-32 text-text-secondary font-light uppercase tracking-widest text-sm">
            No entries found in this category.
          </div>
        )}
      </div>
    </>
  );
}
