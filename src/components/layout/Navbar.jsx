import useLogout from "../../hooks/useLogout";
import { FaUser, FaPrint, FaStamp } from "react-icons/fa";
import Dropdown from "../shared/Dropdown";
import Notificaciones from "../shared/Notificaciones";
import Alertas from "../shared/Alertas";
import { Link } from "react-router-dom";
import { useSello } from "../../hooks/useSello";

const Navbar = ({ toggleSidebar, user }) => {
  //Para sello
  const { generarPDFSello } = useSello();

  const logoutUser = useLogout();

  return (
    <nav className="bg-green-700 text-white flex justify-between items-center p-3 sticky top-0 z-50 shadow-md h-16">
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

      <div className="flex items-center space-x-4">
        <button
          onClick={generarPDFSello}
          className=" hover:bg-green-600 rounded"
          title="Imprimir último sello"
        >
          <FaStamp size={20} />
        </button>
        <Notificaciones /> {/*Campana para derivaciones */}
        <Alertas /> {/* 🕐 Campana para alertas */}
        <Dropdown
          icon={FaUser}
          label={user?.email || "Usuario"}
          options={[
            { label: "Mi Perfil" },
            { label: "Cerrar Sesión", action: logoutUser },
          ]}
        />
        <Link
          to="/dashboard"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
