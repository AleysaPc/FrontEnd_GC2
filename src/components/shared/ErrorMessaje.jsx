import React from "react";

// Componente reutilizable para mensajes de error
const ErrorMessage = ({ message = "Error al cargar datos." }) => {
  return (
    <p className="text-center text-red-600" role="alert">
      {message}
    </p>
  );
};

export default ErrorMessage;