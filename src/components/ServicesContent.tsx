'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  image: string;
}

interface ServicesContentProps {
  services: ServiceItem[];
}

export default function ServicesContent({ services }: ServicesContentProps) {
  return (
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
                {String(index + 1).padStart(2, '0')}
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

            {service.deliverables.length > 0 && (
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
            )}

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
  );
}
