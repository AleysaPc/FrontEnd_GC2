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
import selloLogo from "../../../../public/Sello.PNG";

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
              "bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md flex items-center gap-2",
          },
          {
            to: `http://localhost:8000/api/v1/correspondencia/elaborada/${id_correspondencia}/pdf/`,
            label: "Ver PDF",
            icon: FaFilePdf,
            estilos:
              "bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md flex items-center gap-2",
          },
          {
            label: "Derivar",
            icon: FaShare,
            onClick: () => setMostrarModalDerivar(true),
            estilos:
              "bg-white hover:bg-green-400 text-black px-4 py-2 rounded-md flex items-center gap-2",
          },
        ]}
      />

      {/* ÁREA DE PREVISUALIZACIÓN */}
      <div className="flex-1 bg-gray-200 p-4 flex justify-center overflow-auto">
        {/* HOJA OFICIO */}
        <div
          className="bg-white shadow-md border rounded flex flex-col relative"
          style={{ width: "816px", minHeight: "900px" }}
        >
          {/* 1️⃣ MEMBRETE SUPERIOR */}
          <header className="w-full flex-shrink-0">
            <img
              src={membreteLogo}
              alt="Membrete superior"
              className="block w-full"
            />
          </header>

          {/* 2️⃣ CONTENIDO */}
          <main className="flex-1 px-[3cm] pt-[0.5cm] pb-[2cm]">
            <div dangerouslySetInnerHTML={{ __html: contenidoHTML }} />
          </main>
          {/* 3️⃣ SELLO */}
          <footer className="w-full flex justify-center">
            <img
              src={selloLogo}
              alt="Membrete inferior"
              className="w-40 h-40 align-super"
            />
          </footer>
          {/* 3️⃣ MEMBRETE INFERIOR */}
          <footer className="w-full">
            <img
              src={membreteInferiorLogo}
              alt="Membrete inferior"
              className="w-full h-20 object-contain"
            />
          </footer>
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
