'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check, Loader2, Mail, MapPin, Phone, AlertCircle } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const contactInfo = [
  { icon: Mail, label: 'Inquiries', value: 'hello@destinationmediaservices.com', href: 'mailto:hello@destinationmediaservices.com' },
  { icon: Phone, label: 'Phone', value: '+1 (310) 555-0192', href: 'tel:+13105550192' },
  { icon: MapPin, label: 'Studio', value: 'Los Angeles, California', href: '#' },
];

const nextSteps = [
  { step: '01', title: 'Discovery Call', description: "We'll discuss your vision, timeline, and unique requirements in detail." },
  { step: '02', title: 'Creative Proposal', description: "You'll receive a tailored creative approach and investment guide." },
  { step: '03', title: 'Commissioning', description: "Upon approval, we secure your dates and begin the pre-production phase." },
];

const inquiryTypes = ['Commercial Shoot', 'Brand Storytelling', 'Editorial Project', 'Destination Wedding', 'Other'];

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  property: string;
  inquiryType: string;
  proposedDate: string;
  vision: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Floating Label Input ─────────────────────────────────────────────────────

interface FloatingInputProps {
  label: string;
  name: keyof FormFields;
  type?: string;
  value: string;
  onChange: (name: keyof FormFields, value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

function FloatingInput({ label, name, type = 'text', value, onChange, error, required, placeholder }: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="relative group">
      <label
        className={`absolute left-0 font-medium tracking-widest uppercase transition-all duration-300 pointer-events-none ${floated
            ? 'top-0 text-[9px] text-accent'
            : 'top-4 text-sm text-text-secondary/60'
          }`}
      >
        {label}{required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={floated ? (placeholder ?? '') : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full bg-transparent border-none border-b outline-none pt-7 pb-3 text-lg font-light transition-all duration-300 placeholder:text-text-primary/20 ${error
            ? 'border-red-400/60 text-red-400'
            : focused
              ? 'border-accent'
              : 'border-text-primary/20'
          }`}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 mt-2 text-red-400 text-[11px] tracking-wider"
          >
            <AlertCircle size={12} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function InquiryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [visionLength, setVisionLength] = useState(0);

  const [form, setForm] = useState<FormFields>({
    firstName: '', lastName: '', email: '', phone: '',
    property: '', inquiryType: '', proposedDate: '', vision: '',
  });

  const handleChange = useCallback((name: keyof FormFields, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
    if (name === 'vision') setVisionLength(value.length);
  }, [errors]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) newErrors.email = 'Email address is required';
    else if (!emailRegex.test(form.email)) newErrors.email = 'Please enter a valid email';
    if (!form.property.trim()) newErrors.property = 'Property or brand name is required';
    if (!form.inquiryType) newErrors.inquiryType = 'Please select a project type';
    if (!form.proposedDate.trim()) newErrors.proposedDate = 'A proposed date or timeline is required';
    if (!form.vision.trim()) newErrors.vision = 'Please share your vision with us';
    else if (form.vision.trim().length < 20) newErrors.vision = 'Please provide a bit more detail (min. 20 characters)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to first error
      const firstError = document.querySelector('[class*="border-red"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-8 pt-32 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 rounded-full border border-accent flex items-center justify-center mx-auto mb-12"
          >
            <Check className="text-accent w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif text-text-primary mb-6">Thank You</h1>
          <p className="text-text-secondary font-light text-lg mb-12 leading-relaxed">
            Your inquiry has been received. We review every message personally and will be in touch within 24-48 hours.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-accent hover:text-text-primary transition-colors tracking-widest uppercase text-xs font-bold"
          >
            Back to Home <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 selection:text-text-primary pt-32 transition-colors duration-300">

      {/* Header */}
      <header className="max-w-[1440px] mx-auto px-8 pt-16 pb-12 md:pb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-text-primary/40 hover:text-accent transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs tracking-widest uppercase font-medium">Back to Home</span>
        </Link>
        <p className="section-number text-accent mb-6">01 / Inquiry</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-text-primary mb-8 tracking-tight">
          Start Your Journey
        </h1>
        <p className="text-text-secondary font-light text-lg md:text-xl max-w-2xl leading-relaxed">
          Tell us about your vision. From luxury hospitality brands to individual commissions, we welcome the opportunity to create something extraordinary together.
        </p>
      </header>

      <section className="max-w-[1440px] mx-auto px-8 pb-32">
        <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-start">

          {/* Left: Context */}
          <div className="lg:col-span-5 space-y-24">
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-bold text-text-primary mb-12">Get in Touch</h3>
              <div className="space-y-10">
                {contactInfo.map((info) => (
                  <div key={info.label}>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest mb-1 font-bold">{info.label}</p>
                    <a href={info.href} className="text-lg md:text-xl font-serif text-text-primary hover:text-accent transition-colors block">
                      {info.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-bold text-text-primary mb-12">What Happens Next</h3>
              <div className="space-y-10">
                {nextSteps.map((item) => (
                  <div key={item.step} className="relative pl-10">
                    <span className="absolute left-0 top-0 text-xl font-serif text-accent/25 italic">{item.step}</span>
                    <h4 className="text-base font-serif text-text-primary mb-1">{item.title}</h4>
                    <p className="text-text-secondary font-light text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-16">

              {/* 01 Contact */}
              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-text-primary whitespace-nowrap">
                    01 &nbsp; Contact Information
                  </span>
                  <div className="h-px flex-1 bg-text-primary/10" />
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  <FloatingInput label="First Name" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} required />
                  <FloatingInput label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} required />
                </div>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  <FloatingInput label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
                  <FloatingInput label="Phone (Optional)" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000" />
                </div>
              </div>

              {/* 02 Project */}
              <div className="space-y-10 pt-4">
                <div className="flex items-center gap-6">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-text-primary whitespace-nowrap">
                    02 &nbsp; Project Details
                  </span>
                  <div className="h-px flex-1 bg-text-primary/10" />
                </div>

                <FloatingInput label="Property / Brand Name" name="property" value={form.property} onChange={handleChange} error={errors.property} required placeholder="e.g., Aman Tokyo" />

                {/* Inquiry Type Pills */}
                <div className="space-y-4">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-accent">
                    Project Type <span className="text-accent/60">*</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {inquiryTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleChange('inquiryType', type)}
                        className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium border transition-all duration-200 ${form.inquiryType === type
                            ? 'bg-accent text-white border-accent'
                            : 'bg-transparent border-text-primary/20 text-text-secondary hover:border-accent hover:text-text-primary'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {errors.inquiryType && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-1.5 text-red-400 text-[11px] tracking-wider"
                      >
                        <AlertCircle size={12} /> {errors.inquiryType}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <FloatingInput label="Proposed Date or Timeline" name="proposedDate" value={form.proposedDate} onChange={handleChange} error={errors.proposedDate} required placeholder="e.g., Q3 2026" />
              </div>

              {/* 03 Vision */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-6">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-text-primary whitespace-nowrap">
                    03 &nbsp; Your Vision
                  </span>
                  <div className="h-px flex-1 bg-text-primary/10" />
                </div>

                <div className="relative">
                  <textarea
                    rows={6}
                    value={form.vision}
                    maxLength={1200}
                    required
                    onChange={(e) => handleChange('vision', e.target.value)}
                    placeholder="Share the story behind your project — the destination, the mood, the feeling you want to capture..."
                    className={`w-full bg-bg-elevated outline-none p-6 text-base font-light transition-all duration-300 resize-none placeholder:text-text-primary/20 border-b-2 ${errors.vision ? 'border-red-400/60' : 'border-transparent focus:border-accent'
                      }`}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <AnimatePresence>
                      {errors.vision && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 text-red-400 text-[11px] tracking-wider"
                        >
                          <AlertCircle size={12} /> {errors.vision}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <span className={`ml-auto text-[11px] tracking-wider tabular-nums transition-colors ${visionLength > 1100 ? 'text-red-400' : 'text-text-secondary/40'}`}>
                      {visionLength} / 1200
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex items-center gap-4 bg-accent text-white px-12 py-5 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-text-primary transition-all duration-300 disabled:opacity-60 overflow-hidden"
                >
                  {/* Progress bar */}
                  {isSubmitting && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '0%' }}
                      transition={{ duration: 2, ease: 'linear' }}
                      className="absolute inset-0 bg-white/10"
                    />
                  )}
                  <span className="relative flex items-center gap-4">
                    {isSubmitting ? (
                      <><Loader2 className="animate-spin" size={18} /> Sending Inquiry</>
                    ) : (
                      <>Send Inquiry <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" /></>
                    )}
                  </span>
                </button>
              </div>

              <p className="text-[10px] text-text-secondary/40 text-right tracking-wider uppercase">
                We respond to all inquiries within 24-48 hours.
              </p>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
