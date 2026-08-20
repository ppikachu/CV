# Component Development Standards

## Nuxt UI Components
- **Default Components**: Whenever building or updating components, use standard Nuxt UI components (`UButton`, `UCard`, `UModal`, `UInput`, `UContainer`, etc.) instead of recreating primitives with raw HTML.
- **No Extra / Ad-hoc Styling**: Keep Nuxt UI components unstyled/default. Do not apply custom CSS classes, arbitrary Tailwind overrides, or style wrappers unless explicitly instructed by the user.

## VueUse Composables
- **Prefer VueUse**: Whenever handling common reactive patterns, DOM interactions, or browser APIs (e.g., event listeners, scroll, media queries, window size, clipboard, state/storage, debounce/throttle), use `@vueuse/core` / `@vueuse/nuxt` composables.
- Avoid reinventing native JavaScript listeners or custom composables when an equivalent VueUse utility is available.
