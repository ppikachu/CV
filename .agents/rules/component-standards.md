# Component Development Standards

## Nuxt UI v4 Standards (Nuxt 4 + Tailwind CSS v4)
- **Version**: The project uses **Nuxt UI v4** (`@nuxt/ui`) with **Nuxt 4** and **Tailwind CSS v4**.
- **Unified Package**: All components (including former Pro components like `UPageCard`, `UPageHero`, `UPageSection`, etc.) are imported directly from `@nuxt/ui`. Never reference `@nuxt/ui-pro`.
- **Default Components**: Whenever building or updating UI, use standard Nuxt UI components (`UButton`, `UCard`, `UModal`, `UInput`, `UContainer`, `UFieldGroup`, etc.) instead of recreating primitives with raw HTML.
- **Color System & Theming**:
  - Semantic colors (`primary`, `secondary`, `success`, `info`, `warning`, `error`, `neutral`) are configured in [`app/app.config.ts`](file:///Users/santiago/Local%20Sites/CV/app/app.config.ts) under `ui.colors`.
  - Do NOT manually write 50–950 CSS variable scales in stylesheets for standard Tailwind colors; `@nuxt/ui` handles color mapping automatically at runtime.
  - Never use v2 `ui.primary`/`ui.gray` config or v2 color names (`gray`, `black`, `white`) in `color` props; use semantic aliases or `neutral`.
- **Component Renames in v4**:
  - `UButtonGroup` → `UFieldGroup`
  - `UPageMarquee` → `UMarquee`
  - `UPageAccordion` → `UAccordion`
  - Input model modifiers use `nullable` (formerly `nullify`) and `optional`.
- **Component Styling & Overrides**:
  - Component theming in [`app/app.config.ts`](file:///Users/santiago/Local%20Sites/CV/app/app.config.ts) or via `:ui` props uses the **Tailwind Variants API** (`slots`, `defaultVariants`, `variants`).
  - Keep Nuxt UI components unstyled/default unless explicitly instructed. Do not apply arbitrary style wrappers.

## VueUse Composables
- **Prefer VueUse**: Whenever handling common reactive patterns, DOM interactions, or browser APIs (e.g., event listeners, scroll, media queries, window size, clipboard, state/storage, debounce/throttle), use `@vueuse/core` / `@vueuse/nuxt` composables.
- Avoid reinventing native JavaScript listeners or custom composables when an equivalent VueUse utility is available.
