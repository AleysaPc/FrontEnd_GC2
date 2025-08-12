import { createApi } from "./api.config";
import { createCrudOperations } from "./api.crud";

const ApiCorrespondencia = createApi("correspondencia");

export const CorrespondenciaApi = createCrudOperations(ApiCorrespondencia, "correspondencia")
export const RecibidaApi = createCrudOperations(ApiCorrespondencia, "recibida")
export const EnviadaApi = createCrudOperations(ApiCorrespondencia, "enviada")
export const ElaboradaApi = createCrudOperations(ApiCorrespondencia, "elaborada")
export const AccionCorrespondenciaApi = {
    ...createCrudOperations(ApiCorrespondencia, "acciones"),
    notificacionesPendientes: () =>
        ApiCorrespondencia.get("notificacion/pendiente/").then(res => res.data),
    marcarNotificacionVista: (id_accion) =>
        ApiCorrespondencia.post(`notificacion/vista/${id_accion}/`),
}