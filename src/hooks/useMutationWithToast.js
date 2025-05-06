import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useMutationWithToast = (
  mutationFn,
  loadingMsg,
  successMsg,
  queryKeyToInvalidate
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      toast.promise(mutationFn(data), {
        loading: loadingMsg,
        success: successMsg,
        error: (error) =>
          `Error: ${error.response?.data?.detail || error.message}`,
      }),
    onSuccess: () => {
      if (queryKeyToInvalidate) {
        queryClient.invalidateQueries([queryKeyToInvalidate]); // Invalida la query correcta
      }
    },
    onError: (error) => {
      console.error("Error en la mutación:", error);
    },
    onSettled: () => {
      if (queryKeyToInvalidate) {
        queryClient.invalidateQueries([queryKeyToInvalidate]);
      }
    },
  });
};