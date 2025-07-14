import { StatusBadge } from "../../components/shared/StatusBadge";
import FormattedDate from "../../components/shared/FormattedDate";
import EntityList from "../../components/shared/EntityList";
import { useUsers } from "../../hooks/useEntities";
import { FaUber } from "react-icons/fa";

function UserList() {
  const userFields = () => [
    { key: "index", label: "#" },
    //{
      //key: "full_name",
      //label: "Nombre",
      //render: (item) => (
        //<Link
          //to={`/editUser/${item.id}`}
          //className="text-blue-400 font-bold hover:underline"
        //>
          //{item.first_name + item.last_name}
        //</Link>
      //),
    //},
    {
      key: "Nombre",
      label: "Nombre",
      render: (item) => `${item.first_name ?? ""} ${item.secund_name ?? ""}`,
    },
    {
      key: "apellidos_completos",
      label: "Apellidos",
      render: (row) => `${row.last_name ?? ""} ${row.secund_last_name ?? ""}`,
    },
    { key: "username", label: "Usuario" },
    { key: "name_rol", label: "Rol" },
    {key:"nombre_departamento", label:"Departamento"},
    { key: "nombre_institucion", label: "Empresa de Origen" },

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
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <a
            //href={`detailDocEntrante/${item.id_correspondencia}`}
            className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver
          </a>
          <a
            href={`/editUser/${item.id}`}
            className="bg-green-800 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Editar
          </a>
        </div>
      ),
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
