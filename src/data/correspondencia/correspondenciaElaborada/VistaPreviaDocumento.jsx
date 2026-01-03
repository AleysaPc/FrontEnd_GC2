import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navigation } from "../../../components/shared/Navigation";
import {
  FaArrowLeft,
  FaFileSignature,
  FaFilePdf,
  FaShare,
} from "react-icons/fa";
import { useCorrespondenciaElaborada } from "../../../hooks/useEntities";
import TestDerivar from "../correspondencia/TestDerivar";

export default function VistaPreviaDocumento() {
  const { id_correspondencia } = useParams();
  const [contenidoHTML, setContenidoHTML] = useState("");
  const [mostrarModalDerivar, setMostrarModalDerivar] = useState(false);

  const { data: response } = useCorrespondenciaElaborada(id_correspondencia);

  useEffect(() => {
    const obtenerHTML = async () => {
      try {
        if (!id_correspondencia) return;

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
      {/* NAV */}
      <Navigation
        title="Vista previa del documento"
        subTitle={`Información del Documento: ${id_correspondencia}`}
        icon={FaFileSignature}
        actions={[
          {
            to: -1,
            label: "Volver",
            icon: FaArrowLeft,
            estilos:
             "border-white-700 rounded-lg bg-green-700 text-white p-2 hover:bg-white hover:text-green-700",
          },
          {
            to: `http://localhost:8000/api/v1/correspondencia/elaborada/${id_correspondencia}/pdf/`,
            label: "Ver PDF",
            icon: FaFilePdf,
            estilos:
              "border-white-700 rounded-lg bg-green-700 text-white p-2 hover:bg-white hover:text-green-700",
          },
          {
            label: "Derivar",
            icon: FaShare,
            onClick: () => setMostrarModalDerivar(true),
            estilos:
             "border-white-700 rounded-lg bg-green-700 text-white p-2 hover:bg-white hover:text-green-700",
          },
        ]}
      />

      <div className="flex-1 bg-gray-200 p-4 flex justify-center overflow-auto">
        <div className="bg-white shadow-md border rounded w-[816px] min-h-[800px] relative">
          {/* Membrete superior */}
          <img
            src="http://localhost:8000/media/Membrete.PNG"
            alt="Membrete superior"
            className="w-full"
          />

          {/* Contenido dinámico */}
          <div
            style={{
              padding: "0.5cm 2.5cm 2cm 3.5cm",
              boxSizing: "border-box",
            }}
            dangerouslySetInnerHTML={{ __html: contenidoHTML }}
          />
          {/* Sello */}
          <img
            src="http://localhost:8000/media/Sello.PNG"
            alt="Membrete inferior"
            className="h-40 w-40 mx-auto block"
          />

          {/* Membrete inferior */}
          <img
            src="http://localhost:8000/media/MembreteInferior.PNG"
            alt="Membrete inferior"
            className="w-full"
          />
        </div>
      </div>

      <TestDerivar
        isOpen={mostrarModalDerivar}
        onClose={() => setMostrarModalDerivar(false)}
        id={id_correspondencia}
      />
    </div>
  );
}
