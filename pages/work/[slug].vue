<template>
  <div class="min-h-screen bg-cyber-dark cyber-grid">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 px-6 py-6 backdrop-blur-md bg-cyber-dark/80 border-b border-cyber-grid">
      <NuxtLink 
        to="/work"
        class="inline-flex items-center gap-2 text-cyber-accent hover:text-white transition-colors group"
      >
        <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="font-space-mono text-sm uppercase">Back to Projects</span>
      </NuxtLink>
    </nav>

    <!-- Loading State -->
    <div v-if="!project" class="pt-32 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="animate-pulse space-y-8">
          <div class="h-12 bg-cyber-grid rounded w-1/2" />
          <div class="aspect-video bg-cyber-grid rounded-lg" />
          <div class="space-y-3">
            <div class="h-4 bg-cyber-grid rounded w-3/4" />
            <div class="h-4 bg-cyber-grid rounded w-full" />
            <div class="h-4 bg-cyber-grid rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>

    <!-- Project Content -->
    <div v-else class="pt-32 px-6 pb-20">
      <article class="max-w-6xl mx-auto space-y-12">
        <!-- Header -->
        <header class="space-y-6">
          <h1 
            id="project-title"
            class="text-white font-exo text-5xl md:text-7xl font-bold glow-text opacity-0"
            style="transform: translateY(30px);"
          >
            {{ project.title }}
          </h1>

          <div 
            id="project-meta"
            class="flex flex-wrap gap-4 items-center opacity-0"
            style="transform: translateY(20px);"
          >
            <!-- Tech Stack -->
            <div v-if="project.techStack && project.techStack.length" class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="px-3 py-1.5 text-sm font-space-mono bg-cyber-accent/10 !text-white border border-cyber-accent/30 rounded hover:bg-cyber-accent/20 transition-colors"
                style="color: white !important;"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Project Link -->
            <a
              v-if="project.projectUrl"
              :href="project.projectUrl"
              target="_blank"
              rel="noopener noreferrer"
              
              class="inline-flex items-center gap-2 px-4 py-2 bg-cyber-accent text-white font-space-mono text-sm font-bold border rounded hover:bg-white hover:text-black transition-colors group"
            >
              <span>Visit Project</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </header>

        <!-- Main Image -->
        <div 
          id="main-image"
          class="opacity-0"
          style="transform: translateY(40px);"
        >
          <div class="glass-card overflow-hidden rounded-2xl shadow-glow-md">
            <img
              v-if="project.mainImage"
              :src="getImageUrl(project.mainImage, 1600)"
              :alt="project.mainImage.alt || project.title"
              class="w-full h-auto"
            />
          </div>
        </div>

        <!-- Description -->
        <div 
          v-if="project.description"
          id="description"
          class="prose prose-invert max-w-none opacity-0"
          style="transform: translateY(30px);"
        >
          <p class="text-gray-300 font-space-mono text-lg leading-relaxed">
            {{ project.description }}
          </p>
        </div>

        <!-- Gallery -->
        <div 
          v-if="project.gallery && project.gallery.length"
          id="gallery"
          class="opacity-0"
          style="transform: translateY(40px);"
        >
          <h2 class="text-white font-exo text-3xl font-bold mb-8">Project Gallery</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(image, index) in project.gallery"
              :key="index"
              class="glass-card overflow-hidden rounded-lg hover:shadow-glow-md transition-shadow"
            >
              <img
                :src="getImageUrl(image, 800)"
                :alt="image.alt || `${project.title} - Image ${index + 1}`"
                class="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'
import type { Project } from '~/composables/useProjects'

const route = useRoute()
const { fetchProjectBySlug, getImageUrl } = useProjects()

const project = ref<Project | null>(null)

// Set page metadata
useHead(() => ({
  title: project.value ? `${project.value.title} - Portfolio` : 'Project - Portfolio',
  meta: [
    {
      name: 'description',
      content: project.value?.description || 'View project details'
    }
  ]
}))

onMounted(async () => {
  // Fetch project by slug
  const slug = route.params.slug as string
  project.value = await fetchProjectBySlug(slug)

  if (!project.value) {
    // Redirect to work page if project not found
    navigateTo('/work')
    return
  }

  // GSAP Entrance Animations
  await nextTick()

  const timeline = gsap.timeline({ defaults: { ease: 'expo.out' } })

  timeline
    .to('#project-title', {
      opacity: 1,
      y: 0,
      duration: 1.5
    })
    .to('#project-meta', {
      opacity: 1,
      y: 0,
      duration: 1.2
    }, '-=1')
    .to('#main-image', {
      opacity: 1,
      y: 0,
      duration: 1.5
    }, '-=0.8')
    .to('#description', {
      opacity: 1,
      y: 0,
      duration: 1.2
    }, '-=1')
    .to('#gallery', {
      opacity: 1,
      y: 0,
      duration: 1.5
    }, '-=0.8')
})
</script>
