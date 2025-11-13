import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

// Define la URL base de producción
const BASE_URL = 'https://www.viajesbyeli.es';

// Define la interfaz de tu JSON para TypeScript
interface Offer {
  id: number;
  // Puedes añadir más propiedades si las usas, pero con id basta para la URL
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // --- A. RUTAS ESTÁTICAS ---
  // Define las páginas fijas de tu web
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/politica-de-privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politica-de-cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/destinos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  let offerRoutes: MetadataRoute.Sitemap = [];

  try {
    const filePath = path.join(process.cwd(), 'public', 'ofertas.json');
    // Lee el archivo
    const fileContent = await fs.readFile(filePath, 'utf8');
    const offers: Offer[] = JSON.parse(fileContent);

    offerRoutes = offers.map((offer) => ({
      url: `${BASE_URL}/ofertas/${offer.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  } catch (error) {
    console.error('Error generando sitemap dinámico:', error);
  }

  return [...staticRoutes, ...offerRoutes];
}