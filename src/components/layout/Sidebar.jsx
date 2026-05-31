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
      className={`sticky z-50 transition-all duration-300 ${
        isVisible ? "flex flex-col" : "hidden"
      } w-72 h-screen bg-white border-r border-gray-200 shadow-xl`}
    >
      {/* HEADER */}
      <div className="h-16 bg-gradient-to-r from-red-800 to-red-800 flex items-center justify-center gap-3 shadow-md">
        <FaBuilding className="text-white text-2xl" />

        <div>
          <h1 className="text-white text-xl font-bold">FDLP</h1>
        </div>
      </div>

      {/* PERFIL */}
      <div
        className="flex flex-col items-center px-4 py-6"
        style={{
          backgroundColor: "rgba(10,89,92,0.9)",
        }}
      >
        {user?.data?.imagen ? (
          <img
            src={user.data.imagen}
            alt={`${user.data.first_name} ${user.data.last_name}`}
            className="
              w-36
              h-36
              rounded-full
              object-cover
              border-4
              border-white
              shadow-xl
            "
          />
        ) : (
          <div
            className="
              w-40
              h-40
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              text-gray-500
              text-5xl
              border-4
              border-white
              shadow-xl
            "
          >
            <FaUser />
          </div>
        )}

        <div className="text-center mt-4">
          <p className="text-white font-semibold text-lg">
            {user?.data?.first_name || "Usuario"}{" "}
            {user?.data?.second_name || ""}
          </p>

          <p className="text-white text-lg">
            {user?.data?.last_name || ""} {user?.data?.second_last_name || ""}
          </p>

          <p className="text-lg text-gray-200 mt-2 break-all">
            {user?.data?.email || "correo@ejemplo.com"}
          </p>
        </div>
      </div>

      {/* MENÚ */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-3 ">
          <ul className="space-y-2">
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
