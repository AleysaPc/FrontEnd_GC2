import { createApi } from "./api.config";
import { createCrudOperations } from "./api.crud";

const ApiContacto = createApi("contacto");

export const ContactoApi = createCrudOperations(ApiContacto, "contacto")
export const InstitucionApi = createCrudOperations(ApiContacto, "institucion")