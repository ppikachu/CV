import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['**/_*.md']
      },
      // Define custom schema for collection
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
        tipo: z.string().optional(),
        category: z.string().optional(),
        role: z.union([z.string(), z.array(z.string())]).optional(),
        client: z.string().optional(),
        year: z.string().optional(),
        featured: z.boolean().optional(),
        wip: z.boolean().optional(),
        url: z.string().optional()
      })
    })
  }
})
