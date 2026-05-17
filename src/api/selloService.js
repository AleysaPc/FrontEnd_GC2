import { createApiInstance } from "./api.Base";

const api = createApiInstance();

export const getProximoRegistro = async () => {
    const { data } = await api.get("/correspondencia/proximo_nro_registro/");
    return data;
}

export const generarPreSello = async () => {
    const { data } = await api.post("/correspondencia/generar_pre_sello/");
    return data;
}