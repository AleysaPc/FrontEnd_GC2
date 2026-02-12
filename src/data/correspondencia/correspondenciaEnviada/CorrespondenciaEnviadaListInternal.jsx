import { useCorrespondenciaElaboradas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import FormattedDate from "../../../components/shared/FormattedDate";
import { FaEdit, FaEye, FaStream, FaPlus } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import Trazabilidad from "../../../components/shared/Trazabilidad";
import { useState } from "react";
import FormattedDateTime from "../../../components/shared/FormattedDate";

function CorrespondenciaEnviadaList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [correspondenciaId, setCorrespondenciaId] = useState(null);

  const { data, isLoading, error } = useCorrespondenciaElaboradas({
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
      key: "similitud",
      label: "Similitud (%)",
      render: (item) => {
        if (!item.similitud) return "--";
        const similPercent = ((1 - item.similitud) * 100).toFixed(2);
        return `${similPercent}%`;
      },
    },
    {
      key: "cite",
      label: "CITE",
    },
    {
      key: "fecha_envio",
      label: "Fecha de Envio",
      render: (item) => <FormattedDateTime dateTime={item.fecha_envio} />,
    },
    {
      key: "referencia",
      label: "Referencia",
      render: (item) => item.referencia,
    },
    {
      key: "destino_interno",
      label: "Remitente",
      render: (item) => {
        const user = item?.destino_interno_info;
        if (!user) return "Directorio";
        const nombre = [
          user.first_name,
          user.second_name,
          user.last_name,
          user.second_last_name,
        ]
          .filter(Boolean)
          .join(" ")
          .trim();
        return nombre || user.email || "Sin remitente";
      },
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
          ambito: "interno",
        },
      }),
    //
    all_data: false,
    itemKey: "id_doc_saliente", //Debe ser igual al modelo
    entityFields: useFields,
    clavesBusqueda: ["referencia"],
    actions: [
      {
        to: "/createElaborada",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
    filtros: [
      { name: "cite", placeholder: "CITE " },
      { name: "referencia", placeholder: "Referencia" },
    ],
    filtrosAvanzados: [
      {
        name: "destino_interno",
        placeholder: "Destinatario",
      },
    ],
    ordenes: [
      { name: "cite", label: "CITE" },
      { name: "fecha_envio", label: "Fecha de Envio" },
    ],
    mostrarBusquedaSemantica: true,
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
export default CorrespondenciaEnviadaList;
