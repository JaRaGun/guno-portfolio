import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
    name: 'default',
    title: 'Guno Portfolio',

    projectId: 'b5uobbbz',
    dataset: 'production',

    // API version for queries (use today's date or your preferred version)
    apiVersion: '2024-01-01',

    // Base path for the studio (if embedded in Nuxt)
    basePath: '/studio',

    plugins: [deskTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
})