import { useEntityMutations } from "./useEntityMutations";
import {CorrespondenciaApi, CorrespondenciaEntranteApi, CorrespondenciaSalienteApi} from "../api/correspondencia.api";
import useData from "./useData";
import { CustomUsersAPI, RolesApi, PasswordResetAPI} from "../api/usuario.api";
import { useMutationWithToast } from "./useMutationWithToast";
import { ContactoApi } from "../api/contacto.api";

//Correspondencia
export const useCorrespondencias = (all_data = false, page = 1) => {
    return useData(CorrespondenciaApi, "correspondencias", null, { all_data, page }, 1000 * 60 * 5);
};

export const useCorrespondencia = (id) => useData(CorrespondenciaApi, "correspondencias", id);
export const useCorrespondenciaMutations = () => useEntityMutations(CorrespondenciaApi, "correspondencia");

// Correspondencia Entrante
export const useCorrespondenciaEntrantes = (all_data = false, page = 1) => { //Plural
    return useData(CorrespondenciaEntranteApi, "correspondencia_entrantes", null, { all_data, page }, 1000 * 60 * 5);
}
export const useCorrespondenciaEntrante = (id) => useData(CorrespondenciaEntranteApi, "correspondencia_entrantes", id); //Singular
export const useCorrespondenciaEntranteMutations = () => useEntityMutations(CorrespondenciaEntranteApi, "correspondencia_entrante");

// Correspondencia Saliente
export const useCorrespondenciaSalientes = (all_data = false, page = 1) => { //Plural
    return useData(CorrespondenciaSalienteApi, "correspondencia_salientes", null, { all_data, page }, 1000 * 60 * 5);
}
export const useCorrespondenciaSaliente = (id) => useData(CorrespondenciaSalienteApi, "correspondencia_salientes", id); //Singular
export const useCorrespondenciaSalienteMutations = () => useEntityMutations(CorrespondenciaSalienteApi, "correspondencia_saliente");

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

//Contacto
export const useContactos = (all_data = false, page = 1) => {
    return useData(ContactoApi, "contactos", null, { all_data, page }, 1000 * 60 * 5);
};


export const useContacto = (id) => useData(ContactoApi, "contactos", id);
export const useContactoMutations = () => useEntityMutations(ContactoApi, "contacto");

//Institucion
export const useInstituciones = (all_data = false, page = 1) => {
    return useData(ContactoApi, "instituciones", null, { all_data, page }, 1000 * 60 * 5);
}
export const useInstitucion = (id) => useData(ContactoApi, "instituciones", id);
export const useInstitucionMutations = () => useEntityMutations(ContactoApi, "institucion");

