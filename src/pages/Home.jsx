import {
  useCorrespondenciaRecibidas,
  useCorrespondenciaElaboradas,
} from "../hooks/useEntities";

import {
  FaInbox,
  FaPaperPlane,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useSello } from "../hooks/useSello";

function Home() {
  // Para sello
  const { registroQuery } = useSello();
  //Obtener datos para estadísticas
  const { data: recibidas } = useCorrespondenciaRecibidas({ all_data: true });
  const { data: elaboradas } = useCorrespondenciaElaboradas({ all_data: true });

  console.log("Total recibidas", recibidas?.data.length);
  console.log("Total elaboradas", elaboradas?.data.length);
  console.log(
    "Total enviasExternas",
    elaboradas?.data?.filter((item) => item.ambito === "externo")?.length,
  );
  console.log(
    "Total recibidasNoRespondidas",
    recibidas?.data?.filter(
      (item) => item.fecha_respuesta && item.estado === "en_revision",
    )?.length,
  );

  //Calcular estadísticas
  //Recibidas
  const totalRecibidas = recibidas?.data.length || 0;
  //Enviadas Externas
  const totalEnviadasExternas = elaboradas?.data?.filter(
    (item) => item.ambito === "externo",
  )?.length;
  //Enviadas Internas
  const totalEnviadasInternas = elaboradas?.data?.filter(
    (item) => item.ambito === "interno",
  )?.length;
  //Recibidas que tienen fecha_respuesta y no fueron respondidas
  const totalRecibidasNoRespondidas = recibidas?.data?.filter(
    (item) => item.fecha_respuesta && item.estado === "en_revision",
  )?.length;
  //Elaboradas no enviadas
  const totalElaboradasNoEnviadas = elaboradas?.data?.filter(
    (item) => item.estado === "aprobado",
  )?.length;

  const totalElaboradas = elaboradas?.data.length || 0;

  const pendientesEnviadas =
    elaboradas?.results?.filter(
      (item) => item.estado !== "borrador" || item.estado === "pendiente",
    ).length || 0;

  //Componente de tarjeta
  const StatCard = ({ icon, title, value, color, bgColor }) => (
    <div
      className={`${bgColor} rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className={`${color} text-sm font-medium mb-1`}>{title}</div>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
        </div>
        <div className={`${color} text-4xl opacity-80`}>{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header -    flex convierte el contenedor en flexbox los hijo se colocan horizontalmente
                          justify-between hace que los elementos se pongan uno al lado de otro*/}
      <div className="flex justify-between items-center mb-8">
        {/*Div principal*/}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard de Correspondencia
          </h1>
          <p className="text-gray-600">
            Vista general de la gestión documental
          </p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg border-4 border-red-800">
          <div className="text-2xl font-bold text-red-800">
            <div className="text-sm text-gray-600 ">
              Siguiente Nro. registro
            </div>
            {/* Llamarlo como un componente...!!! */}
            <p>{registroQuery.data?.siguiente}</p>
          </div>
        </div>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<FaInbox />}
          title="Correspondencia Recibida"
          value={totalRecibidas}
          color="text-[rgba(10,89,92,0.9)]"
          bgColor="bg-white"
        />

        <StatCard
          icon={<FaPaperPlane />}
          title="Correspondencia Externa"
          value={totalEnviadasExternas}
          color="text-[rgba(10,89,92,0.9)]"
          bgColor="bg-white"
        />
        <StatCard
          icon={<FaPaperPlane />}
          title="Enviadas Internas"
          value={totalEnviadasInternas}
          color="text-[rgba(10,89,92,0.9)]"
          bgColor="bg-white"
        />

        <StatCard
          icon={<FaClock />}
          title="Pendientes por Responder"
          value={totalRecibidasNoRespondidas}
          color="text-[rgba(10,89,92,0.9)]"
          bgColor="bg-white"
        />

        <StatCard
          icon={<FaExclamationTriangle />}
          title="Pendientes por Enviar"
          value={totalElaboradasNoEnviadas}
          color="text-[rgba(10,89,92,0.9)]"
          bgColor="bg-white"
        />

        <StatCard
          icon={<FaCheckCircle />}
          title="Total Documentos"
          value={totalRecibidas + totalEnviadasExternas + totalEnviadasInternas}
          color="text-[rgba(10,89,92,0.9)]"
          bgColor="bg-white"
        />

        <StatCard
          icon={<FaFileAlt />}
          title="Documentos Elaborados"
          value={totalElaboradas}
          color="text-[rgba(10,89,92,0.9)]"
          bgColor="bg-white"
        />
      </div>

      {/* Sección adicional - Resumen */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Resumen de Actividad
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {totalRecibidas}
            </div>
            <div className="text-sm text-gray-600">Documentos Recibidos</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {totalEnviadasExternas + totalEnviadasInternas}
            </div>
            <div className="text-sm text-gray-600">Documentos Enviados</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {totalElaboradas}
            </div>
            <div className="text-sm text-gray-600">Documentos Procesados</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
