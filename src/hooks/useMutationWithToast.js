import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { mostrarErrores } from "../utils/mostrarErrores";

export const useMutationWithToast = (
  mutationFn,
  loadingMsg,
  successMsg,
  queryKeyToInvalidate
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const toastId = toast.loading(loadingMsg);
      try {
        const result = await mutationFn(data);
        toast.success(successMsg, { id: toastId });
        return result;
      } catch (error) {
        toast.dismiss(toastId);

        let errorData = error.response?.data || error;

        // Si viene como string JSON, parsearlo
        if (typeof errorData === "string") {
          try {
            errorData = JSON.parse(errorData);
          } catch {
            // si no se puede parsear, usar como mensaje
            errorData = { error: errorData };
          }
        }

        mostrarErrores(errorData); // extraer y mostrar todos los mensajes limpios
        throw error;
      }
    },
    onSuccess: () => {
      if (queryKeyToInvalidate) {
        queryClient.invalidateQueries([queryKeyToInvalidate]);
      }
    },
  });
};
