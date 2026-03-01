'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/stories', label: 'Stories' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/journal', label: 'Journal' },
];

export default function CinematicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Fixed Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'frosted py-4' : 'py-8'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className={`font-serif text-xl tracking-wide transition-colors ${
              scrolled || menuOpen ? 'text-white' : 'text-white'
            }`}>
              DMS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C4A962] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link href="/inquiry" className="btn-ghost">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          >
            <span className={`w-6 h-px bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-px bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="menu-overlay active"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-4xl md:text-6xl font-light hover:text-[#C4A962] transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link 
                  href="/inquiry"
                  onClick={() => setMenuOpen(false)}
                  className="label mt-8 hover:text-[#C4A962] transition-colors"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 label"
            >
              Close
            </button>

            {/* Menu Background */}
            <div className="absolute inset-0 -z-10 bg-[#0A0A0A]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
