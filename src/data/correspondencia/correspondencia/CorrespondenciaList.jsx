import EntityList from "../../../components/shared/EntityList";
import { useCorrespondencias } from "../../../hooks/useEntities";
import FormattedDate from "../../../components/shared/FormattedDate";
import { Link } from "react-router-dom";

function CorrespondenciaList() {
  const useFields = () => [
    { key: "index", label: "#" },
      {
      key: "tipo",
      label: "Tipo",
      render: (item) => (
        <Link
          to={`/editCorrespondencia/${item.id_correspondencia}`}
          className="text-blue-400 font-bold hover:underline"
        >
          {item.tipo}
        </Link>
      ),
    },
    {
      key: "fecha_registro",
      label: "Fecha de Registro",
      render: (item) => (
        <FormattedDate date={item.fecha_registro} format="DD/MMM/YYYY" />
      ),
    },
    { key: "referencia", label: "Referencia" },
    { key: "prioridad", label: "Prioridad" },
    { key: "estado", label: "Estado" },
    {
      key: "contacto",
      label: "datos_contacto",
    },
  ];

  const entityData = {
    title: "Gestión de Correspondencia",
    subTitle: "Listado de correspondencia",
    loadingMessage: "Cargando correspondencia...",
    errorMessage: "Error al obtener la correspondencia",
    fetchDataHook: useCorrespondencias,
    all_data: false, // true para obtener todos los datos, false para paginación
    itemKey: "id_correspondencia", //Debe ser igual al modelo
    entityFields: useFields,
    clavesBusqueda: ["referencia"],
    actions: [
      {
        to: "/createCorrespondencia",
        label: "Crear Correspondencia",
        estilos:
          "bg-purple-500 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };
  return <EntityList entityData={entityData} />;
}
export default CorrespondenciaList;
