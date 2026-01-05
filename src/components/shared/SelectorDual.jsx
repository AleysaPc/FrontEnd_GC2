import React, { useState, useEffect } from "react";
import { InputField } from "./InputField";
import { ActionButton } from "./ActionButton";

const SelectorDual = ({
  data = [], // lista completa de objetos
  value = [], // lista seleccionada (ids u objetos)
  onChange,
  labelLeft = "Disponibles",
  labelRight = "Seleccionados",
  itemLabel = "name", // campo a mostrar del objeto
}) => {
  const [disponibles, setDisponibles] = useState([]);
  const [elegidos, setElegidos] = useState([]);
  const [filtroDisponibles, setFiltroDisponibles] = useState("");
  const [filtroElegidos, setFiltroElegidos] = useState("");

  // Cuando cambian data o value, recalculamos
  useEffect(() => {
    if (!data.length) return;

    const inicialElegidos = data.filter((item) =>
      value.some((v) => (typeof v === "object" ? v.id : v) === item.id)
    );

    const inicialDisponibles = data.filter(
      (item) =>
        !value.some((v) => (typeof v === "object" ? v.id : v) === item.id)
    );

    setElegidos(inicialElegidos);
    setDisponibles(inicialDisponibles);
  }, [data, value]);

  const agregar = (item) => {
    const nuevos = [...elegidos, item];
    setElegidos(nuevos);
    setDisponibles((prev) => prev.filter((p) => p.id !== item.id));
    onChange && onChange(nuevos.map((p) => p.id));
  };

  const eliminar = (item) => {
    const nuevos = elegidos.filter((p) => p.id !== item.id);
    setDisponibles((prev) => [...prev, item]);
    setElegidos(nuevos);
    onChange && onChange(nuevos.map((p) => p.id));
  };

  const filtrar = (lista, filtro) =>
    lista.filter((p) =>
      (p[itemLabel] || "").toLowerCase().includes(filtro.toLowerCase())
    );

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Disponibles */}
      <div>
        <h3 className="font-bold">{labelLeft}</h3>
        <InputField
          type="text"
          placeholder="Filtrar..."
          className="border p-1 w-full mb-2"
          value={filtroDisponibles}
          onChange={(e) => setFiltroDisponibles(e.target.value)}
        />
        <ul className="border p-2 h-64 overflow-y-auto">
          {filtrar(disponibles, filtroDisponibles).map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center mb-1"
            >
              <span>{item[itemLabel]}</span>
              <ActionButton
                type="button"
                onClick={() => agregar(item)}
                estilos="bg-green-500 text-white px-2 py-1 rounded"
                label="Agregar"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Elegidos */}
      <div>
        <h3 className="font-bold">{labelRight}</h3>
        <InputField
          type="text"
          placeholder="Filtrar..."
          className="border p-1 w-full mb-2"
          value={filtroElegidos}
          onChange={(e) => setFiltroElegidos(e.target.value)}
        />
        <ul className="border p-2 h-64 overflow-y-auto">
          {filtrar(elegidos, filtroElegidos).map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center mb-1"
            >
              <span>{item[itemLabel]}</span>
              <ActionButton
                type="button"
                onClick={() => eliminar(item)}
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

export default SelectorDual;
