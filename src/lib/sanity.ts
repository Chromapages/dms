import { client } from '@/sanity/lib/client'

export { client }

// Stories
export const STORIES_QUERY = `*[_type == "story"] | order(year desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  location,
  category,
  year,
  excerpt,
  isFeatured,
  "image": featuredImage.asset->url,
  "imageAlt": featuredImage.alt
}`

export const FEATURED_STORIES_QUERY = `*[_type == "story" && isFeatured == true] | order(year desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  location,
  category,
  year,
  excerpt,
  "image": featuredImage.asset->url,
  "imageAlt": featuredImage.alt
}`

export const STORY_BY_SLUG_QUERY = `*[_type == "story" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  client,
  location,
  category,
  year,
  excerpt,
  body,
  "image": featuredImage.asset->url,
  "imageAlt": featuredImage.alt,
  gallery[] {
    "url": asset->url,
    alt
  }
}`

// Journal Posts
export const JOURNAL_QUERY = `*[_type == "journalPost"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  aspectRatio,
  excerpt,
  "image": featuredImage.asset->url,
  "imageAlt": featuredImage.alt
}`

export const JOURNAL_POST_BY_SLUG_QUERY = `*[_type == "journalPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  aspectRatio,
  excerpt,
  body,
  "image": featuredImage.asset->url,
  "imageAlt": featuredImage.alt
}`

// Destinations
export const DESTINATIONS_QUERY = `*[_type == "destination"] {
  _id,
  name,
  "slug": slug.current,
  region,
  description,
  projectCount,
  "image": image.asset->url,
  "imageAlt": image.alt
}`

// Services
export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  tagline,
  description,
  icon,
  deliverables
}`

// Testimonials
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] {
  _id,
  quote,
  name,
  role,
  company,
  rating
}`

// Site Settings (singleton)
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  heroSlides[] {
    "image": image.asset->url,
    "imageAlt": image.alt,
    location,
    category
  },
  heroTitle,
  heroSubtitle,
  heroStats[] {
    label,
    value
  },
  ctaTitle,
  ctaSubtitle,
  socialLinks[] {
    platform,
    url
  }
}`

// Helper functions
export async function getStories() {
  return client.fetch(STORIES_QUERY)
}

export async function getFeaturedStories() {
  return client.fetch(FEATURED_STORIES_QUERY)
}

export async function getStoryBySlug(slug: string) {
  return client.fetch(STORY_BY_SLUG_QUERY, { slug })
}

export async function getJournalPosts() {
  return client.fetch(JOURNAL_QUERY)
}

export async function getJournalPostBySlug(slug: string) {
  return client.fetch(JOURNAL_POST_BY_SLUG_QUERY, { slug })
}

export async function getDestinations() {
  return client.fetch(DESTINATIONS_QUERY)
}

export async function getServices() {
  return client.fetch(SERVICES_QUERY)
}

export async function getTestimonials() {
  return client.fetch(TESTIMONIALS_QUERY)
}

export async function getSiteSettings() {
  return client.fetch(SITE_SETTINGS_QUERY)
}
