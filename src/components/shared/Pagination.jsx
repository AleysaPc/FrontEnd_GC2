import { ActionButton } from "./ActionButton";

const Pagination = ({
  currentPage = 1,
  count = 0,
  nextPage = null,
  prevPage = null,
  onPageChange,
}) => {
  const handlePageChange = (newPage) => {
    if (onPageChange && typeof onPageChange === "function") {
      onPageChange(newPage);
    }
  };

  const styleBtn =
    " bg-white hover:bg-gray-700 hover:text-white h-6 w-10 text-black rounded-md border-2 border-gray-400 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-white disabled:text-white disabled:border-white disabled:cursor-not-allowed";

  return (
    <div className="flex justify-center space-x-2 bg-whites border-2 border-gray-400 rounded-lg items-center p-1">
      <ActionButton
        onClick={() => handlePageChange(currentPage - 1)}
        label="<<<"
        estilos={styleBtn}
        disabled={!prevPage} // Deshabilita si está en la primera página
      />

      <span className="px-4 py-1 border rounded bg-gray-100 text-sm">
        {`Página ${currentPage} de ${
          count === 0 ? 1 : Math.ceil(count / 10)
        } de ${count}`}
      </span>

      <ActionButton
        onClick={() => handlePageChange(currentPage + 1)}
        label=">>>"
        estilos={styleBtn}
        disabled={!nextPage} // Deshabilita si está en la última página
      />
    </div>
  );
};

export default Pagination;