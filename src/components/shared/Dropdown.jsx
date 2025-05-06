import React, { useState, useEffect, useRef } from "react";
import { ActionButton } from "../../components/shared/ActionButton"; // Importa el ActionButton

const Dropdown = ({ options, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Usamos una referencia para el dropdown

  // Toggle para abrir o cerrar el dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false); // Cerrar el dropdown si se hace clic fuera
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Agregamos el evento
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Limpiamos el evento
    };
  }, []);

  const handleOptionClick = (action) => {
    action(); // Ejecuta la acción directamente
    setIsOpen(false); // Cierra el dropdown
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Botón para abrir/cerrar el dropdown */}
      <ActionButton
        icon={icon} // Pasa el icono al ActionButton
        onClick={toggleDropdown} // Puedes agregar más clases aquí si es necesario
      />

      {/* Lista desplegable */}
      {isOpen && (
        <div className="absolute z-10 bg-white rounded-lg border-2 border-gray-400 shadow w-48 top-full right-0 mt-2">
          <ul className="py-2 text-sm text-gray-800">
            {options.map((option, index) => (
              <li key={index}>
                <ActionButton
                  label={option.label} // Usa el texto de la opción
                  onClick={() => handleOptionClick(option.action)} // Ejecuta la acción
                  estilos="w-full text-left p-2 hover:bg-gray-600 hover:text-white" // Asegúrate de que las opciones sean clickeables
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;