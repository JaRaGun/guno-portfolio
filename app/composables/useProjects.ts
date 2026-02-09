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

    const getImageUrl = (imageRef: any, width = 1600) => {
        try {
            if (!imageRef) return ''
            // Use the sanity CDN URL directly
            if (imageRef.asset && imageRef.asset._ref) {
                const projectId = 'b5uobbbz'
                const dataset = 'production'
                const imageId = imageRef.asset._ref
                // Convert ref format to CDN URL
                // Format: image-{assetId}-{dimensions}-{format}
                const parts = imageId.split('-')
                if (parts.length >= 4) {
                    const assetId = parts.slice(1, -2).join('-')
                    const dimensions = parts[parts.length - 2]
                    const format = parts[parts.length - 1]
                    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}?w=${width}&q=90&auto=format`
                }
            }
            return ''
        } catch (error) {
            console.error('Error generating image URL:', error)
            return ''
        }
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
