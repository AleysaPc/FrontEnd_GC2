import Table from "../../components/shared/Table";
import Loading from "../../components/shared/Loading";
import ErrorMessage from "../../components/shared/ErrorMessaje";
import Pagination from "../../components/shared/Pagination";
import { Navigation } from "../../components/shared/Navigation";
import { useFormEntity } from "../../utils/useFormEntity";
import FiltroBusquedaOrden from "../../components/shared/FiltroBusquedaOrden";
import { useState, useEffect } from "react";

function EntityList({ entityData }) {
  const {
    title,
    fetchDataHook,
    entityFields,
    loadingMessage,
    errorMessage,
    subTitle,
    itemKey,
    actions = [],
    icon,
    filtros,
    filtrosAvanzados,
    ordenes,
    mostrarBusquedaSemantica = false,
  } = entityData;

  const storageKey = `entityList_${title}`;

  //Los set son para modificar los estados de las variables
  const getInitialState = () => {
    const saved = sessionStorage.getItem(storageKey);

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Error recuperando estado de la lista:", error);
      }
    }

    return {
      page: 1,
      perPage: 10,
      allData: false,
      search: "",
      filters: {},
      ordering: "",
    };
  };

  const initialState = getInitialState();

  const [page, setPage] = useState(initialState.page);
  const [perPage, setPerPage] = useState(initialState.perPage);
  const [allData, setAllData] = useState(initialState.allData);

  const [search, setSearch] = useState(initialState.search);
  const [filters, setFilters] = useState(initialState.filters);
  const [ordering, setOrdering] = useState(initialState.ordering);

  useEffect(() => {
    sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        page,
        perPage,
        allData,
        search,
        filters,
        ordering,
      }),
    );
  }, [storageKey, page, perPage, allData, search, filters, ordering]);
  // Función para actualizar filtros específicos
  const manejarFiltro = (nuevosValores) => {
    // Extraemos los valores desde el objeto combinado que viene desde FiltroBusquedaOrden
    const { search, ordering, ...restFilters } = nuevosValores;
    setSearch(search || "");
    setOrdering(ordering || "");
    setFilters(restFilters || {});
    setPage(1);
  };

  const { todosDatosOpaginacion } = useFormEntity();

  const paginacion = todosDatosOpaginacion(fetchDataHook, {
    all_data: allData,
    page: page,
    per_page: perPage,
    search: search,
    filters: filters,
    ordering: ordering, //El azul es el estado inicial y posiblemente el celeste sea el nombre
  });

  const {
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
  } = paginacion;

  if (isLoading) return <Loading message={loadingMessage} />;
  if (isError) return <ErrorMessage message={errorMessage} />;

  const SelectPerPage = ({ perPage, setPerPage, setAllData, setPage }) => {
    const opciones = [3, 5, 10, 20, "Todos"];

    const handleChange = (e) => {
      const value = e.target.value;

      if (value === "Todos") {
        setAllData(true);
      } else {
        setAllData(false);
        setPerPage(parseInt(value));
      }

      setPage(1); //resetea la pagina a 1
    };

    return (
      <select
        value={allData ? "Todos" : perPage}
        onChange={handleChange}
        className="border border-gray-400 rounded px-2 py-1 text-sm"
      >
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            Mostrar {opcion}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="">
      {/* este es el div principal*/}
      <Navigation
        title={title}
        subTitle={`${subTitle}`}
        actions={actions}
        icon={icon}
      />
      <FiltroBusquedaOrden
        onChange={manejarFiltro}
        filtros={filtros}
        filtrosAvanzados={filtrosAvanzados}
        ordenes={ordenes}
        placeholderSearch="Search"
        mostrarBusquedaSemantica={mostrarBusquedaSemantica}
      />
      <SelectPerPage
        perPage={perPage}
        setPerPage={setPerPage}
        setAllData={setAllData}
        setPage={setPage}
      />
      <Table
        items={items}
        fields={entityFields()}
        currentPage={currentPage}
        itemsPerPage={per_page}
        itemKey={itemKey || "id"}
      />
      {hasPagination && (
        <Pagination
          current_page={currentPage}
          nextPage={next}
          prevPage={previous}
          onPageChange={handlePageChange}
          total={totalItems}
          total_pages={total_pages}
        />
      )}
    </div>
  );
}

export default EntityList;
