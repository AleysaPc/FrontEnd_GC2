import React from "react";
import { useParams } from "react-router-dom";
import { useContacto } from "../../hooks/useEntities";
import { Navigation } from "../../components/shared/Navigation";
import { FaArrowLeft, FaUser } from "react-icons/fa";

/**
 * contacto.data = {
 *   id, nombre_contacto, apellido_pat_contacto, apellido_mat_contacto,
 *   titulo_profesional, cargo, email, telefono, id_institucion,
 *   nombre_institucion, created_at, updated_at, created_by, updated_by, notes
 * }
 */

export default function DetailContacto() {
    
 const {id} = useParams();
 const {data: contacto} = useContacto(id);
 console.log("Datos del contacto", contacto);

  return (
    <div>
      <Navigation
        title="Detalle de Contacto"
        actions={[
          {
            to: -1,
            label: "Volver",
            icon: FaArrowLeft,
            estilos:
              "bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
        ]}
        subTitle={`Información del contacto: ${contacto?.data?.email}`}
        icon={FaUser}
      />

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Columna izquierda: Foto / ícono */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full mb-4 bg-gray-200 flex items-center justify-center text-gray-500 text-6xl">
              <FaUser />
            </div>
            <p className="font-medium text-blue-700 text-lg text-center">
              {contacto?.data?.nombre_contacto} {contacto?.data?.apellido_pat_contacto} {contacto?.data?.apellido_mat_contacto}
            </p>
            <p className="text-gray-600">{contacto?.data?.titulo_profesional}</p>
            <p className="text-gray-600">{contacto?.data?.cargo}</p>
          </div>

          {/* Columna derecha: Datos de contacto */}
          <div className="space-y-2">
            <p><span className="font-medium text-blue-700">Email: </span>{contacto?.data?.email}</p>
            <p><span className="font-medium text-blue-700">Teléfono: </span>{contacto?.data?.telefono}</p>
            <p><span className="font-medium text-blue-700">Institución: </span>{contacto?.data?.nombre_institucion}</p>

            {/* Datos de auditoría 
            <p><span className="font-medium text-blue-700">Creado por: </span>{contacto?.data?.created_by}</p>
            <p><span className="font-medium text-blue-700">Modificado por: </span>{contacto?.data?.updated_by}</p>
            <p><span className="font-medium text-blue-700">Fecha de registro: </span>{contacto?.data?.created_at}</p>
            <p><span className="font-medium text-blue-700">Última modificación: </span>{contacto?.data?.updated_at}</p>*/}

            {/* Notas */}
            {contacto?.data?.notes && (
              <p><span className="font-medium text-blue-700">Observaciones: </span>{contacto.data.notes}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
