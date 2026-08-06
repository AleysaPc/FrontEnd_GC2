import { useQuery } from "@tanstack/react-query";
import { InicioApi } from "../api/correspondencia.api";

export const useResumenInicio = () =>
  useQuery({
    queryKey: ["resumenInicio"],
    queryFn: InicioApi.obtenerResumen,
    staleTime: 1000 * 60 * 5,
  });
