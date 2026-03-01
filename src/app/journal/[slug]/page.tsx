"use client";

import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const posts: Record<string, {
  title: string;
  date: string;
  readTime: string;
  category: string;
  content: string[];
  excerpt: string;
}> = {
  "art-of-golden-hour": {
    title: "The Art of Golden Hour in Santorini",
    date: "January 15, 2026",
    readTime: "5 min read",
    category: "Technique",
    excerpt: "Discovering the magic of light in one of the world's mostphotographed destinations.",
    content: [
      "There's a reason photographers flock to Santorini during golden hour. The light here is unlike anywhere else on Earth—warm, diffused, and impossibly romantic.",
      "When we arrived at our location in Oia, the white-washed buildings were already catching the first hints of amber. The key is positioning yourself to capture both the buildings and the caldera beyond.",
      "The challenge with Santorini is the crowds. We scouted this location for three days before finding the perfect vantage point—arriving two hours before sunset to set up.",
      "What makes golden hour special here isn't just the light—it's how the warm tones interact with the blue domes and white walls. The contrast creates that signature Santorini palette naturally.",
      "For couples and brands seeking that iconic imagery, timing is everything. The window of perfect light lasts only about 20 minutes, so every shot counts.",
    ],
  },
  "vogue-italia-shoot": {
    title: "Behind the Scenes: Vogue Italia Shoot",
    date: "January 8, 2026",
    readTime: "8 min read",
    category: "Behind the Scenes",
    excerpt: "A peek into our most ambitious editorial campaign to date.",
    content: [
      "When Vogue Italia called about their summer issue, they had one request: create something that hadn't been done before with Italian luxury.",
      "We chose Lake Como as our backdrop—less photographed than the Amalfi Coast, yet equally stunning. The villa we secured, Villa Balbianello, provided the perfect mix of history and glamour.",
      "The shoot spanned three days, with a crew of 15. Coordinating fashion, hair, makeup, and the artistic direction while managing natural light required precise planning.",
      "What made this special was the collaboration. The fashion team brought pieces from six different houses, and our job was to showcase each while maintaining a cohesive visual narrative.",
      "The final spread ran 14 pages—a testament to what happens when creative vision aligns with flawless execution.",
    ],
  },
  "love-stories-amalfi": {
    title: "Love Stories: An Amalfi Wedding",
    date: "December 12, 2025",
    readTime: "6 min read",
    category: "Weddings",
    excerpt: "Sarah and Michael's intimate celebration in Positano.",
    content: [
      "When Sarah and Michael first spoke about their vision, they described 'effortless elegance.' For a destination wedding in Positano, that meant embracing the laid-back luxury the Amalfi Coast is known for.",
      "Their ceremony took place on a private terrace overlooking the Mediterranean. The light was soft, the breeze gentle—it was one of those rare perfect moments.",
      "What struck us most was their genuine joy. In an era of overly posed wedding photography, authentic moments are what matter most.",
      "We captured their love story through quiet glances, spontaneous laughter, and the kind of tender touches that happen only when people are truly present with each other.",
      "The resulting gallery is a testament to what happens when you let real moments unfold in extraordinary places.",
    ],
  },
};

export default function JournalPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Post not found</h1>
          <Link href="/journal" className="text-amber-600 hover:underline">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/journal" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
        </div>
      </header>

      <article>
        {/* Hero */}
        <section className="py-20 bg-stone-900 text-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 text-stone-400 text-sm mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="text-amber-400">{post.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">{post.title}</h1>
            <p className="text-xl text-stone-300">{post.excerpt}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-6">
            <div className="prose prose-lg prose-stone">
              {post.content.map((paragraph, i) => (
                <p key={i} className="mb-6 text-stone-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-stone-200 flex items-center justify-between">
              <Link href="/journal" className="text-amber-600 hover:underline">
                ← More articles
              </Link>
              <button className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </section>
      </article>

      {/* Related */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-serif mb-8">More from the Journal</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(posts)
              .filter(([s]) => s !== slug)
              .slice(0, 3)
              .map(([s, p]) => (
                <Link key={s} href={`/journal/${s}`} className="group">
                  <div className="aspect-video bg-gradient-to-br from-amber-100 to-stone-200 rounded-lg mb-4" />
                  <h3 className="font-serif text-lg group-hover:text-amber-600 transition">
                    {p.title}
                  </h3>
                  <p className="text-sm text-stone-500">{p.category}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
