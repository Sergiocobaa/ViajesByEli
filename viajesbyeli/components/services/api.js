// src/services/api.js (Versión Final Corregida)

const SPACE_ID = '7bcymz1z9e0q'; // <- Pega tu Space ID real
const ACCESS_TOKEN = 'Jw96uYYUuMj6LVOKsbdNF_xg'; // <- Pega tu Token de Entrega real
const CONTENT_TYPE = 'Offer'; // <- Asegúrate de que este es el ID de tu modelo

const API_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}&include=1`;

export async function getOffers() {
    try {
        const res = await fetch(API_URL, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error(`Fallo Contentful: ${res.status}`);
        const data = await res.json();
        
        if (!data.items) return [];

        const assets = data.includes?.Asset || [];

        return data.items.map((item) => {
            const imageAssetId = item.fields.image?.sys.id;
            const imageAsset = assets.find(asset => asset.sys.id === imageAssetId);
            const imageUrl = imageAsset ? `https:${imageAsset.fields.file.url}` : '/placeholder.svg';
            
            // 🛑 CORRECCIÓN DEL PRECIO AQUÍ 🛑
            const priceValue = item.fields.price || 0; // Usa el Field ID correcto (ej: item.fields.precio) y da valor 0 si no existe
            
            return {
                id: item.sys.id,
                title: item.fields.title || 'Sin Título',
                description: item.fields.description || '',
                price: `€${priceValue.toFixed(0)}`, // Ahora esto no fallará
                destination: item.fields.destination || 'Desconocido',
                duration: item.fields.duration || 'N/A',
                tipo: item.fields.tipo || 'General', 
                imageUrl: imageUrl,
                discount: "25% OFF", // Mantenemos los datos fijos
                people: "2 personas", 
            }
        });

    } catch (error) {
        console.error("Error grave al obtener ofertas de Contentful:", error);
        throw new Error("Fallo al conectar con Contentful. Revisa claves/IDs.");
    }
}

// 🛑 Elimina o comenta la función getOfferById si no la has implementado aún
/*
export async function getOfferById(id) {
    // ... Lógica para buscar por ID usando Contentful (client.getEntry(id))
}
*/