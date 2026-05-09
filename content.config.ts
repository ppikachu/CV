import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      // Define custom schema for collection
      schema: z.object({
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
        tipo: z.string().optional()
      })
    })
  }
})
