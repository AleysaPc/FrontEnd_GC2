const FormattedDateTime = ({ dateTime, format = "DD/MMM/YYYY HH:mm:ss" }) => {
  if (!dateTime) return "No requiere";

  // Creamos un objeto Date desde la cadena
  const fecha = new Date(dateTime);

  // Opciones para formateo de fecha y hora
  const opciones = {
    day: "2-digit",
    month: format.includes("MMM") ? "short" : "2-digit", // corto: ene, feb...
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/La_Paz",
  };

  return fecha.toLocaleString("es-ES", opciones);
};

export default FormattedDateTime;
