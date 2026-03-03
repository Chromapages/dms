"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Eye, Download, Share2, ArrowRight, Star, Shield, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FadeIn } from "@/components/Animations";

const galleries = [
  { id: "smith-wedding", name: "Sarah & Michael", event: "Amalfi Wedding", date: "December 2025", count: 245 },
  { id: "ritz-paris", name: "Ritz Paris", event: "Brand Campaign", date: "November 2025", count: 89 },
  { id: "fs-bora-bora", name: "Four Seasons Bora Bora", event: "Property Shoot", date: "October 2025", count: 156 },
];

const trustBadges = [
  { icon: Shield, label: "Secure Galleries" },
  { icon: Star, label: "High-Res Downloads" },
  { icon: Users, label: "Private Access" },
];

const CORRECT_CODE = "DMS2026";

function AnimatedSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ClientGalleries() {
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.toUpperCase() === CORRECT_CODE) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid access code. Please check your email for the correct code.");
    }
  };

  return (
    <>
      <section className="pt-32 pb-16 bg-[#FAF9F7] dark:bg-[#0A0A0A]">
        <div className="container-main">
          <AnimatedSection>
            <Link href="/" className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#C4A962] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">Client Galleries</h1>
            <p className="text-[#6B6B6B] dark:text-gray-400 max-w-2xl text-lg">
              Private galleries for our clients to view and download their high-resolution images
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8 bg-white dark:bg-[#1A1A1A] border-b border-gray-100 dark:border-gray-800">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-8">
            {trustBadges.map((badge, index) => (
              <div key={badge.label} className="flex items-center gap-2 text-[#6B6B6B] dark:text-gray-400">
                <badge.icon className="w-5 h-5 text-[#C4A962]" />
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-main">
          {!isAuthenticated ? (
            <AnimatedSection className="max-w-md mx-auto">
              <div className="bg-white dark:bg-[#1A1A1A] p-8 md:p-12 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                <Lock className="w-12 h-12 text-[#C4A962] mx-auto mb-6" />
                <h2 className="text-2xl font-serif mb-2">Access Your Gallery</h2>
                <p className="text-[#6B6B6B] dark:text-gray-400 mb-8 text-sm">
                  Enter your gallery access code to view your images. Check your email for the unique link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    placeholder="Enter access code"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-[#FAF9F7] dark:bg-[#242424] text-center text-lg tracking-widest uppercase focus:outline-none focus:border-[#C4A962]"
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" className="w-full btn-primary">View Gallery</button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-[#6B6B6B] dark:text-gray-400 text-sm">
                    Haven&apos;t received your gallery?
                  </p>
                  <Link href="/inquiry" className="text-[#C4A962] hover:underline inline-flex items-center gap-1 mt-2">
                    Contact us to request access <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif">Your Galleries</h2>
                <button onClick={() => setIsAuthenticated(false)} className="text-[#6B6B6B] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white text-sm">Sign out</button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleries.map((gallery) => (
                  <AnimatedSection key={gallery.id}>
                    <div className="bg-white dark:bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                      <div className="aspect-[4/3] relative cursor-pointer group" onClick={() => setSelectedGallery(gallery.id)}>
                        <div className="absolute inset-0 bg-[#E8E4DC] dark:bg-gray-800" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                          <Eye className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">{gallery.count} photos</div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-serif mb-1">{gallery.name}</h3>
                        <p className="text-[#6B6B6B] dark:text-gray-400 text-sm mb-4">{gallery.event} • {gallery.date}</p>
                        <div className="flex gap-3">
                          <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:border-[#C4A962] transition-colors">
                            <Download className="w-4 h-4" /> Download
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:border-[#C4A962] transition-colors">
                            <Share2 className="w-4 h-4" /> Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {selectedGallery && (
                <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto">
                  <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-serif text-white">{galleries.find(g => g.id === selectedGallery)?.name}</h2>
                        <p className="text-white/60">{galleries.find(g => g.id === selectedGallery)?.count} photos</p>
                      </div>
                      <button onClick={() => setSelectedGallery(null)} className="text-white/70 hover:text-white text-lg">Close</button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {Array.from({ length: galleries.find(g => g.id === selectedGallery)?.count || 12 }).map((_, i) => (
                        <div key={i} className="aspect-square bg-stone-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-stone-700 transition-colors">
                          <span className="text-stone-500">Photo {i + 1}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 text-center">
                      <button className="bg-[#C4A962] text-white px-8 py-3 rounded-full font-medium hover:bg-[#A88B4A] transition-colors">Download All Photos</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#1A1A1A]">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: "View", desc: "Browse your curated collection online" },
              { title: "Download", desc: "High-res downloads with print release" },
              { title: "Share", desc: "Share with family and friends" },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="p-6">
                  <p className="text-[#C4A962] font-medium mb-2">Step {i + 1}</p>
                  <h3 className="text-xl font-serif mb-1">{step.title}</h3>
                  <p className="text-[#6B6B6B] dark:text-gray-400 text-sm">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
