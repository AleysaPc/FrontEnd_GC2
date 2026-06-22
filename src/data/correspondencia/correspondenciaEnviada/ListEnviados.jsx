import EntityList from "../../../components/shared/EntityList";
import { useCorrespondenciaElaboradas } from "../../../hooks/useEntities";
import { FaAngleUp, FaSave, FaStream, FaEye, FaInfo } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import GenerarDocumentoButton from "../../../components/documentos/GenerarDocumentoButton";
import Trazabilidad from "../../../components/shared/Trazabilidad";
import { useState } from "react";
import FormattedDateTime from "../../../components/shared/FormattedDate";

export default function ListEnviados() {
  const [modalVisible, setModalVisible] = useState(false);
  const [correspondenciaId, setCorrespondenciaId] = useState(null);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

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
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/registerEnviada/${item.id_correspondencia}`}
            icon={FaSave}
            title="Registrar"
            estilos="hover:bg-green-500 hover:text-white text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <GenerarDocumentoButton id={item.id_correspondencia} />
          <ActionButton
            to={`/detailEnviada/${item.id_correspondencia}`}
            icon={FaInfo}
            title="Ver detalles del documento"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },

    { key: "cite", label: "CITE" },
    {
      key: "estado",
      label: "Estado",
      render: (item) =>
        item.estado
          ? item.estado.charAt(0).toUpperCase() + item.estado.slice(1)
          : "Sin estado",
    },
    {
      key: "fecha_envio",
      label: "Fecha de Envio",
      render: (item) => <FormattedDateTime dateTime={item.fecha_envio} />,
    },
    {
      key: "estado_entrega",
      label: "Estado de Entrega",
      render: (item) =>
        item.estado_entrega
          ? item.estado_entrega.charAt(0).toUpperCase() +
            item.estado_entrega.slice(1)
          : "Sin estado",
    },

    {
      key: "referencia",
      label: "Referencia",
      render: (item) => item.referencia || "Sin referencia",
    },
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
    //icon: FaAngleUp,
    filtros: [
      { name: "cite", placeholder: "CITE " },
      { name: "plantilla__tipo", placeholder: "Tipo Documento" },
      { name: "referencia", placeholder: "Referencia" },
    ],
    filtrosAvanzados: [
      { name: "plantilla__tipo", placeholder: "Tipo Documento" },
      { name: "contacto_nombre_completo", placeholder: "Destinatario" },
      {
        name: "contacto__institucion__razon_social",
        placeholder: "Institución",
      },
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
