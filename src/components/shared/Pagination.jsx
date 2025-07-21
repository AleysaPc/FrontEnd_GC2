import { ActionButton } from "./ActionButton";

const Pagination = ({
  current_page = 1,
  total = 0,
  total_pages = 0,
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
    <div className="flex justify-center space-x-2 bg-whites border-2 border-gray-400  items-center p-1">
      <ActionButton
        onClick={() => handlePageChange(current_page - 1)}
        label="<<<"
        estilos={styleBtn}
        disabled={!prevPage} // Deshabilita si está en la primera página
      />

      <span className="px-4 py-1 border rounded bg-gray-100 text-sm">
        {`Página ${current_page} de ${total_pages} de ${total}`}
      </span>

      <ActionButton
        onClick={() => handlePageChange(current_page + 1)}
        label=">>>"
        estilos={styleBtn}
        disabled={!nextPage} // Deshabilita si está en la última página
      />
    </div>
  );
};

export default Pagination;
