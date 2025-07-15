import { useState } from "react";

const BarraBusqueda = ({ onSearch, placeholder = "Buscar..." }) => {
  const [valor, setValor] = useState("");

  const manejarCambio = (e) => {
    setValor(e.target.value);
  };

  const manejarEnter = (e) => {
    if (e.key === "Enter") {
      onSearch(valor); // Ejecuta búsqueda solo al presionar Enter
    }
  };

  return (
    <input
      type="text"
      className="border p-2 rounded w-full"
      value={valor}
      onChange={manejarCambio}
      onKeyDown={manejarEnter}
      placeholder={placeholder}
    />
  );
};

export default BarraBusqueda;
