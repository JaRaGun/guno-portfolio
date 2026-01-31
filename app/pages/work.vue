<template>
  <div class="h-full bg-black px-6 py-12">
    <h1 id="title" class="text-white font-exo text-5xl opacity-0" style="transform: translateY(30px);">MY WORK</h1>
    <div class="flex space-x-4">
      <div ref="projectsElement" v-for="project in projectsData" :key="project.id" class="opacity-0 w-full" style="transform: translateX(30px);">
        <nuxt-link :to="`/work/${project.id}`">
          <img :src="project.image" :alt="project.title" style="height: 70vh" class="object-cover ">
          <p class="text-white font-space-mono text-sm">{{ project.title }}</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template> 
<script setup>
import gsap from 'gsap'
import { onMounted } from 'vue'
import img1 from "~/assets/images/1.jpg"
import img2 from "~/assets/images/2.jpg"
import img3 from "~/assets/images/3.jpg"
import img4 from "~/assets/images/4.jpg"
import img5 from "~/assets/images/5.jpg"
import img6 from "~/assets/images/6.jpg"

 const projectsData = [
  {
    id: 1,
    title: "Work 1",
    image: img1
  },
  {
    id: 2,
    title: "Work 2",
    image: img2
  },
  {
    id: 3,
    title: "Work 3",
    image: img3
  },
  {
    id: 4,
    title: "Work 4",
    image: img4
  },
  {
    id: 5,
    title: "Work 5",
    image: img5
  },
  {
    id: 6,
    title: "Work 6",
    image: img6
  }
 ]
const projectsElement = ref([])
 onMounted(() => {
  gsap.to("#title", { opacity: 1, duration: 1.5, y: 0 , ease: 'expo'})
  gsap.to(projectsElement.value, { opacity: 1, stagger: 0.1, duration: 2, x: 0 , ease: 'expo', delay: 0.3})
 })
</script>