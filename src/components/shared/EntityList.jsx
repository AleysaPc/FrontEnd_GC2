import Table from "../../components/shared/Table";
import Loading from "../../components/shared/Loading";
import ErrorMessage from "../../components/shared/ErrorMessaje";
import Pagination from "../../components/shared/Pagination";
import { Navigation } from "../../components/shared/Navigation";
import { useFormEntity } from "../../utils/useFormEntity";
import FiltroBusquedaOrden from "../../components/shared/FiltroBusquedaOrden";
import { useState } from "react";

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
    ordenes,
  } = entityData;

  //Los set son para modificar los estados de las variables
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10); //Estado inicial
  const [allData, setAllData] = useState(false);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [ordering, setOrdering] = useState("");

  // Función para actualizar filtros específicos
  const manejarFiltro = (nuevosValores) => {
    // Extraemos los valores desde el objeto combinado que viene desde FiltroBusquedaOrden
    const { search, ordering, ...restFilters } = nuevosValores;
    setSearch(search || '');
    setOrdering(ordering || '');
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
      <FiltroBusquedaOrden
        onChange={manejarFiltro}
        filtros={filtros}
        ordenes={ordenes}
        placeholderSearch="Search"
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
    </div>
  );
}

export default EntityList;
