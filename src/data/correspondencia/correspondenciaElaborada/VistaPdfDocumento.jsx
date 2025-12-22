import { useParams } from "react-router-dom";

export default function VistaPdfDocumento() {
  const { id_correspondencia } = useParams();
  
  return (
    <iframe
      src={`http://localhost:8000/api/v1/correspondencia/elaborada/${id_correspondencia}/pdf/`}
      width="100%"
      height="1000px"
      style={{ border: "none" }}
      title="PDF Documento"
    />
  );
}
