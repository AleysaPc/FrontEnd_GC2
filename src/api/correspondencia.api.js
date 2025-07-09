import { createApi } from "./api.config";
import { createCrudOperations } from "./api.crud";

const ApiCorrespondencia = createApi("correspondencia");

export const CorrespondenciaApi = createCrudOperations(ApiCorrespondencia, "correspondencia")
export const RecibidaApi = createCrudOperations(ApiCorrespondencia, "recibida")
export const EnviadaApi = createCrudOperations(ApiCorrespondencia, "enviada")
export const InternaApi = createCrudOperations(ApiCorrespondencia, "interna")