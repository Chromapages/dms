"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Award, Globe, Heart, Star, Shield, Users, Mail, Phone, MapPin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";

const awards = [
  { name: "Condé Nast Traveler", year: "2025" },
  { name: "Vogue Italia", year: "2025" },
  { name: "Travel + Leisure", year: "2024" },
  { name: "World Travel Awards", year: "2024" },
];

const values = [
  { icon: Heart, title: "Authentic Connection", description: "We believe the most powerful imagery comes from genuine moments. We don't just capture places—we capture feelings." },
  { icon: Globe, title: "Global Perspective", description: "With experience across 40+ countries, we understand diverse cultures and know how to tell stories that resonate worldwide." },
  { icon: Award, title: "Uncompromising Quality", description: "Every image we deliver meets the highest standards. We're detail-obsessed because we know your reputation depends on it." },
];

const stats = [
  { value: "150+", label: "Projects Worldwide" },
  { value: "40+", label: "Countries" },
  { value: "25", label: "Industry Awards" },
  { value: "98%", label: "Client Retention" },
];

const trustBadges = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Users, label: "Trusted by 500+" },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>{children}</motion.div>;
}

export default function About() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[#FAF9F7] dark:bg-[#0A0A0A]">
        <div className="container-main">
          <AnimatedSection>
            <Link href="/" className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#C4A962] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">About Us</h1>
            <p className="text-[#6B6B6B] dark:text-gray-400 max-w-2xl text-lg">We exist to help the world&apos;s most beautiful places tell their stories</p>
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="aspect-square rounded-lg overflow-hidden img-zoom">
                <div className="w-full h-full bg-[#E8E4DC] dark:bg-gray-800" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="text-4xl font-serif mb-6">The DMS Story</h2>
              <div className="space-y-4 text-[#6B6B6B] dark:text-gray-400 leading-relaxed">
                <p>Destination Media Services was born from a simple observation: the world&apos;s most breathtaking destinations deserved imagery as stunning as they are.</p>
                <p>Founded in 2018, we started with a small team of photographers who shared a passion for travel and an obsession with visual excellence. Since then, we&apos;ve grown into a full-service visual storytelling agency.</p>
                <p>But our mission remains unchanged: to create imagery that doesn&apos;t just showcase a destination—it makes people feel something.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#1A1A1A]">
        <div className="container-main">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Values</h2>
            <p className="text-[#6B6B6B] dark:text-gray-400 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <StaggerItem key={index}>
                <div className="p-8 rounded-xl bg-[#FAF9F7] dark:bg-[#242424] h-full">
                  <value.icon className="w-10 h-10 text-[#C4A962] mb-4" />
                  <h3 className="text-xl font-serif mb-3">{value.title}</h3>
                  <p className="text-[#6B6B6B] dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-[#1A1A1A] text-white">
        <div className="container-main">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <StaggerItem key={stat.label}>
                <p className="text-5xl md:text-6xl font-serif text-[#C4A962] mb-2">{stat.value}</p>
                <p className="text-white/60">{stat.label}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24">
        <div className="container-main">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Recognition</h2>
            <p className="text-[#6B6B6B] dark:text-gray-400">Featured in leading publications</p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {awards.map((award, index) => (
              <div key={index} className="text-center">
                <p className="font-serif text-xl">{award.name}</p>
                <p className="text-sm text-[#6B6B6B]">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#C4A962]">
        <div className="container-main">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Let&apos;s Create Together</h2>
            <p className="text-white/80 mb-8">Ready to tell your story? We&apos;d love to hear from you.</p>
            <Link href="/inquiry" className="inline-flex bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors">
              Get in Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
