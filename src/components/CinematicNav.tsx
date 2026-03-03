'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

const navItems = [
  { href: '/stories', label: 'Stories' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/journal', label: 'Journal' },
];

export default function CinematicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'frosted py-4' : 'py-8'}`}
    >
      <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 group">
          <span className="font-serif text-sm tracking-widest transition-colors text-text-primary group-hover:text-accent">
            Destination Media Services
          </span>
        </Link>

        {/* Nav Actions */}
        <div className="flex items-center gap-4 lg:gap-12">
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label text-text-primary hover:text-accent transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link href="/inquiry" className="btn-ghost border-text-primary/30 hover:border-accent">
              Contact
            </Link>
          </div>

          {/* Theme Toggle — Visible on all screens */}
          <div className="relative z-50">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
