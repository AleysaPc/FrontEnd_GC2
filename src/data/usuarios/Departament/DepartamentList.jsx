import { StatusBadge } from "../../../components/shared/StatusBadge";
import { useDepartamentos, useDepartamentoMutations } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import { FaBackspace, FaPlus, FaUber } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function DepartamentList() {

  const departamentMutations = useDepartamentoMutations();

  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este departamento?")) return;
    try {
      await departamentMutations.eliminar.mutateAsync({ id });
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("Error al eliminar el departamento");
    }
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
                  to={`/editDepartament/${item.id}`}
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
    { key: "nombre", label: "Nombre" },
    { key: "sigla", label: "Sigla" },
    {
      key: "estado",
      label: "Estado",
      render: (value) => <StatusBadge isActive={value} />,
    },
    
  ];

  const entityData = {
    title: "Gestión de Departamentos",
    subTitle: "Listado de departamentos",
    loadingMessage: "Cargando departamentos...",
    errorMessage: "Error al obtener los departamentos",
    fetchDataHook: useDepartamentos,
    all_data: false,
    itemKey: "id",
    entityFields: userFields,
    clavesBusqueda: ["nombre", "sigla"],
    actions: [
      {
        to: "/createDepartament",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
      {
        to: -1,
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
    icon: FaUber,
  };

  return <EntityList entityData={entityData} />;
}
