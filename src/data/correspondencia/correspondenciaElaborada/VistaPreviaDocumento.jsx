import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navigation } from "../../../components/shared/Navigation";
import { FaArrowLeft, FaFileSignature, FaFilePdf } from "react-icons/fa";
import { useCorrespondenciaElaborada } from "../../../hooks/useEntities";

export default function VistaPreviaDocumento() {
  const { id_correspondencia } = useParams();
  const [contenidoHTML, setContenidoHTML] = useState("");

  const { data: response, isLoading: isLoadingCorrespondencia } =
    useCorrespondenciaElaborada(id_correspondencia);

  useEffect(() => {
    const obtenerHTML = async () => {
      try {
        if (!id_correspondencia) {
          console.error("ID de correspondencia no encontrado");
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/v1/correspondencia/elaborada/${id_correspondencia}/html/`
        );
        setContenidoHTML(response.data.contenido_html);
      } catch (error) {
        console.error("Error al obtener el HTML:", error);
      }
    };
    obtenerHTML();
  }, [id_correspondencia]);

  return (
    <div className="w-full h-full flex flex-col">
      <Navigation
        title="Vista previa del documento"
        actions={[
          {
            to: -1,
            label: "Volver",
            icon: FaArrowLeft,
            estilos:
              "bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
          {
            to: `http://localhost:8000/api/v1/correspondencia/elaborada/${id_correspondencia}/pdf/`,
            label: "Ver PDF",
            icon: FaFilePdf,
            estilos:
              "bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
        ]}
        subTitle={`Información del Documento: ${response?.data?.cite}`}
        icon={FaFileSignature}
      />
      <div className="flex-1 bg-white p-0 overflow-hidden">
        <div className="h-full w-full overflow-auto p-4">
          <div
            className="mx-auto bg-white p-4 shadow-sm border rounded w-full"
            dangerouslySetInnerHTML={{ __html: contenidoHTML }}
          />
        </div>
      </div>
    </div>
  );
}
