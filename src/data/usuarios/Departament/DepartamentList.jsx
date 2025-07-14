import { useDepartamentos } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import { FaUber } from "react-icons/fa";
import { StatusBadge } from "../../../components/shared/StatusBadge";

export default function DepartamentList() {
  const userFields = () => [
    { key: "index", label: "#" },
    { key: "nombre", label: "Nombre" },
    { key: "sigla", label: "Sigla" },
    { 
      key: "estado", 
      label: "Estado",
      render: (value) => <StatusBadge isActive={value} />
    },
    { key: "nombre_responsable", label: "Responsable" },
    { key: "acciones", label: "Acciones" },
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
        label: "Crear Departamento",
        estilos:
          "bg-purple-500 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
    icon: FaUber,
  };

  return <EntityList entityData={entityData} />;    
}