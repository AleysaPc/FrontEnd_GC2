import { useQuery } from '@tanstack/react-query';
import { AlertasService } from '../api/alertas.api';

export const useAlertasPendientes = () => {
    return useQuery({
        queryKey: ['alertasPendientes'],
        queryFn: AlertasService.obtenerAlertasUsuario,
        refetchInterval: 60_000, //una consulta cada minuto
        refetchIntervalInBackground: false,
        staleTime: 30_000,
        refetchOnWindowFocus: true,
    });
};