import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import LayoutChrome from "@/components/LayoutChrome";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://destinationmedia.services');

export const metadata: Metadata = {
  metadataBase,
  title: "DMS | Cinematic Travel Photography",
  description: "Award-winning visual storytelling for luxury hotels, resorts, destination weddings, and travel brands worldwide.",
  keywords: ["luxury photography", "destination wedding", "hotel photography", "travel photography", "resort photography"],
  openGraph: {
    type: 'website',
    url: metadataBase.toString(),
    siteName: 'Destination Media Services',
    title: "DMS | Cinematic Travel Photography",
    description: "Award-winning visual storytelling for luxury hotels, resorts, destination weddings, and travel brands worldwide.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Destination Media Services - Cinematic Travel Photography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@destinationmedia',
    title: "DMS | Cinematic Travel Photography",
    description: "Award-winning visual storytelling for luxury hotels, resorts, destination weddings, and travel brands worldwide.",
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Destination Media Services',
    description: 'Award-winning visual storytelling for luxury hotels, resorts, destination weddings, and travel brands worldwide.',
    url: metadataBase.toString(),
    image: '/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
    },
    sameAs: [
      'https://instagram.com/destinationmedia',
      'https://twitter.com/destinationmedia',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} bg-bg text-text-primary transition-colors duration-300`}>
        <ThemeProvider>
          <LayoutChrome>
            <main>{children}</main>
          </LayoutChrome>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
