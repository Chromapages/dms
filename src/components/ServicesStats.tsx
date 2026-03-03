'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "25+", label: "Industry Awards" },
  { value: "15+", label: "Years Experience" },
];

export default function ServicesStats() {
  return (
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
  );
}
