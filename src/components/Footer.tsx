import Link from "next/link";

const footerLinks = {
  explore: [
    { href: "/gallery", label: "Gallery" },
    { href: "/services", label: "Services" },
    { href: "/destinations", label: "Destinations" },
    { href: "/case-studies", label: "Case Studies" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/journal", label: "Journal" },
    { href: "/inquiry", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-20">
      <div className="container-main">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">
              Destination<span className="text-[#C4A962]">Media</span>Services
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Award-winning visual storytelling for luxury hotels, resorts, destination weddings, and travel brands worldwide.
            </p>
            <div className="flex gap-4">
              {/* Social icons would go here */}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              {footerLinks.explore.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              {footerLinks.company.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">Get in Touch</h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p>hello@destinationmediaservices.com</p>
              <p>+1 (310) 555-0192</p>
              <p>Los Angeles, California</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Destination Media Services. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
