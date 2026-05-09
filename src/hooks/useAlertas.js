import { useQuery } from '@tanstack/react-query';
import { AlertasService } from '../api/alertas.api';

export const useAlertasPendientes = () => {
    return useQuery({
        queryKey: ['alertasPendientes'],
        queryFn: AlertasService.obtenerAlertasUsuario,
        refetchInterval: 5000, //5 segundos
        staleTime: 1000,
    });
};