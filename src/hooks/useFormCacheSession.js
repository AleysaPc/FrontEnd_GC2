import { useEffect } from "react";

/**
 * Guarda y restaura los datos del formulario usando sessionStorage.
 * Mantiene todos los campos, incluyendo arrays y objetos.
 * Se borra automáticamente al cerrar la pestaña.
 *
 * @param {string} key - La clave en sessionStorage
 * @param {object} formValues - Estado actual del formulario
 * @param {function} setFormValues - Función para actualizar el estado del formulario
 */
export function useFormCacheSession(key, formValues, setFormValues) {
  // Restaurar datos guardados al montar
  useEffect(() => {
    const saved = sessionStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormValues((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error("Error al cargar cache de sesión:", error);
      }
    }
  }, [key, setFormValues]);

  // Guardar automáticamente cada vez que cambian los valores
  useEffect(() => {
    if (formValues && Object.keys(formValues).length > 0) {
      try {
        sessionStorage.setItem(key, JSON.stringify(formValues));
      } catch (error) {
        console.error("Error al guardar en cache de sesión:", error);
      }
    }
  }, [key, formValues]);

  const clearCache = () => sessionStorage.removeItem(key);

  return { clearCache };
}
