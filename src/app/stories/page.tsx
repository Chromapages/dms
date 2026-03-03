import type { Metadata } from 'next';
import StoriesGallery from '@/components/StoriesGallery';

export const metadata: Metadata = {
    title: 'Selected Stories | DMS',
    description: 'An archive of our most extraordinary commissions across luxury hospitality and destinations.',
};

export default function StoriesPage() {
    return (
        <div className="min-h-screen bg-bg pt-32 selection:bg-accent/30 selection:text-text-primary">
            {/* Immersive Typographic Header */}
            <header className="max-w-[1440px] mx-auto px-6 pt-16 pb-12 md:pb-24">
                <p className="section-number text-accent mb-6 uppercase tracking-widest text-sm font-medium">
                    Archive
                </p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-text-primary mb-8 tracking-tight">
                    Selected Stories
                </h1>
                <p className="text-text-secondary font-light text-lg md:text-xl max-w-2xl leading-relaxed">
                    An archive of our most extraordinary commissions. Exploring the nuanced intersection of architecture, nature, and high-end hospitality.
                </p>
            </header>

            {/* Masonry Gallery with Filtering */}
            <StoriesGallery />
        </div>
    );
}
