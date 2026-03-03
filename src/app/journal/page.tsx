import type { Metadata } from 'next';
import JournalGrid from '@/components/JournalGrid';
import type { JournalPost } from '@/components/JournalGrid';
import { getJournalPosts } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Journal | DMS',
  description: 'Stories from our journeys, insights on craft, and glimpses into the art of visual storytelling.',
};

const defaultCategories = ["All", "Technique", "Behind the Scenes", "Weddings", "Adventure", "Industry"];

const fallbackPosts: JournalPost[] = [
  { id: 1, slug: "art-of-golden-hour", title: "The Art of Golden Hour in Santorini", category: "Technique", date: "Jan 15, 2026", aspect: "landscape", image: "/hero-dms.png" },
  { id: 2, slug: "vogue-italia-shoot", title: "Behind the Scenes: Vogue Italia", category: "Behind the Scenes", date: "Jan 08, 2026", aspect: "portrait", image: "/hero-dms.png" },
  { id: 3, slug: "love-stories-amalfi", title: "Love Stories: An Amalfi Wedding", category: "Weddings", date: "Dec 12, 2025", aspect: "square", image: "/hero-dms.png" },
  { id: 4, slug: "finding-light-patagonia", title: "Finding Light in Patagonia", category: "Adventure", date: "Dec 20, 2025", aspect: "landscape", image: "/hero-dms.png" },
  { id: 5, slug: "future-destination-marketing", title: "Future of Destination Marketing", category: "Industry", date: "Nov 28, 2025", aspect: "portrait", image: "/hero-dms.png" },
  { id: 6, slug: "capturing-authentic-moments", title: "Capturing Authentic Moments", category: "Technique", date: "Nov 15, 2025", aspect: "square", image: "/hero-dms.png" },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function JournalPage() {
  const rawPosts = await getJournalPosts().catch(() => []);

  const posts: JournalPost[] = rawPosts?.length
    ? rawPosts.map((p: { _id: string; title: string; slug: string; publishedAt: string; category: string; aspectRatio: string; image: string }) => ({
        id: p._id,
        slug: p.slug,
        title: p.title,
        category: p.category || '',
        date: p.publishedAt ? formatDate(p.publishedAt) : '',
        aspect: p.aspectRatio || 'square',
        image: p.image || '/hero-dms.png',
      }))
    : fallbackPosts;

  const categories = rawPosts?.length
    ? ['All', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))]
    : defaultCategories;

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 selection:text-text-primary pt-32 transition-colors duration-300">

      {/* Header */}
      <header className="max-w-[1440px] mx-auto px-8 pt-16 pb-12 md:pb-24">
        <p className="section-number text-accent mb-6 uppercase tracking-widest text-sm font-medium">
          DMS / Journal
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-text-primary tracking-tight">
            Journal
          </h1>
          <p className="text-text-secondary font-light text-lg max-w-md leading-relaxed md:pb-2">
            Stories from our journeys, insights on craft, and glimpses into the art of visual storytelling.
          </p>
        </div>
      </header>

      <JournalGrid posts={posts} categories={categories} />

      {/* Newsletter Section */}
      <section className="bg-bg-elevated py-32 md:py-48 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <p className="section-number text-accent mb-6 uppercase tracking-widest text-xs font-medium">
            Stay Inspired
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-text-primary mb-8 leading-tight">
            The Monthly Editorial
          </h2>
          <p className="text-text-secondary font-light max-w-xl mx-auto mb-12">
            Receive our curated thoughts on photography, travel, and cinematic storytelling directly to your inbox.
          </p>

          <form className="max-w-md mx-auto">
            <div className="flex items-center border-b border-text-primary/20 focus-within:border-accent transition-colors py-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none outline-none w-full text-lg font-light placeholder:text-text-primary/20 p-2"
                required
              />
              <button
                type="submit"
                className="text-accent hover:text-text-primary transition-colors ml-4 tracking-widest uppercase text-xs font-bold whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}
