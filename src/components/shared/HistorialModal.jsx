import React, { useEffect, useState } from "react";
import { useCorrespondencia } from "../../hooks/useEntities"; // Hook correcto para todas las acciones
import { FaArrowRight, FaArrowDown, FaFileAlt } from "react-icons/fa";
import FormattedDateTime from "./FormattedDate";

export default function HistorialDocumentoModal({
  visible,
  onClose,
  correspondenciaId,
}) {
  //Hook para obtener la correspondencia
  const { data, error } = useCorrespondencia(correspondenciaId);

  const [accionesOrdenadas, setAccionesOrdenadas] = useState([]);

  useEffect(() => {
    if (data?.data?.acciones) {
      const ordenadas = [...data.data.acciones].sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
      );
      setAccionesOrdenadas(ordenadas);
    } else {
      setAccionesOrdenadas([]);
    }
  }, [data, correspondenciaId]);

  if (!visible || !correspondenciaId) return null;

  const getIconoAccion = (tipo) => {
    switch (tipo) {
      case "DERIVADO":
        return <FaArrowRight className="text-blue-500 mr-2" />;
      case "RECIBIDO":
        return <FaArrowDown className="text-green-500 mr-2" />;
      default:
        return <FaFileAlt className="text-gray-500 mr-2" />;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Trazabilidad Documento
          </h2>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cerrar
          </button>
        </div>

        {accionesOrdenadas.length > 0 ? (
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
            <div className="space-y-8">
              {accionesOrdenadas.map((accion, index) => {
                console.log("ID de la acción:", accion.id); // 👈 Aquí imprimes el ID
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={accion.id}
                    className={`relative w-1/2 ${
                      isEven ? "pr-8 ml-auto" : "pl-8"
                    }`}
                  >
                    <div
                      className={`absolute top-4 w-4 h-4 rounded-full bg-blue-500 border-4 border-white ${
                        isEven ? "left-0 ml-[-8px]" : "right-0 mr-[-8px]"
                      }`}
                    ></div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            {getIconoAccion(accion.accion)}
                            <h3 className="text-lg font-semibold text-gray-800">
                              {accion.accion}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Fecha:</strong>{" "}
                            <FormattedDateTime dateTime={accion.fecha_inicio} />
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-xs text-gray-500">De</p>
                              <p className="font-medium">
                                {accion.usuario_origen?.email || "Desconocido"}
                              </p>
                            </div>
                            <br />
                            <div>
                              <p className="text-xs text-gray-500">Para</p>
                              <p className="font-medium">
                                {accion.usuario_destino?.email || "Desconocido"}
                              </p>
                            </div>
                            <br />
                            <div>
                              <p className="text-xs text-gray-500">
                                Comentario
                              </p>
                              <p className="font-medium">
                                {accion.comentario || "Desconocido"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No hay acciones registradas para este documento.
          </div>
        )}
      </div>
    </div>
  );
}
