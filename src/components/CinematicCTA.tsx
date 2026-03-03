'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

export default function CinematicCTA() {
    return (
        <section className="relative w-full py-24 md:py-32 flex items-center justify-center overflow-hidden">
            {/* Full-Bleed Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-dms.png" // Placeholder, should be a wide architectural or landscape shot
                    alt="Luxury Destination"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Dark Heavy Overlay for Legibility */}
                <div className="absolute inset-0 bg-black/60 md:bg-black/70" />
            </div>

            {/* Foreground Content Stack */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-6 w-full">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full flex flex-col items-center"
                >
                    {/* Label */}
                    <p className="section-number text-accent mb-6 uppercase tracking-widest text-sm font-medium">
                        005 / Contact
                    </p>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-6xl font-serif font-light text-white mb-6">
                        Let&apos;s Create Together
                    </h2>

                    {/* Subtext */}
                    <p className="text-white/80 text-lg md:text-xl font-light mb-12 max-w-xl mx-auto leading-relaxed">
                        We partner with discerning hospitality brands to craft immersive visual narratives that captivate and convert.
                    </p>

                    {/* Call to Actions - Stacked on tight mobile, row on tablet+ */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 w-full sm:w-auto">

                        <Link
                            href="/inquiry"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent text-white px-10 py-4 text-sm tracking-widest uppercase font-medium hover:bg-white hover:text-black transition-colors duration-300"
                        >
                            Start a Project
                            <ArrowRight strokeWidth={1.5} size={18} />
                        </Link>

                        <Link
                            href="mailto:hello@dms.studio"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-white/80 px-10 py-4 text-sm tracking-widest uppercase hover:text-white transition-colors duration-300"
                        >
                            hello@dms.studio
                            <Mail strokeWidth={1.5} size={16} />
                        </Link>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
