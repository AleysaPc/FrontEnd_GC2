import { useQuery } from "@tanstack/react-query";

// Hook genérico para obtener datos
const useData = (api, queryKey, id, params = {}, staleTime) => {
  const { all_data, page } = params;
  return useQuery({
    queryKey: id ? [queryKey, id] : [queryKey, all_data, page],
    queryFn: () => (id ? api.getOne(id) : api.getAll(all_data, page)),
    ...(id && { enabled: !!id }),
    ...(id ? {} : { staleTime: staleTime }),
  });
};

export default useData;