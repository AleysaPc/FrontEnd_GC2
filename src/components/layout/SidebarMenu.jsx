import React from "react";
import { NavLink } from "react-router-dom";
import { ActionButton } from "../shared/ActionButton";

// Función para optimizar la clase activa de NavLink
const getNavLinkClass = (isActive) =>
  `block px-4 py-2 rounded-lg transition-all duration-200 hover:text-white ${
    isActive ? "bg-gray-900 text-white" : "text-dark-700 hover:bg-teal-700"
  }`;

const SidebarMenu = ({
  title,
  icon: Icon,
  items,
  isOpen,
  toggleMenu,
  userRoles // nuevo argumento: roles del usuario
}) => {
  // Filtrar subitems según roles del usuario
  const filteredItems = items.filter((item) => {
    if (!item.roleRequired) return true;
    return item.roleRequired.some((role) => userRoles?.includes(role));
  });

  return (
    <li>
      <ActionButton
        label={title}                                                                                             //Hover el color que cambia al poner el curso  
        estilos={`flex items-center w-full px-4 py-3 text-base font-normal rounded-lg transition-all duration-300 hover:text-blue-600 text-gray-600 ${
          isOpen ? "bg-gray-200 text-gray-600" : "hover:bg-gray-200 text-gray-600"
        }`}
        onClick={toggleMenu}
        icon={Icon}
      />

      {isOpen && filteredItems.length > 0 && ( // se pregunta si el menu esta abierto y si hay items filtrados
        <ul className="mt-2 pl-6 space-y-1">
          {filteredItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarMenu;