import Table from "../../components/shared/Table";
import Loading from "../../components/shared/Loading";
import ErrorMessage from "../../components/shared/ErrorMessaje";
import Pagination from "../../components/shared/Pagination";
import { Navigation } from "../../components/shared/Navigation";
import { useFormEntity } from "../../utils/useFormEntity";
import useBarraBusqueda from "../../utils/useBarraBusqueda";

function EntityList({ entityData }) {
  const {
    title,
    fetchDataHook,
    entityFields,
    loadingMessage,
    errorMessage,
    listPath,
    subTitle,
    all_data,
    itemKey,
    actions = [],
    icon,
    clavesBusqueda = [],
  } = entityData; // Desestructuramos entityConfig

  const { todosDatosOpaginacion } = useFormEntity();

  const paginacion = todosDatosOpaginacion(fetchDataHook, all_data);

  const {
    currentPage,
    handlePageChange,
    isLoading,
    isError,
    items,  //esto se usa pero de forma paginacion.items en useBarraBusqueda
    totalItems,
    hasPagination,
    next,
    previous,
  } = paginacion;

  const { consultaBusqueda, setconsultaBusqueda, articulosFiltrados } =
    useBarraBusqueda({ fetchDataHook, paginacion, clavesBusqueda });

  if (isLoading) return <Loading message={loadingMessage} />;
  if (isError) return <ErrorMessage message={errorMessage} />;

  return (
    <div className="space-y-1 m-2 ml-3 px-2 py-1 border-2 border-gray-400 rounded-lg">
      <Navigation
        title={title}
        listPath={`${listPath}`}
        subTitle={`${subTitle}`}
        actions={actions}
        icon={icon}
        onSearch={setconsultaBusqueda}
        clavesBusqueda={clavesBusqueda}
        placeholder="Buscar"
      />

      <Table
        items={articulosFiltrados}
        fields={entityFields()}
        currentPage={currentPage}
        itemsPerPage={10}
        itemKey={itemKey || "id"}
      />

      {hasPagination && !consultaBusqueda && (
        <Pagination
          currentPage={currentPage}
          nextPage={next}
          prevPage={previous}
          onPageChange={handlePageChange}
          count={totalItems}
        />
      )}
    </div>
  );
}

export default EntityList;