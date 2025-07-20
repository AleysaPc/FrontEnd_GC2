import { useEntityMutations } from "./useEntityMutations";
import {
  CorrespondenciaApi,
  RecibidaApi,
  EnviadaApi,
  AccionCorrespondenciaApi,
  ElaboradaApi,
} from "../api/correspondencia.api";
import useData from "./useData";
import {
  CustomUsersAPI,
  RolesApi,
  PasswordResetAPI,
  DepartamentosApi,
} from "../api/usuario.api";
import { useMutationWithToast } from "./useMutationWithToast";
import { ContactoApi, InstitucionApi } from "../api/contacto.api";
import { DocumentoApi, PlantillaDocumentoApi } from "../api/documento.api";

//productos
export const useProducts = (
  params = {},
  enabled = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    ProductosAPI,
    "productos",
    null,
    mergedParams,
    staleTime,
    enabled
  );
};

//para obtener un solo producto
export const useProduct = (id) =>
  useData(ProductosAPI, "producto", id, {}, 1000 * 60 * 5, !!id);

//Correspondencia
export const useCorrespondencias = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    CorrespondenciaApi,
    "correspondencias",
    null,
    mergedParams,
    staleTime,
    enable
  );
};

export const useCorrespondencia = (id) =>
  useData(CorrespondenciaApi, "correspondencias", id, {}, 1000 * 60 * 5, !!id);


export const useCorrespondenciaMutations = () =>
  useEntityMutations(CorrespondenciaApi, "correspondencia");

// Correspondencia Entrante
export const useCorrespondenciaRecibidas = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams = //merged es fución
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    RecibidaApi,
    "correspondenciaRecibidas",
    null,
    mergedParams,
    staleTime,
    enable
  );
};
export const useCorrespondenciaRecibida = (id) =>
  useData(RecibidaApi, "correspondenciaRecibida", id, {}, 1000 * 60 * 5, !!id); //Singular
export const useCorrespondenciaRecibidaMutations = () =>
  useEntityMutations(RecibidaApi, "correspondenciaRecibida");

// Correspondencia Saliente
export const useCorrespondenciaEnviadas = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    EnviadaApi,
    "correspondenciaEnviadas",
    null,
    mergedParams,
    staleTime,
    enable
  );
};
export const useCorrespondenciaEnviada = (id) =>
  useData(EnviadaApi, "correspondenciaEnviada", id, {}, 1000 * 60 * 5, !!id); //Singular
export const useCorrespondenciaEnviadaMutations = () =>
  useEntityMutations(EnviadaApi, "correspondenciaEnviada");

// Correspondencia Elaborada
export const useCorrespondenciaElaboradas = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    ElaboradaApi,
    "correspondenciaElaboradas",
    null,
    mergedParams,
    staleTime,
    enable
  );
};
export const useCorrespondenciaElaborada = (id) =>
  useData(ElaboradaApi, "correspondenciaElaborada", id, {}, 1000 * 60 * 5, !!id); //Singular
export const useCorrespondenciaElaboradaMutations = () =>
  useEntityMutations(ElaboradaApi, "correspondenciaElaborada");

// AccionCorrrespondencia
export const useAccionCorrespondencias = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    AccionCorrespondenciaApi,
    "accionCorrespondencias",
    null,
    mergedParams,
    staleTime,
    enable
  );
};
export const useAccionCorrespondencia = (id) =>
  useData(AccionCorrespondenciaApi, "accionCorrespondencia", id, {}, 1000 * 60 * 5, !!id); //Singular
export const useAccionCorrespondenciaMutations = () =>
  useEntityMutations(AccionCorrespondenciaApi, "accionCorrespondencia");

//users
export const useUsers = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    CustomUsersAPI,
    "users",
    null,
    mergedParams,
    staleTime,
    enable
  );
};
export const useUser = (id) => useData(CustomUsersAPI, "user", id, {}, 1000 * 60 * 5, !!id);
export const useUserMutations = () =>
  useEntityMutations(CustomUsersAPI, "Usuario");

//roles
export const useRoles = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(RolesApi, "roles", null, mergedParams, staleTime, enable);
};
export const useRol = (id) => useData(RolesApi, "rol", id, {}, 1000 * 60 * 5, !!id);
export const useRolMutations = () => useEntityMutations(RolesApi, "Rol");

// password reset
export const usePasswordResetConfirm = () => {
  return useMutationWithToast(
    ({ token, password }) => PasswordResetAPI.confirmReset(token, password),
    "Reestableciendo contraseña...",
    "Contraseña reestablecida con éxito",
    null
  );
};
export const usePasswordResetRequest = () => {
  return useMutationWithToast(
    (email) => PasswordResetAPI.requestReset(email),
    "Solicitud de restablecimiento de contraseña enviada",
    "Error al solicitar el restablecimiento de contraseña",
    null
  );
};

//Departamentos
export const useDepartamentos = ( 
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    DepartamentosApi,
    "departamentos",
    null,
    mergedParams,
    staleTime,
    enable
  );
};
export const useDepartamento = (id) =>
  useData(DepartamentosApi, "departamento", id, {}, 1000 * 60 * 5, !!id);
export const useDepartamentoMutations = () =>
  useEntityMutations(DepartamentosApi, "departamento");

//Contacto
export const useContactos = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    ContactoApi,
    "contactos",
    null,
    mergedParams,
    staleTime,
    enable
  );
};

export const useContacto = (id) => useData(ContactoApi, "contactos", id, {}, 1000 * 60 * 5, !!id);
export const useContactoMutations = () =>
  useEntityMutations(ContactoApi, "contacto");

//Institucion
export const useInstituciones = ( 
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    InstitucionApi,
    "instituciones",
    null,
    mergedParams,
    staleTime,
    enable
  );
};
export const useInstitucion = (id) =>
  useData(InstitucionApi, "institucion", id, {}, 1000 * 60 * 5, !!id);
export const useInstitucionMutations = () =>
  useEntityMutations(InstitucionApi, "institucion");

//Documento
export const useDocumentos = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    DocumentoApi,
    "documentos",
    null,
    mergedParams,
    staleTime,
    enable
  );
};
export const useDocumento = (id) => useData(DocumentoApi, "documentos", id, {}, 1000 * 60 * 5, !!id);
export const useDocumentoMutations = () =>
  useEntityMutations(DocumentoApi, "documento");

//Plantilla Documento
export const usePlantillaDocumentos = (
  params = {},
  enable = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    PlantillaDocumentoApi,
    "plantillaDocumentos",
    null,
    mergedParams,
    staleTime,
    enable
  );
};
export const usePlantillaDocumento = (id) =>
  useData(PlantillaDocumentoApi, "plantillaDocumentos", id, {}, 1000 * 60 * 5, !!id);

export const usePlantillaDocumentoMutations = () =>
  useEntityMutations(PlantillaDocumentoApi, "plantillaDocumento");
