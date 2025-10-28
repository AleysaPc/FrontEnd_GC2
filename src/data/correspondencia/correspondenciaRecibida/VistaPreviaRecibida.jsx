import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "../../../components/shared/Navigation";
import { FaArrowLeft, FaFileSignature, FaFilePdf } from "react-icons/fa";
import axios from "axios";

export default function VistaPrevia({ tipo = "recibida" }) {
  const { id_correspondencia } = useParams();
  const [dataDocumento, setDataDocumento] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerDocumento = async () => {
      if (!id_correspondencia) return;

      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/correspondencia/${tipo}/${id_correspondencia}/`
        );
        setDataDocumento(response.data);
      } catch (error) {
        console.error("Error al obtener el documento:", error);
        setDataDocumento(null);
      } finally {
        setIsLoading(false);
      }
    };

    obtenerDocumento();
  }, [id_correspondencia, tipo]);

  if (isLoading) return <div className="p-4">Cargando...</div>;
  if (!dataDocumento) return <div className="p-4 text-red-600">Documento no encontrado</div>;

  const pdfURL = `http://localhost:8000/api/v1/correspondencia/${tipo}/${id_correspondencia}/pdf/`;

  return (
    <div className="w-full h-full flex flex-col">
      <Navigation
        title={`Vista previa del documen000to (${tipo})`}
        actions={[
          {
            to: -1,
            label: "Volver",
            icon: FaArrowLeft,
            estilos:
              "bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
          {
            to: pdfURL,
            label: "Ver PDF",
            icon: FaFilePdf,
            estilos:
              "bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
        ]}
        subTitle={`Información del Documento: ${dataDocumento.cite || "Sin CITE"}`}
        icon={FaFileSignature}
      />

      <div className="flex-1 bg-white p-4 overflow-auto space-y-2">
        <p><strong>Asunto:</strong> {dataDocumento.asunto}</p>
        <p><strong>Remitente:</strong> {dataDocumento.remitente}</p>
        <p>
          <strong>Fecha y hora de recepción:</strong>{" "}
          {dataDocumento.fecha_recepcion} {dataDocumento.hora_recepcion}
        </p>
        <p>
          <strong>Fecha y hora de respuesta:</strong>{" "}
          {dataDocumento.fecha_respuesta ? `${dataDocumento.fecha_respuesta} ${dataDocumento.hora_respuesta}` : "No requiere respuesta"}
        </p>
        <p><strong>Observaciones:</strong> {dataDocumento.observaciones || "Ninguna"}</p>
      </div>
    </div>
  );
}
