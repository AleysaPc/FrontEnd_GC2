import EntityList from "../../../components/shared/EntityList";
import { useCorrespondencias } from "../../../hooks/useEntities";
import FormattedDate from "../../../components/shared/FormattedDate";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaStream } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import HistorialDocumentoModal from "../../../components/shared/HistorialModal";
import { useState } from "react";

function CorrespondenciaList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [correspondenciaId, setCorrespondenciaId] = useState(null);

  const { data, isLoading, error } = useCorrespondencias({
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
            toBack="/correspondenciaList"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "tipo",
      label: "Tipo",
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
    filtros: [
      { name: "tipo", placeholder: "Tipo" },
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
      { name: "tipo", label: "Tipo" },
      { name: "fecha_registro", label: "Fecha de Registro" },
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
export default CorrespondenciaList;
