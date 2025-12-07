import { useCorrespondenciaElaboradas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import { FaEye, FaFilePdf, FaEdit, FaStream } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import { useState } from "react";
import Trazabilidad from "../../../components/shared/Trazabilidad";

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
            title="Vista previa de documento"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 p-1"
          />

          <button
            onClick={() => handleOpenModal(item.id_correspondencia)} // Abre modal con ID
            title="Ver trazabilidad"
            className="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
            aria-label="Ver trazabilidad"
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
    { key: "cite", label: "CITE" },
    { 
      key: "referencia", 
      label: "Referencia", 
      render: (item) => item.referencia?.trim() || "Sin referencia" 
    },
    { 
      key: "datos_contacto", 
      label: "Destinatario", 
    },
    
    { key: "estado", label: "Estado" },
    { 
      key: "email", 
      label: "Elaborado por", 
      render: (item) => item.usuario?.email || 'No especificado' 
    },
  ];

  const entityData = {
    title: "Documentos Elaborados",
    subTitle: "Listado de documentos elaborados",
    loadingMessage: "Cargando documentos elaborados...",
    errorMessage: "Error al obtener los documentos elaborados",
    fetchDataHook: useCorrespondenciaElaboradas,
    all_data: false,
    itemKey: "id_correspondencia",
    entityFields: useFields,
    filtros: [
      { name: "cite", placeholder: "CITE" },
      { name: "referencia", placeholder: "Referencia" },
      { name: "contacto_nombre_completo", placeholder: "Destinatario" }, // nuevo campo unificado
      { name: "contacto__institucion__razon_social", placeholder: "Institución" },
      { name: "estado", placeholder: "Estado" },
      { name: "plantilla__nombre_plantilla", placeholder: "Tipo Documento" },
      { name: "email", placeholder: "Elaborado por" },
    ],
    ordenes: [
      { name: "cite", label: "CITE" },
      { name: "referencia", label: "Referencia" },
      { name: "contacto__nombre_contacto", label: "Nombre destinatario" },
      { name: "contacto__apellido_pat_contacto", label: "Apellido paterno destinatario" },
      { name: "contacto__apellido_mat_contacto", label: "Apellido materno destinatario" },
      { name: "contacto__institucion__razon_social", label: "Institucion" },
      { name: "estado", label: "Estado" },
      { name: "email", label: "Elaborado por" },
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
