<template>
  <nav 
    ref="navbar"
    class="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/40 border-b border-white/10 opacity-0"
    style="transform: translateY(-20px);"
  >
    <NuxtLink to="/" class="flex items-center gap-2 group">
      <div class="w-8 h-8 bg-cyber-accent rounded-sm flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
        <span class="text-white font-bold text-lg -rotate-45 group-hover:rotate-0 transition-transform duration-500 uppercase">G</span>
      </div>
      <span class="text-white font-exo font-bold text-xl tracking-tighter">GUNO</span>
    </NuxtLink>

    <div class="flex items-center gap-4 md:gap-8">
      <NuxtLink 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        class="text-white font-space-mono text-xs md:text-sm uppercase tracking-widest hover:text-cyber-accent transition-all duration-300 relative group py-2 md:px-3 rounded hover:bg-white/5"
        active-class="!text-cyber-accent bg-white/5"
      >
        {{ item.label }}
        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-accent transition-all duration-300 group-hover:w-full" :class="{ 'w-full': $route.path === item.path }"></span>
      </NuxtLink>
    </div>

    <!-- Mobile Menu Button -->
    <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-white">
      <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 top-[65px] bg-black/95 z-[90] flex flex-col items-center justify-center gap-8 md:hidden">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path"
          :to="item.path"
          class="text-2xl text-white font-exo uppercase font-bold tracking-widest"
          active-class="text-cyber-accent"
          @click="isMobileMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import gsap from 'gsap'
const navbar = ref(null)
const isMobileMenuOpen = ref(false)

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
]

onMounted(() => {
  gsap.to(navbar.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.5
  })
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
