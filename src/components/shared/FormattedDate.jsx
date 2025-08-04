const FormattedDate = ({ date, format = "DD/MMM/YYYY" }) => {
  if (!date) return "No registrado";

  // Extraemos solo la parte de fecha, sin hora ni zona
  const fechaSolo = date.split('T')[0]; // "2025-08-04"

  // Separamos en año, mes y día
  const [year, month, day] = fechaSolo.split('-');

  // Creamos la fecha en UTC (mes - 1 porque enero es 0)
  const fecha = new Date(Date.UTC(year, month - 1, day));

  // Obtenemos los valores en UTC para evitar desfases por zona horaria local
  const dia = fecha.getUTCDate().toString().padStart(2, "0");
  const mesTexto = fecha.toLocaleString("es-ES", { month: "long", timeZone: "UTC" }).toLowerCase();
  const año = fecha.getUTCFullYear();

  if (format === "DD/MMM/YYYY") {
    return `${dia} ${mesTexto} ${año}`;
  }

  if (format === "YYYY-MM-DD") {
    return `${año}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return fecha.toLocaleDateString("es-ES", { timeZone: "UTC" });
};

export default FormattedDate;
