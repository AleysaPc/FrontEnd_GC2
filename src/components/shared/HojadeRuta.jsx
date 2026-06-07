import { useParams, useNavigate } from "react-router-dom";
import {
  useCorrespondenciaRecibida,
  useCorrespondenciaElaborada,
} from "../../hooks/useEntities";
import { useState, useEffect, useRef } from "react";
import { ActionButton } from "../../components/shared/ActionButton";
import FormattedDateTime from "../../components/shared/FormattedDate";
import html2pdf from "html2pdf.js";
import { FaFile, FaArrowLeft } from "react-icons/fa";

export default function HojadeRuta() {
  const { tipo, id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef();
  const [documentoActivo, setDocumentoActivo] = useState("");

  const recibidaQuery = useCorrespondenciaRecibida(id, tipo === "recibida");

  const elaboradaQuery = useCorrespondenciaElaborada(id, tipo === "elaborada");

  const correspondencia =
    tipo === "recibida" ? recibidaQuery.data?.data : elaboradaQuery.data?.data;

  const isLoading =
    tipo === "recibida" ? recibidaQuery.isLoading : elaboradaQuery.isLoading;

  const error =
    tipo === "recibida" ? recibidaQuery.error : elaboradaQuery.error;

  const documentos = correspondencia?.documentos || [];
  {
    documentos.length === 0 && correspondencia?.contenido_html && (
      <p className="text-green-600">Documento generado desde plantilla HTML</p>
    );
  }

  useEffect(() => {
    if (documentos.length > 0) {
      setDocumentoActivo(documentos[0].archivo);
    }
  }, [documentos]);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar la correspondencia</div>;
  if (!correspondencia) return <div>No se encontró la correspondencia</div>;

  const handlePrint = () => {
    const element = printRef.current;
    const options = {
      margin: [7, 7, 7, 7],
      filename: `correspondencia_${id}.pdf`,
      html2canvas: { scale: 3, useCORS: true, logging: false },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf()
      .from(element)
      .set(options)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);

          pdf.setFontSize(8);

          pdf.text(
            `Página ${i} de ${totalPages}`,
            pdf.internal.pageSize.getWidth() / 2,
            pdf.internal.pageSize.getHeight() - 5,
            { align: "center" },
          );
        }
      })
      .save();
  };

  if (isLoading) return <div>Cargando...</div>;
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
      <div className="flex gap-4 mb-4 flex-wrap">
        <button
          onClick={handlePrint}
          className="bg-cyan-900 text-white px-4 py-2 rounded-md"
        >
          Descarga Hoja de Ruta
        </button>

        {documentos.map((doc, index) => (
          <ActionButton
            key={index}
            label={`Documento`}
            onClick={() => window.open(doc.archivo, "_blank")}
            estilos="bg-cyan-900 text-white px-4 py-2 rounded-md"
          />
        ))}

        <button
          onClick={() => navigate(-1)}
          className="bg-cyan-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaArrowLeft />
          Volver
        </button>
      </div>

      <div ref={printRef} className="bg-white p-6 rounded-lg shadow-md">
        <div className="border border-black">
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-2 p-2 border-r border-black flex items-center justify-center">
              <img
                src="http://localhost:8000/media/Sello.PNG"
                alt="Membrete superior"
                className="w-16 h-16"
              />
            </div>

            <div className="col-span-7 border-r border-black flex items-center justify-center">
              <h1 className="font-bold text-lg">HOJA DE RUTA INTERNA</h1>
            </div>

            <div className="col-span-3 text-xs p-2">
              <div>
                <strong>NURI:</strong>
              </div>

              <div>{correspondencia.cite || correspondencia.nro_registro}</div>

              <div className="mt-2">
                <strong>Fecha:</strong>
              </div>

              <div>
                <FormattedDateTime
                  dateTime={
                    correspondencia.fecha_elaboracion ||
                    correspondencia.fecha_recepcion
                  }
                />
              </div>
            </div>
          </div>

          <div className="border-b border-black text-xs">
            <div className="grid grid-cols-12">
              <div className="col-span-2 border-r border-black p-1 font-semibold">
                PROCEDENCIA
              </div>

              <div className="col-span-10 p-1">
                {correspondencia.usuario?.nombre_departamento ||
                  correspondencia.datos_contacto}
              </div>
            </div>
          </div>

          <div className="border-b border-black text-xs">
            <div className="grid grid-cols-12">
              <div className="col-span-2 border-r border-black p-1 font-semibold">
                REMITENTE INTERNO
              </div>
              <div>
                <div className="col-span-11 p-1 whitespace-nowrap">
                  {accionesUnificadas[0]?.usuario_origen
                    ? `${accionesUnificadas[0].usuario_origen.first_name} ${accionesUnificadas[0].usuario_origen.last_name} - ${accionesUnificadas[0].usuario_origen.email}`
                    : "Sin origen"}
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-black text-xs">
            <div className="grid grid-cols-12">
              <div className="col-span-2 border-r border-black p-1 font-semibold">
                DEPARTAMENTO
              </div>
              <div>
                <div className="col-span-11 p-1 whitespace-nowrap">
                  {accionesUnificadas[0]?.usuario_origen
                    ? `${accionesUnificadas[0].usuario_origen.nombre_departamento} `
                    : "Sin origen"}
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-black text-xs">
            <div className="grid grid-cols-12">
              <div className="col-span-2 border-r border-black p-1 font-semibold">
                REFERENCIA
              </div>

              <div className="col-span-10 p-1">
                {correspondencia.referencia}
              </div>
            </div>
          </div>
        </div>

        <div className="border border-black mt-2">
          <div className="bg-gray-100 border-b border-black py-1 px-2 font-bold text-center">
            INFORMACIÓN GENERAL DEL DOCUMENTO
          </div>

          <div className="grid grid-cols-12 text-xs">
            <div className="col-span-3 border-r border-b border-black py-1 px-2 font-semibold">
              Nro. Registro
            </div>
            <div className="col-span-9 border-b border-black py-1 px-2">
              {correspondencia.nro_registro || correspondencia.cite}
            </div>

            <div className="col-span-3 border-r border-b border-black py-1 px-2 font-semibold">
              Referencia
            </div>
            <div className="col-span-9 border-b border-black py-1 px-2">
              {correspondencia.referencia}
            </div>

            <div className="col-span-3 border-r border-b border-black py-1 px-2 font-semibold">
              Fecha
            </div>
            <div className="col-span-9 border-b border-black py-1 px-2">
              <FormattedDateTime
                dateTime={
                  correspondencia.fecha_recepcion ||
                  correspondencia.fecha_envio ||
                  correspondencia.fecha_elaboracion
                }
              />
            </div>

            <div className="col-span-3 border-r border-b border-black py-1 px-2 font-semibold">
              {tipo === "recibida" ? "Remitente" : "Destinatario"}
            </div>

            <div className="col-span-9 border-b border-black py-1 px-2">
              {tipo === "recibida"
                ? correspondencia.datos_contacto || "No registrado"
                : correspondencia.destino_interno_info?.nombre_departamento ||
                  "No registrado"}
            </div>

            <div className="col-span-3 border-r border-b border-black py-1 px-2 font-semibold">
              Estado
            </div>

            <div className="col-span-9 border-b border-black py-1 px-2 uppercase">
              {correspondencia.estado?.replace("_", " ")}
            </div>

            <div className="col-span-3 border-r border-b border-black py-1 px-2 font-semibold">
              Prioridad
            </div>

            <div className="col-span-9 border-b border-black py-1 px-2 capitalize">
              {correspondencia.prioridad}
            </div>
          </div>
        </div>

        <div className="mt-2">
          {accionesUnificadas.map((accion, index) => (
            <div key={accion.id}>
              {index > 0 && index % 3 === 0 && (
                <div className="page-break"></div>
              )}
              <div className="border border-black mb-1 no-break">
                <div className="grid grid-cols-12 border-b border-black text-sm">
                  <div className="col-span-1 border-r border-black p-1 font-semibold">
                    A:
                  </div>

                  <div className="col-span-11 p-1">
                    {accion.usuario_destino
                      ? `${accion.usuario_destino.first_name}
               ${accion.usuario_destino.last_name}
               (${accion.usuario_destino.sigla})`
                      : "Sin destino"}
                  </div>
                </div>

                <div className="grid grid-cols-12 min-h-[100px]">
                  <div className="col-span-9 border-r border-black p-2">
                    <div className="text-sm whitespace-pre-wrap">
                      {accion.comentario || ""}
                    </div>

                    <div className="mt-3 text-xs">
                      <strong>Acción:</strong> {accion.accion}
                    </div>

                    <div className="mt-1 text-xs">
                      <strong>Origen:</strong> {accion.usuario_origen?.sigla}
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center justify-center text-gray-300 italic text-lg">
                    Firma y Sello
                  </div>
                </div>

                <div className="grid grid-cols-12 border-t border-black text-xs">
                  <div className="col-span-6 border-r border-black p-1">
                    <strong>Fecha:</strong> <FormattedDateTime dateTime={accion.fecha_inicio} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-10 text-center">
          <div>
            <div className="border-t border-gray-600 pt-2">
              Firma Responsable
            </div>
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
