import React from "react";

// Componente reutilizable para mensajes de carga
const Loading = ({ message = "Cargando datos..." }) => {
  return (
    <p className="text-center text-gray-500" role="alert">
      {message}
    </p>
  );
};

export default Loading;