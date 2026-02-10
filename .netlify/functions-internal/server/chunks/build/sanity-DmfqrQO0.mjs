import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const sanityClient = createClient({
  projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || "b5uobbbz",
  dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  // Use CDN for faster response times in production
  apiVersion: "2024-01-01"
});
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
const queries = {
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
  projectBySlug: (slug) => `*[_type == "project" && slug.current == "${slug}"][0] {
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
};

export { queries, sanityClient, urlFor };
//# sourceMappingURL=sanity-DmfqrQO0.mjs.map
