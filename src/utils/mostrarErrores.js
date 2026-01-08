import { toast } from "react-hot-toast";

/**
 * Muestra errores en toasts de forma limpia.
 * Soporta:
 *  - objetos con arrays de mensajes
 *  - strings simples
 *  - arrays de strings
 */
export const mostrarErrores = (errors) => {
  if (typeof errors === "object" && errors !== null) {
    Object.values(errors).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach(msg => toast.error(msg)); // mostramos todos los mensajes del array
      } else if (typeof value === "string") {
        toast.error(value);
      }
    });
  } else if (typeof errors === "string") {
    toast.error(errors);
  } else {
    toast.error("Ocurrió un error inesperado");
  }
};
