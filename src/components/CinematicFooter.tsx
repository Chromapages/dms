'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUp, Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

const footerLinks = {
  explore: [
    { href: '/stories', label: 'Stories' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/services', label: 'Services' },
    { href: '/journal', label: 'Journal' },
  ],
  studio: [
    { href: '/about', label: 'About' },
    { href: '/about', label: 'Process' },
    { href: '/careers', label: 'Careers' },
    { href: '/inquiry', label: 'Contact' },
  ],
  connect: [
    { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
    { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
  ],
};

export default function CinematicFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-bg-elevated text-text-primary pt-24 pb-12 overflow-hidden border-t border-text-primary/5">
      {/* Massive Background Branding */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <h2 className="text-[25vw] font-serif font-black tracking-tighter leading-none">
          DMS
        </h2>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-24 pb-24 border-b border-text-primary/10">
          <div className="max-w-md">
            <h3 className="text-2xl md:text-3xl font-serif mb-4 leading-tight">
              Stay Inspired.
            </h3>
            <p className="text-text-secondary font-light">
              Receive our monthly editorial on travel, design, and cinematic storytelling.
            </p>
          </div>

          <form className="w-full lg:max-w-md">
            <div className="flex items-center border-b border-text-primary/20 focus-within:border-accent transition-colors py-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none outline-none w-full text-lg font-light placeholder:text-text-primary/20"
                required
              />
              <button
                type="submit"
                className="label text-accent hover:text-text-primary transition-colors ml-4 tracking-widest uppercase text-xs font-medium"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-24">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="font-serif text-3xl tracking-wide mb-8 block">
              DMS
            </Link>
            <p className="text-text-secondary font-light max-w-xs leading-relaxed mb-8">
              Crafting cinematic visual stories for the world&apos;s most extraordinary destinations and luxury hospitality brands.
            </p>
            <div className="flex items-center gap-4 text-text-primary/40">
              <span className="text-xs tracking-widest uppercase">Est. 2019</span>
              <span className="w-8 h-px bg-text-primary/10" />
              <span className="text-xs tracking-widest uppercase">Los Angeles</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="label text-accent mb-8 uppercase tracking-widest text-xs font-bold">Explore</p>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <p className="label text-accent mb-8 uppercase tracking-widest text-xs font-bold">Studio</p>
            <ul className="space-y-4">
              {footerLinks.studio.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-2">
            <p className="label text-accent mb-8 uppercase tracking-widest text-xs font-bold">Contact</p>
            <div className="space-y-6">
              <Link
                href="mailto:hello@destinationmediaservices.com"
                className="group block"
              >
                <span className="text-xs text-text-secondary uppercase tracking-widest block mb-1">Inquiries</span>
                <span className="text-lg md:text-xl font-light group-hover:text-accent transition-colors break-all">
                  hello@destinationmediaservices.com
                </span>
              </Link>
              <div className="flex gap-6 pt-2">
                {footerLinks.connect.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon size={20} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-text-primary/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-text-secondary/40 text-sm font-light uppercase tracking-widest">
              © 2026 Destination Media Services
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-text-secondary/40 hover:text-text-primary text-sm font-light transition-colors uppercase tracking-widest">Privacy</Link>
              <Link href="/terms" className="text-text-secondary/40 hover:text-text-primary text-sm font-light transition-colors uppercase tracking-widest">Terms</Link>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-text-secondary/60 hover:text-text-primary transition-colors uppercase tracking-[0.2em] text-xs font-medium"
          >
            Back to Top
            <div className="w-8 h-8 rounded-full border border-text-primary/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
