import React, { useEffect, useState } from "react";
import {
  useCorrespondencia,
  useCorrespondenciaRecibida,
  useCorrespondenciaElaborada,
} from "../../hooks/useEntities";
import {
  FaPaperPlane,
  FaExclamationTriangle,
  FaReply,
  FaWindowClose,
  FaCheck,
  FaFolder,
  FaCheckCircle,
} from "react-icons/fa";
import FormattedDateTime from "./FormattedDate";

export default function Trazabilidad({ visible, onClose, correspondenciaId }) {
  const { data: dataGeneral } = useCorrespondencia(correspondenciaId);
  const { data: dataRecibida } = useCorrespondenciaRecibida(correspondenciaId);
  const { data: dataElaborada } = useCorrespondenciaElaborada(correspondenciaId);
  const respuestaPadreId = dataElaborada?.data?.respuesta_a;
  const { data: dataRespuestaPadre } = useCorrespondencia(respuestaPadreId);
  const { data: dataRespuestaPadreRecibida } =
    useCorrespondenciaRecibida(respuestaPadreId);
  const { data: dataRespuestaPadreElaborada } =
    useCorrespondenciaElaborada(respuestaPadreId);

  const [accionesOrdenadas, setAccionesOrdenadas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [relacionadaInfo, setRelacionadaInfo] = useState(null);
  const [respuestaAInfo, setRespuestaAInfo] = useState(null);

  useEffect(() => {
    const docRecibida = dataRecibida?.data;
    const docGeneral = dataGeneral?.data;
    const docElaborada = dataElaborada?.data;
    const docRespuestaPadre = dataRespuestaPadre?.data;
    const docRespuestaPadreRecibida = dataRespuestaPadreRecibida?.data;
    const docRespuestaPadreElaborada = dataRespuestaPadreElaborada?.data;

    const obtenerAccionesRecursivas = (nodos = []) =>
      nodos.flatMap((n) => [
        ...(n.acciones || []),
        ...obtenerAccionesRecursivas(n.respuestas || []),
      ]);

    if (docRecibida) {
      const unificadas = [
        ...(docRecibida.acciones || []),
        ...obtenerAccionesRecursivas(docRecibida.respuestas || []),
      ].sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));

      setAccionesOrdenadas(unificadas);
      setRespuestas(docRecibida.respuestas || []);
      setRelacionadaInfo(docRecibida.relacionada_a_info || null);
      setRespuestaAInfo(null);
      return;
    }

    const ordenadas = [...(docGeneral?.acciones || [])].sort(
      (a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio)
    );
    setAccionesOrdenadas(ordenadas);
    setRespuestas([]);
    setRelacionadaInfo(null);
    if (docElaborada?.respuesta_a) {
      setRespuestaAInfo({
        id_correspondencia: docElaborada.respuesta_a,
        numero:
          docElaborada.nro_registro_respuesta ||
          docRespuestaPadreRecibida?.nro_registro ||
          docRespuestaPadreElaborada?.cite ||
          docRespuestaPadre?.nro_registro ||
          docRespuestaPadre?.cite ||
          `#${docElaborada.respuesta_a}`,
        referencia:
          docRespuestaPadreRecibida?.referencia ||
          docRespuestaPadreElaborada?.referencia ||
          docRespuestaPadre?.referencia ||
          null,
      });
    } else {
      setRespuestaAInfo(null);
    }
  }, [
    dataGeneral,
    dataRecibida,
    dataElaborada,
    dataRespuestaPadre,
    dataRespuestaPadreRecibida,
    dataRespuestaPadreElaborada,
    correspondenciaId,
  ]);

  if (!visible || !correspondenciaId) return null;

  const getIconoAccion = (tipo) => {
    switch ((tipo || "").toLowerCase()) {
      case "derivado":
        return (
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mr-2">
            <FaPaperPlane className="text-gray-50 text-2xl" />
          </div>
        );
      case "observado":
        return (
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-2">
            <FaExclamationTriangle className="text-gray-50 text-2xl" />
          </div>
        );
      case "devuelto":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-2">
            <FaReply className="text-gray-50 text-2xl" />
          </div>
        );
      case "rechazado":
        return (
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-2">
            <FaWindowClose className="text-gray-50 text-2xl" />
          </div>
        );
      case "aprobado":
        return (
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-2">
            <FaCheck className="text-gray-50 text-2xl" />
          </div>
        );
      case "archivado":
        return (
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center mr-2">
            <FaFolder className="text-gray-50 text-2xl" />
          </div>
        );
      case "respondido":
        return (
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-2">
            <FaCheckCircle className="text-gray-50 text-2xl" />
          </div>
        );
    }
  };

  const estadoVisual = (estado) => {
    const key = (estado || "").toLowerCase();
    if (key === "borrador") return "bg-amber-50 border-amber-200";
    if (key === "enviado") return "bg-emerald-50 border-emerald-200";
    return "bg-gray-50 border-gray-200";
  };

  const renderRespuestaTree = (nodos = [], nivel = 0) =>
    nodos.map((respuesta) => (
      <div
        key={respuesta.id_correspondencia}
        className="relative"
        style={{ marginLeft: `${nivel * 24}px` }}
      >
        <div
          className={`border rounded-md px-3 py-2 mb-2 ${estadoVisual(
            respuesta.estado
          )}`}
        >
          <p className="text-[11px] uppercase tracking-wide text-slate-600 mb-1">
            Respuesta
          </p>
          <p className="text-sm font-semibold text-gray-800">
            {respuesta.cite || `Documento #${respuesta.id_correspondencia}`}
          </p>
          <p className="text-xs text-gray-600">
            {respuesta.referencia || "Sin referencia"}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            Estado: {respuesta.estado || "sin_estado"}
          </p>
        </div>
        {respuesta.respuestas?.length > 0
          ? renderRespuestaTree(respuesta.respuestas, nivel + 1)
          : null}
      </div>
    ));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white p-4 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
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

        {(relacionadaInfo || respuestaAInfo || respuestas.length > 0) && (
          <div className="bg-slate-50 border rounded-md p-3 mb-4">
            <p className="text-sm font-semibold text-slate-800 mb-2">
              Recorrido Relacional
            </p>
            {respuestaAInfo && (
              <p className="text-xs text-amber-700 mb-2">
                Este documento es respuesta a:{" "}
                {`${respuestaAInfo.numero || "Sin numero"} - ${
                  respuestaAInfo.referencia || "Sin referencia"
                }`}
              </p>
            )}
            {relacionadaInfo && (
              <p className="text-xs text-slate-700 mb-2">
                Documento anterior:{" "}
                {`${relacionadaInfo.numero || "Sin numero"} - ${
                  relacionadaInfo.referencia || "Sin referencia"
                }`}
              </p>
            )}
            {respuestas.length > 0 ? (
              <div>{renderRespuestaTree(respuestas)}</div>
            ) : (
              <p className="text-xs text-slate-500">
                Sin respuestas relacionadas.
              </p>
            )}
          </div>
        )}

        {accionesOrdenadas.length > 0 ? (
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
            <div className="space-y-8">
              {accionesOrdenadas.map((accion, index) => {

                const isEven = index % 2 == 0;
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
                              {accion.accion.toUpperCase()}
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
                                {accion.usuario_origen?.email
                                  ? `${accion.usuario_origen.email} - ${
                                      accion.usuario_origen
                                        ?.nombre_departamento || "Desconocido"
                                    }`
                                  : "Desconocido"}
                              </p>
                            </div>
                            <br />
                            <div>
                              <p className="text-xs text-gray-500">Para</p>
                              <p className="font-medium">
                                {accion.usuario_destino?.email
                                  ? `${accion.usuario_destino.email} - ${
                                      accion.usuario_destino
                                        ?.nombre_departamento || "Desconocido"
                                    }`
                                  : "Desconocido"}
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
