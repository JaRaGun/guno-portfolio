import { ref, onMounted, onUnmounted, computed, type Ref } from 'vue'
import gsap from 'gsap'

export interface AntiGravityOptions {
    strength?: number
    tiltIntensity?: number
    elevationScale?: number
    smoothness?: number
}

export const useAntiGravity = (
    elementRefs: Ref<HTMLElement[]> | Ref<HTMLElement | null>,
    options: AntiGravityOptions = {}
) => {
    const {
        strength = 0.3,
        tiltIntensity = 10,
        elevationScale = 20,
        smoothness = 0.15
    } = options

    const mouse = ref({ x: 0, y: 0 })
    const isHovering = ref(false)
    let rafId: number | null = null

    const updateMousePosition = (e: MouseEvent) => {
        mouse.value = {
            x: e.clientX,
            y: e.clientY
        }
    }

    const calculateMagneticPull = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = mouse.value.x - centerX
        const deltaY = mouse.value.y - centerY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        const maxDistance = Math.max(rect.width, rect.height)
        const normalizedDistance = Math.min(distance / maxDistance, 1)

        return {
            x: deltaX * strength * (1 - normalizedDistance),
            y: deltaY * strength * (1 - normalizedDistance),
            distance: normalizedDistance
        }
    }

    const applyAntiGravityEffect = (element: HTMLElement, isActive: boolean) => {
        if (!isActive) {
            gsap.to(element, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                z: 0,
                duration: smoothness * 2,
                ease: 'power2.out'
            })
            return
        }

        const pull = calculateMagneticPull(element)
        const rect = element.getBoundingClientRect()

        // Calculate tilt based on mouse position relative to element
        const relativeX = (mouse.value.x - rect.left) / rect.width - 0.5
        const relativeY = (mouse.value.y - rect.top) / rect.height - 0.5

        const rotateY = relativeX * tiltIntensity
        const rotateX = -relativeY * tiltIntensity
        const elevation = (1 - pull.distance) * elevationScale

        gsap.to(element, {
            x: pull.x,
            y: pull.y,
            rotateX,
            rotateY,
            z: elevation,
            duration: smoothness,
            ease: 'power2.out',
            transformPerspective: 1000
        })
    }

    const animate = () => {
        const elements = Array.isArray(elementRefs.value)
            ? elementRefs.value
            : elementRefs.value ? [elementRefs.value] : []

        elements.forEach((element: HTMLElement | null) => {
            if (!element) return

            const rect = element.getBoundingClientRect()
            const isInRange =
                mouse.value.x >= rect.left - 20 &&
                mouse.value.x <= rect.right + 20 &&
                mouse.value.y >= rect.top - 20 &&
                mouse.value.y <= rect.bottom + 20

            applyAntiGravityEffect(element, isInRange && isHovering.value)
        })

        rafId = requestAnimationFrame(animate)
    }

    const activate = () => {
        isHovering.value = true
    }

    const deactivate = () => {
        isHovering.value = false
    }

    onMounted(() => {
        window.addEventListener('mousemove', updateMousePosition)
        animate()
    })

    onUnmounted(() => {
        window.removeEventListener('mousemove', updateMousePosition)
        if (rafId) cancelAnimationFrame(rafId)
    })

    return {
        activate,
        deactivate,
        isActive: computed(() => isHovering.value)
    }
}
