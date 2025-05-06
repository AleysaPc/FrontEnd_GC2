import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "./usePagination";

export const useFormEntity = () => {
  const navigate = useNavigate();

  const options = (entity, keyId, keyNombre) =>
    entity.map((item) => ({
      id: item[keyId], // Accede dinámicamente a la clave id
      nombre: item[keyNombre], // Accede dinámicamente a la clave nombre
    }));

  const crearEstadoFomulario = (campos) => {
    const estadoInicial = {};
    Object.keys(campos).forEach((campo) => {
      estadoInicial[campo] = campos[campo]; // Usa el valor original esto arregla el togle de estado F V
    });
    return estadoInicial;
  };

  const manejarCambioDeEntrada = (setFormValues) => (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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
    const dataToSend = {
      ...formValues,
      ...params,
    };

    const mutation = entityId ? updateMutation : createMutation;
    mutation.mutate(
      { id: entityId || undefined, data: dataToSend },
      { onSuccess: () => navigate(`${entityName}`) }
    );
  };

  const destructuring = (hook) => {
    const { data = {} } = hook() || {};
    return data.data || [];
  };

  const paraSelectsdestructuringYMap = (hook, all_data, keyId, keyNombre) => {
    const { data: response = {} } = hook(all_data);
    return (response.data || []).map((item) => ({
      id: item[keyId], // Accede dinámicamente a la clave id
      nombre: item[keyNombre], // Accede dinámicamente a la clave nombre
    }));
  };

  const todosDatosOpaginacion = (fetchDataHook, all_data) => {
    const { currentPage, handlePageChange } = usePagination();

    const {
      data: response = {},
      isLoading,
      isError,
    } = fetchDataHook(all_data, currentPage);

    const {
      count = 0,
      next = null,
      previous = null,
      results,
    } = response.data || {};

    const items = results || response.data || [];

    const totalItems = count;

    const hasPagination = next || previous;

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
    };
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