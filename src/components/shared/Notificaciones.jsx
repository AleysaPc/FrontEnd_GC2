import React, { useState, useEffect } from "react";
import { useNotificacionesPendientes } from "../../hooks/useNotificaciones";
import { AccionCorrespondenciaApi } from "../../api/correspondencia.api";
import { NotificacionCampana } from "../shared/NotificacionCampana";
import { useNavigate } from "react-router-dom";

const Notificaciones = () => {
  const { data, isLoading, error } = useNotificacionesPendientes();
  const navigate = useNavigate();

  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    if (data?.items) {
      setNotificaciones(data.items);
    }
  }, [data]);

  const count = notificaciones.filter((noti) => !noti.visto).length;

  const marcarComoVista = async (id_accion, id_documento, tipo_documento) => {
    try {
      await AccionCorrespondenciaApi.marcarNotificacionVista(id_accion);
      setNotificaciones((prev) =>
        prev.filter((noti) => noti.id_accion !== id_accion)
      );

      if (id_documento) {
        if (tipo_documento === "recibido") {
          navigate(`/detailRecibida/${id_documento}`);
        } else if (tipo_documento === "enviado") {
          navigate(`/detailEnviada/${id_documento}`);
        } else {
          navigate(`/detailRecibida/${id_documento}`);
        }
      }
    } catch (e) {
      console.error("Error al marcar notificación como vista", e);
    }
  };

  const manejarClickCampana = () => {
    setMostrarNotificaciones((prev) => !prev);
  };

  if (isLoading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-600">Error al cargar notificaciones</div>;

  return (
    <div className="relative">
      <NotificacionCampana count={count} onClick={manejarClickCampana} />
      {mostrarNotificaciones && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white text-black rounded shadow-lg z-50">
          {count === 0 ? (
            <div className="p-4 text-center text-gray-700">
              No hay notificaciones
            </div>
          ) : (
            notificaciones.map((noti) => (
              <div
                key={noti.id_accion}
                onClick={() =>
                  marcarComoVista(
                    noti.id_accion,
                    noti.correspondencia_id,
                    noti.tipo_documento
                  )
                }
                className="cursor-pointer p-3 border-b border-gray-200 hover:bg-gray-100"
                title={noti.descripcion}
              >
                <div className="font-medium">
                  {noti.documento || "Documento sin referencia"}
                </div>
                {/*<div className="text-sm text-gray-600">
                  {noti.descripcion || "Sin descripción"}
                </div>*/}
                <div className="text-xs text-gray-400">
                  {new Date(noti.fecha).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notificaciones;
