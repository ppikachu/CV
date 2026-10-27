# UI Component Guidelines

- **Nuxt UI First:** Always prefer using plain Nuxt UI components when possible over custom implementations or alternative UI libraries.
- **Clean Components:** Keep Nuxt UI components clean of utility classes. Rely on the component's built-in props and the `ui` prop for styling instead of passing custom classes directly.

# Development Server

- **Host Option:** Always run the development server with the `--host` option (e.g., `pnpm run dev --host`) to ensure it is exposed to the network.

# Sitemap & SEO Maintenance

- **Static Sitemap (`public/sitemap.xml`):** The site uses a static sitemap without dynamic module generation. Whenever new projects, pages, or localized routes are added, renamed, or deleted in `content/` or `app/pages/`, always update `public/sitemap.xml` with the corresponding URLs (`https://toyos.ar/...` for both default Spanish and English `/en/...` versions).
