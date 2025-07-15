import { useQuery } from "@tanstack/react-query";
import { buildParams } from "../utils/buildParams";

const useData = (
  api,
  queryKey,
  id,
  params = {},
  staleTime = 1000 * 60 * 5,
  enabledParam = true
) => {
  const fullParams = buildParams(params);

  return useQuery({
    queryKey: id ? [queryKey, id] : [queryKey, fullParams],
    queryFn: () => {
      if (id) return api.getOne(id);
      // Siempre usa getFiltered, porque tu api.crud.js solo tiene ese para búsquedas, filtros y paginación
      return api.getFiltered(fullParams);
    },
    enabled: enabledParam,
    staleTime,
  });
};

export default useData;
