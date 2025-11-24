import { useParams } from "react-router-dom";
import { Navigation } from "../shared/Navigation";
import { FaArrowLeft, FaFile, FaCheck, FaTimes, FaPaperPlane, FaExclamationTriangle, FaReply, FaFolder } from "react-icons/fa";
import { useCorrespondenciaRecibida } from "../../hooks/useEntities";
import FormattedDateTime from "../shared/FormattedDate";

export default function HistorialDocumento() {
  const { id } = useParams();
  const { data: response, error, isLoading } = useCorrespondenciaRecibida(id);
  const correspondencia = response?.data;

  if (isLoading) return <div className="p-4">Cargando historial...</div>;
  if (error) return <div className="p-4 text-red-600">Error al cargar la correspondencia.</div>;
  if (!correspondencia) return <div className="p-4">No se encontró la correspondencia.</div>;

  // Orden cronológico: primera acción primero
  const acciones = (correspondencia.acciones || []).sort(
    (a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio)
  );

  // Icono según tipo de acción
  const getIconoAccion = (tipo) => {
    switch (tipo) {
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
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <Navigation
        title="Historial de Documento"
        actions={[
          {
            to: -1,
            label: "Volver",
            icon: FaArrowLeft,
            estilos:
              "bg-white hover:bg-red-800 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
        ]}
        subTitle={`Historial del Documento: ${correspondencia?.nro_registro}`}
        icon={FaFile}
      />

      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold mb-4 text-center">Acciones realizadas</h3>

        {acciones.length === 0 ? (
          <p className="text-gray-500">No hay acciones registradas para este documento.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left">#</th>
                  <th className="px-4 py-2 border-b text-left">Acción</th>
                  <th className="px-4 py-2 border-b text-left">Fecha y Hora</th>
                  <th className="px-4 py-2 border-b text-left">Usuario Origen</th>
                  <th className="px-4 py-2 border-b text-left">Usuario Destino</th>
                  <th className="px-4 py-2 border-b text-left">Visto</th>
                  <th className="px-4 py-2 border-b text-left">Fecha visto</th>
                  <th className="px-4 py-2 border-b text-left">Estado</th>
                  <th className="px-4 py-2 border-b text-left">Comentario</th>
                </tr>
              </thead>
              <tbody>
                {acciones.map((accion, index) => (
                  <tr key={accion.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-12 flex items-center gap-1 border-b">
                      {getIconoAccion(accion.accion)}
                      <span>{accion.accion.toUpperCase()}</span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <FormattedDateTime dateTime={accion.fecha_inicio} />
                    </td>
                    <td className="px-4 py-2 border-b">
                      {accion.usuario_origen
                        ? `${accion.usuario_origen.email} - ${accion.usuario_origen.nombre_departamento || "Desconocido"}`
                        : "Desconocido"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {accion.usuario_destino
                        ? `${accion.usuario_destino.email} - ${accion.usuario_destino.nombre_departamento || "Desconocido"}`
                        : "Desconocido"}
                    </td>
                    <td className="px-4 py-2 border-b">{accion.visto ? "Sí" : "No"}</td>
                    <td className="px-4 py-2 border-b">
                      {accion.visto && accion.fecha_visto ? <FormattedDateTime dateTime={accion.fecha_visto} /> : "-"}
                    </td>
                    <td className="px-4 py-2 border-b">{accion.estado || "-"}</td>
                    <td className="px-4 py-2 border-b" title={accion.comentario || ""}>
                      {accion.comentario ? (accion.comentario.length > 40 ? accion.comentario.slice(0, 40) + "..." : accion.comentario) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
