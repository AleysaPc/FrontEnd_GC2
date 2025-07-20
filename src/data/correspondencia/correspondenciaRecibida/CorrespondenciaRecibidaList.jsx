import { useCorrespondenciaRecibidas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import FormattedDate from "../../../components/shared/FormattedDate";
import BuscarDocumentos from "../../../components/shared/BuscarDocumentos";

function CorrespondenciaRecibidaList() {
  const useFields = () => [
    { key: "index", label: "#" },
    {
      key: "nro_registro",
      label: "Nro. Registro",
    },
    {
      key: "fecha_recepcion",
      label: "Fecha Recepción",
      render: (item) => (
        <FormattedDate date={item.fecha_recepcion} format="DD/MMM/YYYY" />
      ),
    },
    {
      key: "fecha_respuesta",
      label: "Fecha Respuesta",
      render: (item) => (
        <FormattedDate date={item.fecha_respuesta} format="DD/MMM/YYYY" />
      ),
    },
    {
      key: "referencia",
      label: "Referencia",
      render: (item) => item.referencia,
    },
    { key: "prioridad", label: "Prioridad", render: (item) => item.prioridad },
    { key: "estado", label: "Estado", render: (item) => item.estado },
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
            href={`detailRecibida/${item.id_correspondencia}`}
            className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver
          </a>
          <a
            href={`/editRecibida/${item.id_correspondencia}`}
            className="bg-green-800 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Editar
          </a>
        </div>
      ),
    },
  ];

  const entityData = {
    title: "Gestión de Correspondencias Recibidas",
    subTitle: "Listado de correspondencias recibidas",
    loadingMessage: "Cargando correspondencias recibidas...",
    errorMessage: "Error al obtener las correspondencias recibidas",
    fetchDataHook: useCorrespondenciaRecibidas,
    all_data: false,
    itemKey: "id_doc_entrante",
    entityFields: useFields,
    clavesBusqueda: ["referencia"],
    actions: [
      {
        to: "/createRecibida",
        label: "Crear",
        estilos:
          "bg-red-800 hover:bg-red-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return (
    <div className="space-y-4">
      <BuscarDocumentos /> {/* Aquí insertas el componente correctamente */}
      <EntityList entityData={entityData} />
    </div>
  );
}

export default CorrespondenciaRecibidaList;
