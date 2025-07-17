import Table from "../../components/shared/Table";
import Loading from "../../components/shared/Loading";
import ErrorMessage from "../../components/shared/ErrorMessaje";
import Pagination from "../../components/shared/Pagination";
import { Navigation } from "../../components/shared/Navigation";
import { useFormEntity } from "../../utils/useFormEntity";
import BarraBusqueda from "../../components/shared/BarraBusqueda";
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
  } = entityData;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [allData, setAllData] = useState(false);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [ordering, setOrdering] = useState("");

  const manejarBusqueda = (termino) => {
    setSearch(termino); // Actualiza el estado para disparar la búsqueda
    setPage(1); //resetea la pagina a 1
  };

  // Función para actualizar filtros específicos
  const manejarFiltro = (campo, valor) => {
    setFilters((prev) => ({ ...prev, [campo]: valor }));
    setPage(1); //resetea la pagina a 1
  };

  // Función para actualizar orden
  const manejarOrden = (campoOrden) => {
    setOrdering(campoOrden);
  };

  const { todosDatosOpaginacion } = useFormEntity();

  const paginacion = todosDatosOpaginacion(fetchDataHook, {
    all_data: allData,
    page: page,
    per_page: perPage,
    search: search,
    filters: filters,
    ordering: ordering,
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
    <div className="space-y-1 p-4">
      {" "}
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
      <BarraBusqueda onSearch={manejarBusqueda} placeholder="Buscar por cite" />
      
      {/* Aquí podrías renderizar inputs/selects para filtros */}
      {/* Ejemplo para filtro precio mínimo */}
      <div>
        <label>Precio mínimo:</label>
        <input
          type="number"
          value={filters.precio_min || ""}
          onChange={(e) => manejarFiltro("precio_min", e.target.value)}
          placeholder="Ej: 10"
          className="border px-2 py-1 rounded"
        />
        {/* Agrega otros filtros similares según filterFields */}
      </div>
      {/* Select para ordenar */}
      <div>
        <label>Ordenar por:</label>
        <select
          value={ordering}
          onChange={(e) => manejarOrden(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">-- Ninguno --</option>
          <option value="precio">Precio</option>
          <option value="fecha_creacion">Fecha de creación</option>
          <option value="nombre">Nombre</option>
          <option value="-precio">Precio (desc)</option>
          <option value="-fecha_creacion">Fecha de creación (desc)</option>
          <option value="-nombre">Nombre (desc)</option>
        </select>
      </div>

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
