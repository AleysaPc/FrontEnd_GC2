// api.crud.js
import { request } from "./api.Base";

// Función genérica para operaciones CRUD
export const createCrudOperations = (apiInstance, resource) => ({
  // ✅ Obtener lista filtrada, paginada, búsqueda, orden o todo (all_data)
  getFiltered: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(apiInstance, "get", `${resource}/?${query}`);
  },
  // ✅ Obtener un solo recurso
  getOne: (id) => request(apiInstance, "get", `${resource}/${id}`),
  // ✅ Crear un nuevo recurso
  create: (data) => request(apiInstance, "post", `${resource}/`, data),
  // ✅ Actualizar un recurso
  update: (id, data) => request(apiInstance, "put", `${resource}/${id}/`, data),
  // ✅ Eliminar un recurso
  delete: (id) => request(apiInstance, "delete", `${resource}/${id}/`),
});
