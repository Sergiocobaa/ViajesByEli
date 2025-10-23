const API_URL = "https://localhost:59238/api";

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
// Exportamos un objeto ficticio que representa el tipo (solo para que TypeScript lo vea)
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

export async function getOffers() {
  const res = await fetch(`${API_URL}/offers`);
  if (!res.ok) throw new Error("Error al obtener las ofertas");
  return res.json();
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
      destination: data.destino,
      duration: data.duracion,
      imageBase64: data.imagen,
    }),
  });

  if (!res.ok) throw new Error("Error al crear la oferta");
  return res.json();
}
