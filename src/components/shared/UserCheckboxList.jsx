import React from "react";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export function UserCheckboxList({
  label,
  name,
  value,
  onChange,
  options = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // Convertir los valores iniciales a números
  const initialValue = Array.isArray(value) ? value.map(Number) : [];
  const [selectedUsers, setSelectedUsers] = useState(initialValue);

  const handleChange = (userId) => {
    // Convertir el ID a número
    const userIdNumber = Number(userId);
    
    // Usar el estado local para las operaciones
    const currentValue = selectedUsers;
    const newValue = currentValue.includes(userIdNumber)
      ? currentValue.filter((id) => id !== userIdNumber)
      : [...currentValue, userIdNumber];
    
    // Actualizar el estado local y el valor del formulario
    setSelectedUsers(newValue);
    onChange(name, newValue);
  };

  const filteredOptions = options.filter((option) =>
    option.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">{label}</label>
        <div className="flex items-center justify-between bg-white border border-gray-300 rounded">
          <div className="flex items-center flex-1">
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border-none focus:ring-0 focus:outline-none"
            />
            <span className="ml-2 text-sm text-gray-500">
              {selectedUsers.length} seleccionados
            </span>
          </div>
          <button
            type="button" //Asegura que el boton no envie el formulario
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="p-2 text-gray-500 hover:text-gray-700"
            title="Mostrar/ocultar lista de usuarios"
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-96 overflow-y-auto">
          {filteredOptions.map(({ id, nombre }) => (
            <div
              key={id}
              className="flex items-center px-3 py-2 hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={selectedUsers.includes(id)}
                onChange={() => handleChange(id)}
                className="mr-2 rounded"
              />
              <span>{nombre}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
