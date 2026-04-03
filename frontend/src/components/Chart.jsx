import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { Line } from "react-chartjs-2";

export default function Chart({ scores }) {
  const data = {
    labels: scores.map((_, i) => `Quiz ${i + 1}`),
    datasets: [
      {
        label: "Performance",
        data: scores,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4
      },
    ],
  };

  return <Line data={data} />;
}