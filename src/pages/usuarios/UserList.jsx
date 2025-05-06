
import { StatusBadge } from "../../components/shared/StatusBadge";
import FormattedDate from "../../components/shared/FormattedDate";
import EntityList from "../../components/shared/EntityList";
import { useUsers } from "../../hooks/useEntities";
import { FaPlus, FaUber } from "react-icons/fa";
import { Link } from "react-router-dom";

function UserList() {
  const userFields = () => [
    { key: "index", label: "#" },
    {
      key: "full_name",
      label: "Nombre",
      render: (item) => (
        <Link
          to={`/editUser/${item.id}`}
          className="text-blue-400 font-bold hover:underline"
        >
          {item.first_name + item.last_name}
        </Link>
      ),
    },
    { key: "username", label: "Usuario" },
    { key: "name_rol", label: "Rol" },
    { key: "name_work", label: "Lugar de Trabajo" },

    {
      key: "is_active",
      label: "Estado",
      render: (item) => <StatusBadge isActive={item.is_active} />,
    },
    {
      key: "date_joined", // Antes estaba como data_joined (incorrecto)
      label: "Fecha de Registro",
      render: (item) => <FormattedDate date={item.date_joined} />,
    },
  ];

  const entityData = {
    title: "Gestión de Usuarios",
    subTitle: "Listado de usuarios",
    loadingMessage: "Cargando usuarios...",
    errorMessage: "Error al obtener los usuarios",
    fetchDataHook: useUsers,
    all_data: false,
    itemKey: "id",
    entityFields: userFields,
    clavesBusqueda: ["full_name", "username"],
    actions: [
      {
        to: "/createUser",
        label: "Crear Usuario",
        estilos:
          "bg-purple-500 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
    icon: FaUber,
  };

  return <EntityList entityData={entityData} />;
}

export default UserList;
