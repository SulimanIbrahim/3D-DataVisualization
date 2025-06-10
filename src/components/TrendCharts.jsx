import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function TrendChart({ history }) {
  // Extract Hemoglobin trend for demo
  const labels = history.visits.map((v) => v.date);
  const hemoglobin = history.visits.map((v) => v.labs.Hemoglobin);

  const data = {
    labels,
    datasets: [
      {
        label: "Hemoglobin (g/dL)",
        data: hemoglobin,
        borderColor: "#2563eb",
        backgroundColor: "rgba(59,130,246,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white rounded shadow p-4 my-4">
      <h3 className="font-bold text-lg mb-2">Hemoglobin Trend</h3>
      <Line data={data} />
    </div>
  );
}