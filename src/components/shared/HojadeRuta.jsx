import { useParams } from "react-router-dom";
import { useCorrespondenciaRecibida } from "../../hooks/useEntities";
import { useState, useEffect, useRef } from "react";
import { ActionButton } from "../../components/shared/ActionButton";
import FormattedDateTime from "../../components/shared/FormattedDate";
import html2pdf from "html2pdf.js";
import { FaFile } from "react-icons/fa";

export default function HojadeRuta() {
  const { id } = useParams();
  const printRef = useRef();
  const [documentoActivo, setDocumentoActivo] = useState("");

  const { data: response, isLoading: isLoadingCorrespondencia } =
    useCorrespondenciaRecibida(id);

  const correspondencia = response?.data;
  const documentos = correspondencia?.documentos || [];

  useEffect(() => {
    if (documentos.length > 0) {
      setDocumentoActivo(documentos[0].archivo);
    }
  }, [documentos]);

  const handlePrint = () => {
    const element = printRef.current;
    const options = {
      margin: 10,
      filename: `correspondencia_${id}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  if (isLoadingCorrespondencia) return <div>Cargando...</div>;
  if (!correspondencia) return <div>No se encontró la correspondencia</div>;

  const obtenerAccionesRecursivas = (respuestas = []) =>
    respuestas.flatMap((respuesta) => [
      ...(respuesta.acciones || []).map((accion) => ({
        ...accion,
        _respuesta_contexto: {
          id: respuesta.id_correspondencia,
          cite: respuesta.cite,
          referencia: respuesta.referencia,
        },
      })),
      ...obtenerAccionesRecursivas(respuesta.respuestas || []),
    ]);

  const accionesUnificadas = [
    ...(correspondencia.acciones || []),
    ...obtenerAccionesRecursivas(correspondencia.respuestas || []),
  ].sort((a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio));

  return (
    <div className="p-4">
      <button
        onClick={handlePrint}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
      >
        Imprimir / Descargar PDF
      </button>

      <div ref={printRef} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          FORMULARIO DE DETALLE DE CORRESPONDENCIA
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Documento generado automáticamente desde el Sistema de Correspondencia
        </p>

        <div className="border border-gray-400 p-4 rounded">
          <h3 className="font-bold text-xl mb-3">Información General</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div>
                <label className="font-semibold">Nro Registro:</label>
                <p className="border p-2 rounded bg-gray-50">
                  {correspondencia.nro_registro}
                </p>
              </div>

              <div>
                <label className="font-semibold">Referencia:</label>
                <p className="border p-2 rounded bg-gray-50">
                  {correspondencia.referencia}
                </p>
              </div>

              <div>
                <label className="font-semibold">Fecha y hora de recepción:</label>
                <p className="border p-2 rounded bg-gray-50">
                  <FormattedDateTime dateTime={correspondencia.fecha_recepcion} />
                </p>
              </div>

              <div>
                <label className="font-semibold">Remitente/Cargo/Institución:</label>
                <p className="border p-2 rounded bg-gray-50">
                  {correspondencia.datos_contacto}
                </p>
              </div>

              <div>
                <label className="font-semibold">Descripción:</label>
                <p className="border p-2 rounded bg-gray-50">
                  {correspondencia.descripcion}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="font-semibold">Estado:</label>
                <p className="border p-2 rounded bg-gray-50">
                  {correspondencia.estado?.replace("_", " ")}
                </p>
              </div>

              <div>
                <label className="font-semibold">Prioridad:</label>
                <p className="border p-2 rounded bg-gray-50">
                  {correspondencia.prioridad}
                </p>
              </div>

              <div>
                <label className="font-semibold">Fecha de Respuesta:</label>
                <p className="border p-2 rounded bg-gray-50">
                  {correspondencia.fecha_respuesta ? (
                    <FormattedDateTime dateTime={correspondencia.fecha_respuesta} />
                  ) : (
                    "No requiere respuesta"
                  )}
                </p>
              </div>

              <div>
                <label className="font-semibold">Registrado por:</label>
                <p className="border p-2 rounded bg-gray-50">
                  {correspondencia.usuario?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-xl mt-6 mb-3">Documentos Adjuntos</h3>
        <div className="border border-gray-400 p-4 rounded">
          {documentoActivo ? (
            <p className="mb-2 font-medium">Documento principal seleccionado:</p>
          ) : null}
          <div className="flex flex-wrap gap-3 mt-3">
            {documentos.map((doc, index) => (
              <div key={index} className="w-full">
                <ActionButton
                  label="Abrir PDF"
                  icon={FaFile}
                  onClick={() => window.open(doc.archivo, "_blank")}
                  estilos="bg-blue-500 text-white px-4 py-2 rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-bold text-xl mt-8 mb-3">Historial de Derivaciones</h3>
        {accionesUnificadas.length > 0 ? (
          accionesUnificadas.map((accion, index) => (
            <div
              key={accion.id || index}
              className="border border-gray-400 p-4 rounded mb-4"
            >
              <h4 className="font-bold text-lg mb-2">Derivación #{index + 1}</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold">Acción:</label>
                  <p className="border p-2 rounded bg-gray-50">
                    {(accion.accion || "").toUpperCase()}
                  </p>
                </div>
                <div>
                  <label className="font-semibold">Usuario Origen:</label>
                  <p className="border p-2 rounded bg-gray-50">
                    {accion.usuario_origen?.email || "No especificado"}
                  </p>
                </div>

                <div>
                  <label className="font-semibold">Usuario Destino:</label>
                  <p className="border p-2 rounded bg-gray-50">
                    {accion.usuario_destino?.email || "No especificado"}
                  </p>
                </div>

                <div>
                  <label className="font-semibold">Fecha:</label>
                  <p className="border p-2 rounded bg-gray-50">
                    <FormattedDateTime dateTime={accion.fecha_inicio} />
                  </p>
                </div>

                <div>
                  <label className="font-semibold">Comentario:</label>
                  <p className="border p-2 rounded bg-gray-50">
                    {accion.comentario || "Sin comentarios"}
                  </p>
                </div>

                {accion._respuesta_contexto ? (
                  <div className="md:col-span-2">
                    <label className="font-semibold">Respuesta vinculada:</label>
                    <p className="border p-2 rounded bg-gray-50">
                      {(accion._respuesta_contexto.cite ||
                        `#${accion._respuesta_contexto.id}`) +
                        " - " +
                        (accion._respuesta_contexto.referencia ||
                          "Sin referencia")}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <p>No hay acciones registradas.</p>
        )}

        <div className="mt-10 grid grid-cols-2 gap-10 text-center">
          <div>
            <div className="border-t border-gray-600 pt-2">Firma Responsable</div>
          </div>
          <div>
            <div className="border-t border-gray-600 pt-2">
              Fecha de Impresión
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
