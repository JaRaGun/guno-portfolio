export interface Project {
    _id: string
    title: string
    slug: string
    mainImage: {
        asset: {
            _ref: string
            _type: string
        }
        alt?: string
    }
    description?: string
    techStack?: string[]
    projectUrl?: string
    featured?: boolean
    gallery?: Array<{
        asset: {
            _ref: string
            _type: string
        }
        alt?: string
    }>
}

export const useProjects = () => {
    const projects = useState<Project[]>('projects', () => [])
    const loading = useState('projects-loading', () => false)
    const error = useState<Error | null>('projects-error', () => null)

    const fetchProjects = async () => {
        loading.value = true
        error.value = null

        try {
            const { sanityClient, queries } = await import('~/lib/sanity')
            const data = await sanityClient.fetch<Project[]>(queries.allProjects)
            projects.value = data
        } catch (e) {
            error.value = e as Error
            console.error('Error fetching projects:', e)
        } finally {
            loading.value = false
        }
    }

    const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
        try {
            const { sanityClient, queries } = await import('~/lib/sanity')
            const data = await sanityClient.fetch<Project>(queries.projectBySlug(slug))
            return data
        } catch (e) {
            console.error('Error fetching project:', e)
            return null
        }
    }

    const getImageUrl = (imageRef: any, width = 800) => {
        if (!imageRef) return ''
        const { urlFor } = require('~/lib/sanity')
        return urlFor(imageRef).width(width).url()
    }

    return {
        projects: readonly(projects),
        loading: readonly(loading),
        error: readonly(error),
        fetchProjects,
        fetchProjectBySlug,
        getImageUrl
    }
}
