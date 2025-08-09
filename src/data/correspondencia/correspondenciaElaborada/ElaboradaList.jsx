import { useCorrespondenciaElaboradas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import { FaEye, FaFilePdf, FaEdit, FaStream } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import FormattedDate from "../../../components/shared/FormattedDate";
import { useState } from "react";
import HistorialDocumentoModal from "../../../components/shared/HistorialModal";

export default function ElaboradaList() {

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
            to={`/vistaPreviaDocumento/${item.id_correspondencia}`}
            icon={FaEye}
            title="Vista previa"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 p-1"
          />

          <button
            onClick={() => handleOpenModal(item.id_correspondencia)} // Abre modal con ID
            className="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
            aria-label="Ver historial"
          >
            <FaStream />
          </button>
          <ActionButton
            to={`/editElaborada/${item.id_correspondencia}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    { key: "cite", label: "CITE" },
    {
      key: "fecha_envio",
      label: "Fecha de Envio",
      render: (item) => (
        <FormattedDate date={item.fecha_envio} format="DD/MMM/YYYY" />
      ),
    },
    { key: "referencia", label: "Referencia" },
    { key: "estado", label: "Estado" },
  ];

  const entityData = {
    title: "Documentos Elaborados",
    subTitle: "Listado de documentos elaborados",
    loadingMessage: "Cargando documentos elaborados...",
    errorMessage: "Error al obtener los documentos elaborados",
    fetchDataHook: (params = {}) =>
      useCorrespondenciaElaboradas({
        ...params,
        filters: {
          ...params.filters,
          estado__in: ["borrador", "en_revision"],
        },
      }),
    all_data: false,
    itemKey: "id_correspondencia",
    entityFields: useFields,
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
