import React, { useState } from 'react';

export const FiltroBusquedaOrden = ({
  onChange,
  filtros = [],       // Array de filtros: [{ name, placeholder }]
  ordenes = [],       // Array de órdenes: [{ name, label }]
  placeholderSearch = "Buscar...",
}) => {
  const [search, setSearch] = useState('');
  const [orden, setOrden] = useState('');
  const [valoresFiltro, setValoresFiltro] = useState({});

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleInputChange = (e, name) => {
    setValoresFiltro({ ...valoresFiltro, [name]: e.target.value });
  };

  const handleOrdenChange = (e) => {
    setOrden(e.target.value);
    onChange({
      ...valoresFiltro,
      search,
      ordering: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange({
      ...valoresFiltro,
      search,
      ordering: orden,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-white shadow rounded-xl"
    >
      <input
        type="text"
        className="border p-2 rounded col-span-1"
        placeholder={placeholderSearch}
        value={search}
        onChange={handleSearchChange}
      />

      {filtros.map((filtro) => (
        <input
          key={filtro.name}
          type="text"
          className="border p-2 rounded"
          placeholder={filtro.placeholder}
          value={valoresFiltro[filtro.name] || ''}
          onChange={(e) => handleInputChange(e, filtro.name)}
        />
      ))}

      <select
        className="border p-2 rounded"
        value={orden}
        onChange={handleOrdenChange}
      >
        <option value="">Ordenar por...</option>
        {ordenes.map((o) => (
          <React.Fragment key={o.name}>
            <option value={o.name}>{o.label} ⬆️</option>
            <option value={`-${o.name}`}>{o.label} ⬇️</option>
          </React.Fragment>
        ))}
      </select>
    </form>
  );
};
export default FiltroBusquedaOrden;