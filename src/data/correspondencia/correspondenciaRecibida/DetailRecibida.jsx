import { useParams } from "react-router-dom";
import { useCorrespondenciaRecibida } from "../../../hooks/useEntities";
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
  FaStopwatch,
} from "react-icons/fa";
import TestDerivar from "../correspondencia/TestDerivar";
import { useNavigate } from "react-router-dom";
import FormattedDateTime from "../../../components/shared/FormattedDate";

export default function DetailRecibida() {
  const { id } = useParams();
  const [mostrarModalDerivar, setMostrarModalDerivar] = useState(false);
  const navigate = useNavigate();
  const [documentoActivo, setDocumentoActivo] = useState("");

  const { data: response, isLoading: isLoadingCorrespondencia } =
    useCorrespondenciaRecibida(id);

  const correspondencia = response?.data;
  console.log("Datossss:", correspondencia)
  const documentos = correspondencia?.documentos || [];

  useEffect(() => {
    if (documentos.length > 0) {
      setDocumentoActivo(documentos[0].archivo);
    }
  }, [documentos]);

  const isUrlValid = documentoActivo && documentoActivo.startsWith("http");

  if (isLoadingCorrespondencia) {
    return <div>Cargando...</div>;
  }

  if (!correspondencia) {
    return <div>No se encontró la correspondencia solicitada</div>;
  }

  // 🔹 NUEVO: Unificar acciones del documento original y sus respuestas
  const accionesUnificadas = [
    ...(correspondencia.acciones || []),
    ...(correspondencia.respuestas?.flatMap(r => r.acciones) || [])
  ];
  accionesUnificadas.sort((a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio));

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
          {
            to: `/historial/${id}`,
            label: "Historial",
            icon: FaStopwatch,
            estilos:
              "bg-white hover:bg-red-800 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
          {
            to: `/hojaDeRuta/${id}`,
            label: "Hoja de Ruta",
            icon: FaFile,
            estilos:
              "bg-white hover:bg-red-800 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          }
        ]}
        subTitle={`Información del Documento: ${correspondencia.nro_registro}`}
        icon={FaFileSignature}
      />

      {/* Datos generales del documento */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="space-y-1 w-4/5">
            <p className="text-gray-900">
              <span className="font-medium text-blue-700">Nro Registro:</span>{" "}
              {correspondencia.nro_registro}
            </p>
            <p className="text-gray-900">
              <span className="font-medium text-blue-700">Referencia:</span>{" "}
              {correspondencia.referencia}
            </p>
            <p className="text-gray-900">
              <span className="font-medium text-blue-700">Fecha y hora de recepción:</span>{" "}
              <FormattedDateTime
                dateTime={correspondencia.fecha_recepcion}
              />
            </p>
            <p className="text-gray-900">
              <span className="font-medium text-blue-700">Contacto:</span>{" "}
              {correspondencia.datos_contacto}
            </p>
            <p className="text-gray-900">
              <span className="font-medium text-blue-700">Descripción:</span>{" "}
              {correspondencia.descripcion}
            </p>
            <hr />
            <p className="text-gray-900">
              <span className="font-medium text-blue-700">Estado:</span>{" "}
              {correspondencia.estado?.replace("_", " ")}
            </p>
            <p className="text-gray-900">
              <span className="font-medium text-blue-700">Prioridad:</span>{" "}
              {correspondencia.prioridad}
            </p>
            <p className="text-gray-900">
              <span className="font-medium text-blue-700">Registrado por:</span>{" "}
              {correspondencia.usuario?.email || "No especificado"}
            </p>
          </div>

          {/* Visor de documentos */}
          <div className="space-y-1 w-9/10">
            {isUrlValid ? (
              <VisorPDF url={documentoActivo} />
            ) : (
              <div>Documento no disponible o URL no válida.</div>
            )}
            <div className="mt-4 space-y-2">
              {documentos.map((doc, index) => (
                <ActionButton
                  key={doc.id_documento}
                  label="Abrir PDF"
                  icon={FaFile}
                  onClick={() => {
                    if (doc.archivo) {
                      window.open(doc.archivo, "_blank");
                    } else {
                      navigate(`/vistaPdfDocumento/${correspondencia.id_correspondencia}`);
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

      {/* Historial unificado */}
      <h3 className="text-xl font-bold mb-4">Historial de Derivaciones</h3>
      <div className="space-y-4">
        {accionesUnificadas.length > 0 ? (
          accionesUnificadas.map((accion, index) => (
            <div key={accion.id || index} className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-2">Derivación #{index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium text-gray-700">Tipo de Acción:</p>
                  <p className="text-gray-900">{accion.accion}</p>
                  <p className="font-medium text-gray-700 mt-4">Derivado por:</p>
                  <p className="text-gray-900">{accion.usuario_origen?.email || "No especificado"}</p>
                  <p className="font-medium text-gray-700 mt-4">Fecha:</p>
                  <p className="text-gray-900"><FormattedDateTime dateTime={accion.fecha_inicio} /></p>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-gray-700">Usuario Destino:</p>
                  <p className="text-gray-900">{accion.usuario_destino?.email || "No especificado"}</p>
                  <p className="font-medium text-gray-700 mt-4">Comentario:</p>
                  <p className="text-gray-900">{accion.comentario || "Sin comentarios"}</p>
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
