import axios from "axios";

const ApiBaseURL = import.meta.env.VITE_API_BASE_URL;

// Crear instancia base de Axios
const createApiInstance = (baseURL = ApiBaseURL) => {
  const apiInstance = axios.create({
    baseURL,
    timeout: 10000,
  });

  // Interceptor de solicitud: agrega el token de autorización
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("Token");
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      
      // Solo establecer Content-Type como JSON si no es FormData
      if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
        config.headers["Accept"] = "application/json";
      } else {
        // Para FormData, dejar que el navegador establezca los headers
        // incluyendo el boundary para multipart/form-data
        delete config.headers["Content-Type"];
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // ... (el interceptor de respuesta puede permanecer igual)
  return apiInstance;
};

// Función genérica para manejar peticiones y errores
const request = async (apiInstance, method, url, data = null, isFormData = false) => {
  try {
    const config = {
      method,
      url,
    };

    if (isFormData) {
      config.data = data;
      // No establecer Content-Type aquí, el interceptor lo manejará
    } else {
      config.data = data;
    }

    const response = await apiInstance.request(config);
    return response.data;
  } catch (error) {
    // ... (manejo de errores existente)
  }
};

export { createApiInstance, request };