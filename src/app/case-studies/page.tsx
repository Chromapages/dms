"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star, Shield, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";

const caseStudies = [
  { id: "four-seasons-bora-bora", client: "Four Seasons Bora Bora", type: "Hotel Branding", description: "Complete visual transformation for the iconic Polynesian resort", results: [{ value: "47%", label: "Booking Increase" }, { value: "2.3M", label: "Social Impressions" }, { value: "15", label: "New Campaigns" }] },
  { id: "tuscan-villa-wedding", client: "Villa Cetinale", type: "Wedding Editorial", description: "Luxury wedding campaign for historic Tuscan estate", results: [{ value: "32", label: "Inquiries" }, { value: "89%", label: "Conversion" }, { value: "6", label: "Features" }] },
  { id: "aman-brand-campaign", client: "Aman Resorts", type: "Brand Campaign", description: "Global brand refresh across 35 properties", results: [{ value: "40%", label: "Engagement" }, { value: "3x", label: "ROI" }, { value: "12", label: "Month Project" }] },
  { id: "ritz-paris-launch", client: "Ritz Paris", type: "Product Launch", description: "New suite collection launch photography", results: [{ value: "1.8M", label: "Reach" }, { value: "62%", label: "Share Rate" }, { value: "8", label: "Awards" }] },
];

const trustBadges = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Users, label: "98% Retention" },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</motion.div>;
}

export default function CaseStudies() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[#FAF9F7] dark:bg-[#0A0A0A]">
        <div className="container-main">
          <AnimatedSection>
            <Link href="/" className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#C4A962] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">Case Studies</h1>
            <p className="text-[#6B6B6B] dark:text-gray-400 max-w-2xl text-lg">Real results from real projects</p>
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
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <StaggerItem key={study.id}>
                <Link href={`/case-studies/${study.id}`} className="group block bg-white dark:bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all card-lift">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <div className="absolute inset-0 bg-[#E8E4DC] dark:bg-gray-800 group-hover:scale-105 transition-transform duration-600" />
                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">{study.type}</div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif mb-2 group-hover:text-[#C4A962] transition-colors">{study.client}</h3>
                    <p className="text-[#6B6B6B] dark:text-gray-400 mb-6">{study.description}</p>
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                      {study.results.map((result, i) => (
                        <div key={i} className="text-center">
                          <p className="text-2xl font-serif text-[#C4A962]">{result.value}</p>
                          <p className="text-xs text-[#6B6B6B] dark:text-gray-500">{result.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-[#C4A962] font-medium">
                      View Full Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-[#C4A962]">
        <div className="container-main">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Your Success Story Starts Here</h2>
            <p className="text-white/80 mb-8">Let&apos;s create results like these for your brand.</p>
            <Link href="/inquiry" className="inline-flex bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors">
              Start Your Project
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
