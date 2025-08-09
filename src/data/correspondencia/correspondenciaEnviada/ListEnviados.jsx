import EntityList from "../../../components/shared/EntityList";
import { useCorrespondenciaElaboradas} from "../../../hooks/useEntities";
import { FaAngleUp } from "react-icons/fa";
export default function ListEnviados() {
    const useFields = () => [
        { key: "index", label: "#" },
        { key: "cite", label: "CITE" },
        { key:"estado",label:"Estado"},
        { key: "fecha_envio", label: "Fecha de Envio" },
        { key: "referencia", label: "Referencia" },
        {
            key: "acciones",
            label: "Acciones",
            render: (item) => (
              <div className="flex gap-2">
                <a
                  href={`/registerEnviada/${item.id_correspondencia}`}
                  className="bg-orange-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Registrar
                </a>
              </div>
            ),
          },
        
    ];
    const entityData = {
        title: "Documentos enviados",
        subTitle: "Listado de documentos enviados",
        loadingMessage: "Cargando documentos enviados...",
        errorMessage: "Error al obtener los documentos enviados",
        fetchDataHook: (params = {}) => useCorrespondenciaElaboradas({
            ...params,
            filters: {
                ...params.filters,
                estado: 'aprobado'  // Filtro para mostrar solo documentos enviados
            }
        }),
        all_data: false, // true para obtener todos los datos, false para paginación
        itemKey: "id_correspondencia", //Debe ser igual al modelo
        entityFields: useFields,
        icon: FaAngleUp,
        // actions: [
        //   {
        //     to: "/createCorrespondencia",
        //     label: "Crear Correspondencia",
        //     estilos:
        //       "bg-purple-500 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
        //   },
        //],
      };
    return <EntityList entityData={entityData} />;
}
