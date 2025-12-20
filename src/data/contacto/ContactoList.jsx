import EntityList from "../../components/shared/EntityList";
import { useContactos } from "../../hooks/useEntities";
import FormattedDate from "../../components/shared/FormattedDate";
import { FaEdit, FaPlus, FaEye } from "react-icons/fa";
import { ActionButton } from "../../components/shared/ActionButton";
import { useContactoMutations } from "../../hooks/useEntities";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function ContactoList() {
  const contactosMutations = useContactoMutations();

  const handleEliminar = async (id_contacto) => {
    if (!confirm("¿Seguro que deseas eliminar este contacto?")) return;
    try {
      await contactosMutations.eliminar.mutateAsync({ id: id_contacto });
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("Error al eliminar el contacto");
    }
  };

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
            title="Editar"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <ActionButton
            to={`/detailContacto/${item.id_contacto}`}
            icon={FaEye}
            title="Detalle"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <button
            onClick={() => handleEliminar(item.id_contacto)}
            title="Eliminar"
            className="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          >
            <FaTrash />
          </button>
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
    {
      key: "tipo_contacto",
      label: "Afiliado o Externo",
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
    actions: [
      {
        to: "/createContacto",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
  };
  return <EntityList entityData={entityData} />;
}
