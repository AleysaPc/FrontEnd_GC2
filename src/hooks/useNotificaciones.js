import { useQuery } from '@tanstack/react-query';
import { AccionCorrespondenciaApi } from '../api/correspondencia.api';

export const useNotificacionesPendientes = () => {
  return useQuery({
    queryKey: ['notificacionesPendientes'],
    queryFn: AccionCorrespondenciaApi.notificacionesPendientes,
  });
};
