import { useParams } from "react-router-dom";
import { Navigation } from "../shared/Navigation";
import {
  FaArrowLeft,
  FaFile,
  FaPaperPlane,
  FaExclamationTriangle,
  FaReply,
  FaFolder,
  FaCheckCircle,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

import { useCorrespondenciaRecibida } from "../../hooks/useEntities";
import FormattedDateTime from "../shared/FormattedDate";

export default function HistorialDocumento() {
  const { id } = useParams();
  const { data: response, error, isLoading } = useCorrespondenciaRecibida(id);
  const correspondencia = response?.data;

  if (isLoading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-600">Error</div>;
  if (!correspondencia) return <div className="p-4">No encontrado</div>;

  const obtenerAccionesRecursivas = (respuestas = []) =>
    respuestas.flatMap((respuesta) => [
      ...(respuesta.acciones || []).map((accion) => ({
        ...accion,
        _respuesta_contexto: respuesta,
      })),
      ...obtenerAccionesRecursivas(respuesta.respuestas || []),
    ]);

  const acciones = [
    ...(correspondencia.acciones || []),
    ...obtenerAccionesRecursivas(correspondencia.respuestas || []),
  ].sort((a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio));
  // ORIGEN REAL
  const origen = acciones?.[0]?.usuario_origen;

  const getIconoAccion = (tipo) => {
    switch ((tipo || "").toLowerCase()) {
      case "derivado":
        return <FaPaperPlane className="text-orange-500" />;
      case "observado":
        return <FaExclamationTriangle className="text-red-500" />;
      case "devuelto":
        return <FaReply className="text-blue-500" />;
      case "rechazado":
        return <FaTimes className="text-red-700" />;
      case "aprobado":
        return <FaCheck className="text-green-500" />;
      case "archivado":
        return <FaFolder className="text-gray-500" />;
      case "respondido":
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaFile className="text-gray-400" />;
    }
  };

  return (
    <div className="p-4">
      <Navigation
        title="Historial de Documento"
        icon={FaFile}
        actions={[
          {
            to: -1,
            label: "Volver",
            icon: FaArrowLeft,
            estilos:
              "bg-white hover:bg-red-700 text-black px-4 py-2 rounded-md flex items-center gap-2",
          },
        ]}
        subTitle={`Documento: ${correspondencia?.nro_registro}`}
      />

      <div className="mt-6 bg-white p-6 rounded-lg shadow">

        <h3 className="text-xl font-semibold text-center mb-8">
          Flujo del documento
        </h3>

        {/* 🔵 ORIGEN */}
        <div className="flex justify-center mb-10">
          <div className="bg-blue-50 px-6 py-4 rounded-xl shadow text-center">

            <div className="font-bold text-blue-800 text-sm">
              USUARIO ORIGEN
            </div>

            <div className="text-base text-gray-600">
              {origen?.email || "-"}
            </div>

            <div className="text-base text-gray-600">
              {origen?.nombre_departamento || "Sin departamento"}
            </div>
          </div>
        </div>

        {/* TIMELINE CENTRAL */}
        <div className="relative border-l-2 border-gray-200 ml-4">

          {acciones.map((accion, index) => (
            <div key={index} className="mb-8 ml-6 relative">

              {/* nodo */}
              <span className="absolute -left-5 top-2 bg-white border rounded-full p-2 shadow">
                {getIconoAccion(accion.accion)}
              </span>

              {/* CARD */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">

                {/* HEADER */}
                <div className="font-semibold text-gray-800">
                  {(accion.accion || "").toUpperCase()}
                </div>

                {/* FECHA */}
                <div className="text-base text-gray-500">
                  <FormattedDateTime dateTime={accion.fecha_inicio} />
                </div>

                {/* FLUJO REAL */}
                <div className="text-base mt-2 text-gray-700">
                  <span className="font-semibold">De:</span>{" "}
                  {accion.usuario_origen?.email || "-"} →  {accion.usuario_origen?.nombre_departamento || "-"}
                </div>

                <div className="text-base text-gray-700">
                  <span className="font-semibold">A:</span>{" "}
                  {accion.usuario_destino?.email || "-"} → {accion.usuario_destino?.nombre_departamento || "-"}
                </div>

                {/* ESTADO */}
                <div className="text-base mt-2">
                  Estado:{accion.accion || accion.estado || "-"} | Visto:{" "}
                  {accion.visto ? "Sí" : "No"} - <FormattedDateTime dateTime={accion.fecha_visto} />
                </div>

                 {/* FECHA */}
                <div className="text-base text-gray-500">
                 
                </div>

                {/* COMENTARIO */}
                <div className="text-base mt-2 text-gray-700 bg-white p-2 rounded border">
                  💬 {accion.comentario || "Sin comentario"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}