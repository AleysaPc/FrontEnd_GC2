const FormattedDate = ({ date, format = "DD/MMM/YYYY" }) => {
    if (!date) return "No registrado";
  
    const fecha = new Date(date);
    const dia = fecha.getDate().toString().padStart(2, "0"); // Asegura dos dígitos
    const mes = fecha.toLocaleString("es-ES", { month: "long" }).toLowerCase(); // Mes en texto
    const año = fecha.getFullYear();
  
    if (format === "DD/MMM/YYYY") {
      return `${dia} ${mes} ${año}`;
    }
  
    if (format === "YYYY-MM-DD") {
      return `${año}-${(fecha.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dia}`;
    }
  
    return fecha.toLocaleDateString(); // Formato por defecto del navegador
  };
  
  export default FormattedDate;