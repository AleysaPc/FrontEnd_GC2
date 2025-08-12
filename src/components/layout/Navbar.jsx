import React from "react";
import useLogout from "../../hooks/useLogout";
import { FaUser } from "react-icons/fa";
import Dropdown from "../shared/Dropdown";
import Notificaciones from "../shared/Notificaciones";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar, user }) => {
  const logoutUser = useLogout();

  return (
    <nav className="bg-red-700 text-white flex justify-between items-center p-3 sticky top-0 z-50 shadow-md h-16">
      <button
        className="p-2 hover:bg-red-600 rounded"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <div className="text-lg font-semibold">
        <Link to="/home" aria-label="Ir al inicio">
          Sistema de Gestión de Correspondencia
        </Link>
      </div>

      <div className="flex items-center space-x-6 relative">
        <Notificaciones />
        <Dropdown
          icon={FaUser}
          label={user?.email || "Usuario"}
          options={[
            { label: "Mi Perfil" },
            { label: "Cerrar Sesión", action: logoutUser },
          ]}
        />
      </div>
    </nav>
  );
};

export default Navbar;
