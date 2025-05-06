// src/hooks/usePagination.js
import { useLocation, useNavigate } from "react-router-dom";

const usePagination = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extraer número de página de la URL
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;

  // Extraer basePath de la URL dinámica
  const pathSegments = location.pathname.split("/");
  const basePath = pathSegments[1] ? `/${pathSegments[1]}` : "/"; // Validación si pathSegments[1] existe

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      navigate(`${basePath}?page=${page}`);
    }
  };

  return {
    currentPage,
    handlePageChange,
  };
};

export default usePagination;