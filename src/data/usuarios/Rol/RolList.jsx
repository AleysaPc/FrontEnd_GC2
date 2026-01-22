import EntityList from "../../../components/shared/EntityList";
import { useRolesList, useRolMutations } from "../../../hooks/useEntities";
import { ActionButton } from "../../../components/shared/ActionButton";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function RolList() {
    const rolMutations = useRolMutations();

    const handleEliminar = async (id) => {
        if (!confirm("¿Seguro que deseas eliminar este rol?")) return;
        try {
          await rolMutations.eliminar.mutateAsync({ id }); // <- aquí mutateAsync
        } catch (error) {
          console.error("Error al eliminar:", error);
          toast.error("Error al eliminar el rol");
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
              title="Editar"
              to={`/editRol/${item.id}`}
              icon={FaEdit}
              estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
            />
            <button
              onClick={() => handleEliminar(item.id)}
              className="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
      
    { key: "name", label: "Nombre" },
   
  ];

  const entityData = {
    title: "Gestión de Roles",
    subTitle: "Listado de roles",
    loadingMessage: "Cargando roles...",
    errorMessage: "Error al obtener los roles",
    fetchDataHook: useRolesList,
    all_data: false,
    itemKey: "id",
    entityFields: useFields,
    clavesBusqueda: ["name"],
    actions: [
      {
        to: "/createRol",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
      {
        to: -1,
        label: "Volver",
        estilos:
          "bg-gray-800 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return <EntityList entityData={entityData} />;
}
