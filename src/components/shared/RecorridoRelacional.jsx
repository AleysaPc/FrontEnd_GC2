import React from 'react';

const estadoVisual = (estado) => {
  const key = (estado || "").toLowerCase();
  const mapa = {
    borrador: "bg-amber-100 text-amber-700",
    en_revision: "bg-blue-100 text-blue-700",
    aprobado: "bg-green-100 text-green-700",
    rechazado: "bg-red-100 text-red-700",
    enviado: "bg-purple-100 text-purple-700",
    archivado: "bg-gray-100 text-gray-700",
    derivado: "bg-orange-100 text-orange-700",
    observado: "bg-yellow-100 text-yellow-700",
    devuelto: "bg-pink-100 text-pink-700",
  };
  return mapa[key] || "bg-gray-50 border-gray-200";
};

const renderRespuestaTree = (respuestas = [], nivel = 0) =>
  respuestas.map((respuesta) => (
    <div
      key={respuesta.id_correspondencia}
      className={`ml-${Math.min(nivel * 4, 12)}`}
      style={{ marginLeft: `${nivel * 16}px` }}
    >
      <div className="border-l-2 border-gray-300 pl-4 mb-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-gray-800">
            {respuesta.cite || `Documento #${respuesta.id_correspondencia}`}
          </p>
          <span
            className={`text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full ${estadoVisual(
              respuesta.estado
            )}`}
          >
            {respuesta.estado || "sin_estado"}
          </span>
        </div>
        <p className="text-xs text-gray-600">
          {respuesta.referencia || "Sin referencia"}
        </p>
      </div>
      {respuesta.respuestas?.length > 0
        ? renderRespuestaTree(respuesta.respuestas, nivel + 1)
        : null}
    </div>
  ));

export default function RecorridoRelacional({ 
  correspondencia, 
  esEnviada = false,
  numeroRespuesta = null,
  referenciaRespuesta = null 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Recorrido Relacional</h3>
      <div className="space-y-3">
        {/* Documento padre (si existe) */}
        {correspondencia.respuesta_a ? (
          <div className="border rounded-md bg-indigo-50 px-3 py-2">
            <p className="text-sm font-semibold text-indigo-900">
              Documento anterior relacionado
            </p>
            <p className="text-xs text-indigo-800">
              {esEnviada 
                ? `${numeroRespuesta || "Sin numero"} - ${referenciaRespuesta || "Sin referencia"}`
                : `${correspondencia.relacionada_a_info?.numero || "Sin numero"} - ${
                    correspondencia.relacionada_a_info?.referencia || "Sin referencia"
                  }`
              }
            </p>
          </div>
        ) : null}

        {/* Documento actual */}
        <div className="border rounded-md bg-blue-50 px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-blue-900">Documento actual</p>
            <span
              className={`text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-full ${estadoVisual(
                correspondencia.estado
              )}`}
            >
              {correspondencia.estado || "sin_estado"}
            </span>
          </div>
          <p className="text-xs text-blue-800">
            {esEnviada 
              ? `${correspondencia.cite || `#${correspondencia.id_correspondencia}`} - ${
                  correspondencia.referencia || "Sin referencia"
                }`
              : `${correspondencia.nro_registro || `#${correspondencia.id_correspondencia}`} - ${
                  correspondencia.referencia || "Sin referencia"
                }`
            }
          </p>
        </div>

        {/* Respuestas */}
        {correspondencia.respuestas?.length > 0 ? (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Respuestas generadas (con estado)
            </p>
            {renderRespuestaTree(correspondencia.respuestas)}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Aún no hay respuestas registradas para este documento.
          </p>
        )}
      </div>
    </div>
  );
}