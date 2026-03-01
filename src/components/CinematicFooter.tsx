import Link from 'next/link';

const footerLinks = {
  explore: [
    { href: '/stories', label: 'Stories' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/services', label: 'Services' },
    { href: '/journal', label: 'Journal' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/about', label: 'Process' },
    { href: '/inquiry', label: 'Contact' },
  ],
  social: [
    { href: '#', label: 'Instagram' },
    { href: '#', label: 'LinkedIn' },
    { href: '#', label: 'Pinterest' },
  ],
};

export default function CinematicFooter() {
  return (
    <footer className="bg-[#0A0A0A] text-white py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-2xl tracking-wide mb-6 block">
              DMS
            </Link>
            <p className="text-white/50 font-light max-w-sm leading-relaxed mb-8">
              Crafting cinematic visual stories for the world&apos;s most extraordinary destinations and luxury hospitality brands.
            </p>
            <p className="label text-white/30">EST. 2019</p>
          </div>

          {/* Explore */}
          <div>
            <p className="label text-[#C4A962] mb-6">Explore</p>
            <div className="space-y-4">
              {footerLinks.explore.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-white/60 hover:text-white transition-colors font-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="label text-[#C4A962] mb-6">Company</p>
            <div className="space-y-4">
              {footerLinks.company.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-white/60 hover:text-white transition-colors font-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="label text-[#C4A962] mb-6">Contact</p>
            <div className="space-y-4 text-white/60 font-light">
              <p>hello@destinationmediaservices.com</p>
              <p>+1 (310) 555-0192</p>
              <p>Los Angeles, California</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm font-light">
            © 2026 Destination Media Services. All rights reserved.
          </p>
          <div className="flex gap-8">
            {footerLinks.social.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="label text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
