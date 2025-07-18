import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "./usePagination";

export const options = (entity, keyId, keyNombre) => {
  // Si no hay datos o no es un array, retornamos un array vacío
  if (!entity || !Array.isArray(entity)) {
    return [];
  }
  return entity.map((item) => ({
    id: item[keyId], // Accede dinámicamente a la clave id
    nombre: item[keyNombre], // Accede dinámicamente a la clave nombre
  }));
};

export const useFormEntity = () => {
  const navigate = useNavigate();

  const crearEstadoFomulario = (campos) => {
    const estadoInicial = {};
    Object.keys(campos).forEach((campo) => {
      estadoInicial[campo] = campos[campo]; // Usa el valor original esto arregla el togle de estado F V
    });
    return estadoInicial;
  };

  const manejarCambioDeEntrada = (setFormValues) => (e) => {
    const { name, type, files, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const manejarCambioDeEstado = (setFormValues) => (fieldName) => (value) => {
    setFormValues((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const usarEfecto = (entidad, setFormValues, campos = {}) => {
    useEffect(() => {
      if (entidad?.data) {
        setFormValues((prevState) => ({
          ...prevState,
          ...entidad.data,
          ...campos,
        }));
      }
    }, [entidad?.data, setFormValues]);
  };

  const manejarEnvio = (
    event,
    entityName,
    formValues,
    createMutation,
    updateMutation,
    entityId,
    params = {}
  ) => {
    event.preventDefault(); // Prevenir acción por defecto del formulario

    // Combinar formValues con params adicionales
    const dataToSend = {
      ...formValues,
      ...params,
    };

    // Filtrar valores válidos y excluir URLs de archivos ya existentes (no se envían como archivos)
    const filteredData = {};
    Object.entries(dataToSend).forEach(([key, value]) => {
      if (
        value instanceof File ||
        (typeof Blob !== "undefined" && value instanceof Blob)
      ) {
        filteredData[key] = value;
      } else if (
        typeof value === "string" &&
        (value.startsWith("http") || value.startsWith("blob:"))
      ) {
        // No enviar URL de archivos como archivos
        // En cambio, enviaremos su id en la transformación posterior
      } else if (value !== null && value !== undefined) {
        filteredData[key] = value;
      }
    });

    // Transformar documentos para que incluyan id (si es documento existente) o archivo (si es nuevo)
    if (Array.isArray(filteredData.documentos)) {
      filteredData.documentos = filteredData.documentos
        .filter((doc) => doc.archivo || doc.id) // evita enviar documentos vacíos
        .map((doc) => {
          if (
            doc?.archivo &&
            (doc.archivo instanceof File || doc.archivo instanceof Blob)
          ) {
            return {
              archivo: doc.archivo,
              nombre_documento: doc.nombre_documento || "",
            };
          } else if (typeof doc.archivo === "string" && doc.id) {
            return {
              id: doc.id,
              nombre_documento: doc.nombre_documento || "",
            };
          } else if (doc.id) {
            return {
              id: doc.id,
              nombre_documento: doc.nombre_documento || "",
            };
          } else {
            return null; // no tiene archivo ni id, no se envía
          }
        })
        .filter(Boolean); // elimina nulls
    }

    // Detectar si hay archivos para enviar multipart/form-data
    const contieneArchivo = Object.values(filteredData).some(
      (value) =>
        value instanceof File ||
        value instanceof Blob ||
        (Array.isArray(value) &&
          value.some(
            (item) =>
              item.archivo instanceof File || item.archivo instanceof Blob
          ))
    );

    let data;

    if (contieneArchivo) {
      data = new FormData();

      Object.entries(filteredData).forEach(([key, value]) => {
        if (key === "documentos" && Array.isArray(value)) {
          value.forEach((doc, index) => {
            if (
              doc?.archivo &&
              (doc.archivo instanceof File || doc.archivo instanceof Blob)
            ) {
              data.append(`documentos[${index}][archivo]`, doc.archivo);
            }
            if (doc?.id) {
              data.append(`documentos[${index}][id]`, doc.id);
            }
            if (doc?.nombre_documento) {
              data.append(
                `documentos[${index}][nombre_documento]`,
                doc.nombre_documento
              );
            }
          });
        } else if (key === "usuarios" && Array.isArray(value)) {
          value.forEach((userId) => {
            data.append("usuarios", userId);
          });
        } else {
          // Para otros campos
          data.append(key, value);
        }
      });
    } else {
      // Enviar como JSON si no hay archivos
      data = filteredData;
    }

    // Ejecutar la mutación adecuada (crear o actualizar)
    const mutation = entityId ? updateMutation : createMutation;

    // Logs para depuración
    if (data instanceof FormData) {
      console.log("FormData entries:", [...data.entries()]);
    } else {
      console.log("Plain object data:", data);
    }

    mutation.mutate(
      { id: entityId || undefined, data },
      {
        onSuccess: (response) => {
          if (response?.data?.link !== undefined) {
            if (response.data.link === -1) {
              navigate(-1);
            } else if (typeof response.data.link === "string") {
              navigate(response.data.link);
            }
          } else if (entityName) {
            navigate(entityName);
          }
        },
      }
    );
  };

  const destructuring = (hook) => {
    const { data = {} } = hook() || {};
    return data.data || [];
  };

  const paraSelectsdestructuringYMap = (hook, all_data, keyId, keyNombre) => {
    const { data: response = {} } = hook(all_data);

    // Verificar si hay datos válidos
    const items = response?.data
      ? Array.isArray(response.data)
        ? response.data
        : [response.data]
      : [];

    return items
      .filter((item) => item) // Eliminar items undefined o null
      .map((item) => ({
        id: item?.[keyId] || "", // Usar operador opcional y valor por defecto
        nombre: item?.[keyNombre] || "",
      }));
  };

  const todosDatosOpaginacion = (fetchDataHook, params = {}) => {
    const { all_data = false } = params;
    const { currentPage, handlePageChange } = usePagination();

    // Usar currentPage solo si no es all_data
    const pageToUse = all_data ? 1 : currentPage;

    // Llamar hook con todos los params y la página correcta
    const {
      data: response = {},
      isLoading,
      isError,
    } = fetchDataHook({ ...params, page: pageToUse });

    if (all_data) {
      const items = response.data || [];
      return { items, isLoading, isError, hasPagination: false };
    } else {
      const {
        total_pages,
        per_page,
        total,
        next = null,
        previous = null,
        results,
      } = response.data || {};

      const items = results || response.data || [];
      const totalItems = total;
      const hasPagination = Boolean(next || previous);

      return {
        currentPage,
        handlePageChange,
        isLoading,
        isError,
        items,
        totalItems,
        hasPagination,
        next,
        previous,
        per_page,
        total_pages,
      };
    }
  };

  return {
    options,
    crearEstadoFomulario,
    manejarCambioDeEntrada,
    manejarCambioDeEstado,
    usarEfecto,
    manejarEnvio,
    destructuring,
    paraSelectsdestructuringYMap,
    todosDatosOpaginacion,
  };
};
