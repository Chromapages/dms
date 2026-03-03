import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ServicesContent from '@/components/ServicesContent';
import ServicesStats from '@/components/ServicesStats';
import type { ServiceItem } from '@/components/ServicesContent';
import { getServices } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Services | DMS',
  description: 'Comprehensive visual storytelling for the world\'s finest hospitality brands.',
};

const fallbackServices: ServiceItem[] = [
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

export default async function ServicesPage() {
  const rawServices = await getServices().catch(() => []);

  const services: ServiceItem[] = rawServices?.length
    ? rawServices.map((s: { _id: string; title: string; tagline: string; description: string; deliverables: string[] }) => ({
        id: s._id,
        title: s.title,
        tagline: s.tagline || '',
        description: s.description || '',
        deliverables: s.deliverables || [],
        image: '/hero-dms.png',
      }))
    : fallbackServices;

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
      <ServicesContent services={services} />

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
      <ServicesStats />

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
