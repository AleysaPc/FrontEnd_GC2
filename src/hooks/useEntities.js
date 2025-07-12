import { useEntityMutations } from "./useEntityMutations";
import {CorrespondenciaApi, RecibidaApi, EnviadaApi, AccionCorrespondenciaApi} from "../api/correspondencia.api";
import useData from "./useData";
import { CustomUsersAPI, RolesApi, PasswordResetAPI, DepartamentosApi} from "../api/usuario.api";
import { useMutationWithToast } from "./useMutationWithToast";
import { ContactoApi, InstitucionApi } from "../api/contacto.api";
import { DocumentoApi, TipoDocumentoApi } from "../api/documento.api";

//Correspondencia
export const useCorrespondencias = (all_data = false, page = 1) => {
    return useData(CorrespondenciaApi, "correspondencias", null, { all_data, page }, 1000 * 60 * 5);
};

export const useCorrespondencia = (id) => useData(CorrespondenciaApi, "correspondencias", id);
export const useCorrespondenciaMutations = () => useEntityMutations(CorrespondenciaApi, "correspondencia");

// Correspondencia Entrante
export const useCorrespondenciaEntrantes = (all_data = false, page = 1) => { //Plural
    return useData(RecibidaApi, "correspondencia_entrantes", null, { all_data, page }, 1000 * 60 * 5);
}
export const useCorrespondenciaEntrante = (id) => useData(RecibidaApi, "correspondencia_entrantes", id); //Singular
export const useCorrespondenciaEntranteMutations = () => useEntityMutations(RecibidaApi, "correspondencia_entrante");

// Correspondencia Saliente
export const useCorrespondenciaSalientes = (all_data = false, page = 1) => { //Plural
    return useData(EnviadaApi, "correspondencia_salientes", null, { all_data, page }, 1000 * 60 * 5);
}
export const useCorrespondenciaSaliente = (id) => useData(EnviadaApi, "correspondencia_salientes", id); //Singular
export const useCorrespondenciaSalienteMutations = () => useEntityMutations(EnviadaApi, "correspondencia_saliente");

// AccionCorrrespondencia
export const useAccionCorrespondencias = (all_data = false, page = 1) => { //Plural
    return useData(AccionCorrespondenciaApi, "accion_correspondencias", null, { all_data, page }, 1000 * 60 * 5);
}
export const useAccionCorrespondencia = (id) => useData(AccionCorrespondenciaApi, "accionCorrespondencia", id); //Singular
export const useAccionCorrespondenciaMutations = () => useEntityMutations(AccionCorrespondenciaApi, "accionCorrespondencia");

//users
export const useUsers = (all_data = false, page = 1) => {
    return useData( CustomUsersAPI, "users", null, { all_data, page }, 1000 * 60 * 5);
  };
  export const useUser = (id) => useData(CustomUsersAPI, "user", id);
  export const useUserMutations = () => useEntityMutations(CustomUsersAPI, "Usuario");
  
  //roles
  export const useRoles = (all_data = false, page = 1) => {
    return useData( RolesApi, "roles", null, { all_data, page }, 1000 * 60 * 5);
  };
  export const useRol = (id) => useData(RolesApi, "rol", id);
  export const useRolMutations = () => useEntityMutations(RolesApi, "Rol");

  // password reset
export const usePasswordResetConfirm = () => {
    return useMutationWithToast(({ token, password }) => PasswordResetAPI.confirmReset(token, password), "Reestableciendo contraseña...", "Contraseña reestablecida con éxito", null);
  }
  export const usePasswordResetRequest = () => {
    return useMutationWithToast((email) => PasswordResetAPI.requestReset(email), "Solicitud de restablecimiento de contraseña enviada", "Error al solicitar el restablecimiento de contraseña", null);
  }

//Departamentos
export const useDepartamentos = (all_data = false, page = 1) => {
    return useData(DepartamentosApi, "departamentos", null, { all_data, page }, 1000 * 60 * 5);
}
export const useDepartamento = (id) => useData(DepartamentosApi, "departamento", id);
export const useDepartamentoMutations = () => useEntityMutations(DepartamentosApi, "departamento");

//Contacto
export const useContactos = (all_data = false, page = 1) => {
    return useData(ContactoApi, "contactos", null, { all_data, page }, 1000 * 60 * 5);
};

export const useContacto = (id) => useData(ContactoApi, "contactos", id);
export const useContactoMutations = () => useEntityMutations(ContactoApi, "contacto");

//Institucion
export const useInstituciones = (all_data = false, page = 1) => {
    return useData(InstitucionApi, "instituciones", null, { all_data, page }, 1000 * 60 * 5);
}
export const useInstitucion = (id) => useData(InstitucionApi, "institucion", id);
export const useInstitucionMutations = () => useEntityMutations(InstitucionApi, "institucion");

//Documento
export const useDocumentos = (all_data = false, page = 1) => {
  return useData(DocumentoApi, "documentos", null, { all_data, page }, 1000 * 60 * 5);
};
export const useDocumento = (id) => useData(DocumentoApi, "documentos", id);
export const useDocumentoMutations = () => useEntityMutations(DocumentoApi, "documento");

// Tipo de Documento
export const useTiposDocumentos = (all_data = false, page = 1) => {
  return useData(TipoDocumentoApi, "tipos_documento", null, { all_data, page }, 1000 * 60 * 5);
};
export const useTipoDocumento = (id) => useData(TipoDocumentoApi, "tipos_documento", id);
export const useTipoDocumentoMutations = () => useEntityMutations(TipoDocumentoApi, "tipo_documento");