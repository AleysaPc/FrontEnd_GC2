import { useState } from "react";

const useBarraBusqueda = ({ fetchDataHook, paginacion, clavesBusqueda }) => {
  const todosLosDatos = obtenerAllDatos(fetchDataHook);

  const [consultaBusqueda, setconsultaBusqueda] = useState("");

  const datosParaBusqueda =
    consultaBusqueda && todosLosDatos.items.length > 0
      ? todosLosDatos.items
      : paginacion.items;

  const articulosFiltrados =
    !consultaBusqueda || clavesBusqueda.length === 0
      ? datosParaBusqueda
      : datosParaBusqueda.filter((item) =>
          clavesBusqueda.some((key) =>
            item[key]
              ?.toString()
              .toLowerCase()
              .trim()
              .includes(consultaBusqueda.toLowerCase().trim())
          )
        );

  return { consultaBusqueda, setconsultaBusqueda, articulosFiltrados };
};

function obtenerAllDatos(fetchDataHook) {
  const { data: response = {}, isLoading, isError } = fetchDataHook(true);
  const items = response.data || [];
  return { items, isLoading, isError };
}

export default useBarraBusqueda;