'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CinematicIntro() {
    return (
        <section className="py-16 md:py-32 bg-bg overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="md:col-span-5 relative group"
                    >
                        <div className="aspect-[4/5] relative overflow-hidden rounded-sm">
                            <Image
                                src="/hero-dms.png"
                                alt="Cinematic luxury photography detail"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                        </div>
                        {/* Minimal accent element */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-[#C4A962]/30 hidden md:block" />
                    </motion.div>

                    {/* Text Column */}
                    <div className="md:col-span-7 flex flex-col items-start">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-number mb-6"
                        >
                            001 / About
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-text-primary leading-[1.1] mb-8"
                        >
                            We help the world&apos;s most beautiful places tell their stories.
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-text-secondary font-light leading-relaxed text-lg max-w-xl"
                        >
                            <p className="mb-8">
                                Since 2019, Destination Media Services has partnered with luxury hotels, resorts, and destination wedding planners to create visual content that doesn&apos;t just showcase a place—it makes people feel something. Our imagery is born from a simple observation: breathtaking destinations deserve visual narratives as stunning as they are.
                            </p>

                            <Link href="/about" className="group inline-flex items-center gap-3 text-[#C4A962] tracking-widest text-sm uppercase transition-all">
                                Discover Our Story
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
