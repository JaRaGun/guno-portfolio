<template>
  <div class="min-h-screen bg-cyber-dark cyber-grid pt-24 pb-20 px-6">
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Hero Section -->
      <section id="about-hero" class="opacity-0 translate-y-[30px]">
        <h1 class="text-white font-exo text-5xl md:text-7xl font-bold glow-text mb-6 uppercase">About Me</h1>
        <p class="text-gray-300 font-space-mono text-lg leading-relaxed max-w-2xl">
          Hi, I'm Jan Rafael C. Guno, a passionate Full Stack Web Developer. 
          I specialize in building high-performance, visually stunning web applications 
          where every pixel and every line of code serves a purpose.
        </p>
      </section>

      <!-- Skills Section -->
      <section id="about-skills" class="opacity-0 translate-y-[30px]">
        <h2 class="text-cyber-accent font-space-mono text-sm uppercase tracking-widest mb-8">Technical Expertise</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(group, index) in skillGroups" :key="index" class="glass-card p-6 rounded-lg">
            <h3 class="text-white font-exo text-xl font-bold mb-4">{{ group.title }}</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="skill in group.skills" 
                :key="skill"
                class="px-3 py-1 bg-white/5 border border-white/10 rounded font-space-mono text-xs text-gray-400"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Background Section -->
      <section id="about-background" class="opacity-0 translate-y-[30px] glass-card p-8 rounded-xl border-cyber-accent/20">
        <h2 class="text-white font-exo text-3xl font-bold mb-6">My Journey</h2>
        <div class="space-y-6 font-space-mono text-gray-300">
          <p>
            With a background in both development and design, I bridge the gap between complex logic and user-friendly interfaces. 
            I love exploring new technologies and pushing the boundaries of what's possible in the browser.
          </p>
          <p>
            Whether it's crafting interactive 3D experiences with Three.js or architecting scalable backend systems, 
            I bring a detail-oriented approach to every project.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'

const skillGroups = [
  {
    title: 'Frontend',
    skills: ['Nuxt.js', 'Vue.js', 'React', 'Tailwind CSS', 'Three.js', 'GSAP']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Laravel', 'Python', 'Sanity CMS', 'MySQL', 'MongoDB']
  },
  {
    title: 'Tools',
    skills: ['Git', 'Docker', 'Figma', 'AWS', 'Netlify', 'Vercel']
  }
]

onMounted(() => {
  const timeline = gsap.timeline({ defaults: { ease: 'expo.out' } })
  
  timeline
    .to('#about-hero', { opacity: 1, y: 0, duration: 1.5 })
    .to('#about-skills', { opacity: 1, y: 0, duration: 1.5 }, '-=1')
    .to('#about-background', { opacity: 1, y: 0, duration: 1.5 }, '-=1')
})
</script>
