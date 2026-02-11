<template>
  <div class="min-h-screen bg-cyber-dark cyber-grid pt-24 pb-20 px-6">
    <div class="max-w-4xl mx-auto">
      <h1 id="contact-title" class="text-white font-exo text-5xl md:text-7xl font-bold glow-text mb-12 uppercase opacity-0 translate-y-[30px]">Get in Touch</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div id="contact-form" class="glass-card p-8 rounded-xl opacity-0 translate-y-[30px]">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-white font-space-mono text-xs uppercase tracking-widest mb-2">Name</label>
              <input 
                v-model="form.name"
                type="text" 
                required
                class="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white font-space-mono focus:border-cyber-accent outline-none transition-colors"
                placeholder="YOUR NAME"
              />
            </div>
            <div>
              <label class="block text-white font-space-mono text-xs uppercase tracking-widest mb-2">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                required
                class="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white font-space-mono focus:border-cyber-accent outline-none transition-colors"
                placeholder="YOUR@EMAIL.COM"
              />
            </div>
            <div>
              <label class="block text-white font-space-mono text-xs uppercase tracking-widest mb-2">Message</label>
              <textarea 
                v-model="form.message"
                rows="4"
                required
                class="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-white font-space-mono focus:border-cyber-accent outline-none transition-colors"
                placeholder="HOW CAN I HELP YOU?"
              ></textarea>
            </div>
            <button 
              type="submit"
              :disabled="loading"
              class="w-full py-4 bg-cyber-accent text-white font-exo font-bold uppercase tracking-widest hover:text-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Sending Signal...' : 'Send Signal' }}
            </button>

            <!-- Success/Error Feedback -->
            <p v-if="success" class="text-green-400 font-space-mono text-sm mt-4 text-center animate-pulse">
              Signal received! I'll get back to you soon.
            </p>
            <p v-if="error" class="text-red-400 font-space-mono text-sm mt-4 text-center">
              {{ errorMessage || 'Transmission failed. Please try again or use direct email.' }}
            </p>
          </form>
        </div>

        <!-- Contact Info & Socials -->
        <div id="contact-info" class="space-y-12 opacity-0 translate-y-[30px]">
          <div class="space-y-4">
            <h2 class="text-white font-exo text-2xl font-bold">Connections</h2>
            <p class="text-gray-400 font-space-mono text-sm leading-relaxed">
              Available for freelance projects, collaborations, or just a friendly chat about technology and design.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <a 
              v-for="link in socialLinks" 
              :key="link.label"
              :href="link.url"
              target="_blank"
              class="flex items-center gap-4 p-4 glass-card rounded group hover:border-cyber-accent transition-colors"
            >
              <div class="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-gray-400 group-hover:text-cyber-accent group-hover:border-cyber-accent transition-all">
                <component :is="link.icon" class="w-5 h-5" />
              </div>
              <div>
                <span class="block text-white font-exo font-bold text-sm">{{ link.label }}</span>
                <span class="text-xs text-gray-500 font-space-mono">{{ link.value }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { Github, Linkedin, Mail, Twitter } from 'lucide-vue-next'

const config = useRuntimeConfig()
const socialLinks = [
  { label: 'GitHub', value: 'github.com/guno-dev', url: 'https://github.com/JaRaGun', icon: Github },
  { label: 'LinkedIn', value: 'linkedin.com/in/jan-rafael-guno', url: 'https://www.linkedin.com/in/jan-rafael-guno-0145431b7/', icon: Linkedin },
  { label: 'Email', value: config.public.email, url: 'mailto:' + config.public.email, icon: Mail },
  { label: 'X / Twitter', value: '@guno_dev', url: 'https://twitter.com/@guno_jan', icon: Twitter }
]

const form = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  loading.value = true
  success.value = false
  error.value = false
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })
    
    success.value = true
    form.value = { name: '', email: '', message: '' } // Reset form
  } catch (err) {
    error.value = true
    errorMessage.value = err.statusMessage || 'Failed to send message.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const timeline = gsap.timeline({ defaults: { ease: 'expo.out' } })
  
  timeline
    .to('#contact-title', { opacity: 1, y: 0, duration: 1.5 })
    .to('#contact-form', { opacity: 1, y: 0, duration: 1.5 }, '-=1.2')
    .to('#contact-info', { opacity: 1, y: 0, duration: 1.5 }, '-=1.2')
})

</script>
