// components/shared/SearchBar.jsx
import { useState } from "react";

function BarraBusqueda({ onSearch, searchKeys = [], placeholder = "Buscar..." }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // se lo delegamos al componente padre
  };

  return (
    <div className="">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="w-4/12 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}

export default BarraBusqueda;