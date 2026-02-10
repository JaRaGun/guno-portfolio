<template>
  <div class="relative w-full h-full bg-black overflow-hidden">
    <!-- Three.js Container -->
    <div ref="threeContainer" class="absolute inset-0 z-0"></div>
    
    <!-- UI Layer -->
    <main class="relative z-10 flex items-center justify-center w-full h-full p-6 pointer-events-none">
      <transition name="fade">
        <div v-if="isMounted" id="container" class="text-white text-center font-space-mono w-full max-w-2xl pointer-events-auto">
          <h1 id="name" class="text-sm opacity-0" style="transform: translateY(30px)">Jan Rafael C. Guno</h1>
          <p id="intro" class="font-exo uppercase text-4xl opacity-0 mt-4" style="transform: translateY(30px)">
            Welcome! Explore my work as a Full Stack Web Developer, where design meets functionality.
          </p>
          <a style="transform: translateY(30px)" id="view-btn" target="_blank" href=""
            class="opacity-0 border px-4 py-2 uppercase mt-8 hover:bg-white hover:text-gray-800 inline-block">View work</a>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, PlaneGeometry, MeshPhongMaterial, BufferGeometry, BufferAttribute, PointsMaterial, Points, DirectionalLight, Raycaster, DoubleSide, FlatShading, Float32BufferAttribute, Color } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted, onUnmounted, ref } from 'vue'

const isMounted = ref(false)
const threeContainer = ref(null)
let renderer
let gui
let animationId
let camera
let viewBtn

const mouse = {
  x: undefined,
  y: undefined
}

const onMouseMove = (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
}

const handleResize = () => {
  if (!renderer || !camera) return
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
}

const onViewBtnClick = function (e) {
  if (!camera) return
  e.preventDefault();
  gsap.to("#container", { opacity: 0 })
  gsap.to(camera.position, { z: 25, duration: .5, ease: 'power3.inOut' })
  gsap.to(camera.rotation, { x: 1.57, duration: 2, delay: 0.5, ease: 'power3.inOut' })
  gsap.to(camera.position, { y: 1000, duration: 2, ease: 'power3.in', delay: 2, 
    onComplete: () => {
      navigateTo('/work');
    }
  })
}

// Lifecycle hooks MUST be at the top level
onMounted(async () => {
  // Register cleanup immediately
  onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', handleResize)
    if (viewBtn) viewBtn.removeEventListener("click", onViewBtnClick)
    
    if (renderer && renderer.domElement) {
      if (threeContainer.value && threeContainer.value.contains(renderer.domElement)) {
          threeContainer.value.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
    if (gui) gui.destroy()
  })

  // Set mounted flag
  isMounted.value = true
  
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', onMouseMove)

  const dat = await import('dat.gui')
  gui = new dat.GUI({ autoPlace: false })
  const guiContainer = document.createElement('div')
  guiContainer.style.position = 'absolute'
  guiContainer.style.bottom = '20px'
  guiContainer.style.right = '20px'
  guiContainer.style.zIndex = '100'
  threeContainer.value.appendChild(guiContainer)
  guiContainer.appendChild(gui.domElement)
  
  // Style the GUI to match the theme
  gui.domElement.style.marginTop = '0'
  const guiMain = gui.domElement.querySelector('.main')
  if (guiMain) guiMain.style.width = '245px'
  
  const world = {
    plane: { width: 400, height: 400, widthSegments: 50, heightSegments: 50 }
  }

  const raycaster = new Raycaster()
  const scene = new Scene()
  scene.background = new Color(0x000000)
  
  camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
  renderer = new WebGLRenderer({ antialias: true })

  renderer.setSize(innerWidth, innerHeight)
  renderer.setPixelRatio(devicePixelRatio)
  
  if (threeContainer.value) {
    threeContainer.value.appendChild(renderer.domElement)
  }

  new OrbitControls(camera, renderer.domElement)
  camera.position.z = 50

  const planeMesh = new Mesh(
    new PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments),
    new MeshPhongMaterial({ side: DoubleSide, flatShading: FlatShading, vertexColors: true })
  )
  scene.add(planeMesh)
  
  const generatePlane = () => {
    planeMesh.geometry.dispose()
    planeMesh.geometry = new PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments)
    const { array } = planeMesh.geometry.attributes.position
    const randomValues = []
    for (let i = 0; i < array.length; i++) {
      if (i % 3 === 0) {
        array[i] += (Math.random() - 0.5) * 3
        array[i + 1] += (Math.random() - 0.5) * 3
        array[i + 2] += (Math.random() - 0.5) * 3
      }
      randomValues.push(Math.random() * Math.PI * 2)
    }
    planeMesh.geometry.attributes.position.randomValues = randomValues
    planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array.slice()

    const colors = []
    for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
        colors.push(0, 0.19, 0.4)
    }
    planeMesh.geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3))
  }

  gui.add(world.plane, 'width', 1, 500).onChange(generatePlane)
  gui.add(world.plane, 'height', 1, 500).onChange(generatePlane)
  gui.add(world.plane, 'widthSegments', 1, 100).onChange(generatePlane)
  gui.add(world.plane, 'heightSegments', 1, 100).onChange(generatePlane)

  generatePlane()

  const light = new DirectionalLight(0xffffff, 1)
  light.position.set(0, -1, 1)
  scene.add(light)

  const backLight = new DirectionalLight(0xffffff, 1)
  backLight.position.set(0, 0, -1)
  scene.add(backLight)

  const starGeometry = new BufferGeometry()
  const starMaterial = new PointsMaterial({ color: 0xffffff })
  const starVertices = []
  for (let i = 0; i < 10000; i++) {
    starVertices.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000)
  }
  starGeometry.setAttribute('position', new Float32BufferAttribute(starVertices, 3))
  const stars = new Points(starGeometry, starMaterial)
  scene.add(stars)

  let frame = 0
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    renderer.render(scene, camera)
    raycaster.setFromCamera(mouse, camera)
    frame += 0.01

    const { array, originalPosition, randomValues } = planeMesh.geometry.attributes.position
    if (array) {
      for (let i = 0; i < array.length; i += 3) {
        array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.01
        array[i + 1] = originalPosition[i+1] + Math.sin(frame + randomValues[i+1]) * 0.001
      }
      planeMesh.geometry.attributes.position.needsUpdate = true
    }

    const intersects = raycaster.intersectObject(planeMesh)
    if (intersects.length > 0) {
      const { color } = planeMesh.geometry.attributes
      const initialColor = { r: 0, g: 0.19, b: 0.4 }
      const hoverColor = { r: 0.1, g: 0.5, b: 1 }

      color.setX(intersects[0].face.a, hoverColor.r); color.setY(intersects[0].face.a, hoverColor.g); color.setZ(intersects[0].face.a, hoverColor.b)
      color.setX(intersects[0].face.b, hoverColor.r); color.setY(intersects[0].face.b, hoverColor.g); color.setZ(intersects[0].face.b, hoverColor.b)
      color.setX(intersects[0].face.c, hoverColor.r); color.setY(intersects[0].face.c, hoverColor.g); color.setZ(intersects[0].face.c, hoverColor.b)
      color.needsUpdate = true

      gsap.to(hoverColor, {
        r: initialColor.r, g: initialColor.g, b: initialColor.b, duration: 1,
        onUpdate: () => {
          if (!planeMesh.geometry) return;
          const { color } = planeMesh.geometry.attributes;
          color.setX(intersects[0].face.a, hoverColor.r); color.setY(intersects[0].face.a, hoverColor.g); color.setZ(intersects[0].face.a, hoverColor.b)
          color.setX(intersects[0].face.b, hoverColor.r); color.setY(intersects[0].face.b, hoverColor.g); color.setZ(intersects[0].face.b, hoverColor.b)
          color.setX(intersects[0].face.c, hoverColor.r); color.setY(intersects[0].face.c, hoverColor.g); color.setZ(intersects[0].face.c, hoverColor.b)
          color.needsUpdate = true
        }
      })
    }
    stars.rotation.x += 0.0005
  }
  animate()

  // Set mounted flag AFTER scene initialization to avoid white flash
  isMounted.value = true

  gsap.to("#name", { opacity: 1, duration: 2, y: 0, ease: 'expo' })
  gsap.to("#intro", { opacity: 1, duration: 2, delay: 0.4, y: 0, ease: 'expo' })
  gsap.to("#view-btn", { opacity: 1, duration: 2, delay: 0.8, y: 0, ease: 'expo' })

  viewBtn = document.getElementById("view-btn")
  if (viewBtn) viewBtn.addEventListener("click", onViewBtnClick)
})
</script>

<style>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  z-index: 0;
}

.fade-enter-active, .fade-leave-active { transition: opacity 1s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>