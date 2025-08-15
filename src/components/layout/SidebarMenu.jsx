import React from "react";
import { NavLink } from "react-router-dom";
import { ActionButton } from "../shared/ActionButton";

// Función para optimizar la clase activa de NavLink
const getNavLinkClass = (isActive) =>
  `block px-4 py-2 rounded-lg transition-all duration-200 hover:text-white ${
    isActive ? "bg-gray-700 text-white" : "text-gray-700 hover:bg-gray-700"
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
        label={title}
        estilos={`flex items-center w-full px-4 py-3 text-base font-semibold rounded-lg transition-all duration-300 hover:text-white text-gray-700 ${
          isOpen ? "bg-gray-700 text-white" : "hover:bg-gray-700 text-black-300"
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