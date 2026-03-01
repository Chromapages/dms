"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Camera, Video, BookOpen, Award, CheckCircle, Star, Shield, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";

const services = [
  { id: "photography", icon: Camera, title: "Photography", tagline: "Editorial-quality imagery", description: "We capture the spirit of your property through editorial-quality imagery. From sweeping architectural shots to the subtle play of light across a dining terrace, our photographs invite viewers to feel the experience—before they arrive.", deliverables: ["Full property documentation", "Editorial-style portraits", "Architectural detail shots", "Lifestyle imagery", "High-resolution delivery", "Online gallery"] },
  { id: "videography", icon: Video, title: "Videography", tagline: "Cinematic storytelling", description: "Motion brings stories to life. Our cinematic films capture the rhythm and romance of your destination, creating immersive content that connects with guests on an emotional level.", deliverables: ["Brand films (2-5 min)", "Social media content", "Drone footage", "Behind-the-scenes", "Custom music", "Multi-format delivery"] },
  { id: "branding", icon: BookOpen, title: "Brand Storytelling", tagline: "Cohesive visual narratives", description: "Great visuals deserve great context. We help hospitality brands craft cohesive visual narratives that align with their positioning and resonate with their audience.", deliverables: ["Brand strategy", "Visual identity", "Content strategy", "Style guides", "Channel planning", "Ongoing support"] },
  { id: "commercial", icon: Award, title: "Commercial", tagline: "Elevated commercial imagery", description: "Whether for brochures, campaigns, or digital platforms, we create elevated commercial imagery that showcases your destination's unique character and drives bookings.", deliverables: ["Campaign imagery", "Print & digital ads", "Website content", "Brochure photography", "Trade show materials", "Usage licensing"] },
];

const process = [
  { step: 1, title: "Discover", description: "We learn about your brand, vision, and goals through an in-depth consultation." },
  { step: 2, title: "Strategy", description: "We develop a customized creative approach tailored to your specific needs." },
  { step: 3, title: "Create", description: "Our team executes the shoot with meticulous attention to every detail." },
  { step: 4, title: "Deliver", description: "You receive professionally edited images and a finished product that exceeds expectations." },
];

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "25+", label: "Industry Awards" },
  { value: "15+", label: "Years Combined Experience" },
];

const trustBadges = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Users, label: "500+ Happy Clients" },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  );
}

export default function Services() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[#FAF9F7] dark:bg-[#0A0A0A]">
        <div className="container-main">
          <AnimatedSection>
            <Link href="/" className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#C4A962] transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">Our Services</h1>
            <p className="text-[#6B6B6B] dark:text-gray-400 max-w-2xl text-lg">Comprehensive visual storytelling for the world&apos;s finest hospitality brands</p>
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

      {services.map((service, index) => (
        <section key={service.id} className={`py-24 ${index % 2 === 1 ? "bg-white dark:bg-[#1A1A1A]" : ""}`}>
          <div className="container-main">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <AnimatedSection className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 text-[#C4A962] mb-4">
                  <service.icon className="w-6 h-6" />
                  <span className="text-sm font-medium uppercase tracking-wider">{service.tagline}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">{service.title}</h2>
                <p className="text-[#6B6B6B] dark:text-gray-400 text-lg leading-relaxed mb-8">{service.description}</p>
                <div className="mb-8">
                  <h3 className="font-medium mb-4">What&apos;s Included:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#6B6B6B] dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-[#C4A962] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/inquiry" className="btn-primary">Request Quote <ArrowRight className="w-4 h-4" /></Link>
              </AnimatedSection>
              <AnimatedSection delay={0.2} className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="aspect-[4/5] rounded-lg overflow-hidden img-zoom">
                  <div className="w-full h-full bg-[#E8E4DC] dark:bg-gray-800 flex items-center justify-center">
                    <p className="text-[#6B6B6B]/50">{service.title} Image</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 bg-[#1A1A1A] text-white">
        <div className="container-main">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Process</h2>
            <p className="text-white/60 max-w-2xl mx-auto">A proven methodology that delivers exceptional results, every time</p>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <StaggerItem key={step.step}>
                <div className="relative">
                  <div className="text-6xl font-serif text-[#C4A962]/20 mb-4">{step.step}</div>
                  <h3 className="text-xl font-serif mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-[#1A1A1A]">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-serif text-[#C4A962]">{stat.value}</p>
                  <p className="text-[#6B6B6B] dark:text-gray-400 text-sm">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#C4A962]">
        <div className="container-main">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Ready to Create Something Beautiful?</h2>
            <p className="text-white/80 mb-8">Let&apos;s discuss your project and bring your vision to life.</p>
            <Link href="/inquiry" className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
