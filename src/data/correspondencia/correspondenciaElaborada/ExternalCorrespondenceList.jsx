import { useState } from "react";
import { FaEdit, FaEye, FaStream } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import { useCorrespondenciaElaboradas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import Trazabilidad from "../../../components/shared/Trazabilidad";

export default function externalCorrespondenceList() {
  const [modalVisible, setModalVisible] = useState(false);

  const [correspondenciaId, setCorrespondenciaId] = useState(null);
  const { data, isLoading, error } = useCorrespondenciaElaboradas({
    all_data: true,
  });

  //Para abrir o cerar elmodal
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
      render: (
        item, //render es una función que recibe los datos de la fila actual, permite hacer "acciones sobre la fila"
      ) => (
        //item es el objeto, la fila completa de los datos "." siver para acceder a la propiedad.
        <div className="flex gap-2">
          <ActionButton
            to={`/vistaPreviaDocumento/${item.id_correspondencia}`}
            icon={FaEye}
            ttile={"Vista previa del documento"}
            estilos="hover:bg-blue-600 hover:text-white text-gray-500 rounded-md flex items-center gap-2 p-1"
          />
          <button
            onClick={() => handleOpenModal(item.id_correspondencia)}
            title="Ver Trazabilidad"
            className="hover:bg-green-600 hover:text-white text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
            aria-label="Ver trazabilidad"
          >
            <FaStream />
          </button>
          <ActionButton
            to={`/editElaborada/${item.id_correspondencia}`}
            icon={FaEdit}
            title="Editar"
            estilos="hover:bg-orange-600 hover:text-white text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "cite",
      label: "CITE",
    },
    {
      key: "referencia",
      label: "Referencia",
      render: (item) => item.referencia?.trim() || "Sin referencia",
    },
    {
      key: "datos_contacto",
      label: "Destinatario", //.trim() solo si es un string
      render: (item) => item.datos_contacto || "Afiliados",
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
      key: "email",
      label: "Elaborado por",
      render: (item) => item.usuario?.email || "No especificado",
    },
  ];
  const entityData = {
    title: "Correspondencia Externa",
    subTitle: "Listado",
    loadingMesage: "Cargando...",
    errorMessage: "Error al obtener la correspondencia",
    fetchDataHook: (params = {}) =>
      useCorrespondenciaElaboradas({
        ...params,
        filters: {
          ...params.filters,
          ambito: "externo",
        },
      }),
    all_data: false,
    itemKey: "id_correspondencia",
    entityFields: useFields,
    filtros: [
      { name: "plantilla__tipo", placeholder: "Tipo Documento" },
      { name: "referencia", placeholder: "Referencia" },
    ],
    ordenes: [
      { name: "tipo", label: "Tipo" },
      { name: "fecha_registro", label: "Fecha de Registro" },
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
