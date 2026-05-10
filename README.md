# Santiago Toyos - Online Portfolio & CV

This is the source code for my personal portfolio and online CV, available at [toyos.vercel.app](https://toyos.vercel.app). 
It showcases my experience in multimedia content, design, motion graphics, and web development.

## 🚀 Tech Stack

This project is built with a modern web stack focusing on performance, SEO, and developer experience:

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **UI & Styling**: [Nuxt UI](https://ui.nuxt.com/) with Tailwind CSS
- **Content Management**: [Nuxt Content v3](https://content.nuxt.com/) (powered by local Markdown files and SQLite)
- **Internationalization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/) (English and Spanish)
- **Analytics**: Vercel Analytics

## 📂 Project Structure

- `app/` - Nuxt application core components, pages, plugins, and composables.
- `content/` - Markdown files that drive the portfolio content. It is split into `en/` and `es/` for localization.
- `public/` - Static assets like images, videos, and icons used throughout the site.
- `server/` - Nitro server-side logic and API endpoints.

## 🛠️ Setup & Development

Make sure to install the dependencies (using pnpm):

```bash
pnpm install
```

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## 🏗️ Build

Build the application for production:

```bash
pnpm run build
```

Locally preview the production build:

```bash
pnpm run preview
```

## 🌐 Content Management

All portfolio projects are driven by Markdown files inside the `content/` directory. 
To add or modify a project, simply create or edit a markdown file in the respective language folder (`content/en/proyecto` or `content/es/proyecto`), using the frontmatter for metadata (title, description, tags, images, etc.).
