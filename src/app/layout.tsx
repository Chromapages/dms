import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import CinematicNav from "@/components/CinematicNav";
import CinematicFooter from "@/components/CinematicFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "DMS | Cinematic Travel Photography",
  description: "Award-winning visual storytelling for luxury hotels, resorts, destination weddings, and travel brands worldwide.",
  keywords: ["luxury photography", "destination wedding", "hotel photography", "travel photography", "resort photography"],
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
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <CinematicNav />
        <main>{children}</main>
        <CinematicFooter />
      </body>
    </html>
  );
}
