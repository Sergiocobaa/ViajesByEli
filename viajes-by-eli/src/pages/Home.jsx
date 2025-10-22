import { useState, useEffect } from "react";
import { getOffers } from "../services/api"; // tu servicio para traer las ofertas

// src/app/layout.jsx (o .tsx)

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        {/* PEGA ESTE SCRIPT AQUÍ */}
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({
    precioMax: 2000,
    duracion: "",
    destino: "",
    tipo: "",
  });
  const [ofertas, setOfertas] = useState([]);
  const [detalle, setDetalle] = useState(null); // viaje seleccionado para modal

  // 🔹 Cargar ofertas desde la API al montar el componente
  useEffect(() => {
    getOffers()
      .then((data) => setOfertas(data))
      .catch(console.error);
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const filtrados = ofertas.filter((viaje) => {
    const cumpleBusqueda =
      viaje.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      viaje.destination?.toLowerCase().includes(busqueda.toLowerCase());
    const cumplePrecio = viaje.price <= filtros.precioMax;
    const cumpleDestino =
      filtros.destino === "" || viaje.destination === filtros.destino;
    const cumpleTipo =
      filtros.tipo === "" || viaje.tipo === filtros.tipo;
    const cumpleDuracion =
      filtros.duracion === "" || viaje.duration === filtros.duracion;
    return (
      cumpleBusqueda &&
      cumplePrecio &&
      cumpleDestino &&
      cumpleTipo &&
      cumpleDuracion
    );
  });

  const cerrarModal = () => setDetalle(null);
  const contactar = (viaje) => {
    // reemplaza con el correo de tu madre
    window.open(`mailto:mama@example.com?subject=Información sobre ${viaje.title}`);
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="bg-cover bg-center h-[350px] flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=60')",
        }}
      >
        <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg text-center mb-4">
          Encuentra tu escapada perfecta
        </h2>
        <div className="w-full max-w-2xl mx-auto px-4">
          <div className="flex">
            <input
              type="text"
              placeholder="¿A dónde quieres viajar?"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1 p-3 rounded-l-lg text-gray-800"
            />
            <button className="bg-eliCoral text-white px-6 rounded-r-lg hover:bg-eliBlue">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Contenido filtros + resultados */}
      <main className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Filtros laterales */}
        <aside className="md:w-1/4 bg-white p-4 rounded-lg shadow-lg h-fit">
          <h3 className="text-xl font-semibold text-eliBlue mb-4">Filtrar resultados</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Precio máximo (€)</label>
            <input
              type="range"
              min="0"
              max="5000"
              name="precioMax"
              value={filtros.precioMax}
              onChange={handleFiltroChange}
              className="w-full"
            />
            <span className="text-sm text-gray-600">Hasta {filtros.precioMax} €</span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Destino</label>
            <select
              name="destino"
              value={filtros.destino}
              onChange={handleFiltroChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Todos</option>
              {Array.from(new Set(ofertas.map((v) => v.destination))).map((dest) => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select
              name="tipo"
              value={filtros.tipo}
              onChange={handleFiltroChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Todos</option>
              {Array.from(new Set(ofertas.map((v) => v.tipo).filter(Boolean))).map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Resultados */}
        <section className="md:w-3/4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((viaje) => (
            <div key={viaje.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              {viaje.imageUrl && (
                <img
                  src={`data:image/jpeg;base64,${viaje.imageUrl}`}
                  alt={viaje.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h4 className="text-lg font-bold text-eliBlue mb-2">{viaje.title}</h4>
                <p className="text-gray-600 mb-2">{viaje.description.substring(0, 80)}...</p>
                <p className="text-eliCoral font-semibold">Desde {viaje.price} €</p>
                <button
                  className="mt-3 bg-eliCoral hover:bg-eliBlue text-white py-2 w-full rounded"
                  onClick={() => setDetalle(viaje)}
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Modal de detalles */}
      {detalle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setDetalle(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
            >
              ×
            </button>
            {detalle.imageUrl && (
              <img
                src={`data:image/jpeg;base64,${detalle.imageUrl}`}
                alt={detalle.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-2xl font-bold text-eliBlue mb-2">{detalle.title}</h3>
            <p className="text-gray-700 mb-2">{detalle.description}</p>
            <p className="text-eliCoral font-semibold mb-2">Precio: {detalle.price} €</p>
            {detalle.destination && <p className="text-gray-500 mb-2">Destino: {detalle.destination}</p>}
            {detalle.duration && <p className="text-gray-500 mb-4">Duración: {detalle.duration}</p>}
            <button
              onClick={() => window.open(`mailto:mama@example.com?subject=Información sobre ${detalle.title}`)}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Contactar por email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
