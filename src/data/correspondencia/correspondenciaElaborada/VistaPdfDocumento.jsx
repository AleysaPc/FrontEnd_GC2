import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function VistaPdfDocumento() {
  const { id_correspondencia } = useParams();

  useEffect(() => {
    if (id_correspondencia) {
      // Redirigir directamente a la URL del PDF
      window.location.href = `http://localhost:8000/api/v1/correspondencia/elaborada/${id_correspondencia}/pdf/`;
    }
  }, [id_correspondencia]);

  return null; // No mostramos nada en este componente, solo redirigimos
}

