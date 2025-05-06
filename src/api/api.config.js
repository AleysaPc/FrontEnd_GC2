import { createApiInstance} from "./api.Base";

const ApiBaseURL = import.meta.env.VITE_API_BASE_URL;

// Función para crear instancias de API
export const createApi = (endpoint) => createApiInstance(`${ApiBaseURL}/${endpoint}/`);