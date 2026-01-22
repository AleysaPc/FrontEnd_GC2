import { StatusBadge } from "../../components/shared/StatusBadge";
import FormattedDate from "../../components/shared/FormattedDate";
import EntityList from "../../components/shared/EntityList";
import { useCustomUserList } from "../../hooks/useEntities";
import { FaUber } from "react-icons/fa";
import { ActionButton } from "../../components/shared/ActionButton";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useUserMutations } from "../../hooks/useEntities";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

function UserList() {
  const userMutations = useUserMutations();

  const handleEliminar = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm">¿Seguro que deseas eliminar este usuario?</p>

          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 text-sm bg-gray-200 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>

            <button
              className="px-3 py-1 text-sm bg-red-600 text-white rounded"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await userMutations.eliminar.mutateAsync({ id });
                  toast.success("Usuario eliminado correctamente");
                } catch (error) {
                  toast.error("Error al eliminar el usuario");
                }
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // ⏳ hasta que el usuario decida
      },
    );
  };
  const userFields = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            title="Editar"
            to={`/editUser/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <ActionButton
            title="Detalle"
            to={`/detailUser/${item.id}`}
            icon={FaEye}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <button
            onClick={() => handleEliminar(item.id)}
            title="Eliminar"
            className="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
    {
      key: "nombre",
      label: "Nombre",
      render: (item) => `${item.first_name ?? ""} ${item.second_name ?? ""}`,
    },
    {
      key: "apellido_completo",
      label: "Apellidos",
      render: (row) => `${row.last_name ?? ""} ${row.second_last_name ?? ""}`,
    },

    {
      key: "roles",
      label: "Rol",
      render: (item) =>
        Array.isArray(item.roles) ? item.roles.join(", ") : "Sin roles",
    },
    { key: "nombre_departamento", label: "Departamento" },

    {
      key: "is_active",
      label: "Estado",
      render: (item) => <StatusBadge isActive={item.is_active} />,
    },
  ];

  const entityData = {
    title: "Gestión de Usuarios",
    subTitle: "Listado de usuarios",
    loadingMessage: "Cargando usuarios...",
    errorMessage: "Error al obtener los usuarios",
    fetchDataHook: useCustomUserList,
    all_data: false,
    itemKey: "id",
    entityFields: userFields,
    filtros: [
      { name: "nombre_completo", placeholder: "Nombre" },
      { name: "email", placeholder: "Email" },
      { name: "username", placeholder: "Username" },
      { name: "institucion__razon_social", placeholder: "Institucion" },
      { name: "departamento", placeholder: "Departamento" },
      { name: "cargo", placeholder: "Cargo" },
    ],
    actions: [
      {
        to: "/createUser",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
  };

  return <EntityList entityData={entityData} />;
}

export default UserList;
