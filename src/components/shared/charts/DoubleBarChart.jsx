import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DoubleBarChart = ({ data, title }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      {title && (
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {title}
        </h3>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="tipo"
            stroke="#6b7280"
            fontSize={12}
          />

          <YAxis
            stroke="#6b7280"
            fontSize={12}
          />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="internos"
            name="Internos"
            fill="#3b82f6"
          />

          <Bar
            dataKey="externos"
            name="Externos"
            fill="#10b981"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoubleBarChart;