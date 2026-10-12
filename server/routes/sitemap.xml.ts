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
    { es: '/', en: '/en' },
    { es: '/print', en: '/en/print' }
  ]

  for (const route of staticRoutes) {
    const esUrl = `${host}${route.es}`
    const enUrl = `${host}${route.en}`
    xml += `  <url>\n    <loc>${esUrl}</loc>\n    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>\n  </url>\n`
    xml += `  <url>\n    <loc>${enUrl}</loc>\n    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>\n  </url>\n`
  }

  for (const slug of projectSlugs) {
    const esUrl = `${host}/proyecto/${slug}`
    const enUrl = `${host}/en/proyecto/${slug}`
    xml += `  <url>\n    <loc>${esUrl}</loc>\n    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>\n  </url>\n`
    xml += `  <url>\n    <loc>${enUrl}</loc>\n    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}"/>\n  </url>\n`
  }

  xml += '</urlset>\n'
  return xml
})
