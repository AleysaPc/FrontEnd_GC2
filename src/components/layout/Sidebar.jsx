import { useState, useContext } from "react";
import SidebarMenu from "./SidebarMenu";
import { menus } from "../../data/SidebarData";
import { FaBuilding } from "react-icons/fa";
import { useUser } from "../../hooks/useEntities";
import { obtenerIdUser } from "../../utils/auth";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ isVisible }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const { user: authUser } = useContext(AuthContext);
  const userId = obtenerIdUser();
  const { data: user } = useUser(userId);

  return (
    <div
      className={`sticky z-50 shadow w-64 transition-all duration-300 ${
        isVisible ? "flex flex-col" : "hidden"
      } h-[calc(100vh)]`}
    >
      {/* titulo */}
      <div className="p-5 px-6 bg-red-700 flex items-center justify-center gap-2">
        <FaBuilding className="text-white text-2xl" />
        <h1 className="text-white text-xl font-bold">FDLP</h1>
      </div>

      {/* Sección de Perfil de Usuario */}
      <div className="px-4 py-6 border-b flex flex-col items-center justify-center text-center"style={{ backgroundColor: 'rgba(10, 89, 92, 0.9)' }}>
        {/* Avatar */}
        <div className="mb-3">
          <div className="w-16 h-16 rounded-full bg-red-700 flex items-center justify-center text-white font-semibold text-xl">
            {user?.data?.first_name?.substring(0, 2).toUpperCase() || "US"}
          </div>
        </div>
        {/* Información del usuario */}
        <div className="text-center text-xl">
          <p className=" font-medium text-white">
            {user?.data?.first_name || "Usuario"}{" "}
            {user?.data?.secund_name || ""}
          </p>
          <p className=" font-medium text-white">
            {user?.data?.last_name || "Usuario"}{" "}
            {user?.data?.secund_last_name || ""}
          </p>
          <p className="text-center text-white">
            {user?.data?.email || "correo@ejemplo.com"}
          </p>
        </div>
      </div>

      {/* Contenedor del menú con scroll */}
      <div className="flex-1 overflow-y-auto">
        <ul className="px-2 space-y-2">
          {menus.map((menu, index) => (
            <SidebarMenu
              key={index}
              title={menu.title}
              icon={menu.icon}
              items={menu.items}
              isOpen={openMenu === menu.title}
              toggleMenu={() =>
                setOpenMenu(openMenu === menu.title ? null : menu.title)
              }
              userRole={authUser?.rol}
              menuRoleRequired={menu.roleRequired}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
