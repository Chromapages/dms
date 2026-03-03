'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Home, Camera, Globe, BookOpen, Mail } from 'lucide-react';

// ─── Nav Items ────────────────────────────────────────────────────────────────

const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/stories', label: 'Stories', icon: Camera },
    { href: '/destinations', label: 'Places', icon: Globe },
    { href: '/journal', label: 'Journal', icon: BookOpen },
    { href: '/inquiry', label: 'Inquire', icon: Mail },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MobileBottomNav() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <nav
            aria-label="Mobile navigation"
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
            {/* Glass bar */}
            <div className="bg-bg/85 backdrop-blur-2xl border-t border-text-primary/[0.08] transition-colors duration-300">
                <ul className="flex items-stretch h-16" role="list">

                    {/* Nav items */}
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;

                        return (
                            <li key={item.href} className="flex-1 relative">
                                <Link
                                    href={item.href}
                                    aria-label={item.label}
                                    aria-current={active ? 'page' : undefined}
                                    className="flex flex-col items-center justify-center gap-[3px] w-full h-full relative group"
                                >
                                    {/* Active pip */}
                                    <AnimatePresence>
                                        {active && (
                                            <motion.span
                                                layoutId="mobile-nav-active-pip"
                                                initial={{ opacity: 0, scaleX: 0 }}
                                                animate={{ opacity: 1, scaleX: 1 }}
                                                exit={{ opacity: 0, scaleX: 0 }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-accent rounded-full"
                                            />
                                        )}
                                    </AnimatePresence>

                                    {/* Icon */}
                                    <motion.span
                                        animate={{
                                            color: active ? 'var(--accent)' : 'var(--text-secondary)',
                                            scale: active ? 1.1 : 1,
                                        }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className="flex items-center justify-center"
                                    >
                                        <Icon
                                            size={20}
                                            strokeWidth={active ? 2 : 1.5}
                                            aria-hidden="true"
                                        />
                                    </motion.span>

                                    {/* Label */}
                                    <motion.span
                                        animate={{
                                            color: active ? 'var(--accent)' : 'var(--text-secondary)',
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="text-[9px] uppercase tracking-[0.12em] font-medium leading-none"
                                    >
                                        {item.label}
                                    </motion.span>
                                </Link>
                            </li>
                        );
                    })}

                </ul>
            </div>
        </nav>
    );
}
