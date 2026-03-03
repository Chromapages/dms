'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryItem {
    id: string | number;
    title: string;
    slug?: string;
    location: string;
    category: string;
    image: string;
    aspect?: string;
}

interface StoriesGalleryProps {
    stories?: StoryItem[];
}

const defaultStories: StoryItem[] = [
    { id: 1, title: 'Four Seasons Bora Bora', location: 'French Polynesia', category: 'Resorts', image: '/hero-dms.png', aspect: 'landscape' },
    { id: 2, title: 'Aman Tokyo', location: 'Japan', category: 'Hotels', image: '/hero-dms.png', aspect: 'portrait' },
    { id: 3, title: 'Amangiri', location: 'Utah, USA', category: 'Destinations', image: '/hero-dms.png', aspect: 'landscape' },
    { id: 4, title: 'Vogue Escapes', location: 'Editorial', category: 'Editorial', image: '/hero-dms.png', aspect: 'portrait' },
    { id: 5, title: 'Six Senses Douro Valley', location: 'Portugal', category: 'Resorts', image: '/hero-dms.png', aspect: 'square' },
    { id: 6, title: 'The Brando', location: 'Tetiaroa', category: 'Hotels', image: '/hero-dms.png', aspect: 'portrait' },
    { id: 7, title: 'Fogo Island Inn', location: 'Newfoundland', category: 'Destinations', image: '/hero-dms.png', aspect: 'landscape' },
    { id: 8, title: 'Condé Nast Traveler', location: 'Editorial', category: 'Editorial', image: '/hero-dms.png', aspect: 'square' },
    { id: 9, title: 'Cheval Blanc St-Barth', location: 'St. Barts', category: 'Resorts', image: '/hero-dms.png', aspect: 'portrait' },
];

const defaultCategories = ['All', 'Hotels', 'Resorts', 'Destinations', 'Editorial'];

// Helper to determine tailwind aspect ratio classes based on the 'aspect' field
const getAspectClass = (aspect: string) => {
    switch (aspect) {
        case 'portrait': return 'aspect-[3/4]';
        case 'landscape': return 'aspect-[16/9]';
        case 'square': return 'aspect-square';
        default: return 'aspect-[4/5]';
    }
};

const aspectRotation = ['landscape', 'portrait', 'landscape', 'portrait', 'square', 'portrait', 'landscape', 'square', 'portrait'];

export default function StoriesGallery({ stories }: StoriesGalleryProps) {
    const storiesData = stories?.length ? stories.map((s, i) => ({
        ...s,
        aspect: s.aspect || aspectRotation[i % aspectRotation.length],
    })) : defaultStories;

    const categories = stories?.length
        ? ['All', ...Array.from(new Set(storiesData.map(s => s.category)))]
        : defaultCategories;

    const [activeCategory, setActiveCategory] = useState('All');

    const filteredStories = activeCategory === 'All'
        ? storiesData
        : storiesData.filter(s => s.category === activeCategory);

    return (
        <div className="w-full">
            {/* Sticky Filter Nav */}
            <div className="sticky top-[80px] z-40 bg-[var(--bg)] border-b border-text-primary/10 py-4 mb-12 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto px-6">
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

            {/* Masonry Grid Area */}
            <div className="max-w-[1440px] mx-auto px-6 pb-32">
                <motion.div
                    layout
                    className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredStories.map((story) => (
                            <motion.div
                                key={story.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="break-inside-avoid relative group overflow-hidden bg-bg-elevated block"
                            >
                                <Link href={`/stories/${story.slug || story.id}`} className="block w-full h-full">
                                    <div className={`relative w-full ${getAspectClass(story.aspect || 'portrait')}`}>
                                        <Image
                                            src={story.image}
                                            alt={story.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />

                                        {/* Dark gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Hover Content */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                            <p className="text-[#C4A962] text-xs tracking-widest uppercase mb-2">
                                                {story.location}
                                            </p>
                                            <h3 className="text-white text-2xl md:text-3xl font-serif font-light">
                                                {story.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredStories.length === 0 && (
                    <div className="text-center py-32 text-text-secondary font-light">
                        No stories found for this category.
                    </div>
                )}
            </div>
        </div>
    );
}
