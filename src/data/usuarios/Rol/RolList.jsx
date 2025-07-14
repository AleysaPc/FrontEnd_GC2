import EntityList from "../../../components/shared/EntityList";
import { useRoles } from "../../../hooks/useEntities";

export default function RolList() {
    const useFields = () => [
        { key: "index", label: "#" },
        { key: "name", label: "Nombre" },
        { key: "description", label: "Descripcion" },
        { key: "acciones", label: "Acciones" },
    ];

    const entityData = {
        title: "Gestión de Roles",
        subTitle: "Listado de roles",
        loadingMessage: "Cargando roles...",
        errorMessage: "Error al obtener los roles",
        fetchDataHook: useRoles,
        all_data: false,
        itemKey: "id",
        entityFields: useFields,
        clavesBusqueda: ["name", "description"],
        actions: [
            {
                to: "/createRol",
                label: "Crear",
                estilos:
                    "bg-red-800 hover:bg-red-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
            },
        ],
    };
    return <EntityList entityData={entityData} />;
}