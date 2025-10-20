const API_URL = "https://localhost:59238/api";

// --- LOGIN ---
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Error de inicio de sesión");
  return res.json();
}

// --- OBTENER TODAS LAS OFERTAS ---
export async function getOffers() {
  const res = await fetch(`${API_URL}/offers`);
  if (!res.ok) throw new Error("Error al obtener las ofertas");
  return res.json();
}

// --- CREAR OFERTA ---
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
      imageBase64: data.imagen, // enviamos el base64 al backend
    }),
  });

  if (!res.ok) throw new Error("Error al crear la oferta");
  return res.json();
}
