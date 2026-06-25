
import { useQuery } from '@tanstack/react-query'
import { SellosPendientes } from '../api/selloService'
export const usePreSellos = () => {
    return useQuery({
        queryKey: ['pre_sellos_disponibles'],
        queryFn: SellosPendientes
    })
}