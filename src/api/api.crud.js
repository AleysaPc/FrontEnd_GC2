// api.crud.js
import { request } from "./api.Base";

// Función genérica para operaciones CRUD
export const createCrudOperations = (apiInstance, resource) => ({
  getAll: (all_data = false, page = 1) => {
    let url = `${resource}/?page=${page}`; // Agregamos paginación correctamente

    if (all_data) {
      url += "&all_data=true"; // Agregamos all_data si está activo
    }

    return request(apiInstance, "get", url);
  },
  getOne: (id) => request(apiInstance, "get", `${resource}/${id}`),
  create: (data) => request(apiInstance, "post", `${resource}/`, data),
  update: (id, data) => request(apiInstance, "put", `${resource}/${id}/`, data),
  delete: (id) => request(apiInstance, "delete", `${resource}/${id}/`),
});