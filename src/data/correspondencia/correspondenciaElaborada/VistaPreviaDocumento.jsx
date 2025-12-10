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
import membreteLogo from "../../../../public/Membrete.PNG";
import membreteInferiorLogo from "../../../../public/MembreteInferior.PNG";

export default function VistaPreviaDocumento() {
  const { id_correspondencia } = useParams();
  const [contenidoHTML, setContenidoHTML] = useState("");
  const [mostrarModalDerivar, setMostrarModalDerivar] = useState(false);

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
          {
            label: "Derivar",
            icon: FaShare,
            onClick: () => setMostrarModalDerivar(true),
            estilos:
              "bg-white hover:bg-green-400 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
          {
            label: "Listo",
            icon: FaShare,
            onClick: () => setMostrarModalDerivar(true),
            estilos:
              "bg-white hover:bg-green-400 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
        ]}
        subTitle={`Información del Documentoooo: ${id_correspondencia}`}
        icon={FaFileSignature}
      />
      <div className="flex-1 bg-gray-200 p-4 flex justify-center">
        {/* HOJA TAMAÑO CARTA */}
        <div
          className="bg-white shadow-md border rounded relative"
          style={{ width: "816px", minHeight: "900px" }}
        >
          {/* MEMBRETE ARRIBA */}
          <div className="w-full">
            <img src={membreteLogo} alt="Membrete" className="w-full h-32" />
          </div>

          {/* CONTENIDO DEL DOCUMENTO */}
          <div className="px-[2cm] pt-[0.5cm] pb-[2cm]">
            <div dangerouslySetInnerHTML={{ __html: contenidoHTML }} />
          </div>
          {/* MEMBRETE INFERIOR */}
          <div className="w-full mt-4">
            <img
              src={membreteInferiorLogo}
              alt="Membrete inferior"
              className="w-full h-20 object-contain"
            />
          </div>
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
