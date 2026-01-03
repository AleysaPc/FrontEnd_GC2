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
  userRole,
  menuRoleRequired,
}) => {
  // Si el menú requiere un rol específico y el usuario no lo tiene, no mostrar el menú
  if (menuRoleRequired && userRole !== menuRoleRequired) {
    return null;
  }

  // Filtrar subítems según el rol
  const filteredItems = items.filter((item) => {
    if (!item.roleRequired) return true;
    return item.roleRequired === userRole;
  });

  // Si no hay ítems para mostrar después del filtrado, no mostrar el menú
  if (filteredItems.length === 0) {
    return null;
  }

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

      {isOpen && (
        <ul className="mt-2 pl-6 space-y-1">
          {filteredItems.map((item, index) => (
            <li key={index}>
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