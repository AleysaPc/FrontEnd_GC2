import { createApiInstance } from "./api.Base";

const api = createApiInstance();

export const getProximoRegistro = async () => {
    const { data } = await api.get("/correspondencia/proximo_nro_registro/");
    return data;
}

//Utilizamos este endpint para generar el pre sello de la correspondencia
export const generarPreSello = async () => {
    const { data } = await api.post("/correspondencia/generar_pre_sello/");
    return data;
}

export const SellosPendientes = async () => {
    const { data } = await api.get("/correspondencia/pre_sellos_pendientes/");
    return data;
}