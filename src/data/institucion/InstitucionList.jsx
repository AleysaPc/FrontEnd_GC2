import EntityList from "../../components/shared/EntityList"
import { useInstituciones } from "../../hooks/useEntities"
import FormattedDate from "../../components/shared/FormattedDate"
import { FaEdit, FaHistory, FaBackspace } from "react-icons/fa";
import { ActionButton } from "../../components/shared/ActionButton";

export default function InstitucionList() {
    const useFields = () => [
      { key: "index", label: "#" }, 
      {
            key: "actions",
            label: "Acciones",
            render: (item) => (
              <div className="flex gap-2">
                <ActionButton
                  to={`/editInstitucion/${item.id_institucion}`}
                  icon={FaEdit}
                  estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
                />
              </div>
            ),
          }, 
      { key: "razon_social", label: "Razon Social" },
      { key: "direccion", label: "Direccion" },
      { key: "telefono", label: "Telefono" },
      { key: "fecha_fundacion", label: "Fecha Fundacion" },
    ];   

    const entityData = {
        title: "Gestión de Instituciones",
        subTitle: "Listado de instituciones",
        loadingMessage: "Cargando instituciones...",
        errorMessage: "Error al obtener las instituciones",
        fetchDataHook: useInstituciones,
        all_data: false, // true para obtener todos los datos, false para paginación
        itemKey: "id_institucion", //Debe ser igual al modelo
        entityFields: useFields,
        clavesBusqueda: ["razon_social"],
        actions: [
            {
                to: "/createInstitucion",
                label: "Crear",
                estilos:
                    "bg-red-800 hover:bg-red-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
            },
            {
                to: -1,
                label: "Volver",
                icon: FaBackspace,
                estilos:
                    "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
            },
        ],
        filtros: [
            { name: "razon_social", placeholder: "Empresa" },
        ],
        ordenes: [
            { name: "razon_social", label: "Empresa" },
            { name: "fecha_fundacion", label: "Fecha Fundacion" },
        ],
    };
    return <EntityList entityData={entityData} />;
}