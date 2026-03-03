'use client';

import Link from 'next/link';
import CinematicHero from '@/components/CinematicHero';
import CinematicIntro from '@/components/CinematicIntro';
import CinematicGallery from '@/components/CinematicGallery';
import DestinationMarquee from '@/components/DestinationMarquee';
import CinematicServices from '@/components/CinematicServices';
import CinematicCTA from '@/components/CinematicCTA';

const featuredStories = [
  { id: 1, title: 'Four Seasons Bora Bora', location: 'French Polynesia', category: 'Hotel', image: '/hero-dms.png', href: '/stories/four-seasons-bora-bora' },
  { id: 2, title: 'Tuscan Villa Wedding', location: 'Tuscany, Italy', category: 'Wedding', image: '/hero-dms.png', href: '/stories/tuscan-villa' },
  { id: 3, title: 'Aman Tokyo', location: 'Tokyo, Japan', category: 'Hotel', image: '/hero-dms.png', href: '/stories/aman-tokyo' },
  { id: 4, title: 'Santorini Elopement', location: 'Santorini, Greece', category: 'Wedding', image: '/hero-dms.png', href: '/stories/santorini-elopement' },
  { id: 5, title: 'The Ritz Paris', location: 'Paris, France', category: 'Editorial', image: '/hero-dms.png', href: '/stories/ritz-paris' },
  { id: 6, title: 'Bali Retreat', location: 'Bali, Indonesia', category: 'Resort', image: '/hero-dms.png', href: '/stories/bali-retreat' },
];

const destinations = [
  { id: 1, name: 'Bora Bora', region: 'French Polynesia', count: 24 },
  { id: 2, name: 'Tuscany', region: 'Italy', count: 18 },
  { id: 3, name: 'Santorini', region: 'Greece', count: 15 },
  { id: 4, name: 'Bali', region: 'Indonesia', count: 21 },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <CinematicHero
        title="Where Every Destination Tells a Story"
        subtitle="We craft cinematic visual narratives for the world's most extraordinary places and the people who call them home."
        slides={[
          {
            image: '/hero-dms.png',
            location: 'Los Angeles · Worldwide',
            category: 'Editorial'
          },
          {
            image: '/hero-dms.png',
            location: 'French Polynesia',
            category: 'Resort'
          },
          {
            image: '/hero-dms.png',
            location: 'Tuscany, Italy',
            category: 'Wedding'
          }
        ]}
        cta={{
          primary: { label: 'Explore Stories', href: '/stories' },
          secondary: { label: 'Start a Project', href: '/inquiry' }
        }}
        stats={[
          { label: 'Hotels', value: '50+' },
          { label: 'Destinations', value: '24' },
          { label: 'Projects', value: '200+' }
        ]}
      />

      {/* Intro Section */}
      <CinematicIntro />

      {/* Featured Stories */}
      <CinematicGallery
        title="Featured Stories"
        subtitle="002 / Portfolio"
        photos={featuredStories}
      />

      {/* Destinations Preview */}
      <DestinationMarquee
        title="Where We Work"
        subtitle="003 / Destinations"
        destinations={destinations}
      />

      {/* Services */}
      <CinematicServices />

      {/* CTA */}
      <CinematicCTA />
    </>
  );
}
