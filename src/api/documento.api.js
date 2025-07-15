import { createApi } from "./api.config";
import { createCrudOperations } from "./api.crud";

const ApiDocumento = createApi("documento");

export const DocumentoApi = createCrudOperations(ApiDocumento, "documento")
export const PlantillaDocumentoApi = createCrudOperations(ApiDocumento, "plantillaDocumento")
