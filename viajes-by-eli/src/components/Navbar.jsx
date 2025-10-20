import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // iconos minimalistas
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="../../public/logo.png" // 👉 pon tu logo aquí (en public/img/logo.png)
            alt="Viajes by Eli"
            className="w-8 h-8 rounded-full border border-eliBlue"
          />
          <span className="font-semibold text-lg text-eliBlue tracking-wide">
            Viajes by Eli
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <Link
            to="/"
            className="hover:text-eliBlue transition-colors duration-200"
          >
            Inicio
          </Link>
          <Link
            to="/contacto"
            className="hover:text-eliBlue transition-colors duration-200"
          >
            Contacto
          </Link>

          {!user ? (
          <Link to="/login" className="bg-eliCoral text-white px-4 py-2 rounded-lg hover:bg-eliBlue transition-colors duration-200">
            Iniciar sesión
          </Link>
        ) : (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className="text-gray-700 hover:text-[#33afbe]">
                Dashboard
              </Link>
            )}
            <button onClick={logout} className="text-[#fb866f] hover:underline">
              Cerrar sesión
            </button>
          </>
        )}
        </div>

        {/* ICONO MENÚ MÓVIL */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 flex flex-col items-center gap-4 py-4 shadow-md animate-fadeIn">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-eliBlue"
          >
            Inicio
          </Link>
          <Link
            to="/ofertas"
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-eliBlue"
          >
            Ofertas
          </Link>
          <Link
            to="/contacto"
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-eliBlue"
          >
            Contacto
          </Link>
          {!user ? (
          <Link to="/login" className="bg-eliCoral text-white px-4 py-2 rounded-lg hover:bg-eliBlue transition-colors duration-200">
            Iniciar sesión
          </Link>
        ) : (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className="text-gray-700 hover:text-[#33afbe]">
                Dashboard
              </Link>
            )}
            <button onClick={logout} className="text-[#fb866f] hover:underline">
              Cerrar sesión
            </button>
          </>
        )}
          
        </div>
      )}
    </nav>
  );
}

export default Navbar;
