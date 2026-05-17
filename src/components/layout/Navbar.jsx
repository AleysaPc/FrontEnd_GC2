import useLogout from "../../hooks/useLogout";
import { FaUser, FaPrint, FaStamp } from "react-icons/fa";
import Dropdown from "../shared/Dropdown";
import Notificaciones from "../shared/Notificaciones";
import Alertas from "../shared/Alertas"
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
          <FaStamp size={20}/>
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
       
      </div>
    </nav>
  );
};

export default Navbar;
