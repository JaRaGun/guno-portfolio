<template>
  <div class="min-h-screen bg-cyber-dark cyber-grid overflow-x-hidden">
    <!-- Header -->
    <header class="px-6 py-12">
      <h1 
        id="title" 
        class="mt-10 text-white font-exo text-6xl md:text-7xl font-bold opacity-0 glow-text"
        style="transform: translateY(30px);"
      >
        MY WORK
      </h1>
      <p 
        id="subtitle"
        class="text-cyber-accent text-white font-space-mono text-sm mt-4 opacity-0"
        style="transform: translateY(20px);"
      >
        {{ loading ? 'Loading projects...' : `${projects.length} Projects` }}
      </p>
      
      <!-- Tech Stack Filter -->
      <div v-if="allTechStacks.length > 0" class="mt-8">
        <p class="text-xs text-gray-400 font-space-mono mb-3 uppercase tracking-widest text-center">Filter by Technology:</p>
        <div class="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
          <button
            @click="selectedTechFilter = null"
            :class="[
              'px-4 py-2.5 rounded font-space-mono text-sm font-bold transition-all shadow-md',
              !selectedTechFilter 
                ? 'bg-white text-cyber-dark scale-105 shadow-lg' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
            ]"
          >
            All ({{ projects.length }})
          </button>
          <button
            v-for="tech in allTechStacks"
            :key="tech"
            @click="toggleTechFilter(tech)"
            :class="[
              'px-4 py-2.5 rounded font-space-mono text-sm font-bold transition-all border-2 shadow-md',
              selectedTechFilter === tech
                ? 'bg-[#00C9FF] text-white border-[#00E5FF] scale-105 shadow-lg'
                : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:border-gray-500 hover:scale-105'
            ]"
          >
            {{ tech }}
          </button>
        </div>
      </div>
    </header>

    <!-- Projects Grid -->
    <div class="px-6 pb-12">
      <div 
        v-if="!loading && filteredProjects.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 magnetic-container"
      >
        <div
          v-for="(project, index) in filteredProjects"
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
                  :src="getImageUrl(project.mainImage, 1600)"
                  :alt="project.mainImage.alt || project.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              <!-- Project Info with Solid Background -->
              <div class="p-6 bg-cyber-darker/95 backdrop-blur-sm space-y-4">
                <!-- Title - Large and Clear -->
                <h3 class="text-white font-exo text-2xl font-bold group-hover:text-cyber-accent transition-colors leading-tight">
                  {{ project.title }}
                </h3>
                
                <!-- Description - Better Contrast -->
                <p v-if="project.description" class="text-gray-300 font-space-mono text-base line-clamp-2 leading-relaxed">
                  {{ project.description }}
                </p>

                <!-- Tech Stack Tags - ALWAYS VISIBLE, ALL TAGS -->
                <div v-if="project.techStack && project.techStack.length" class="flex flex-wrap gap-2">
                  <button
                    v-for="tech in project.techStack"
                    :key="tech"
                    @click.stop="toggleTechFilter(tech)"
                    :class="[
                      'px-3 py-1.5 text-sm font-space-mono font-bold rounded shadow-lg transition-all border-2',
                      selectedTechFilter === tech
                        ? 'bg-[#00E5FF] !text-white border-white scale-105'
                        : 'bg-[#00C9FF] !text-white border-[#00E5FF] hover:bg-[#00E5FF] !hover:text-white hover:scale-105'
                    ]"
                    style="color: white !important;"
                  >
                    {{ tech }}
                  </button>
                </div>

                <!-- Buttons - ALWAYS VISIBLE -->
                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <!-- View Details Button -->
                  <div class="flex items-center gap-2 text-white bg-cyber-accent/10 border border-cyber-accent px-4 py-2 rounded hover:bg-cyber-accent hover:text-cyber-dark transition-all">
                    <span class="font-space-mono text-sm font-medium uppercase">View Details</span>
                    <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  <!-- Visit Project Button - ALWAYS VISIBLE if URL exists -->
                  <a
                    v-if="project.projectUrl"
                    :href="project.projectUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                    class="flex items-center gap-2 px-4 py-2 bg-white/10 text-white border border-white/30 rounded font-space-mono text-sm font-medium uppercase hover:bg-white hover:text-cyber-dark transition-all"
                  >
                    <span>Visit Site</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
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

      <!-- Empty State - No Matches for Filter -->
      <div v-if="!loading && filteredProjects.length === 0 && projects.length > 0" class="text-center py-20">
        <p class="text-gray-400 font-space-mono text-xl mb-6">
          No projects found with "{{ selectedTechFilter }}" 😔
        </p>
        <button
          @click="selectedTechFilter = null"
          class="px-6 py-3 bg-[#00C9FF] text-white font-space-mono font-bold rounded-lg hover:bg-[#00E5FF] hover:scale-105 transition-all shadow-lg"
        >
          ← Show All Projects
        </button>
      </div>
      
      <!-- Empty State - No Projects at All -->
      <div v-if="!loading && projects.length === 0" class="text-center py-20">
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
const selectedTechFilter = ref<string | null>(null)

// Get all unique tech stacks across all projects
const allTechStacks = computed(() => {
  const techs = new Set<string>()
  projects.value.forEach(project => {
    project.techStack?.forEach(tech => techs.add(tech))
  })
  return Array.from(techs).sort()
})

// Filter projects based on selected tech
const filteredProjects = computed(() => {
  if (!selectedTechFilter.value) return projects.value
  return projects.value.filter(project => 
    project.techStack?.includes(selectedTechFilter.value!)
  )
})

// Toggle tech filter
const toggleTechFilter = (tech: string) => {
  selectedTechFilter.value = selectedTechFilter.value === tech ? null : tech
}

// Anti-Gravity effect (reduced for better spacing)
const { activate, deactivate } = useAntiGravity(projectElements, {
  strength: 0.15,
  tiltIntensity: 3,
  elevationScale: 8,
  smoothness: 0.15
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

// Watch for filter changes and re-animate projects
watch(filteredProjects, async () => {
  await nextTick()
  if (projectElements.value.length) {
    gsap.to(projectElements.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power2.out'
    })
  }
})
</script>