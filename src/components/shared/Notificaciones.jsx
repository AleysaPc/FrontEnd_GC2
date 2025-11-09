import React, { useState, useEffect } from "react";
import { useNotificacionesPendientes } from "../../hooks/useNotificaciones";
import { AccionCorrespondenciaApi } from "../../api/correspondencia.api";
import { NotificacionCampana } from "../shared/NotificacionCampana";
import { useNavigate } from "react-router-dom";
import { obtenerIdUser } from "../../utils/auth";

const Notificaciones = () => {
  const { data, isLoading, error } = useNotificacionesPendientes();
  const navigate = useNavigate();
  const currentUser = obtenerIdUser();

  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  // Cargar notificaciones pendientes en estado local
  useEffect(() => {
    if (data?.items) {
      setNotificaciones(data.items);
    }
  }, [data]);

  const count = notificaciones.filter((noti) => !noti.visto).length;

  const marcarComoVista = async (id, id_documento, tipo, noti) => {
    try {
      // 1️⃣ Marcar la notificación como vista
      await AccionCorrespondenciaApi.marcarNotificacionVista(id);

      // 2️⃣ Registrar un historial opcional
      await AccionCorrespondenciaApi.create({
        correspondencia_id: noti.correspondencia_id, // Nombre exacto esperado por serializer
        usuario_destino_id: noti.usuario_destino_id || null, // si aplica
        accion: "observado", // Valor válido de choices
        comentario_derivacion: "Notificación marcada como vista", // usa campo que maneja el serializer
      });

      // 3️⃣ Actualizar estado local
      setNotificaciones((prev) => prev.filter((not) => not.id !== id));

      // 4️⃣ Navegar según tipo
      if (tipo?.toLowerCase() === "recibido") {
        navigate(`/detailRecibida/${id_documento}`);
      } else {
        navigate(`/vistaPreviaDocumento/${id_documento}`);
      }
    } catch (error) {
      console.error(
        "⚠️ Error marcando notificación o registrando historial:",
        error
      );
    }
  };

  const manejarClickCampana = () => {
    setMostrarNotificaciones((prev) => !prev);
  };

  if (isLoading) return <div className="p-4">Cargando...</div>;
  if (error)
    return (
      <div className="p-4 text-red-600">Error al cargar notificaciones</div>
    );

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
                key={noti.id}
                onClick={() =>
                  marcarComoVista(
                    noti.id,
                    noti.correspondencia_id,
                    noti.tipo,
                    noti
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
