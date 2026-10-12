import { defineEventHandler, setHeader } from 'h3'
import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')

  const publicSitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml')
  if (fs.existsSync(publicSitemapPath)) {
    return fs.readFileSync(publicSitemapPath, 'utf-8')
  }

  // Fallback programmatic generation
  const host = 'https://toyos.vercel.app'
  const projectSlugs = [
    'luznegra-web',
    'kinoto',
    'gl',
    'luznegra-video',
    'websites',
    'sanders-web',
    'susan-ibitz',
    'interactivos',
    'commercial-video',
    'logos',
    'grafica',
    'mosaico-instagram',
    'piezas',
    'cnb'
  ]

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

  const staticRoutes = [
    { es: '/', en: '/en', priority: '1.0', changefreq: 'weekly' },
    { es: '/print', en: '/en/print', priority: '0.5', changefreq: 'monthly' }
  ]

  for (const route of staticRoutes) {
    xml += `  <url>\n    <loc>${host}${route.es}</loc>\n    <xhtml:link rel="alternate" hreflang="es" href="${host}${route.es}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${host}${route.en}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${host}${route.es}"/>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>\n`
    xml += `  <url>\n    <loc>${host}${route.en}</loc>\n    <xhtml:link rel="alternate" hreflang="es" href="${host}${route.es}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${host}${route.en}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${host}${route.es}"/>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority === '1.0' ? '0.9' : route.priority}</priority>\n  </url>\n`
  }

  for (const slug of projectSlugs) {
    xml += `  <url>\n    <loc>${host}/proyecto/${slug}</loc>\n    <xhtml:link rel="alternate" hreflang="es" href="${host}/proyecto/${slug}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${host}/en/proyecto/${slug}"/>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`
    xml += `  <url>\n    <loc>${host}/en/proyecto/${slug}</loc>\n    <xhtml:link rel="alternate" hreflang="es" href="${host}/proyecto/${slug}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${host}/en/proyecto/${slug}"/>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`
  }

  xml += '</urlset>\n'
  return xml
})
