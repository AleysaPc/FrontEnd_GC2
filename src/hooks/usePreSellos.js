
import { useQuery } from '@tanstack/react-query'
import { SellosPendientes } from '../api/selloService'
export const usePreSellos = () => {
    return useQuery({
        queryKey: ['pre-sellos-pendientes'],
        queryFn: SellosPendientes
    })
}