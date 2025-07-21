import {
  useCorrespondenciaElaboradas,
} from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import  FormattedDate  from "../../../components/shared/FormattedDate";

function CorrespondenciaEnviadaList() {
  const useFields = () => [
    { key: "index", label: "#" },
    {
      key: "cite",
      label: "CITE",
    }, 
    {
      key: "fecha_envio",
      label: "Fecha de Envio",
      render: (item) => (
        <FormattedDate date={item.fecha_envio} format="DD/MMM/YYYY" />
      )
    },
    {
      key: "referencia",
      label: "Referencia",
      render: (item) => item.referencia,
    },  
    {
      key: "datos_contacto",
      label: "Remitente",
      render: (item) => `${item.datos_contacto || "Sin remitente"}`,
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <a
            href={`detailEnviada/${item.id_correspondencia}`}
            className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver
          </a>
          <a
            href={`/editEnviada/${item.id_correspondencia}`}
            className="bg-red-800 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Editar
          </a>
        </div>
      ),
    }
  ];

  const entityData = {
    title: "Correspondencias Enviadas",
    subTitle: "Listado de correspondencias oficialmente enviadas",
    loadingMessage: "Cargando correspondencias enviadas...",
    errorMessage: "Error al obtener las correspondencias enviadas",
    fetchDataHook: useCorrespondenciaElaboradas,
    all_data: false, // true para obtener todos los datos, false para paginación
    itemKey: "id_doc_saliente", //Debe ser igual al modelo
    entityFields: useFields,
    clavesBusqueda: ["referencia"],
    actions: [
      {
        to: `/createElaborada`,
        label: "Crear",
        estilos:
          "bg-red-800 hover:bg-green-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    
    ],
    filtros: [
      { name: "cite", placeholder: "CITE " },
      { name: "referencia", placeholder: "Referencia" },
      { name: "contacto__nombre_contacto", placeholder: "Nombre contacto" },
      {
        name: "contacto__apellido_pat_contacto",
        placeholder: "Apellido paterno",
      },
      {
        name: "contacto__apellido_mat_contacto",
        placeholder: "Apellido materno",
      },
      {
        name: "contacto__institucion__razon_social",
        placeholder: "Institución",
      },
    ],
    ordenes: [
      { name: "cite", label: "CITE" },
      { name: "referencia", label: "Referencia" },
      { name: "contacto__nombre_contacto", label: "Nombre contacto" },
      { name: "contacto__apellido_pat_contacto", label: "Apellido paterno" },
      { name: "contacto__apellido_mat_contacto", label: "Apellido materno" },
      { name: "contacto__institucion__razon_social", label: "Institución" },
    ],
  };

  return <EntityList entityData={entityData} />;
}
export default CorrespondenciaEnviadaList;
