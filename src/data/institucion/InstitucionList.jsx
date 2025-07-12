import EntityList from "../../components/shared/EntityList"
import { useInstituciones } from "../../hooks/useEntities"
import FormattedDate from "../../components/shared/FormattedDate"

export default function InstitucionList() {
    const useFields = () => [
      { key: "index", label: "#" },  
      { key: "razon_social", label: "Razon Social" },
      { key: "direccion", label: "Direccion" },
      { key: "telefono", label: "Telefono" },
      { key: "fecha_fundacion", label: "Fecha Fundacion" },
      //{
      //key: "acciones",
      //label: "Acciones",
      //render: (item) => (
      //  <div className="flex gap-2">
      //    <a
      //      //href={`detailDocEntrante/${item.id_correspondencia}`}
      //      className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      //    >
      //      Ver
      //    </a>
      //    <a
      //      href={`/editInstitucion/${item.id_institucion}`}
      //      className="bg-green-800 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      //    >
      //      Editar
      //    </a>
      //  </div>
      //),
      //},
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
        ],
    };
    return <EntityList entityData={entityData} />;
}