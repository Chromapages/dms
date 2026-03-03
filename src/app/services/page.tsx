'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Camera, Video, BookOpen, Award, CheckCircle } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Photography",
    tagline: "Editorial-quality imagery",
    description: "We capture the spirit of your property through editorial-quality imagery. From sweeping architectural shots to the subtle play of light across a dining terrace, our photographs invite viewers to feel the experience—before they arrive.",
    deliverables: ["Full property documentation", "Editorial-style portraits", "Architectural detail shots", "Lifestyle imagery", "High-resolution delivery", "Online gallery"],
    image: "/hero-dms.png"
  },
  {
    id: "02",
    title: "Videography",
    tagline: "Cinematic storytelling",
    description: "Motion brings stories to life. Our cinematic films capture the rhythm and romance of your destination, creating immersive content that connects with guests on an emotional level.",
    deliverables: ["Brand films (2-5 min)", "Social media content", "Drone footage", "Behind-the-scenes", "Custom music", "Multi-format delivery"],
    image: "/hero-dms.png"
  },
  {
    id: "03",
    title: "Brand Storytelling",
    tagline: "Cohesive visual narratives",
    description: "Great visuals deserve great context. We help hospitality brands craft cohesive visual narratives that align with their positioning and resonate with their audience.",
    deliverables: ["Brand strategy", "Visual identity", "Content strategy", "Style guides", "Channel planning", "Ongoing support"],
    image: "/hero-dms.png"
  },
  {
    id: "04",
    title: "Commercial",
    tagline: "Elevated commercial imagery",
    description: "Whether for brochures, campaigns, or digital platforms, we create elevated commercial imagery that showcases your destination's unique character and drives bookings.",
    deliverables: ["Campaign imagery", "Print & digital ads", "Website content", "Brochure photography", "Trade show materials", "Usage licensing"],
    image: "/hero-dms.png"
  },
];

const processSteps = [
  { step: "01", title: "Discover", description: "We learn about your brand, vision, and goals through an in-depth consultation." },
  { step: "02", title: "Strategy", description: "We develop a customized creative approach tailored to your specific needs." },
  { step: "03", title: "Create", description: "Our team executes the shoot with meticulous attention to every detail." },
  { step: "04", title: "Deliver", description: "You receive professionally edited images and a finished product that exceeds expectations." },
];

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "25+", label: "Industry Awards" },
  { value: "15+", label: "Years Experience" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 selection:text-text-primary pt-32 transition-colors duration-300">

      {/* Header */}
      <header className="max-w-[1440px] mx-auto px-8 pt-16 pb-12 md:pb-24">
        <p className="section-number text-accent mb-6 uppercase tracking-widest text-sm font-medium">
          Our Capabilities
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-text-primary mb-8 tracking-tight">
          Crafting Visual Narratives
        </h1>
        <p className="text-text-secondary font-light text-lg md:text-xl max-w-2xl leading-relaxed">
          Comprehensive visual storytelling for the world&apos;s finest hospitality brands. We translate the essence of luxury into cinematic experiences.
        </p>
      </header>

      {/* Services List */}
      <section className="space-y-32 md:space-y-48 pb-32">
        {services.map((service, index) => (
          <div key={service.id} className="max-w-[1440px] mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={index % 2 === 1 ? 'lg:order-2' : ''}
            >
              <div className="flex items-center gap-6 mb-8">
                <span className="text-5xl md:text-7xl font-serif text-accent/20 italic">
                  {service.id}
                </span>
                <div className="h-px flex-1 bg-text-primary/10" />
              </div>

              <p className="text-accent text-sm uppercase tracking-widest font-medium mb-4">
                {service.tagline}
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-8 leading-tight">
                {service.title}
              </h2>
              <p className="text-text-secondary text-lg font-light leading-relaxed mb-12 max-w-xl">
                {service.description}
              </p>

              <div className="mb-12">
                <h3 className="text-sm uppercase tracking-widest font-bold text-text-primary mb-6">
                  Deliverables
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary font-light">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/inquiry"
                className="inline-flex items-center gap-3 bg-accent text-white px-10 py-4 text-sm tracking-widest uppercase font-medium hover:bg-text-primary transition-colors duration-300"
              >
                Inquire Now
                <ArrowUpRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className={`relative aspect-[16/9] md:aspect-[4/5] bg-bg-elevated overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/5" />
            </motion.div>
          </div>
        ))}
      </section>

      {/* Process Section */}
      <section className="bg-bg-elevated py-32 md:py-48 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center mb-24 md:mb-32">
            <p className="section-number text-accent mb-6">02 / Methodology</p>
            <h2 className="text-4xl md:text-6xl font-serif text-text-primary mb-8">
              Our Creative Process
            </h2>
            <p className="text-text-secondary font-light max-w-xl mx-auto">
              A collaborative and structured approach designed to ensure every story reflects the unique identity of your brand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {processSteps.map((step) => (
              <div key={step.step} className="group relative">
                <span className="text-7xl font-serif text-accent/10 absolute -top-8 -left-4 italic select-none">
                  {step.step}
                </span>
                <div className="relative z-10">
                  <h3 className="text-xl font-serif text-text-primary mb-4 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32 border-b border-text-primary/5">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <p className="text-4xl md:text-6xl font-serif text-text-primary mb-4 italic">
                  {stat.value}
                </p>
                <p className="text-text-secondary text-xs uppercase tracking-widest font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-48 bg-bg transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <p className="section-number text-accent mb-6">Start Your Journey</p>
          <h2 className="text-4xl md:text-7xl font-serif font-light text-text-primary mb-12">
            Ready to tell your story?
          </h2>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-3 bg-accent text-white px-12 py-5 text-sm tracking-widest uppercase font-medium hover:bg-text-primary transition-colors duration-300"
          >
            Request a Consultation
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
}
