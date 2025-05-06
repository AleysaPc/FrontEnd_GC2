import axios from "axios";

const ApiBaseURL = import.meta.env.VITE_API_BASE_URL;

// Crear instancia base de Axios
const createApiInstance = (baseURL = ApiBaseURL) => {
  const apiInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

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

  // Interceptor de respuesta: maneja errores globales
  apiInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("Token"); // Eliminar token si la respuesta es 401
        console.error("Sesión expirada, redirigiendo al login.");
      }
      return Promise.reject(error); // Devuelve el error para que se pueda manejar en otro lugar
    }
  );

  return apiInstance;
};

// Función genérica para manejar peticiones y errores
const request = async (apiInstance, method, url, data = null) => {
  try {
    const response = await apiInstance.request({ method, url, data });
    console.log("Petición exitosa:", response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error del servidor:", error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error("Sin respuesta del servidor:", error.request);
      throw new Error("El servidor no está respondiendo.");
    } else {
      console.error("Error desconocido:", error.message);
      throw new Error(error.message);
    }
  }
};

export { createApiInstance, request };