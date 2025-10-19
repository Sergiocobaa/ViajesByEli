// src/pages/Home.jsx
import { useState } from "react";

const datosIniciales = [
  {
    id: 1,
    titulo: "Viaje a Egipto 8 días",
    descripcion: "Crucero 5* + El Cairo 4*. Vuelos incluidos.",
    precio: 1249,
    destino: "Egipto",
    duracion: "8 días",
    tipo: "Gran Viaje",
    imagen: "https://picsum.photos/400/250?random=1",
  },
  {
    id: 2,
    titulo: "Escapada a París 4 días",
    descripcion: "Vuelo + hotel 4* con desayuno incluido.",
    precio: 699,
    destino: "Francia",
    duracion: "4 días",
    tipo: "Escapada",
    imagen: "https://picsum.photos/400/250?random=2",
  },
  // … más objetos
];

function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({
    precioMax: 2000,
    duracion: "",
    destino: "",
    tipo: "",
  });

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const filtrados = datosIniciales.filter((viaje) => {
    const cumpleBusqueda =
      viaje.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      viaje.destino.toLowerCase().includes(busqueda.toLowerCase());
    const cumplePrecio = viaje.precio <= filtros.precioMax;
    const cumpleDestino =
      filtros.destino === "" || viaje.destino === filtros.destino;
    const cumpleTipo = filtros.tipo === "" || viaje.tipo === filtros.tipo;
    // podrías añadir duracion etc.
    return cumpleBusqueda && cumplePrecio && cumpleDestino && cumpleTipo;
  });

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
              <option value="Egipto">Egipto</option>
              <option value="Francia">Francia</option>
              {/* agregar más destinos dinámicamente */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb=1">Tipo</label>
            <select
              name="tipo"
              value={filtros.tipo}
              onChange={handleFiltroChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Todos</option>
              <option value="Escapada">Escapada</option>
              <option value="Gran Viaje">Gran Viaje</option>
            </select>
          </div>
          {/* Puedes añadir más filtros: duración, Fecha de salida, Temática etc */}
        </aside>

        {/* Resultados */}
        <section className="md:w-3/4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((viaje) => (
            <div key={viaje.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={viaje.imagen}
                alt={viaje.titulo}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-bold text-eliBlue mb-2">{viaje.titulo}</h4>
                <p className="text-gray-600 mb-2">{viaje.descripcion}</p>
                <p className="text-eliCoral font-semibold">Desde {viaje.precio} €</p>
                <button className="mt-3 bg-eliCoral hover:bg-eliBlue text-white py-2 w-full rounded">
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Home;
