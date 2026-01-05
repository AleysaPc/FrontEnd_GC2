import { useState, useContext } from "react";
import SidebarMenu from "./SidebarMenu";
import { menus } from "../../data/SidebarData";
import { FaBuilding, FaUser } from "react-icons/fa";
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
      <div className="h-16 flex items-center justify-center gap-2 bg-red-700 p-4">
        <FaBuilding className="text-white text-2xl" />
        <h1 className="text-white text-xl font-bold">FDLP</h1>
      </div>

      {/* Sección de Perfil de Usuario */}
      <div
        className="flex flex-col items-center p-4"
        style={{ backgroundColor: "rgba(10, 89, 92, 0.9)" }}
      >
        {user?.data?.imagen ? (
          <img
            src={user.data.imagen}
            alt={`${user.data.first_name} ${user.data.last_name}`}
            className="w-28 h-28 rounded-full mb-4 object-cover shadow-lg "
          />
        ) : (
          <div className="w-28 h-28 rounded-full mb-4 bg-white flex items-center justify-center text-gray-500 text-6xl border-2 border-gray-200 shadow-sm">
            <FaUser />
          </div>
        )}
        {/* Información del usuario */}
        <div className="text-center text-xl">
          <p className=" font-normal text-white">
            {user?.data?.first_name || "Usuario"}{" "}
            {user?.data?.second_name || ""}
          </p>
          <p className=" font-normal text-white">
            {user?.data?.last_name || "Usuario"}{" "}
            {user?.data?.second_last_name || ""}
          </p>
          <p className="text-center text-white">
            {user?.data?.email || "correo@ejemplo.com"}
          </p>
        </div>
      </div>

      {/* Contenedor del menú con scroll      bg-white  color del sidebar donde se muestran los datos*/}
      <div className="flex-1 overflow-y-auto bg-white">
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
