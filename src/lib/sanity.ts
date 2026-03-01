import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'znjbkmmx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Helper functions to fetch data
export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(year desc) {
    _id, title, client, category, location, year, description, "imageUrl": featuredImage.asset->url
  }`)
}

export async function getServices() {
  return client.fetch(`*[_type == "service"] | order(order asc) {
    _id, title, tagline, description, icon, deliverables
  }`)
}

export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial"] {
    _id, quote, name, role, company, rating
  }`)
}

export async function getDestinations() {
  return client.fetch(`*[_type == "destination"] {
    _id, name, region, description, projectCount, "imageUrl": image.asset->url
  }`)
}

export async function getJournalPosts() {
  return client.fetch(`*[_type == "journalPost"] | order(publishedAt desc) {
    _id, title, slug, category, excerpt, "imageUrl": featuredImage.asset->url, publishedAt
  }`)
}

export async function getHomePage() {
  return client.fetch(`*[_type == "home"][0]`)
}
