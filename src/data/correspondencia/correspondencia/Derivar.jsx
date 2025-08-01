import { useParams } from "react-router-dom";
import {
  useAccionCorrespondencia,
  useCorrespondencia,
} from "../../../hooks/useEntities";
import { useState } from "react";

export default function Derivar() {
  const { id } = useParams();

  const [comentarioRespuesta, setComentarioRespuesta] = useState("");
  // Usar useAccionCorrespondencia en lugar de useAccionCorrespondenciaMutations

  const { data: response, isLoading: isLoadingCorrespondencia } =
    useCorrespondencia(id);
  const correspondencia = response?.data; // Extraer los datos de la respuesta

  console.log("correspondencia", correspondencia);

  if (isLoadingCorrespondencia) {
    return <div>Cargando...</div>;
  }

  if (!correspondencia) {
    return <div>No se encontró la correspondencia solicitada</div>;
  }

  // Verificar si hay acciones
  const tieneAcciones =
    correspondencia.acciones && correspondencia.acciones.length > 0;
  const primeraAccion = tieneAcciones ? correspondencia.acciones[0] : null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Detalle de la Correspondencia</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Información de la Correspondencia
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="font-medium text-gray-700">Referencia:</p>
            <p className="text-gray-900">{correspondencia.referencia}</p>

            <p className="font-medium text-gray-700 mt-4">Descripción:</p>
            <p className="text-gray-900">{correspondencia.descripcion}</p>

            <p className="font-medium text-gray-700 mt-4">Contacto:</p>
            <p className="text-gray-900">{correspondencia.contacto}</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-gray-700">Estado:</p>
            <p className="text-gray-900 capitalize">
              {correspondencia.estado?.replace("_", " ")}
            </p>

            <p className="font-medium text-gray-700 mt-4">Prioridad:</p>
            <p className="text-gray-900 capitalize">
              {correspondencia.prioridad}
            </p>

            <p className="font-medium text-gray-700 mt-4">Fecha de Registro:</p>
            <p className="text-gray-900">
              {new Date(correspondencia.fecha_registro).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Historial de Derivaciones</h3>
      <div className="space-y-4">
        {tieneAcciones ? (
          correspondencia.acciones.map((accion, index) => (
            <div
              key={accion.id_accion || index}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h4 className="text-lg font-semibold mb-2">
                Derivación #{index + 1}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium text-gray-700">Tipo de Acción:</p>
                  <p className="text-gray-900">{accion.accion}</p>

                  <p className="font-medium text-gray-700 mt-4">Fecha:</p>
                  <p className="text-gray-900">
                    {new Date(accion.fecha).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-gray-700">Usuario Destino:</p>
                  <p className="text-gray-900">
                    {accion.usuario_destino?.email || "No especificado"}
                  </p>

                  <p className="font-medium text-gray-700 mt-4">Comentario:</p>
                  <p className="text-gray-900">
                    {accion.comentario || "Sin comentarios"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay acciones registradas para esta correspondencia.</p>
        )}
      </div>
    </div>
  );
}
