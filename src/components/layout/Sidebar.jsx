import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import { menus } from "../../data/SidebarData";

const Sidebar = ({ isVisible }) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div
      className={`sticky top-20 z-50 bg-white shadow border-gray-400 border-2 rounded-lg ml-4 mr-2 mt-2 mb-3 w-64 transition-all duration-300 ${
        isVisible ? "block" : "hidden"
      } h-[calc(100vh-6rem)] overflow-y-auto`}
    >
      <div className="p-5 text-center">
        <h1 className="text-gray-800">Sidebar</h1>
      </div>
      <hr className="border-gray-400 mx-4" />

      {/* Menú de navegación */}
      <ul className="mt-4 px-2 space-y-2">
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
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;