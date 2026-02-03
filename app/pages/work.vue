<template>
  <div class="min-h-screen bg-cyber-dark cyber-grid overflow-x-hidden">
    <!-- Header -->
    <header class="px-6 py-12">
      <h1 
        id="title" 
        class="text-white font-exo text-6xl md:text-7xl font-bold opacity-0 glow-text"
        style="transform: translateY(30px);"
      >
        MY WORK
      </h1>
      <p 
        id="subtitle"
        class="text-cyber-accent font-space-mono text-sm mt-4 opacity-0"
        style="transform: translateY(20px);"
      >
        {{ loading ? 'Loading projects...' : `${projects.length} Projects` }}
      </p>
    </header>

    <!-- Projects Grid -->
    <div class="px-6 pb-12">
      <div 
        v-if="!loading && projects.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 magnetic-container"
      >
        <div
          v-for="(project, index) in projects"
          :key="project._id"
          ref="projectElements"
          class="opacity-0 anti-gravity-enabled"
          style="transform: translateY(30px);"
        >
          <NuxtLink 
            :to="`/work/${project.slug}`"
            class="block group"
            @mouseenter="activateAntiGravity(index)"
            @mouseleave="deactivateAntiGravity(index)"
          >
            <div class="glass-card overflow-hidden rounded-lg shadow-card hover:shadow-glow-md transition-all duration-500">
              <!-- Project Image -->
              <div class="relative aspect-[4/3] overflow-hidden bg-cyber-darker">
                <img 
                  v-if="project.mainImage"
                  :src="getImageUrl(project.mainImage, 800)"
                  :alt="project.mainImage.alt || project.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 via-cyber-dark/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              <!-- Project Info -->
              <div class="p-6 space-y-3">
                <h3 class="text-white font-exo text-xl font-semibold group-hover:text-cyber-accent transition-colors">
                  {{ project.title }}
                </h3>
                
                <p v-if="project.description" class="text-gray-400 font-space-mono text-sm line-clamp-2">
                  {{ project.description }}
                </p>

                <!-- Tech Stack Tags -->
                <div v-if="project.techStack && project.techStack.length" class="flex flex-wrap gap-2 pt-2">
                  <span
                    v-for="tech in project.techStack.slice(0, 3)"
                    :key="tech"
                    class="px-2 py-1 text-xs font-space-mono bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20 rounded"
                  >
                    {{ tech }}
                  </span>
                  <span 
                    v-if="project.techStack.length > 3"
                    class="px-2 py-1 text-xs font-space-mono text-gray-500"
                  >
                    +{{ project.techStack.length - 3 }} more
                  </span>
                </div>

                <!-- View Project Arrow -->
                <div class="flex items-center gap-2 pt-2 text-cyber-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span class="font-space-mono text-xs uppercase">View Project</span>
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="glass-card rounded-lg overflow-hidden animate-pulse">
          <div class="aspect-[4/3] bg-cyber-grid" />
          <div class="p-6 space-y-3">
            <div class="h-6 bg-cyber-grid rounded w-3/4" />
            <div class="h-4 bg-cyber-grid rounded w-full" />
            <div class="h-4 bg-cyber-grid rounded w-2/3" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !projects.length" class="text-center py-20">
        <p class="text-gray-500 font-space-mono text-sm">No projects found. Add some in your Sanity Studio!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, ref } from 'vue'
import { useProjects } from '~/composables/useProjects'
import { useAntiGravity } from '~/composables/useAntiGravity'

const { projects, loading, fetchProjects, getImageUrl } = useProjects()
const projectElements = ref<HTMLElement[]>([])

// Anti-Gravity effect
const { activate, deactivate } = useAntiGravity(projectElements, {
  strength: 0.4,
  tiltIntensity: 8,
  elevationScale: 15,
  smoothness: 0.12
})

const activateAntiGravity = (index: number) => {
  activate()
}

const deactivateAntiGravity = (index: number) => {
  deactivate()
}

onMounted(async () => {
  // Fetch projects from CMS
  await fetchProjects()

  // GSAP Entrance Animations
  gsap.to("#title", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'expo.out'
  })

  gsap.to("#subtitle", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: 0.2,
    ease: 'expo.out'
  })

  // Wait a bit for projectElements to be populated
  await nextTick()

  if (projectElements.value.length) {
    gsap.to(projectElements.value, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.1,
      delay: 0.4,
      ease: 'expo.out'
    })
  }
})
</script>