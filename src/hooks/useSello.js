import { useQuery } from "@tanstack/react-query";
import { getProximoRegistro, generarPreSello } from "../api/selloService";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
export const useSello = () => {
  //QUERY
  const registroQuery = useQuery({
    queryKey: ["proximo_registro"],
    queryFn: getProximoRegistro, //Función que llama a la API
    refetchInterval: 5000,
  });

  //GENERAR PDF SELLO
  const generarPDFSello = async () => {
    const result = await Swal.fire({
      title: "¿Generar sello?",
      text: "Se generará un nuevo sello de registro.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, generar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#2563eb",
    });

    if (!result.isConfirmed) return;
    try {
      const data = await generarPreSello(); //Trae los datos del Backend
      const doc = new jsPDF();

      const config = {
        x: doc.internal.pageSize.getWidth() - 100,
        y: 26,
        w: 90,
        h: 50,
      };

      drawBorder(doc, config);
      drawLogo(doc, config);
      drawTitle(doc, config);
      drawDate(doc, config, data);
      drawRegister(doc, config, data);
      drawSignature(doc, config);

      window.open(URL.createObjectURL(doc.output("blob")));
      Swal.fire({
        icon: "success",
        title: "Sello generado",
        text: "El sello fue generado correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al generar el sello:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo generar el sello.",
      });
    }
  };

  //GENERAR NÚMERO SIGUIENTE
  const handleGenerarNroSiguiente = async () => {
    const result = await Swal.fire({
      title: "¿Generar siguiente registro?",
      text: "Se asignará el siguiente número disponible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;
    try {
      await generarPreSello();
      //refetch the query to update the data
      registroQuery.refetch();
      Swal.fire({
        icon: "success",
        title: "Registro actualizado",
        text: "Se generó el siguiente número correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al generar el sello:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo generar el siguiente número.",
      });
    }
  };
  return { registroQuery, generarPDFSello, handleGenerarNroSiguiente };
};

/* ================= HELPERS ================= */

const drawBorder = (doc, c) => {
  doc.setDrawColor(0, 0, 180);
  doc.setLineWidth(0.8);
  doc.rect(c.x, c.y, c.w, c.h);

  doc.setLineWidth(0.3);
  doc.rect(c.x + 2, c.y + 2, c.w - 4, c.h - 4);
};

const drawLogo = (doc, c) => {
  doc.addImage("/LogoFed.PNG", "PNG", c.x + 5, c.y + 5, 12, 12);
};

const drawTitle = (doc, c) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("FEDERACIÓN LA PAZ", c.x + c.w / 2, c.y + 10, {
    align: "center",
  });
};

const drawDate = (doc, c, data) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(
    `Fecha/Hora: ${new Date(data.fecha_generacion).toLocaleString()}`,
    c.x + c.w / 2,
    c.y + 22,
    { align: "center" },
  );
};

const drawRegister = (doc, c, data) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text(
    `N° Registro: ${data.pre_nro_registro?.replace(/^Pre-/i, "") || ""}`,
    c.x + 45,
    c.y + 28,
    { align: "center" }
  );
};

const drawSignature = (doc, c) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Firma:", c.x + 5, c.y + 38);

  doc.setLineWidth(0.4);
  doc.line(c.x + 20, c.y + 44, c.x + c.w - 10, c.y + 44);
};
