import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOffers } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [viajes, setViajes] = useState([]);
  const [nuevo, setNuevo] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    destino: "",
    duracion: "",
    imagenFile: null,
    imagenBase64: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    getOffers()
      .then(setViajes)
      .catch(console.error);
  }, []);

  // 🔹 Convierte el archivo seleccionado a Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNuevo((prev) => ({ ...prev, imagenFile: file }));

    const reader = new FileReader();
    reader.onloadend = () =>
      setNuevo((prev) => ({ ...prev, imagenBase64: reader.result.split(",")[1] }));
    reader.readAsDataURL(file);
  };

  // 🔹 Crear nueva oferta
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Debes iniciar sesión para crear una oferta");
      return;
    }

    try {
      const body = {
        title: nuevo.titulo,
        description: nuevo.descripcion,
        price: parseFloat(nuevo.precio),
        destination: nuevo.destino,
        duration: nuevo.duracion,
        imageBase64: nuevo.imagenBase64,
      };

      const res = await fetch("https://localhost:59238/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔹 token correcto
        },
        body: JSON.stringify(body),
      });


      if (!res.ok) throw new Error("Error al crear la oferta");

      const data = await res.json();
      setViajes([...viajes, data]);
      setNuevo({
        titulo: "",
        descripcion: "",
        precio: "",
        destino: "",
        duracion: "",
        imagenFile: null,
        imagenBase64: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error al crear la oferta");
    }
  };
  const handleDelete = async (id) => {
    if (!token) {
      alert("Debes iniciar sesión para eliminar una oferta");
      return;
    }

    const confirm = window.confirm("¿Estás seguro de que quieres eliminar esta oferta?");
    if (!confirm) return;

    try {
      const res = await fetch(`https://localhost:59238/api/offers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar la oferta");

      // Filtramos la oferta eliminada de la lista
      setViajes(viajes.filter((v) => v.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la oferta");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-eliBlue">Panel de administración</h2>
        <button onClick={logout} className="text-eliCoral font-semibold">
          Cerrar sesión
        </button>
      </div>

      <form onSubmit={handleAdd} className="bg-white p-4 shadow rounded mb-6 grid gap-3">
        <input
          type="text"
          placeholder="Título"
          value={nuevo.titulo}
          onChange={(e) => setNuevo({ ...nuevo, titulo: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Descripción"
          value={nuevo.descripcion}
          onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Precio (€)"
          value={nuevo.precio}
          onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Destino"
          value={nuevo.destino}
          onChange={(e) => setNuevo({ ...nuevo, destino: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Duración"
          value={nuevo.duracion}
          onChange={(e) => setNuevo({ ...nuevo, duracion: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded"
        />
        <button className="bg-eliCoral hover:bg-eliBlue text-white py-2 rounded">
          Añadir oferta
        </button>
      </form>

      <div className="grid gap-4">
        {viajes.map((v) => (
          <div key={v.id} className="bg-white shadow p-4 rounded flex gap-4">
            {v.imageUrl && (
              <img
                src={`data:image/jpeg;base64,${v.imageUrl}`}
                alt={v.title}
                className="w-32 h-24 object-cover rounded"
              />
            )}
            <div>
              <h3 className="text-lg font-bold text-eliBlue">{v.title}</h3>
              <p className="text-gray-600">{v.description}</p>
              <p className="text-eliCoral font-semibold">{v.price} €</p>
              {v.destination && <p className="text-gray-500 text-sm">{v.destination}</p>}
            </div>
            <button
              onClick={() => handleDelete(v.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded self-start"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
