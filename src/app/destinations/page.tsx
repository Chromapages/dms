import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import DestinationsGrid from '@/components/DestinationsGrid';
import type { DestinationItem } from '@/components/DestinationsGrid';
import { getDestinations } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Destinations | DMS',
  description: 'From secluded island resorts to alpine retreats — we\'ve captured the world\'s most extraordinary places.',
};

const aspectRotation = ['portrait', 'landscape', 'square', 'portrait', 'landscape', 'square', 'portrait', 'landscape'];

const fallbackDestinations: DestinationItem[] = [
  { id: 1, name: 'Bora Bora', region: 'French Polynesia', projects: 24, description: 'Where emerald lagoons meet an endless Pacific horizon.', image: '/hero-dms.png', aspect: 'portrait' },
  { id: 2, name: 'Tuscany', region: 'Italy', projects: 18, description: 'Rolling hills, golden light, and timeless romance.', image: '/hero-dms.png', aspect: 'landscape' },
  { id: 3, name: 'Santorini', region: 'Greece', projects: 15, description: 'White-washed villages perched above the caldera.', image: '/hero-dms.png', aspect: 'square' },
  { id: 4, name: 'Bali', region: 'Indonesia', projects: 21, description: 'Spiritual tranquility woven into verdant landscapes.', image: '/hero-dms.png', aspect: 'portrait' },
  { id: 5, name: 'Amalfi Coast', region: 'Italy', projects: 12, description: 'Dramatic cliffs cascading into azure seas.', image: '/hero-dms.png', aspect: 'landscape' },
  { id: 6, name: 'Maldives', region: 'Maldives', projects: 19, description: 'Crystal-clear waters and overwater bliss.', image: '/hero-dms.png', aspect: 'square' },
  { id: 7, name: 'Japan', region: 'Asia', projects: 14, description: 'Ancient traditions meeting modern elegance.', image: '/hero-dms.png', aspect: 'portrait' },
  { id: 8, name: 'The Swiss Alps', region: 'Switzerland', projects: 9, description: 'Majestic peaks and pristine snowscapes.', image: '/hero-dms.png', aspect: 'landscape' },
];

const defaultRegions = ['All', 'Europe', 'Asia', 'Pacific', 'Indian Ocean'];

export default async function DestinationsPage() {
  const rawDestinations = await getDestinations().catch(() => []);

  const destinations: DestinationItem[] = rawDestinations?.length
    ? rawDestinations.map((d: { _id: string; name: string; slug: string; region: string; description: string; projectCount: number; image: string }, i: number) => ({
        id: d._id,
        name: d.name,
        slug: d.slug,
        region: d.region || '',
        projects: d.projectCount || 0,
        description: d.description || '',
        image: d.image || '/hero-dms.png',
        aspect: aspectRotation[i % aspectRotation.length],
      }))
    : fallbackDestinations;

  const regions = rawDestinations?.length
    ? ['All', ...Array.from(new Set(destinations.map(d => d.region).filter(Boolean)))]
    : defaultRegions;

  return (
    <div className="min-h-screen bg-bg pt-32 selection:bg-accent/30">

      {/* Page Header */}
      <header className="max-w-[1440px] mx-auto px-6 pt-16 pb-12 md:pb-24">
        <p className="section-number text-accent mb-6 uppercase tracking-widest text-sm font-medium">
          Where We Work
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-text-primary tracking-tight">
            Destinations
          </h1>
          <p className="text-text-secondary font-light text-lg max-w-md leading-relaxed md:pb-2">
            From secluded island resorts to alpine retreats — we&apos;ve captured
            the world&apos;s most extraordinary places.
          </p>
        </div>
      </header>

      <DestinationsGrid destinations={destinations} regions={regions} />

      {/* Closing CTA Strip */}
      <div className="bg-bg-elevated border-t border-text-primary/10 py-24">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="section-number text-accent mb-4 uppercase tracking-widest text-xs font-medium">
              Global Reach
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-text-primary">
              Have destination, will travel.
            </h2>
            <p className="text-text-secondary font-light mt-4 max-w-md leading-relaxed">
              Whether it&apos;s on this list or somewhere entirely new, we&apos;d
              love to capture your story.
            </p>
          </div>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-3 bg-accent text-white px-10 py-4 text-sm tracking-widest uppercase font-medium hover:bg-text-primary transition-colors duration-300 whitespace-nowrap"
          >
            Start a Project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

    </div>
  );
}
