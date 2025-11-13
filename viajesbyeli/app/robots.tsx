import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = 'https://www.viajesbyeli.es';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/login', '/api/'], // Rutas que no quieres que Google indexe
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}