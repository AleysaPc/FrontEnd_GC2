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

import { Link } from "react-router-dom";

function Home() {
  // Para sello
  const { registroQuery, handleGenerarNroSiguiente } = useSello();
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
      className={`${bgColor} rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition duration-300`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h3 className="text-4xl font-bold mt-2 text-gray-900">{value}</h3>
        </div>

        <div className={`${color} text-5xl opacity-80`}>{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
           Bienvenido
          </h1>
          <p className="text-gray-600 mt-1">
            Resumen general de la gestión documental
          </p>
        </div>

        <button
          onClick={handleGenerarNroSiguiente}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg px-8 py-5 hover:scale-105 transition"
        >
          <div className="text-sm opacity-90">Próximo N° de Registro</div>

          <div className="text-3xl font-bold">
            {registroQuery.data?.siguiente || "---"}
          </div>
        </button>
      </div>

      {/* TARJETAS KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Link to="/correspondenciaRecibidaList">
          <StatCard
            icon={<FaInbox />}
            title="Recibida"
            value={totalRecibidas}
            color="text-blue-600"
            bgColor="bg-white"
          />
        </Link>

        <Link to="/correspondenciaEnviadaList">
          <StatCard
            icon={<FaPaperPlane />}
            title="Enviadas Externas"
            value={totalEnviadasExternas}
            color="text-green-600"
            bgColor="bg-white"
          />
        </Link>

        <Link to="/correspondenciaEnviadaListInternal">
          <StatCard
            icon={<FaPaperPlane />}
            title="Enviadas Internas"
            value={totalEnviadasInternas}
            color="text-purple-600"
            bgColor="bg-white"
          />
        </Link>

        <StatCard
          icon={<FaClock />}
          title="Elaboradas"
          value={totalElaboradas}
          color="text-orange-600"
          bgColor="bg-white"
        />
      </div>

      {/* CORRESPONDENCIAS + TAREAS */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        {/* CORRESPONDENCIAS RECIBIDAS */}
        <div className="xl:col-span-3 bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Últimas Correspondencias Recibidas
            </h2>

            <Link
              to="/correspondenciaRecibidaList"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Ver todas →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Registro
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Referencia
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Remitente
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Prioridad
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recibidas?.data?.slice(0, 5)?.map((item) => (
                  <tr
                    key={item.id_correspondencia}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {item.nro_registro}
                    </td>

                    <td className="px-4 py-3">{item.referencia}</td>

                    <td className="px-4 py-3">
                      {item.datos_contacto || "Sin remitente"}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.prioridad === "alta"
                            ? "bg-red-100 text-red-700"
                            : item.prioridad === "media"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.prioridad}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TAREAS PENDIENTES */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Tareas Pendientes</h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-700">Por responder</span>

              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
                {totalRecibidasNoRespondidas}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-700">Por enviar</span>

              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
                {totalElaboradasNoEnviadas}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total documentos</span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                {totalRecibidas + totalEnviadasExternas + totalEnviadasInternas}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ACCESOS RAPIDOS */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Accesos Rápidos</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link
            to="/correspondenciaRecibidaList"
            className="p-4 rounded-lg border hover:bg-blue-50 transition"
          >
            <FaInbox className="text-3xl text-blue-600 mb-2" />
            <div className="font-medium">Recibidas</div>
          </Link>

          <Link
            to="/correspondenciaEnviadaList"
            className="p-4 rounded-lg border hover:bg-green-50 transition"
          >
            <FaPaperPlane className="text-3xl text-green-600 mb-2" />
            <div className="font-medium">Externas</div>
          </Link>

          <Link
            to="/correspondenciaEnviadaListInternal"
            className="p-4 rounded-lg border hover:bg-purple-50 transition"
          >
            <FaPaperPlane className="text-3xl text-purple-600 mb-2" />
            <div className="font-medium">Internas</div>
          </Link>

          <div className="p-4 rounded-lg border">
            <FaFileAlt className="text-3xl text-gray-600 mb-2" />
            <div className="font-medium">Documentos</div>
          </div>

          <div className="p-4 rounded-lg border">
            <FaCheckCircle className="text-3xl text-emerald-600 mb-2" />
            <div className="font-medium">Procesados</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
