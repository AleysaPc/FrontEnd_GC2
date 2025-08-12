import React, { useState, useEffect } from "react";
import { useNotificacionesPendientes } from "../../hooks/useNotificaciones";
import { AccionCorrespondenciaApi } from "../../api/correspondencia.api";
import { NotificacionCampana } from "../shared/NotificacionCampana";
import useLogout from "../../hooks/useLogout";
import { FaUser } from "react-icons/fa";
import Dropdown from "../shared/Dropdown";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar, user }) => {
  const { data, isLoading, error } = useNotificacionesPendientes();
  const logoutUser = useLogout();
  const navigate = useNavigate();

  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    if (data?.items) {
      setNotificaciones(data.items);
    }
  }, [data]);

  const count = notificaciones.filter((noti) => !noti.visto).length;

  const marcarComoVista = async (id_accion, id_documento) => {
    try {
      await AccionCorrespondenciaApi.marcarNotificacionVista(id_accion);
      setNotificaciones((prev) =>
        prev.filter((noti) => noti.id_accion !== id_accion)
      );
      // Redirigir a la vista previa del documento
      if (id_documento) {
        navigate(`/detailRecibida/${id_documento}`);
      }
    } catch (e) {
      console.error("Error al marcar notificación como vista", e);
    }
  };

  const manejarClickCampana = () => {
    setMostrarNotificaciones((prev) => !prev);
  };

  if (isLoading) return <div className="p-4">Cargando...</div>;
  if (error)
    return <div className="p-4 text-red-600">Error al cargar notificaciones</div>;

  return (
    <nav className="bg-red-700 text-white flex justify-between items-center p-4 sticky top-0 z-50 shadow-md">
      <button
        className="p-2 hover:bg-red-600 rounded"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <div className="text-xl font-semibold">
        Sistema de Gestión de Correspondencia
      </div>

      <div className="flex items-center space-x-6 relative">
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
                      marcarComoVista(noti.id_accion, noti.correspondencia_id)
                    }
                    className="cursor-pointer p-3 border-b border-gray-200 hover:bg-gray-100"
                    title={noti.descripcion}
                  >
                    <div className="font-medium">
                      {noti.documento || "Documento sin referencia"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {noti.descripcion || "Sin descripción"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(noti.fecha).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <Dropdown
          icon={FaUser}
          label={user?.email || "Usuario"}
          options={[
            {
              label: "Mi Perfil",
            },
            {
              label: "Cerrar Sesión",
              action: logoutUser,
            },
          ]}
        />
      </div>
    </nav>
  );
};

export default Navbar;
