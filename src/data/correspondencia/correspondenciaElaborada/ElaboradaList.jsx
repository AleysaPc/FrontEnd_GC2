import { useCorrespondenciaElaboradas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import { Link } from "react-router-dom";
import { FaEye, FaFilePdf, FaEdit, FaSave } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import FormattedDate from "../../../components/shared/FormattedDate";

export default function ElaboradaList() {
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

          <ActionButton
            to={`http://localhost:8000/api/v1/correspondencia/elaborada/${item.id_correspondencia}/pdf/`}
            icon={FaFilePdf}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <ActionButton
            to={`/editEnviada/${item.id_correspondencia}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    { key: "cite", label: "CITE" },
    { key: "fecha_envio", label: "Fecha de Envio", render: (item) => <FormattedDate date={item.fecha_envio} format="DD/MMM/YYYY" /> },
    { key: "referencia", label: "Referencia" },
    { key: "estado", label: "Estado" },
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
  };

  return <EntityList entityData={entityData} />;
}
