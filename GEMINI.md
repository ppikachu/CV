# UI Component Guidelines

- **Nuxt UI First:** Always prefer using plain Nuxt UI components when possible over custom implementations or alternative UI libraries.
- **Clean Components:** Keep Nuxt UI components clean of utility classes. Rely on the component's built-in props and the `ui` prop for styling instead of passing custom classes directly.

# Development Server

- **Host Option:** Always run the development server with the `--host` option (e.g., `pnpm run dev --host`) to ensure it is exposed to the network.
