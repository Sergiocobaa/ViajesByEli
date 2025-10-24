// src/services/api.js

// CAMBIA ESTA LÍNEA (Quita localhost:59238)
const API_URL = "https://viajesbyeliapi-befbegaccmhtb9gt.canadacentral-01.azurewebsites.net/api";
// 🛑 AÑADE ESTA DEFINICIÓN DEL TIPO DE DATOS 🛑
/**
 * @typedef {object} Offer
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {string} destination
 * @property {string} duration
 * @property {string} imageUrl
 * @property {string} [tipo] - Opcional, si existe en tu API
 */

/** @type {Offer} */
export const Offer = {};
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Error de inicio de sesión");
  return res.json();
}
export async function getOfferById(id) {

    const res = await fetch(`${API_URL}/offers/${id}`);

    if (!res.ok) {
        throw new Error(`Error al buscar la oferta. Código: ${res.status}`);
    }

    return res.json();
}
export async function getOffers() {
  const res = await fetch(`${API_URL}/offers`);
  if (!res.ok) throw new Error("Error al obtener las ofertas");
  return res.json();
}
export async function deleteOffer(id, token) {
  // 2. La llamada fetch debe recibir el token.
  const res = await fetch(`${API_URL}/offers/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`, // <--- ¡Esta línea es crítica!
    },
  });

  // 3. Manejamos el 204 No Content
  if (res.status === 204) {
    return true; 
  }
  
  if (!res.ok) {
    // Si no es 204 y falla, lanza error
    const errorData = await res.json().catch(() => ({ message: `Error al eliminar. Código: ${res.status}` }));
    throw new Error(errorData.message || `Fallo al eliminar (Status: ${res.status}).`);
  }
  
  return true; 
}

export async function createOffer(data, token) {
  const res = await fetch(`${API_URL}/offers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: data.titulo,
      description: data.descripcion,
      price: parseFloat(data.precio),
      destination: data.destination,
      duration: data.duration,
      imageBase64: data.imagen,
    }),
  });

  if (!res.ok) throw new Error("Error al crear la oferta");
  return res.json();
}
