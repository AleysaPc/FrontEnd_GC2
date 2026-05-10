import { useNavigate } from "react-router-dom";
import { AlertasService } from "../../api/alertas.api";
import { AlertaReloj} from "../../components/shared/AlertaReloj";
import { FaBell, FaTimesCircle, FaClock } from "react-icons/fa";
import { useState } from "react"

//Imports para React Query
import { useQueryClient } from '@tanstack/react-query';
import { useAlertasPendientes } from "../../hooks/useAlertas";
/**
 * Componente Alertas
 * Muestra las alertas del sistema automático y permite marcarlas como vistas
 */
const Alertas = () => {
  const { data: alertas = [], isLoading, error } = useAlertasPendientes() 
  const queryClient = useQueryClient();
  const [mostrarAlertas, setMostrarAlertas] = useState(false);
  const navigate = useNavigate();


//Contar alertas no vistas
const count = alertas.filter((alerta) => !alerta.vista).length;

//Marcar alerta como vista
const marcarComoVista = async (alerta) => {
  try {
    //Llamar a la API para registrar como vista
    await AlertasService.marcarAlertaVista(alerta.id);

      //Invalidar al query para forzar refresco
      queryClient.invalidateQueries(['alertasPendientes']);

      //Cerrar el panel de alertas 
      setMostrarAlertas(false);
    
  
    //Navegar al documento
    if (alerta.tipo_correspondencia === "recibida") {
     navigate(`/detailRecibida/${alerta.correspondencia_id}`);
    }else if (alerta.tipo_correspondencia === "elaborada") {
    navigate(`/detailEnviada/${alerta.correspondencia_id}`);
    } else {
      navigate(`/detailRecibida/${alerta.correspondencia_id}`);
    }
  } catch (error) {
    console.error("Error marcando alerta como vista", error);
  }
};

//Obtener color de estado
const getColor = (tipoAlerta, vista) => {
  if (vista) return "🟢";

 const icons = {
  por_vencer: <FaClock className="text-orange-500" />,
  vencido: <FaTimesCircle className="text-red-500" />,
};

  return icons[tipoAlerta] || "⚪";
};

return (
  <div className="relative">
    {/* Icono con contador */}
    <AlertaReloj
        count={count}
        onClick={()=> setMostrarAlertas(!mostrarAlertas)}
    />

    {/*Panel de alertas*/}
    {mostrarAlertas && (
      <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white text-black rounded shadow-lg z-50">
        {isLoading ? (
          <div className="p-4 text-center"> Cargando Alertas...</div>
        ) : count === 0 ? (
          <div className="p-4 text-center text-gray-700">
            No hay alertas pendientes
          </div>
        ) : (
          alertas.map((alerta) => (
            <div
              key={alerta.id}
              onClick={() => marcarComoVista(alerta)}
              className={`cursor-pointer p-3 border-b border-red-700 hover:bg-gray-100 ${
                !alerta.vista ? "bg-gray-50" : ""
              }`}
            >
              <div className="flex items-start space-x-2">
                <span className="text-lg">
                  {getColor(alerta.tipo_alerta, alerta.vista)}
                </span>
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {alerta.tipo_correspondencia === "elaborada" && alerta.cite && (
                      <span>CITE: {alerta.cite}</span>
                    )}
                    {alerta.tipo_correspondencia === "recibida" && alerta.nro_registro && (
                      <span>Nro Registro: {alerta.nro_registro}</span>
                    )}
                    {alerta.referencia}
                  </div>
                  <div className="text-xs text-gray-600 capitalize">
                      {alerta.tipo_alerta.replace('_', ' ')} - {alerta.nivel_alerta}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(alerta.fecha_alerta).toLocaleString()}
                    </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    )}
 </div>
);};

export default Alertas;
