import EntityList from "../../../components/shared/EntityList";
import { useCorrespondenciaElaboradas } from "../../../hooks/useEntities";
import {
  FaAngleUp,
  FaSave,
  FaStream,
  FaEye,
} from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import GenerarDocumentoButton from "../../../components/documentos/GenerarDocumentoButton";
import Trazabilidad from "../../../components/shared/Trazabilidad";
import { useState } from "react";
import FormattedDateTime from "../../../components/shared/FormattedDate";

export default function ListEnviados() {
  const [modalVisible, setModalVisible] = useState(false);
  const [correspondenciaId, setCorrespondenciaId] = useState(null);

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
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <GenerarDocumentoButton id={item.id_correspondencia} />
          <button
            onClick={() => handleOpenModal(item.id_correspondencia)} // Abre modal con ID
            title="Ver historial"
            className="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
            aria-label="Ver historial"
          >
            <FaStream />
            <ActionButton
              to={`/vistaPreviaDocumento/${item.id_correspondencia}`}
              icon={FaEye}
              ttile={"Vista previa del documento"}
              estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 p-1"
            />
          </button>
        </div>
      ),
    },

    { key: "cite", label: "CITE" },
    { key: "estado", label: "Estado" },
    {
      key: "fecha_envio", label:"Fecha de Envio",
      render: (item) => <FormattedDateTime dateTime={item.fecha_envio} />,
    },
    {
      key: "referencia", label: "Referencia",
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
    icon: FaAngleUp,
    // actions: [
    //   {
    //     to: "/createCorrespondencia",
    //     label: "Crear Correspondencia",
    //     estilos:
    //       "bg-purple-500 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
    //   },
    //],
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
