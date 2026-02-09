import { useCorrespondenciaRecibidas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import { FaPlus, FaEdit, FaHistory, FaEye, FaStream } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import Trazabilidad from "../../../components/shared/Trazabilidad"; // Ajusté el nombre aquí
import { useState } from "react";
import FormattedDateTime from "../../../components/shared/FormattedDate";

function CorrespondenciaRecibidaList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [correspondenciaId, setCorrespondenciaId] = useState(null);

  const { data, isLoading, error } = useCorrespondenciaRecibidas({
    all_data: true,
  });

  const handleOpenModal = (idCorrespondencia) => {
    setCorrespondenciaId(idCorrespondencia);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCorrespondenciaId(null);
  };

  const useFields = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/detailRecibida/${item.id_correspondencia}`}
            icon={FaEye}
            title="Ver detalles del documento"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <button
            onClick={() => handleOpenModal(item.id_correspondencia)} // Abre modal con ID
            title="Ver historial"
            className="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
            aria-label="Ver historial"
          >
            <FaStream />
          </button>
          <ActionButton
            to={`/editRecibida/${item.id_correspondencia}`}
            icon={FaEdit}
            title="Editar"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "similitud",
      label: "Similitud (%)",
      render: (item) => {
        if (!item.similitud) return "--";
        const similPercent = ((1 - item.similitud) * 100).toFixed(2);
        return `${similPercent}%`;
      },
    },
    {
      key: "nro_registro",
      label: "Nro. Registro",
    },
    {
      key: "fecha_recepcion",
      label: "Fecha Recepción",
      render: (item) => <FormattedDateTime dateTime={item.fecha_recepcion} />,
    },
    {
      key: "fecha_respuesta",
      label: "Fecha Respuesta",
      render: (item) => <FormattedDateTime dateTime={item.fecha_respuesta} />,
    },
    {
      key: "referencia",
      label: "Referencia",
      render: (item) => item.referencia,
    },
    {
      key: "prioridad",
      label: "Prioridad",
      render: (item) =>
        item.prioridad
          ? item.prioridad.charAt(0).toUpperCase() + item.prioridad.slice(1)
          : "No Especificado",
    },
    {
      key: "estado",
      label: "Estado",
      render: (item) =>
        item.estado
          ? item.estado.charAt(0).toUpperCase() + item.estado.slice(1)
          : "Sin estado",
    },
    {
      key: "datos_contacto",
      label: "Remitente",
      render: (item) => `${item.datos_contacto || "Sin remitente"}`,
    },
  ];

  const entityData = {
    title: "Correspondencias recibidas",
    subTitle: "Listado oficial de correspondencias recibidas",
    loadingMessage: "Cargando correspondencias recibidas...",
    errorMessage: "Error al obtener las correspondencias recibidas",
    fetchDataHook: useCorrespondenciaRecibidas,
    itemKey: "id_doc_entrante",
    entityFields: useFields,
    //icon: FaFileInvoice,
    actions: [
      {
        to: "/createRecibida",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
    filtros: [
      { name: "nro_registro", placeholder: "Nro. Registro" },
      { name: "referencia", placeholder: "Referencia" },
    ],
    filtrosAvanzados: [
      { name: "contacto_nombre_completo", placeholder: "Remitente" },
      {
        name: "contacto__institucion__razon_social",
        placeholder: "Institución",
      },
    ],
    ordenes: [
      { name: "referencia", label: "Referencia" },
      { name: "fecha_recepcion", label: "Fecha Recepción" },
      { name: "fecha_respuesta", label: "Fecha Respuesta" },
      { name: "contacto__nombre_contacto", label: "Nombre contacto" },
      { name: "contacto__apellido_pat_contacto", label: "Apellido paterno" },
      { name: "contacto__apellido_mat_contacto", label: "Apellido materno" },
      { name: "contacto__institucion__razon_social", label: "Institución" },
    ],
  };

  return (
    <>
      <EntityList entityData={entityData} />
      <Trazabilidad
        visible={modalVisible}
        onClose={handleCloseModal}
        correspondenciaId={correspondenciaId}
      />
    </>
  );
}

export default CorrespondenciaRecibidaList;
