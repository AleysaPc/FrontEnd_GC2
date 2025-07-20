import { useState } from "react";

function FiltroBusquedaOrden({
  onChange,
  filtros = [],
  ordenes = [],
  placeholderSearch,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [ordering, setOrdering] = useState("");
  const [filterValues, setFilterValues] = useState({});

  const manejarCambioFiltro = (e, name) => {
    const value = e.target.value;
    setFilterValues((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnterFiltro = (e, name) => {
    if (e.key === "Enter") {
      onChange({
        search: searchTerm,
        ordering,
        ...filterValues,
        [name]: e.target.value,
      });
    }
  };

  const manejarCambioBusqueda = (e) => {
    setSearchTerm(e.target.value);
  };

  const manejarEnterBusqueda = (e) => {
    if (e.key === "Enter") {
      onChange({
        search: searchTerm,
        ordering,
        ...filterValues,
      });
    }
  };

  const manejarCambioOrden = (e) => {
    const value = e.target.value;
    setOrdering(value);
    onChange({
      search: searchTerm,
      ordering: value,
      ...filterValues,
    });
  };

  return (
    <div className="flex flex-wrap gap-2 my-2">
      <input
        type="text"
        placeholder={placeholderSearch || "Buscar..."}
        value={searchTerm}
        onChange={manejarCambioBusqueda}
        onKeyDown={manejarEnterBusqueda}
        className="border px-2 py-1 rounded w-64"
      />

      {filtros.map((filtro) => (
        <input
          key={filtro.name}
          type="text"
          placeholder={filtro.placeholder}
          value={filterValues[filtro.name] || ""}
          onChange={(e) => manejarCambioFiltro(e, filtro.name)}
          onKeyDown={(e) => manejarEnterFiltro(e, filtro.name)}
          className="border px-2 py-1 rounded w-48"
        />
      ))}

      <select
        value={ordering}
        onChange={manejarCambioOrden}
        className="border px-2 py-1 rounded"
      >
        <option value="">-- Ordenar por --</option>
        {ordenes.map((orden) => (
          <option key={orden.name} value={orden.name}>
            {orden.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltroBusquedaOrden;
