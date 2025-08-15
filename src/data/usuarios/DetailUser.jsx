import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useEntities";
import { Navigation } from "../../components/shared/Navigation";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import FormattedDate from "../../components/shared/FormattedDate";

/**
 * user.data = {
 *   id, first_name, secund_name, last_name, secund_last_name,
 *   birthday, birthplace, username, email, phone, cellphone,
 *   rol, nombre_departamento, nombre_institucion, is_active,
 *   created_at, last_login, ci, address, avatar_url, notes,
 *   created_by, updated_by
 * }
 */

export default function DetailUser() {
  const { id } = useParams();
  const { data: user } = useUser(id);
  console.log("Datos del usuario", user);

  return (
    <div>
      <Navigation
        title="Detalle de Usuario"
        actions={[
          {
            to: -1,
            label: "Volver",
            icon: FaArrowLeft,
            estilos:
              "bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
        ]}
        subTitle={`Información del usuario: ${user?.data?.email}`}
        icon={FaUser}
      />

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Columna izquierda: Foto de perfil */}
          <div className="flex flex-col items-center">
            {user?.data?.avatar_url ? (
              <img
                src={user.data.avatar_url}
                alt={`${user.data.first_name} ${user.data.last_name}`}
                className="w-48 h-48 rounded-full mb-4 object-cover shadow-lg border-2 border-blue-600"
              />
            ) : (
              <div className="w-48 h-48 rounded-full mb-4 bg-gray-200 flex items-center justify-center text-gray-500 text-6xl">
                <FaUser />
              </div>
            )}
            <p className="font-medium text-blue-700 text-lg text-center">
              {user?.data?.first_name} {user?.data?.secund_name} {user?.data?.last_name} {user?.data?.secund_last_name}
            </p>
            <p className="text-gray-600">{user?.data?.rol}</p>
            <p className="text-gray-600">{user?.data?.cargo}</p>
          </div>

          {/* Columna derecha: Datos personales y de cuenta */}
          <div className="space-y-2">
            <p><span className="font-medium text-blue-700">Fecha de nacimiento: </span>{user?.data?.birthday}</p>
            <p><span className="font-medium text-blue-700">Lugar de nacimiento: </span>{user?.data?.lugar_nacimiento}</p>
            <p><span className="font-medium text-blue-700">Documento de identidad: </span>{user?.data?.documento_identidad}</p>
            <p><span className="font-medium text-blue-700">Dirección: </span>{user?.data?.direccion}</p>
            <p><span className="font-medium text-blue-700">Username: </span>{user?.data?.username}</p>
            <p><span className="font-medium text-blue-700">Correo: </span>{user?.data?.email}</p>
            <p><span className="font-medium text-blue-700">Teléfono: </span>{user?.data?.telefono}</p>
            <p><span className="font-medium text-blue-700">Celular: </span>{user?.data?.celular}</p>
            <p><span className="font-medium text-blue-700">Departamento: </span>{user?.data?.nombre_departamento}</p>
            <p><span className="font-medium text-blue-700">Empresa: </span>{user?.data?.nombre_institucion}</p>
            <p><span className="font-medium text-blue-700">Estado: </span>{user?.data?.is_active ? "Activo" : "Inactivo"}</p>
            
            {/* Datos de auditoría */}
            <p><span className="font-medium text-blue-700">Fecha de registro: </span>{user?.data?.date_joined ? <FormattedDate date={user.data.date_joined} /> : "N/A"}</p>
            <p><span className="font-medium text-blue-700">Último inicio de sesión: </span>{user?.data?.last_login}</p>
            <p><span className="font-medium text-blue-700">Creado por: </span>{user?.data?.created_by}</p>
            <p><span className="font-medium text-blue-700">Modificado por: </span>{user?.data?.updated_by}</p>

            {/* Notas */}
            {user?.data?.notes && (
              <p><span className="font-medium text-blue-700">Observaciones: </span>{user.data.notes}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
