"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./Animations";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  backgroundImage?: string;
  alignment?: "center" | "left";
}

export default function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  backgroundImage = "/hero-dms.png",
  alignment = "center",
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-main">
        <StaggerContainer
          className={`${
            alignment === "center"
              ? "text-center max-w-4xl mx-auto"
              : "max-w-3xl"
          }`}
        >
          <StaggerItem>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-6">
              {title}
            </h1>
          </StaggerItem>

          {subtitle && (
            <StaggerItem>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
                {subtitle}
              </p>
            </StaggerItem>
          )}

          <StaggerItem>
            <div
              className={`flex gap-4 ${
                alignment === "center" ? "justify-center" : ""
              } flex-wrap`}
            >
              {ctaPrimary && (
                <Link href={ctaPrimary.href} className="btn-primary">
                  {ctaPrimary.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {ctaSecondary && (
                <Link href={ctaSecondary.href} className="btn-secondary border-white text-white hover:bg-white hover:text-[#1A1A1A]">
                  {ctaSecondary.label}
                </Link>
              )}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
