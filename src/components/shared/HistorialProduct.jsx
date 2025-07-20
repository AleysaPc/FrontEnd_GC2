// Trazabilidad e historial de un producto

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProduct, useMovimientos } from "../../hooks/useEntities";
import { FaBox, FaArrowRight, FaArrowDown } from "react-icons/fa";
import { useFormEntity } from "../../utils/useFormEntity";

const HistorialProduct = () => {
  const [movimientos, setMovimientos] = useState([]);
  const { state } = useLocation();
  const { product } = useProduct(state?.id || 1); // Usar ID 1 para el ejemplo

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [allData, setAllData] = useState(true);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [ordering, setOrdering] = useState("");

  const manejarBusqueda = (termino) => {
    setSearch(termino); // Actualiza el estado para disparar la búsqueda
    setPage(1); //resetea la pagina a 1
  };

  const { todosDatosOpaginacion } = useFormEntity();

  const paginacion = todosDatosOpaginacion(useMovimientos, {
    all_data: allData,
    page: page,
    per_page: perPage,
    search: search,
    ordering: ordering,
    filters: filters,
  });

  const { items } = paginacion;

  useEffect(() => {
    // Usar datos de ejemplo para la demostración
    const sortedMovimientos = [...items].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
    setMovimientos(sortedMovimientos);
  }, [state?.id]);

  // Función para obtener el ícono según el tipo de movimiento
  const getMovementIcon = (tipo) => {
    switch (tipo) {
      case "entrada":
        return <FaArrowDown className="text-green-500 mr-2" />;
      case "salida":
        return <FaArrowRight className="text-red-500 mr-2" />;
      default:
        return <FaBox className="text-blue-500 mr-2" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FaBox className="text-3xl text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">
              Trazabilidad del Producto
            </h1>
          </div>
          {product && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {product.nombre}
            </span>
          )}
        </div>

        <div className="relative">
          {items.length > 0 ? (
            <div className="relative">
              {/* Línea vertical de trazabilidad */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>

              <div className="space-y-8">
                {items.map((movimiento, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={index}
                      className={`relative w-1/2 ${
                        isEven ? "pr-8 ml-auto" : "pl-8"
                      }`}
                    >
                      {/* Punto en la línea de tiempo */}
                      <div
                        className={`absolute top-4 w-4 h-4 rounded-full bg-blue-500 border-4 border-white ${
                          isEven ? "left-0 ml-[-8px]" : "right-0 mr-[-8px]"
                        }`}
                      ></div>

                      <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <div className="w-24">
                                <p className="text-sm text-gray-500">
                                  {new Date(
                                    movimiento.fecha
                                  ).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {new Date(
                                    movimiento.fecha
                                  ).toLocaleTimeString()}
                                </p>
                              </div>
                              <div className="ml-4">
                                <div className="flex items-center">
                                  {getMovementIcon(movimiento.tipo_movimiento)}
                                  <h3 className="text-lg font-semibold text-gray-800">
                                    {movimiento.tipo_movimiento === "entrada"
                                      ? "Entrada"
                                      : "Salida"}
                                  </h3>
                                </div>
                                <div className="mt-1 text-sm text-gray-600">
                                  {movimiento.cantidad} unidades
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-xs text-gray-500">Almacén</p>
                                <p className="font-medium">
                                  {movimiento.almacen?.nombre || "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Responsable
                                </p>
                                <p className="font-medium">
                                  {movimiento.usuario?.nombre}{" "}
                                  {movimiento.usuario?.apellido}
                                </p>
                              </div>
                            </div>

                            {movimiento.comentario && (
                              <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-gray-700">
                                {movimiento.comentario}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No hay movimientos registrados para este producto.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorialProduct;
