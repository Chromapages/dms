"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Mail, MapPin, Phone, Send, Loader2, Star, Shield, Users, Clock, Check } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FadeIn } from "@/components/Animations";

const trustBadges = [
  { icon: Shield, label: "Fully Insured & Bonded" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Users, label: "500+ Happy Clients" },
  { icon: Clock, label: "On-Time Delivery" },
];

const successStats = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "24-48h", label: "Response Time" },
  { value: "100%", label: "Satisfaction Guaranteed" },
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

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  preferredContact: string; propertyName: string; projectType: string;
  eventDate: string; guestCount: string; budget: string; vision: string;
  referralSource: string; newsletter: boolean;
}
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function Inquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "", preferredContact: "email",
    propertyName: "", projectType: "", eventDate: "", guestCount: "", budget: "",
    vision: "", referralSource: "", newsletter: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof FormData]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.propertyName.trim()) newErrors.propertyName = "Required";
    if (!formData.projectType) newErrors.projectType = "Required";
    if (!formData.eventDate.trim()) newErrors.eventDate = "Required";
    if (!formData.vision.trim()) newErrors.vision = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (err) { setError("Something went wrong. Please try again."); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] dark:bg-[#0A0A0A]">
      <section className="pt-32 pb-16 bg-[#1A1A1A] text-white">
        <div className="container-main">
          <AnimatedSection>
            <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">Start Your Journey</h1>
            <p className="text-white/60 max-w-2xl text-lg">We&apos;re thrilled you&apos;re considering DMS. Tell us about your vision, and we&apos;ll be in touch shortly.</p>
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
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              {submitted ? (
                <AnimatedSection className="bg-white dark:bg-[#1A1A1A] p-12 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                  <div className="w-20 h-20 bg-[#C4A962]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-[#C4A962]" />
                  </div>
                  <h3 className="text-3xl font-serif mb-4">Thank You</h3>
                  <p className="text-[#6B6B6B] dark:text-gray-400 text-lg mb-2">We&apos;ve received your inquiry and will be in touch within 24-48 hours.</p>
                </AnimatedSection>
              ) : (
                <form className="bg-white dark:bg-[#1A1A1A] p-8 md:p-12 rounded-xl border border-gray-100 dark:border-gray-800" onSubmit={handleSubmit}>
                  {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-6">{error}</div>}
                  
                  <div className="mb-12">
                    <h3 className="text-lg font-serif mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name <span className="text-red-500">*</span></label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input" required />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-12">
                    <h3 className="text-lg font-serif mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">Project Details</h3>
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Property/Destination <span className="text-red-500">*</span></label>
                      <input type="text" name="propertyName" value={formData.propertyName} onChange={handleChange} className="input" placeholder="e.g., Four Seasons Bora Bora" required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Project Type <span className="text-red-500">*</span></label>
                        <select name="projectType" value={formData.projectType} onChange={handleChange} className="input" required>
                          <option value="">Select type</option>
                          <option value="Destination Wedding">Destination Wedding</option>
                          <option value="Elopement">Elopement</option>
                          <option value="Brand Shoot">Brand/Property Shoot</option>
                          <option value="Corporate">Corporate Retreat</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Proposed Date <span className="text-red-500">*</span></label>
                        <input type="text" name="eventDate" value={formData.eventDate} onChange={handleChange} className="input" placeholder="e.g., March 2026" required />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-12">
                    <h3 className="text-lg font-serif mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">Your Vision</h3>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tell Us About Your Vision <span className="text-red-500">*</span></label>
                      <textarea name="vision" value={formData.vision} onChange={handleChange} rows={5} className="input" placeholder="Share your story..." required />
                    </div>
                  </div>
                  
                  <button type="submit" disabled={isLoading} className="w-full btn-primary disabled:opacity-50">
                    {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <AnimatedSection>
                  <h3 className="text-2xl font-serif mb-6">Get in Touch</h3>
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-[#C4A962] mt-1" />
                      <div><p className="font-medium">hello@destinationmediaservices.com</p><p className="text-[#6B6B6B] dark:text-gray-400 text-sm">We respond within 24-48 hours</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-[#C4A962] mt-1" />
                      <div><p className="font-medium">+1 (310) 555-0192</p><p className="text-[#6B6B6B] dark:text-gray-400 text-sm">Mon-Fri, 9am-6pm PST</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-[#C4A962] mt-1" />
                      <div><p className="font-medium">Los Angeles, California</p><p className="text-[#6B6B6B] dark:text-gray-400 text-sm">Available worldwide</p></div>
                    </div>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection delay={0.2}>
                  <div className="p-6 bg-[#FAF9F7] dark:bg-[#242424] rounded-xl border border-gray-100 dark:border-gray-800 mb-8">
                    <h4 className="font-serif text-lg mb-4">What Happens Next?</h4>
                    <ol className="text-sm text-[#6B6B6B] dark:text-gray-400 space-y-3">
                      <li className="flex gap-3"><span className="font-bold text-[#C4A962]">1.</span>Review within 24-48 hours</li>
                      <li className="flex gap-3"><span className="font-bold text-[#C4A962]">2.</span>Discovery call to discuss vision</li>
                      <li className="flex gap-3"><span className="font-bold text-[#C4A962]">3.</span>Receive customized proposal</li>
                    </ol>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection delay={0.3}>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {successStats.map((stat, i) => (
                      <div key={i} className="p-4 bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-100 dark:border-gray-800">
                        <p className="text-xl font-serif text-[#C4A962]">{stat.value}</p>
                        <p className="text-xs text-[#6B6B6B] dark:text-gray-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
