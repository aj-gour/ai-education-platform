import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Bar } from "react-chartjs-2";

export default function Chart({ scores }) {
  const data = {
    labels: scores.map((_, i) => `Quiz ${i + 1}`),
    datasets: [
      {
        label: "Performance",
        data: scores,
        backgroundColor: "#3b82f6",
        borderRadius: 8,
        barThickness: 30
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar data={data} options={options} />;
}