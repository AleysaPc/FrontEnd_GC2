import React, { useState, useEffect } from "react";
import { InputField } from "./InputField";
import { ActionButton } from "./ActionButton";

const SelectorPermisos = ({ permisosData = [], value = [], onChange }) => {
  console.log("SelectorPermisos - permisosData:", permisosData);
  console.log("SelectorPermisos - value:", value);
  const [permisosDisponibles, setPermisosDisponibles] = useState([]);
  const [permisosElegidos, setPermisosElegidos] = useState([]);
  const [filtroDisponibles, setFiltroDisponibles] = useState("");
  const [filtroElegidos, setFiltroElegidos] = useState("");

  // Cuando cambian permisosData o el valor inicial, recalculamos
  useEffect(() => {
    if (!permisosData.length) return;

    // Identificamos permisos iniciales (si value es array de objetos o de IDs)
    const elegidosIniciales = permisosData.filter((permiso) =>
      value.some((v) => (typeof v === "object" ? v.id : v) === permiso.id)
    );

    const disponiblesIniciales = permisosData.filter(
      (permiso) =>
        !value.some((v) => (typeof v === "object" ? v.id : v) === permiso.id)
    );

    setPermisosElegidos(elegidosIniciales);
    setPermisosDisponibles(disponiblesIniciales);
  }, [permisosData, value]);

  const agregarPermiso = (permiso) => {
    const nuevosElegidos = [...permisosElegidos, permiso];
    setPermisosElegidos(nuevosElegidos);
    setPermisosDisponibles((prev) => prev.filter((p) => p.id !== permiso.id));
    onChange && onChange(nuevosElegidos.map((p) => p.id));
  };

  const eliminarPermiso = (permiso) => {
    const nuevosElegidos = permisosElegidos.filter((p) => p.id !== permiso.id);
    setPermisosDisponibles((prev) => [...prev, permiso]);
    setPermisosElegidos(nuevosElegidos);
    onChange && onChange(nuevosElegidos.map((p) => p.id));
  };

  const filtrar = (lista, filtro) =>
    lista.filter((p) => p.name.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Permisos Disponibles */}
      <div>
        <h3 className="font-bold">Permisos Disponibles</h3>
        <InputField
          type="text"
          placeholder="Filtrar..."
          className="border p-1 w-full mb-2"
          value={filtroDisponibles}
          onChange={(e) => setFiltroDisponibles(e.target.value)}
        />
        <ul className="border p-2 h-64 overflow-y-auto">
          {filtrar(permisosDisponibles, filtroDisponibles).map((permiso) => (
            <li
              key={permiso.id}
              className="flex justify-between items-center mb-1"
            >
              <span>{permiso.name}</span>
              <ActionButton
                type="button"
                onClick={() => agregarPermiso(permiso)}
                estilos="bg-green-500 text-white px-2 py-1 rounded"
                label="Agregar"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Permisos Elegidos */}
      <div>
        <h3 className="font-bold">Permisos Elegidos</h3>
        <InputField
          type="text"
          placeholder="Filtrar..."
          className="border p-1 w-full mb-2"
          value={filtroElegidos}
          onChange={(e) => setFiltroElegidos(e.target.value)}
        />
        <ul className="border p-2 h-64 overflow-y-auto">
          {filtrar(permisosElegidos, filtroElegidos).map((permiso) => (
            <li
              key={permiso.id}
              className="flex justify-between items-center mb-1"
            >
              <span>{permiso.name}</span>
              <ActionButton
                type="button"
                onClick={() => eliminarPermiso(permiso)}
                estilos="bg-red-500 text-white px-2 py-1 rounded"
                label="Eliminar"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectorPermisos;
