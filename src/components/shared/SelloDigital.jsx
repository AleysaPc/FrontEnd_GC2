import { createApiInstance } from "../../api/api.Base";
import { useEffect, useState } from "react";

const SelloDigitalRecibida = () => {
  const api = createApiInstance();

  //Para mostrar el número de registro actual - seguiente
  //registroInfo guarda el valor inicial del estado en este caso null
  //setRegistroInfo es una función que da react para cambiar el estado
  const [registroInfo, setRegistroInfo] = useState(null);

  //Obtener proximo número de registro

  const obtenerProximoRegistro = async () => { //await solo puedo usarse dentro de funciones asincronas
    try {
      // data : Axios decidió llamar así a la propiedad donde guarda la respuesta del backend.
        //Destructruación de un objeto no un array
      const { data } = await api.get("/correspondencia/proximo_nro_registro/");
      setRegistroInfo(data);
    } catch (error) {
      console.log("Error obteniendo próximo reigstor:", error);
    }
  };
  //useEffect ejecuta el codigo cada vez que cargue el navar aparecera Nro_registro
  useEffect(() => {
    obtenerProximoRegistro();
  },[]);

  return(
    <div>
      <p>{registroInfo?.siguiente}</p> 
    </div>
  )

};
export default SelloDigitalRecibida;
