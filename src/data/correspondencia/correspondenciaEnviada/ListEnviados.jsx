import EntityList from "../../../components/shared/EntityList";
import { useCorrespondenciaElaboradas } from "../../../hooks/useEntities";
import { FaAd, FaAngleUp, FaRegistered, FaSave } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import GenerarDocumentoButton from "../../../components/documentos/GenerarDocumentoButton";
export default function ListEnviados() {
  const useFields = () => [
    { key: "index", label: "#" },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/registerEnviada/${item.id_correspondencia}`}
            icon={FaSave}
            title="Registrar"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <GenerarDocumentoButton id={item.id_correspondencia} />
        </div>
      ),
    },
    { key: "cite", label: "CITE" },
    { key: "estado", label: "Estado" },
    { key: "fecha_envio", label: "Fecha de Envio" },
    { key: "referencia", label: "Referencia" },
    
  ];
  const entityData = {
    title: "Documentos enviados",
    subTitle: "Listado de documentos enviados",
    loadingMessage: "Cargando documentos enviados...",
    errorMessage: "Error al obtener los documentos enviados",
    fetchDataHook: (params = {}) =>
      useCorrespondenciaElaboradas({
        ...params,
        filters: {
          ...params.filters,
          estado: "aprobado", // Filtro para mostrar solo documentos enviados
        },
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
