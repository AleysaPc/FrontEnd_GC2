import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function VistaPreviaDocumento() {
  const { id_correspondencia } = useParams();
  const [contenidoHTML, setContenidoHTML] = useState("");

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
    <div className="p-4 border-2 rounded-md bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-4">Vista previa del documento</h2>
      <div
        className="prose max-w-none border-t pt-4"
        dangerouslySetInnerHTML={{ __html: contenidoHTML }}
      />
    </div>
  );
}
