import { createApi } from "./api.config";
import { createCrudOperations } from "./api.crud";

const ApiCorrespondencia = createApi("correspondencia");

export const CorrespondenciaApi = createCrudOperations(ApiCorrespondencia, "correspondencia")
export const CorrespondenciaEntranteApi = createCrudOperations(ApiCorrespondencia, "correspondencia_entrante")
export const CorrespondenciaSalienteApi = createCrudOperations(ApiCorrespondencia, "correspondencia_saliente")
export const CorrespondenciaInternaApi = createCrudOperations(ApiCorrespondencia, "correspondencia_interna")