import { createApi } from "./api.config"; //Conectará con la API ...!
import { createCrudOperations } from "./api.crud"; //Para realizar las operaciones crud

const ApiAlertas = createApi("alertas");

//Operaciones CRUD Básicas
export const AlertasApi = createCrudOperations(ApiAlertas, "alertas");

//Endpoints específicos del sistema de alertas
export const AlertasService = {
  //Obtener alertas del usuario actual
  obtenerAlertasUsuario: () =>
    ApiAlertas.get("usuario/").then((res) => res.data),

  //Crear alerta manual
  crearAlertaManual: (data) =>
    ApiAlertas.post("crear/", data).then((res) => res.data),

  //Marcar alerta como vita
  marcarAlertaVista: (id) =>
    ApiAlertas.post(`${id}/vista/`).then((res) => res.data),

  //Obtener estadíasticas de alertas
  obtenerEstadisticas: () =>
    ApiAlertas.get("estadisticas/").then((res) => res.data),
};
