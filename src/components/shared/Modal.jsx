import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96"
        onClick={(e) => e.stopPropagation()} // Evitar que el click en el contenido cierre el modal
      >
        {children}
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;