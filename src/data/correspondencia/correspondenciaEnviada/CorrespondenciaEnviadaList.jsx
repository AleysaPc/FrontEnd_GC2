import { useCorrespondenciaElaboradas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import FormattedDate from "../../../components/shared/FormattedDate";
import { FaEdit, FaEye, FaStream } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import HistorialDocumentoModal from "../../../components/shared/HistorialModal";
import { useState } from "react";

function CorrespondenciaEnviadaList() {

  const [modalVisible, setModalVisible] = useState(false);
    const [correspondenciaId, setCorrespondenciaId] = useState(null);
  
    const { data, isLoading, error } = useCorrespondenciaElaboradas({ all_data: true });
  
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
            to={`/detailEnviada/${item.id_correspondencia}`}
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
            to={`/editElaborada/${item.id_correspondencia}`}
            icon={FaEdit}
            title="Editar"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "cite",
      label: "CITE",
    },
    {
      key: "fecha_envio",
      label: "Fecha de Envio",
      render: (item) => (
        <FormattedDate date={item.fecha_envio} format="DD/MMM/YYYY" />
      ),
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
  ];

  const entityData = {
    title: "Correspondencias Enviadas",
    subTitle: "Listado de correspondencias oficialmente enviadas",
    loadingMessage: "Cargando correspondencias enviadas...",
    errorMessage: "Error al obtener las correspondencias enviadas",

    // Filtro para estado "estado=enviado"
    fetchDataHook: (params = {}) =>
      useCorrespondenciaElaboradas({
        ...params,
        filters: {
          ...params.filters,
          estado: "enviado", // filtro por estado enviado
        },
      }),
    //
    all_data: false,
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
      { name: "fecha_envio", label: "Fecha de Envio" },
      { name: "contacto__nombre_contacto", label: "Nombre contacto" },
      { name: "contacto__apellido_pat_contacto", label: "Apellido paterno" },
      { name: "contacto__apellido_mat_contacto", label: "Apellido materno" },
      { name: "contacto__institucion__razon_social", label: "Institución" },
    ],
  };

  return (
    <>
      <EntityList entityData={entityData} />
      <HistorialDocumentoModal
        visible={modalVisible}
        onClose={handleCloseModal}
        correspondenciaId={correspondenciaId}
      />
    </>
  );
}
export default CorrespondenciaEnviadaList;
