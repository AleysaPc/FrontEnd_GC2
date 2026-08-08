import { useState, useContext } from "react";
import SidebarMenu from "./SidebarMenu";
import { menus } from "../../data/SidebarData";
import { FaBuilding, FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ isVisible }) => {
  const { user } = useContext(AuthContext); // obtiene datos del usuario desde el context
  const [openMenu, setOpenMenu] = useState(null);

  // Filtra los menus para que los roles correspondan con los del usuario
  const filteredMenus = menus.filter((menu) => {
    if (!menu.roleRequired) return true;
    return menu.roleRequired.some((role) => user?.rol?.includes(role));
  });

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
        {user?.imagen ? ( // se obtiene la imagen sin data?
          <img
            src={user?.imagen} // se obtiene la imagen sin data?
            alt={`${user.full_name}`} // se obtiene el nombre sin data?
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
            {user?.full_name || "Usuario" /* se obtiene el full_name sin data? */} 
          </p>

          <p className="text-lg text-gray-200 mt-2 break-all">
            {user?.email || "correo@ejemplo.com" /* se obtiene el email sin data? */}
          </p>
        </div>
      </div>

      {/* MENÚ */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-3 ">
          <ul className="space-y-2">
          {filteredMenus.map((menu, index) => ( // se llenan los submenus pero ahora mandando roles en un array
            <SidebarMenu
              key={index}
              title={menu.title}
              icon={menu.icon}
              items={menu.items}
              userRoles={user?.rol} // se añadio los roles del usuario
              isOpen={openMenu === menu.title}
              toggleMenu={() =>
                setOpenMenu(openMenu === menu.title ? null : menu.title)
              }
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
