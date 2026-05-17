import { createApiInstance } from "../../api/api.Base";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";

//Query guarda el estado automaticamente por eso se elimino la linea 51
// Se elimina useEffect porque Reac Query ejecuta el fetch automaticamente
// Ya no existe setRegistroInfo(data) Query actualiza el estado automaticamente.

//para obtener la api
const api = createApiInstance();

const NumeroRegistroSello = () => {
  //Función para obtener datos
  const obtenerProximoRegistro = async () => {
    const { data } = await api.get("/correspondencia/proximo_nro_registro/");
    return data;
  };

  const handleGenerarPreSello = async () => {
    const confirmado = window.confirm(
      "¿Confirma la generación del sello de correspondencia?\n\n" +
        "Esta acción generará un nuevo número de registro y no podrá deshacerse.",
    );

    if (!confirmado) return;

    try {
      const { data } = await api.post("/correspondencia/generar_pre_sello/");

      // 🔐 Guardar pre-sello localmente
      const preSellos = JSON.parse(localStorage.getItem("preSellos")) || [];
      preSellos.push(data);
      localStorage.setItem("preSellos", JSON.stringify(preSellos));

      const doc = new jsPDF();

      // Página
      const pageWidth = doc.internal.pageSize.getWidth();

      // Sello
      const selloX = pageWidth - 100;
      const selloY = 26;
      const selloWidth = 90;

      // Marco azul
      doc.setDrawColor(0, 0, 180);
      doc.rect(selloX, selloY, selloWidth, 55);

      // Colores y posición
      doc.setTextColor(0, 0, 180);
      const textX = selloX + 5;
      const centerX = selloX + selloWidth / 2;
      let y = selloY + 10;

      // 🏛️ Institución (centrado + negrita)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("FEDERACIÓN LA PAZ", centerX, y, { align: "center" });
      y += 8;

      // 📅 Fecha
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(
        `Fecha/Hora: ${new Date(data.fecha_generacion).toLocaleString()}`,
        textX,
        y,
      );
      y += 8;

      // 🔢 Nro Registro (centrado + negrita)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text(`N° ${data.pre_nro_registro}`, centerX, y, { align: "center" });
      y += 14;

      // ✍️ Firma
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("Firma: ____________________", textX, y);

      // Abrir PDF
      window.open(URL.createObjectURL(doc.output("blob")));

      window.open(URL.createObjectURL(doc.output("blob")));
    } catch (err) {
      console.error(err);
      alert("Error al generar pre-sello");
    }
  };

  //React query hace todo
  //fetch --> ir al backend para obtener datos
  //loading
  //error
  //cache
  //acutalización
  const {
    data: registroInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["proximoRegistro"],
    queryFn: obtenerProximoRegistro, //Función que hara get//
    refetchInterval: 5000, //Refresca cada 5 segundos
  });
  //Loading
  if (isLoading) {
    return <p>Cargando...</p>;
  }
  //Error
  if (error) {
    return <p>Erro obteniendo regisro</p>;
  }
  return (
    <div>
      <button onClick={handleGenerarPreSello}>
        Generar pre-sello
      </button>
      <div>
        <p>{registroInfo?.siguiente}</p>
      </div>
    </div>
  );
};
export default NumeroRegistroSello;

//import { createApiInstance } from "../../api/api.Base";
//import { useEffect, useState } from "react";

//const SelloDigitalRecibida = () => {
//  const api = createApiInstance(); instancia Axios

//Para mostrar el número de registro actual - seguiente
//registroInfo guarda el valor inicial del estado en este caso null
//setRegistroInfo es una función que da react para cambiar el estado
//  const [registroInfo, setRegistroInfo] = useState(null);

//Obtener proximo número de registro

//  const obtenerProximoRegistro = async () => { //await solo puedo usarse dentro de funciones asincronas
//    try {
// data : Axios decidió llamar así a la propiedad donde guarda la respuesta del backend.
//Destructruación de un objeto no un array
//      const { data } = await api.get("/correspondencia/proximo_nro_registro/");
//      setRegistroInfo(data);
//    } catch (error) {
//      console.log("Error obteniendo próximo reigstor:", error);
//    }
//  };
//useEffect ejecuta el codigo cada vez que cargue el navar aparecera Nro_registro
//  useEffect(() => {
//    obtenerProximoRegistro();
//  },[]);

//  return(
//    <div>
//      <p>{registroInfo?.siguiente}</p>
//    </div>
//  )

//};
//export default SelloDigitalRecibida;
