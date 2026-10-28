export default defineEventHandler((event) => {
  const host = getRequestHost(event, { xForwardedHost: true })

  // Check if request comes from the legacy vercel domain
  if (host.startsWith('toyos.vercel.app')) {
    // Preserve Google Search Console verification file so ownership check doesn't fail
    if (event.path.startsWith('/google') && event.path.endsWith('.html')) {
      return
    }

    return sendRedirect(event, `https://toyos.ar${event.path}`, 301)
  }
})
