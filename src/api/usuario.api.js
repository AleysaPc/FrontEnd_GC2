import { createApi } from "./api.config";
import { createCrudOperations} from "./api.crud";
import { createApiInstance, request} from "./api.Base";

const ApiUsers = createApi("usuario"); //va armando la url base para el api de usuario

// Crear operaciones CRUD específicas para los usuarios
export const UsuarioAPI = createCrudOperations(ApiUsers, "usuarios");
export const RolesApi = createCrudOperations(ApiUsers, "grupos");
export const DepartamentosApi = createCrudOperations(ApiUsers, "departamentos");
export const PermisosApi = createCrudOperations(ApiUsers, "permisos");
// listas
export const UsuarioListApi = createCrudOperations(ApiUsers, "usuarios-list")
export const RolListApi = createCrudOperations(ApiUsers, "roles-list")
export const DepartamentoListApi = createCrudOperations(ApiUsers, "departamento-list")
export const PermisoListApi = createCrudOperations(ApiUsers, "permisos-list")
// selects
export const DepartamentoSelectApi = createCrudOperations(ApiUsers, "departamento-select")

// Funciones específicas para el login y registro
export const login = (email, password) => request(ApiUsers, "post", "login/", { email, password });
export const RegistroApi = createCrudOperations(ApiUsers, "register");
export const logoutAll = () => request(ApiUsers, "post", "logoutall/");

// 🔹 API de restablecimiento de contraseña (Corrección de rutas)
const PasswordResetBaseURL = createApiInstance("http://localhost:8000/api/password_reset/");

export const PasswordResetAPI = {
  requestReset: (email) => request(PasswordResetBaseURL, "post", "", { email }),  // ← Ruta corregida
  confirmReset: (token, password) => request(PasswordResetBaseURL, "post", "confirm/", { token, password }),
};
