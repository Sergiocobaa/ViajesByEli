import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [viajes, setViajes] = useState([]);
  const [nuevo, setNuevo] = useState({ titulo: "", descripcion: "", precio: "", imagen: "" });

  const handleAdd = (e) => {
    e.preventDefault();
    setViajes([...viajes, { ...nuevo, id: Date.now() }]);
    setNuevo({ titulo: "", descripcion: "", precio: "", imagen: "" });
  };

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-eliBlue">Panel de administración</h2>
        <button onClick={logout} className="text-eliCoral font-semibold">Cerrar sesión</button>
      </div>

      <form onSubmit={handleAdd} className="bg-white p-4 shadow rounded mb-6 grid gap-3">
        <input type="text" placeholder="Título" value={nuevo.titulo}
          onChange={(e) => setNuevo({ ...nuevo, titulo: e.target.value })} className="border p-2 rounded" required />
        <textarea placeholder="Descripción" value={nuevo.descripcion}
          onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })} className="border p-2 rounded" required />
        <input type="number" placeholder="Precio (€)" value={nuevo.precio}
          onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })} className="border p-2 rounded" required />
        <input type="text" placeholder="URL de imagen" value={nuevo.imagen}
          onChange={(e) => setNuevo({ ...nuevo, imagen: e.target.value })} className="border p-2 rounded" required />
        <button className="bg-eliCoral hover:bg-eliBlue text-white py-2 rounded">Añadir oferta</button>
      </form>

      <div className="grid gap-4">
        {viajes.map((v) => (
          <div key={v.id} className="bg-white shadow p-4 rounded flex gap-4">
            <img src={v.imagen} alt={v.titulo} className="w-32 h-24 object-cover rounded" />
            <div>
              <h3 className="text-lg font-bold text-eliBlue">{v.titulo}</h3>
              <p className="text-gray-600">{v.descripcion}</p>
              <p className="text-eliCoral font-semibold">{v.precio} €</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
