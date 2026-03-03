import CinematicHero from '@/components/CinematicHero';
import CinematicIntro from '@/components/CinematicIntro';
import CinematicGallery from '@/components/CinematicGallery';
import DestinationMarquee from '@/components/DestinationMarquee';
import CinematicServices from '@/components/CinematicServices';
import CinematicCTA from '@/components/CinematicCTA';
import { getSiteSettings, getFeaturedStories, getDestinations, getServices } from '@/lib/sanity';

const fallbackSlides = [
  { image: '/hero-dms.png', location: 'Los Angeles · Worldwide', category: 'Editorial' },
  { image: '/hero-dms.png', location: 'French Polynesia', category: 'Resort' },
  { image: '/hero-dms.png', location: 'Tuscany, Italy', category: 'Wedding' },
];

const fallbackStats = [
  { label: 'Hotels', value: '50+' },
  { label: 'Destinations', value: '24' },
  { label: 'Projects', value: '200+' },
];

const fallbackStories = [
  { id: 1, title: 'Four Seasons Bora Bora', location: 'French Polynesia', category: 'Hotel', image: '/hero-dms.png', href: '/stories/four-seasons-bora-bora' },
  { id: 2, title: 'Tuscan Villa Wedding', location: 'Tuscany, Italy', category: 'Wedding', image: '/hero-dms.png', href: '/stories/tuscan-villa' },
  { id: 3, title: 'Aman Tokyo', location: 'Tokyo, Japan', category: 'Hotel', image: '/hero-dms.png', href: '/stories/aman-tokyo' },
  { id: 4, title: 'Santorini Elopement', location: 'Santorini, Greece', category: 'Wedding', image: '/hero-dms.png', href: '/stories/santorini-elopement' },
  { id: 5, title: 'The Ritz Paris', location: 'Paris, France', category: 'Editorial', image: '/hero-dms.png', href: '/stories/ritz-paris' },
  { id: 6, title: 'Bali Retreat', location: 'Bali, Indonesia', category: 'Resort', image: '/hero-dms.png', href: '/stories/bali-retreat' },
];

const fallbackDestinations = [
  { id: 1, name: 'Bora Bora', region: 'French Polynesia', count: 24 },
  { id: 2, name: 'Tuscany', region: 'Italy', count: 18 },
  { id: 3, name: 'Santorini', region: 'Greece', count: 15 },
  { id: 4, name: 'Bali', region: 'Indonesia', count: 21 },
];

export default async function Home() {
  const [siteSettings, stories, destinations, services] = await Promise.all([
    getSiteSettings().catch(() => null),
    getFeaturedStories().catch(() => []),
    getDestinations().catch(() => []),
    getServices().catch(() => []),
  ]);

  const heroSlides = siteSettings?.heroSlides?.length
    ? siteSettings.heroSlides
    : fallbackSlides;

  const heroTitle = siteSettings?.heroTitle || 'Where Every Destination Tells a Story';
  const heroSubtitle = siteSettings?.heroSubtitle || 'We craft cinematic visual narratives for the world\'s most extraordinary places and the people who call them home.';
  const heroStats = siteSettings?.heroStats?.length ? siteSettings.heroStats : fallbackStats;

  const galleryPhotos = stories?.length
    ? stories.map((s: { _id: string; title: string; slug: string; location: string; category: string; image: string }) => ({
        id: s._id,
        title: s.title,
        location: s.location || '',
        category: s.category || '',
        image: s.image || '/hero-dms.png',
        href: `/stories/${s.slug}`,
      }))
    : fallbackStories;

  const marqueeDestinations = destinations?.length
    ? destinations.map((d: { _id: string; name: string; region: string; projectCount: number }) => ({
        id: d._id,
        name: d.name,
        region: d.region || '',
        count: d.projectCount || 0,
      }))
    : fallbackDestinations;

  return (
    <>
      <CinematicHero
        title={heroTitle}
        subtitle={heroSubtitle}
        slides={heroSlides}
        cta={{
          primary: { label: 'Explore Stories', href: '/stories' },
          secondary: { label: 'Start a Project', href: '/inquiry' }
        }}
        stats={heroStats}
      />

      <CinematicIntro />

      <CinematicGallery
        title="Featured Stories"
        subtitle="002 / Portfolio"
        photos={galleryPhotos}
      />

      <DestinationMarquee
        title="Where We Work"
        subtitle="003 / Destinations"
        destinations={marqueeDestinations}
      />

      <CinematicServices services={services?.length ? services : undefined} />

      <CinematicCTA />
    </>
  );
}
