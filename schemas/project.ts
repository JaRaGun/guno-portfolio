export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text'
                }
            ],
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4
        },
        {
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'projectUrl',
            title: 'Project URL',
            type: 'url'
        },
        {
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text'
                        }
                    ]
                }
            ]
        },
        {
            name: 'orderRank',
            title: 'Order',
            type: 'number',
            hidden: true
        }
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            featured: 'featured'
        },
        prepare(selection: any) {
            const { title, media, featured } = selection
            return {
                title: featured ? `⭐ ${title}` : title,
                media
            }
        }
    }
}
