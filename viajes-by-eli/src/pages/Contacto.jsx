// src/pages/Contacto.jsx
import { useState } from "react";

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);
  const [respuesta, setRespuesta] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRespuesta(null);

    try {
      const res = await fetch("https://localhost:59238/api/contact/enviar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al enviar el formulario");

      setRespuesta({ tipo: "exito", mensaje: data.mensaje });
      setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
    } catch (err) {
      setRespuesta({ tipo: "error", mensaje: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-eliBlue mb-4">Contacto</h2>

      {respuesta && (
        <div
          className={`mb-4 p-3 rounded ${
            respuesta.tipo === "exito" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {respuesta.mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="asunto"
          placeholder="Asunto"
          value={form.asunto}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          name="mensaje"
          placeholder="Mensaje"
          value={form.mensaje}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          rows={5}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-eliCoral hover:bg-eliBlue text-white py-2 rounded"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default Contacto;
