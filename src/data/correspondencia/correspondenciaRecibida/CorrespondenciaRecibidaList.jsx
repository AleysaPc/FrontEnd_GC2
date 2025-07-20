import { useCorrespondenciaRecibidas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import FormattedDate from "../../../components/shared/FormattedDate";
import { FaPlus, FaEdit, FaHistory } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import { FaFileInvoice } from "react-icons/fa";

function CorrespondenciaRecibidaList() {
  const useFields = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editRecibida/${item.id_correspondencia}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <ActionButton
            to={`/historialRecibida/${item.id_correspondencia}`}
            icon={FaHistory}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
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
    subTitle: "",
    loadingMessage: "Cargando correspondencias recibidas...",
    errorMessage: "Error al obtener las correspondencias recibidas",
    fetchDataHook: useCorrespondenciaRecibidas, //No enviar parametros en el hook, enviar params aparte
    itemKey: "id_doc_entrante",
    entityFields: useFields,
    icon: FaFileInvoice,
    actions: [
      {
        to: "/createRecibida",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
    filtros: [
      { name: "nro_registro", placeholder: "Nro. Registro contiene..." },
      { name: "referencia", placeholder: "Referencia contiene..." },
      { name: "contacto__nombre_contacto", placeholder: "Nombre contacto..." },
      {
        name: "contacto__apellido_pat_contacto",
        placeholder: "Apellido paterno...",
      },
      {
        name: "contacto__apellido_mat_contacto",
        placeholder: "Apellido materno...",
      },
      {
        name: "contacto__institucion__razon_social",
        placeholder: "Institución...",
      },
    ],
    ordenes: [
      { name: "referencia", label: "Referencia" },
      { name: "contacto__nombre_contacto", label: "Nombre contacto" },
      { name: "contacto__apellido_pat_contacto", label: "Apellido paterno" },
      { name: "contacto__apellido_mat_contacto", label: "Apellido materno" },
      { name: "contacto__institucion__razon_social", label: "Institución" },
    ],
  };

  return <EntityList entityData={entityData} />;
}

export default CorrespondenciaRecibidaList;
