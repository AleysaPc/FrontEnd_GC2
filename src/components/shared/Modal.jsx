import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) return null;

  return (
  <div
    className="fixed top-32 bottom-32 left-1/4 right-1/4 z-50 flex items-center justify-center"
    style={{ backdropFilter: "blur(5px)" }}
    onClick={onClose}
  >
    <div
      className="bg-white-700 rounded-lg shadow-lg p-6 w-full sm:w-[800px] max-w-[90vw]"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      <div className="mt-4 flex justify-end">
        <button
          className="absolute top-3 right-3 bg-red-500 text-white p-2 hover:bg-red-600 transition duration-200 shadow-lg"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);
};
export default Modal;
