'use client';

import Link from 'next/link';
import CinematicHero from '@/components/CinematicHero';
import CinematicGallery from '@/components/CinematicGallery';

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
        location="Los Angeles · Worldwide"
        cta={{ label: 'Explore Stories', href: '/stories' }}
      />

      {/* Intro Section */}
      <section className="py-32 md:py-48 bg-[#0A0A0A]">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="golden-split">
            <div>
              <p className="section-number mb-6">001 / About</p>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight mb-8">
                We exist to help the world&apos;s most beautiful places tell their stories.
              </h2>
            </div>
            <div className="text-white/60 font-light leading-relaxed">
              <p className="mb-6">
                Destination Media Services was born from a simple observation: the world&apos;s most breathtaking destinations deserved imagery as stunning as they are.
              </p>
              <p>
                Since 2019, we&apos;ve partnered with luxury hotels, resorts, and destination wedding planners to create visual content that doesn&apos;t just showcase a place—it makes people feel something.
              </p>
              <Link href="/about" className="inline-block mt-8 text-[#C4A962]">
                Our Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <CinematicGallery
        title="Featured Stories"
        subtitle="002 / Portfolio"
        photos={featuredStories}
      />

      {/* Destinations Preview */}
      <section className="py-32 md:py-48 bg-[#0A0A0A]">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="section-number mb-4">003 / Destinations</p>
              <h2 className="text-4xl md:text-6xl font-serif font-light text-white">
                Where We Work
              </h2>
            </div>
            <Link href="/destinations" className="btn-ghost hidden md:inline-flex">
              All Destinations <span className="arrow">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {destinations.map((dest, i) => (
              <Link 
                key={dest.id}
                href={`/destinations/${dest.name.toLowerCase().replace(' ', '-')}`}
                className="photo-card aspect-square relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="text-white/50 text-xs font-light mb-2">{dest.region}</p>
                  <h3 className="font-serif text-xl text-white">{dest.name}</h3>
                  <p className="text-[#C4A962] text-sm mt-2">{dest.count} Stories</p>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/destinations" className="btn-ghost md:hidden mt-8">
            All Destinations <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 md:py-48 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-8">
          <p className="section-number mb-6 text-center">004 / Services</p>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-white text-center mb-16">
            What We Do
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {[
              { title: 'Photography', desc: 'Editorial-quality imagery that captures the essence of your property.' },
              { title: 'Videography', desc: 'Cinematic films that bring your destination&apos;s story to life.' },
              { title: 'Brand Story', desc: 'Cohesive visual narratives that align with your brand.' },
              { title: 'Commercial', desc: 'Elevated imagery for campaigns and digital platforms.' },
            ].map((service, i) => (
              <div key={i} className="bg-[#0A0A0A] p-8 md:p-12 group hover:bg-[#111111] transition-colors">
                <h3 className="font-serif text-2xl text-white mb-4">{service.title}</h3>
                <p className="text-white/50 font-light">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 bg-[#C4A962]">
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <p className="section-number text-white/60 mb-6">005 / Contact</p>
          <h2 className="text-4xl md:text-7xl font-serif font-light text-white mb-8">
            Let&apos;s Create Together
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-12 font-light">
            Ready to tell your story? We&apos;d love to hear from you.
          </p>
          <Link 
            href="/inquiry" 
            className="inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-10 py-4 text-sm tracking-widest uppercase font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors"
          >
            Start a Project
            <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
