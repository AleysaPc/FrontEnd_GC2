import EntityList from "../../components/shared/EntityList";
import { useContactos } from "../../hooks/useEntities";
import FormattedDate from "../../components/shared/FormattedDate";
import { FaEdit, FaHistory } from "react-icons/fa";
import { ActionButton } from "../../components/shared/ActionButton";

export default function ContactoList() {
  const useFields = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editContacto/${item.id_contacto}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "nombre_contacto",
      label: "Nombre",
    },
    {
      key: "apellido_pat_contacto",
      label: "Apellido Paterno",
    },
    {
      key: "apellido_mat_contacto",
      label: "Apellido Materno",
    },
    {
      key: "nombre_institucion",
      label: "Empresa",
    },
    {
      key: "cargo",
      label: "Cargo",
    },
    {
      key: "email",
      label: "Email",
    },
  ];

  const entityData = {
    title: "Gestión de Contactos",
    subTitle: "Listado de contactos",
    loadingMessage: "Cargando contactos...",
    errorMessage: "Error al obtener los contactos",
    fetchDataHook: useContactos,
    all_data: false, // true para obtener todos los datos, false para paginación
    itemKey: "id_contacto", //Debe ser igual al modelo
    entityFields: useFields,
    filtros: [
      { name: "nombre_contacto", placeholder: "Nombre" },
      { name: "apellido_pat_contacto", placeholder: "Apellido Paterno" },
      { name: "apellido_mat_contacto", placeholder: "Apellido Materno" },
      { name: "institucion__razon_social", placeholder: "Empresa" },
    ],
    ordenes: [
      { name: "nombre_contacto", label: "Nombre" },
      { name: "apellido_pat_contacto", label: "Apellido Paterno" },
      { name: "apellido_mat_contacto", label: "Apellido Materno" },
      { name: "institucion__razon_social", label: "Empresa" },
    ],
  };
  return <EntityList entityData={entityData} />;
}
