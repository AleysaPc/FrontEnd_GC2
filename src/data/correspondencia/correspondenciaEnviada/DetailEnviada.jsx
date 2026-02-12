import { useParams } from "react-router-dom";
import {
  useCorrespondencia,
  useCorrespondenciaElaborada,
  useCorrespondenciaRecibida,
} from "../../../hooks/useEntities";
import { useState, useEffect } from "react";
import { ActionButton } from "../../../components/shared/ActionButton";
import VisorPDF from "../../../components/shared/VisorPdf";
import { Navigation } from "../../../components/shared/Navigation";
import {
  FaArrowLeft,
  FaFile,
  FaFileSignature,
  FaShare,
  FaFileMedical,
} from "react-icons/fa";
import TestDerivar from "../correspondencia/TestDerivar";
import { useNavigate } from "react-router-dom";

export default function DetailEnviada() {
  const { id } = useParams();
  const [mostrarModalDerivar, setMostrarModalDerivar] = useState(false);

  const navigate = useNavigate();
  const [comentarioRespuesta, setComentarioRespuesta] = useState("");
  const [documentoActivo, setDocumentoActivo] = useState("");

  const { data: response, isLoading: isLoadingCorrespondencia } =
    useCorrespondenciaElaborada(id);

  const correspondencia = response?.data;
  const respuestaPadreId = correspondencia?.respuesta_a;
  const { data: dataRespuestaPadreGeneral } = useCorrespondencia(respuestaPadreId);
  const { data: dataRespuestaPadreRecibida } =
    useCorrespondenciaRecibida(respuestaPadreId);
  const { data: dataRespuestaPadreElaborada } =
    useCorrespondenciaElaborada(respuestaPadreId);
  const documentos = correspondencia?.documentos || [];
  // URL de respaldo: PDF generado por backend cuando no hay archivo físico
  const pdfFallbackUrl = id
    ? `${import.meta.env.VITE_API_BASE_URL}/correspondencia/elaborada/${id}/pdf/`
    : "";

  useEffect(() => {
    if (documentos.length > 0) {
      const archivo = documentos[0]?.archivo || "";
      // Si el archivo no es URL válida, usar el PDF generado
      setDocumentoActivo(archivo.startsWith("http") ? archivo : pdfFallbackUrl);
      return;
    }
    // Si no hay documentos, mostrar PDF generado
    if (pdfFallbackUrl) {
      setDocumentoActivo(pdfFallbackUrl);
    }
  }, [documentos, pdfFallbackUrl]);

  // Acepta URLs normales y blob: (por si luego se genera PDF en frontend)
  const isUrlValid =
    documentoActivo &&
    (documentoActivo.startsWith("http") || documentoActivo.startsWith("blob:"));

  if (isLoadingCorrespondencia) {
    return <div>Cargando...</div>;
  }

  if (!correspondencia) {
    return <div>No se encontró la correspondencia solicitada</div>;
  }

  const tieneAcciones =
    correspondencia.acciones && correspondencia.acciones.length > 0;

  const numeroRespuesta =
    correspondencia.nro_registro_respuesta ||
    dataRespuestaPadreRecibida?.data?.nro_registro ||
    dataRespuestaPadreElaborada?.data?.cite ||
    dataRespuestaPadreGeneral?.data?.nro_registro ||
    dataRespuestaPadreGeneral?.data?.cite ||
    (respuestaPadreId ? `#${respuestaPadreId}` : null);

  const referenciaRespuesta =
    dataRespuestaPadreRecibida?.data?.referencia ||
    dataRespuestaPadreElaborada?.data?.referencia ||
    dataRespuestaPadreGeneral?.data?.referencia ||
    "Sin referencia";

  return (
    <div className="p-4">
      <Navigation
        title="Detalle de Correspondencia"
        actions={[
          {
            to: `/createElaborada?respuesta_a=${id}`,
            label: "Generar respuesta",
            icon: FaFileMedical,
            estilos:
              "bg-white hover:bg-orange-500 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
          {
            label: "Derivar",
            icon: FaShare,
            onClick: () => setMostrarModalDerivar(true),
            estilos:
              "bg-white hover:bg-green-400 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
          {
            to: -1,
            label: "Volver",
            icon: FaArrowLeft,
            estilos:
              "bg-white hover:bg-red-800 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
        ]}
        subTitle={`Información del Documento: ${correspondencia.cite}`}
        icon={FaFileSignature}
      />
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="space-y-1 w-4/5">
            {" "}
            {/* Primera Columna */}
            <p className="font-medium text-blue-700">CITE: </p>
            <p className="text-gray-900">{correspondencia.cite}</p>
            <p className="font-medium text-blue-700">Referencia:</p>
            <p className="text-gray-900">{correspondencia.referencia}</p>
            <p className="font-medium text-blue-700 mt-4">
              Fecha y hora de envio:
            </p>
            <p className="text-gray-900">
              {new Date(correspondencia.fecha_envio).toLocaleString()}
            </p>
            <p className="font-medium text-blue-700 mt-4">Destinatario:</p>
            <p className="text-gray-900">{correspondencia.datos_contacto}</p>
            <p className="font-medium text-blue-700 mt-4">Descripción:</p>
            <p className="text-gray-900">{correspondencia.descripcion}</p>
            <hr />
            <p className="font-medium text-blue-700">Estado:</p>
            <p className="text-gray-900 capitalize">
              {correspondencia.estado?.replace("_", " ")}
            </p>
            <p className="font-medium text-blue-700 mt-4">Prioridad:</p>
            <p className="text-gray-900 capitalize">
              {correspondencia.prioridad}
            </p>
            <p className="font-medium text-blue-700 mt-4">
              Fecha de seguimiento:
            </p>
            <p className="text-gray-900 capitalize">
            {new Date(correspondencia.fecha_seguimiento).toLocaleString()}
              <br />
            </p> <p className="font-medium text-blue-700 mt-4">
              Fecha y hora de Elaboracion:
            </p>
            <p className="text-gray-900 capitalize">
            {new Date(correspondencia.fecha_elaboracion).toLocaleString()}
            </p>

          </div>

          <div className="space-y-1 w-9/10">
            {" "}
            {/* Segunda Columna */}
            <div>
              {isUrlValid ? (
                <VisorPDF url={documentoActivo} />
              ) : (
                <div>Documento no disponible o URL no válida.</div>
              )}
            </div>
            {/* Botones dinámicos para documentos */}
            <div className="mt-4 space-y-2">
              <div className="mt-4 space-y-2">
                {documentos.map((doc, index) => (
                  <ActionButton
                    key={doc.id_documento}
                    label=" Abrir PDF"
                    //label={doc.archivo || `Documento ${index + 1}`}
                    icon={FaFile}
                    onClick={() => {
                      if (doc.archivo) {
                        // Mostrar en visor y abrir en nueva pestaña
                        setDocumentoActivo(doc.archivo);
                        window.open(doc.archivo, "_blank");
                      } else {
                        // Si no hay archivo, usar PDF generado
                        if (pdfFallbackUrl) {
                          setDocumentoActivo(pdfFallbackUrl);
                        }
                        navigate(
                          `/vistaPdfDocumento/${correspondencia.id_correspondencia}`
                        );
                      }
                    }}
                    estilos={`px-4 py-2 border rounded-md ${
                      documentoActivo === doc.archivo
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border-blue-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {respuestaPadreId ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4">Recorrido Relacional</h3>
          <div className="space-y-3">
            <div className="border rounded-md bg-blue-100 px-3 py-2">
              <p className="text-sm font-semibold text-amber-900">
                Este documento es respuesta a:
              </p>
              <p className="text-xs text-blue-800">
                {`${numeroRespuesta || "Sin numero"} - ${referenciaRespuesta}`}
              </p>
            </div>
            <p className="text-sm text-gray-500">Sin respuestas relacionadas.</p>
          </div>
        </div>
      ) : null}

      <h3 className="text-xl font-bold mb-4">Historial de Derivaciones</h3>
      <div className="space-y-4">
        {tieneAcciones ? (
          correspondencia.acciones.map((accion, index) => (
            <div
              key={accion.id || index}
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
                    {new Date(accion.fecha_inicio).toLocaleString()}
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
        <TestDerivar
          isOpen={mostrarModalDerivar}
          onClose={() => setMostrarModalDerivar(false)}
          id={id}
        />
      </div>
    </div>
  );
}

