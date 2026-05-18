import CustomLineChart from "../components/shared/charts/LineChart";
import MultiLineChart from "../components/shared/charts/MultiLineChart";
import CustomPieChart from "../components/shared/charts/PieChart";
import CustomBarChart from "../components/shared/charts/BarChart";
import CustomAreaChart from "../components/shared/charts/AreaChart";
import StackedBarChart from "../components/shared/charts/StackedBarChart";
import StatCard from "../components/shared/charts/StatCard";
import { useQuery } from "@tanstack/react-query"; //Query es como un robot asistente, pide y guarda datos, sabe cuando se carga o hay un error y se actualiza
import { createApiInstance } from "../api/api.Base";
import { useState } from "react"

const api = createApiInstance();

const Dashboard = () => {
  //Componente principal
  const [dias, setDias] = useState(7);

  const obtenerEstadisticas = async () => {
    //axios hace la petición
    const { data } = await api.get((`/correspondencia/estadisticas/?dias=${dias}`),
    );
    return data;
  };

  // Obtener datos reales del backend
  const {
    data: estadisticas, //datos del servidor
    isLoading, //estado de carga
    error, //estado de error
  } = useQuery({
    queryKey: ["estadisticas-dashboard", dias],
    queryFn: obtenerEstadisticas,
    refetchInterval: 60000, // Refrescar cada minuto
  });

  (console.log("Datos", estadisticas), console.log("ERROR:", error));
  console.log("LOADING:", isLoading);

  if (isLoading) return <div className="p-6">Cargando estadísticas...</div>;
  if (error)
    return <div className="p-6 text-red-600">Error al cargar estadísticas</div>;

  return (
    //min-h-screen  ocupa toda la pantalla | bg-gray-50 fondo gris clarito | p-6 padding de 6
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard General
          </h1>
          <p className="text-gray-600 mt-2">
            Estadísticas en tiempo real del sistema
          </p>
        </div>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <StatCard //Cajitas con información rápida
            title="Tiempo Promedio Respuesta"
            value={`${estadisticas.tiempo_promedio_respuesta}h`}
            subtitle="Última semana"
            color="blue"
          />
          <StatCard
            title="Tiempo Búsqueda Semántica"
            value={`${estadisticas.tiempo_busqueda}s`}
            subtitle="Promedio"
            color="green"
          />
          <StatCard
            title="Día Mayor Actividad"
            value={estadisticas.dias_mayor_actividad?.[0]?.dia || "N/A"}
            subtitle={`${estadisticas.dias_mayor_actividad?.[0]?.cantidad || 0} documentos`}
            color="purple"
          />
          <StatCard
            title="Rendimiento Búsqueda"
            value={`${estadisticas.rendimiento_busqueda}%`}
            subtitle="Exitosas"
            color="orange"
          />
        </div>

        {/* Gráficas de Correspondencia */}
        <div className="mb-8">
          <select
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              className="border rounded bg-slate-800 text-white p-2 mb-4"
            >
              <option value="7">7 días</option>
              <option value="30">30 días</option>
              <option value="90">90 días</option>
            </select>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomLineChart
              data={estadisticas.recibida_semanal}
              dataKey="cantidad"
              nameKey="semana"
              title="📥 Correspondencia Recibida Semanal"
              color="#3b82f6"
            />
            <CustomLineChart
              data={estadisticas.enviada_semanal}
              dataKey="cantidad"
              nameKey="semana"
              title="📤 Correspondencia Enviada Semanal"
              color="#10b981"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6">
            <MultiLineChart
              data={estadisticas.recibida_vs_enviada}
              lines={[
                { dataKey: "recibida", name: "Recibida" },
                { dataKey: "enviada", name: "Enviada" },
              ]}
              title="📊 Correspondencia Recibida vs Enviada"
            />
            <CustomAreaChart
              data={estadisticas.flujo_mensual}
              dataKey="cantidad"
              nameKey="mes"
              title="📅 Flujo Mensual de Correspondencia"
              color="#8b5cf6"
            />
          </div>
        </div>

        {/* Gráficas de Documentos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📄 Documentos
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomPieChart
              data={estadisticas?.estado_documentos}
              title="🥧 Estado de Documentos"
            />
            <CustomPieChart
              data={estadisticas.pendientes_atrasados}
              title="⚠️ Documentos Pendientes y Atrasados"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6">
            <CustomBarChart
              data={estadisticas.tipos_documentos}
              dataKey="cantidad"
              nameKey="tipo"
              title="📂 Tipos de Documentos"
              color="#f59e0b"
            />
            <StackedBarChart
              data={estadisticas.procesados_por_dia}
              bars={[
                { dataKey: "procesados", name: "Procesados" },
                { dataKey: "pendientes", name: "Pendientes" },
              ]}
              title="📄 Documentos Procesados por Día"
            />
          </div>
        </div>

        {/* Gráficas de Búsqueda */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 Búsqueda</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomPieChart
              data={estadisticas.busquedas_exitosas_sin_resultados}
              title="🧠 Búsquedas Exitosas vs Sin Resultados"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
