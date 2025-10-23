import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export function UserDropdownSelect({
  label,
  name,
  value = [],
  onChange,
  options = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(
    Array.isArray(value) ? value.map(Number) : []
  );

  // Mantener sincronizado el valor externo
  useEffect(() => {
    setSelectedUsers(Array.isArray(value) ? value.map(Number) : []);
  }, [value]);

  const handleSelect = (id) => {
    const userId = Number(id);
    let newSelection;
    if (userId === -1) {
      // Seleccionar todos
      newSelection = options.map((o) => o.id);
    } else {
      // Selección individual
      newSelection = selectedUsers.includes(userId)
        ? selectedUsers.filter((u) => u !== userId)
        : [...selectedUsers, userId];
    }
    setSelectedUsers(newSelection);
    onChange(name, newSelection);
  };

  const filteredOptions = options.filter((opt) =>
    opt.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="text-sm text-gray-600">{label}</label>
      <div
        className="flex items-center justify-between bg-white border border-gray-300 rounded px-3 py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedUsers.length === 0
            ? "-- Seleccionar --"
            : selectedUsers.length === options.length
            ? "Todos"
            : `${selectedUsers.length} seleccionado(s)`}
        </span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-72 overflow-y-auto">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
          />

          <div
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(-1)}
          >
            {selectedUsers.length === options.length ? "Deseleccionar todos" : "Seleccionar todos"}
          </div>

          {filteredOptions.map(({ id, nombre }) => (
            <div
              key={id}
              className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                selectedUsers.includes(id) ? "bg-blue-100 font-semibold" : ""
              }`}
              onClick={() => handleSelect(id)}
            >
              {nombre}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
