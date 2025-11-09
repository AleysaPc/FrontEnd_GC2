import React from "react";
import { useAccionCorrespondencia } from "../../hooks/useEntities";
import FormattedDate from "./FormattedDate";

const HistorialDocumentoModal = ({ visible, onClose, correspondenciaId }) => {
  const { data, isLoading, error } = useAccionCorrespondencia({
    all_data: true,
    filters: { correspondencia: correspondenciaId },
  });

  // Obtenemos todos los eventos y filtramos solo los de la correspondencia seleccionada
  const items = (data?.data || []).filter(
    (item) => item.correspondencia === correspondenciaId
  );

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-3/4 max-w-2xl rounded-lg shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          🕒 Historial de eventos del documento #{correspondenciaId}
        </h2>

        {isLoading ? (
          <p className="text-gray-500">Cargando historial...</p>
        ) : error ? (
          <p className="text-red-600">Error al cargar historial</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">No hay registros.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border-b text-left">ID</th>
                  <th className="px-3 py-2 border-b text-left">Acción</th>
                  <th className="px-3 py-2 border-b text-left">Usuario</th>
                  <th className="px-3 py-2 border-b text-left">Origen</th>
                  <th className="px-3 py-2 border-b text-left">Comentario</th>
                  <th className="px-3 py-2 border-b text-left">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  {/*{
                  <tr key={item.id}>
                    <td className="border px-2 py-1">{item.id}</td>
                    <td className="border px-2 py-1">{item.accion}</td>
                    <td className="border px-2 py-1">
                      {item.usuario?.email || "Sin usuario"}
                    </td>
                    <td>{item.usuario?.email || "Sin usuario"}</td>
                    <td>
                      {item.usuario_destino?.email || "Sin usuario destino"}
                    </td>

                    <td className="border px-2 py-1">{item.origen}</td>
                    <td className="border px-2 py-1">
                      {item.comentario || "Sin comentario"}
                    </td>
                    <td className="border px-2 py-1">
                      <FormattedDate date={item.fecha} />
                    </td>
                  </tr> */}
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorialDocumentoModal;
