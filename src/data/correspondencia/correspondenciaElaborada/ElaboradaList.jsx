import { useCorrespondenciaElaboradas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import { Link } from "react-router-dom";

export default function ElaboradaList() {
  const useFields = () => [
    { key: "index", label: "#" },
    { key: "cite", label: "CITE" },
    { key: "fecha_envio", label: "Fecha de Envio" },
    { key: "referencia", label: "Referencia" },
    {
        key: "acciones",
        label: "Acciones",
        render: (item) => (
          <div className="flex gap-2">
            <a
              href={`/vistaPreviaDocumento/${item.id_correspondencia}`}
              className="bg-green-800 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
              Vista HTML
            </a>
            <a
              href={`http://localhost:8000/api/v1/correspondencia/elaborada/${item.id_correspondencia}/pdf/`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Ver PDF
            </a>
          </div>
        ),
      }
    ];

  const entityData = {
    title: "Gestión de Documentos Elaborados",
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
