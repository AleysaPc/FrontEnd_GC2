// Este hook usa React Query para obtener todas las notificaciones pendientes.
// AccionCorrespondenciaApi.notificacionesPendientes hace un GET a /notificacion/pendiente/ en Django.
// La respuesta (data.items) se guarda en el estado local para mostrar la campanita y la lista.

import { useQuery } from '@tanstack/react-query';
import { AccionCorrespondenciaApi } from '../api/correspondencia.api';

export const useNotificacionesPendientes = () => {
  return useQuery({
    queryKey: ['notificacionesPendientes'],
    queryFn: AccionCorrespondenciaApi.notificacionesPendientes,
  });
};


