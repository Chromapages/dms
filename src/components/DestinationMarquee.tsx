'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Destination {
    id: string | number;
    name: string;
    region: string;
    count: number | string;
}

interface DestinationMarqueeProps {
    destinations: Destination[];
    title?: string;
    subtitle?: string;
}

export default function DestinationMarquee({
    destinations,
    title,
    subtitle
}: DestinationMarqueeProps) {
    // Triple the items to ensure the marquee behaves correctly on large screens
    const marqueeItems = [...destinations, ...destinations, ...destinations];

    return (
        <section className="py-16 md:py-24 bg-bg overflow-hidden">
            {/* Section Header */}
            <div className="max-w-[1440px] mx-auto px-8 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        {subtitle && <p className="section-number mb-4 text-accent">{subtitle}</p>}
                        {title && <h2 className="text-4xl md:text-6xl font-serif font-light text-text-primary">{title}</h2>}
                    </div>
                    <Link href="/destinations" className="btn-ghost">
                        All Destinations <span className="arrow">→</span>
                    </Link>
                </div>
            </div>

            {/* Infinite Marquee Container */}
            <div className="mt-8 relative group">
                <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap gap-4 px-2">
                    {marqueeItems.map((dest, index) => (
                        <Link
                            key={`${dest.id}-${index}`}
                            href={`/destinations/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="flex-none w-[300px] md:w-[450px] aspect-[16/10] relative group/card rounded-sm overflow-hidden"
                        >
                            {/* Image Placeholder with Gradient */}
                            <div className="absolute inset-0 bg-bg-elevated">
                                <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated to-charcoal/30 flex items-center justify-center">
                                    <span className="text-text-muted font-serif italic text-lg opacity-20">{dest.name} View</span>
                                </div>
                            </div>

                            {/* In the future, this would be a real Image component:
              <Image 
                src={dest.image} 
                alt={dest.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
              /> 
              */}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute inset-0 flex flex-col justify-end p-8 transition-transform duration-500 group-hover/card:-translate-y-2">
                                <p className="text-white/60 text-xs font-light uppercase tracking-widest mb-2">
                                    {dest.region}
                                </p>
                                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
                                    {dest.name}
                                </h3>
                                <div className="overflow-hidden h-0 group-hover/card:h-6 transition-all duration-500 opacity-0 group-hover/card:opacity-100">
                                    <p className="text-accent text-sm tracking-widest uppercase">
                                        {dest.count} Stories →
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
