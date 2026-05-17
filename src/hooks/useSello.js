import { useQuery } from "@tanstack/react-query";
import { getProximoRegistro, generarPreSello } from "../api/selloService";
import { jsPDF } from "jspdf";

export const useSello = () => {
  
  const registroQuery = useQuery({
    queryKey: ["proximo_registro"],
    queryFn: getProximoRegistro, //Función que llama a la API
    refetchInterval: 5000,
  });

  const generarPDFSello = async () => {
    if (!window.confirm("¿Confirma la generación del sello?")) return;

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
  };

  return { registroQuery, generarPDFSello };
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
    { align: "center" }
  );
};

const drawRegister = (doc, c, data) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`N° ${data.pre_nro_registro}`, c.x + 45, c.y + 28, {
    align: "center",
  });
};

const drawSignature = (doc, c) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Firma:", c.x + 5, c.y + 38);

  doc.setLineWidth(0.4);
  doc.line(c.x + 20, c.y + 44, c.x + c.w - 10, c.y + 44);
};