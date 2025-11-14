import React, { useState, useEffect } from "react";
import { useNotificacionesPendientes } from "../../hooks/useNotificaciones";
import { AccionCorrespondenciaApi } from "../../api/correspondencia.api";
import { NotificacionCampana } from "../shared/NotificacionCampana";
import { useNavigate } from "react-router-dom";

/**
 * Componente Notificaciones
 * Muestra las notificaciones pendientes y permite marcarlas como vistas
 */
const Notificaciones = () => {
  const { data, isLoading, error } = useNotificacionesPendientes();
  const navigate = useNavigate();

  // Estado para mostrar/ocultar el panel de notificaciones
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  // Estado para almacenar las notificaciones cargadas
  const [notificaciones, setNotificaciones] = useState([]);

  // Cargar notificaciones pendientes al estado local cuando cambie 'data'
  useEffect(() => {
    if (data?.items) {
      setNotificaciones(data.items);
    }
  }, [data]);

  // Contar cuántas notificaciones no han sido vistas
  const count = notificaciones.filter((noti) => !noti.visto).length;

  /**
   * Función para marcar una notificación como vista
   * ⚠️ Clave: pasar siempre **solo IDs**, nunca objetos completos
   */
  const marcarComoVista = async (
    id,    // ID de la notificación
    correspondencia_id, // ID de la correspondencia
    tipo,              // Tipo de correspondencia
  ) => {
    try {
      // 1️⃣ Marcar la notificación como vista
      await AccionCorrespondenciaApi.marcarNotificacionVista(id);

      //  2️⃣ Actualizar el estado local
      setNotificaciones((prev)=> prev.filter((not) => not.id !== id))

      // 3️⃣ Navegar según tipo de correspondencia
      if (tipo?.toLowerCase() === "recibido") {
        navigate(`/detailRecibida/${correspondencia_id}`);
      } else {
        navigate(`/vistaPreviaDocumento/${correspondencia_id}`);
      }
    } catch (error) {
      console.error(
        "⚠️ Error marcando notificación o registrando historial:",
        error
      );
    }
  };

  // Función para mostrar/ocultar el panel de notificaciones
  const manejarClickCampana = () => {
    setMostrarNotificaciones((prev) => !prev);
  };

  // Renderizado en estado de carga
  if (isLoading) return <div className="p-4">Cargando...</div>;
  // Renderizado en caso de error
  if (error)
    return (
      <div className="p-4 text-red-600">Error al cargar notificaciones</div>
    );

  return (
    <div className="relative">
      {/* Icono de campana con contador */}
      <NotificacionCampana count={count} onClick={manejarClickCampana} />

      {mostrarNotificaciones && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white text-black rounded shadow-lg z-50">
          {count === 0 ? (
            <div className="p-4 text-center text-gray-700">
              No hay notificaciones
            </div>
          ) : (
            notificaciones.map((notificacion) => (
              <div
                key={notificacion.id}
                onClick={() =>
                  marcarComoVista(
                    notificacion.id,                         // ID de la notificación
                    notificacion.correspondencia_id,         // ID de la correspondencia
                    notificacion.tipo,                        // tipo de correspondencia
                  )
                }
                className="cursor-pointer p-3 border-b border-gray-200 hover:bg-gray-100"
                title={notificacion.descripcion}
              >
                <div className="font-medium">
                  {notificacion.documento || "Documento sin referencia"}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(notificacion.fecha).toLocaleString()}
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
