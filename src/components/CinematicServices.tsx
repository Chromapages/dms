'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus } from 'lucide-react';

interface Service {
    id: string;
    number: string;
    title: string;
    shortDesc: string;
    fullDesc: string;
    image: string;
    href: string;
}

const servicesData: Service[] = [
    {
        id: 'photography',
        number: '01',
        title: 'Photography',
        shortDesc: 'Editorial-quality imagery',
        fullDesc: 'We create breathtaking editorial imagery that captures the essence of your property. From sweeping architectural wide shots to the intimate details of your culinary offerings, every frame is meticulously styled, lit, and color-graded to transport viewers immediately to your destination.',
        image: '/hero-dms.png', // Fallback, would normally be specific images
        href: '/services/photography'
    },
    {
        id: 'videography',
        number: '02',
        title: 'Videography',
        shortDesc: 'Cinematic destination films',
        fullDesc: 'Movement breathes life into a space. Our cinematic films go beyond simple walk-throughs; we craft compelling visual narratives with dynamic pacing, bespoke sound design, and emotive storytelling that make your audience feel the warmth of the sun and the breeze off the ocean.',
        image: '/hero-dms.png',
        href: '/services/videography'
    },
    {
        id: 'brand-story',
        number: '03',
        title: 'Brand Story',
        shortDesc: 'Cohesive visual narratives',
        fullDesc: 'A beautiful image is meaningless without context. We help luxury properties define their unique visual DNA. Through comprehensive art direction and campaign planning, we ensure every piece of content—across social, print, and web—speaks with one unmistakable, premium voice.',
        image: '/hero-dms.png',
        href: '/services/brand-story'
    },
    {
        id: 'commercial',
        number: '04',
        title: 'Commercial',
        shortDesc: 'Elevated campaign imagery',
        fullDesc: 'Designed to convert without compromising on aesthetics. Our commercial production team scales to handle complex, multi-day shoots incorporating talent, styling, and robust lighting setups required for high-stakes digital ad campaigns, print publications, and OOH media.',
        image: '/hero-dms.png',
        href: '/services/commercial'
    }
];

export default function CinematicServices() {
    const [expandedId, setExpandedId] = useState<string>(servicesData[0].id);

    const toggleService = (id: string) => {
        setExpandedId(prev => (prev === id ? '' : id));
    };

    return (
        <section className="py-16 md:py-24 bg-bg">
            <div className="max-w-[1440px] mx-auto px-6 md:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
                    <div>
                        <p className="section-number mb-4 text-accent">004 / Services</p>
                        <h2 className="text-4xl md:text-6xl font-serif font-light text-text-primary">
                            What We Do
                        </h2>
                    </div>
                    <Link href="/services" className="btn-ghost hidden md:inline-flex">
                        All Services <span className="arrow">→</span>
                    </Link>
                </div>

                {/* Vertical Accordion */}
                <div className="border-t border-text-primary/10">
                    {servicesData.map((service) => {
                        const isExpanded = expandedId === service.id;

                        return (
                            <div
                                key={service.id}
                                className="border-b border-text-primary/10 group"
                            >
                                {/* Accordion Header (Clickable) */}
                                <button
                                    onClick={() => toggleService(service.id)}
                                    className="w-full py-8 md:py-10 flex items-center justify-between text-left focus:outline-none"
                                    aria-expanded={isExpanded}
                                >
                                    <div className="flex items-center gap-6 md:gap-16 w-full">
                                        {/* Number */}
                                        <span className={`text-3xl md:text-5xl font-serif font-light transition-colors duration-300 ${isExpanded ? 'text-accent' : 'text-text-primary/30 group-hover:text-text-primary/60'
                                            }`}>
                                            {service.number}
                                        </span>

                                        {/* Title & Short Desc */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between flex-grow gap-2 md:gap-8">
                                            <h3 className={`text-3xl md:text-5xl font-serif font-light transition-colors duration-300 ${isExpanded ? 'text-text-primary' : 'text-text-primary group-hover:text-accent'
                                                }`}>
                                                {service.title}
                                            </h3>
                                            <span className="text-text-secondary font-light hidden md:block">
                                                {service.shortDesc}
                                            </span>
                                        </div>
                                    </div>

                                    {/* +/- Icon */}
                                    <div className={`ml-8 flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${isExpanded
                                            ? 'border-accent text-accent'
                                            : 'border-text-primary/10 text-text-primary/40 group-hover:border-accent group-hover:text-accent'
                                        }`}>
                                        {isExpanded ? <Minus strokeWidth={1} size={20} /> : <Plus strokeWidth={1} size={20} />}
                                    </div>
                                </button>

                                {/* Accordion Content Panel */}
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-12 md:pb-16 pt-4 md:pl-28">
                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">

                                                    {/* Left: Image Preview */}
                                                    <div className="md:col-span-5 relative aspect-[16/9] w-full overflow-hidden rounded-sm">
                                                        <Image
                                                            src={service.image}
                                                            alt={service.title}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, 40vw"
                                                        />
                                                        {/* Subtle dark overlay for consistency */}
                                                        <div className="absolute inset-0 bg-black/10" />
                                                    </div>

                                                    {/* Right: Description & CTA */}
                                                    <div className="md:col-span-7 pr-4 md:pr-16">
                                                        <p className="text-text-secondary font-light text-lg md:text-xl leading-relaxed mb-8">
                                                            {service.fullDesc}
                                                        </p>
                                                        <Link
                                                            href={service.href}
                                                            className="group/link inline-flex items-center gap-3 text-accent tracking-widest text-sm uppercase font-medium"
                                                        >
                                                            Explore {service.title}
                                                            <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-2" />
                                                        </Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile CTA */}
                <div className="mt-12 text-center md:hidden">
                    <Link href="/services" className="btn-ghost">
                        All Services <span className="arrow">→</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}
