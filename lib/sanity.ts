import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const sanityClient = createClient({
    projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
    dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
    useCdn: true, // Use CDN for faster response times in production
    apiVersion: '2024-01-01',
})

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
    return builder.image(source)
}

// GROQ query helpers
export const queries = {
    allProjects: `*[_type == "project"] | order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    description,
    techStack,
    projectUrl,
    featured
  }`,

    projectBySlug: (slug: string) => `*[_type == "project" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    description,
    techStack,
    projectUrl,
    featured,
    gallery
  }`,

    featuredProjects: `*[_type == "project" && featured == true] | order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    description,
    techStack
  }`
}
