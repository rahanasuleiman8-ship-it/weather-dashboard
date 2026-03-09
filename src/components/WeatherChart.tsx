import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { HourlyData } from '../types/weather';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

interface Props {
  data: HourlyData;
}

const WeatherChart: React.FC<Props> = ({ data }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: 'rgba(255,255,255,0.8)', font: { size: 12 } } },
    },
    scales: {
      x: { ticks: { color: 'rgba(255,255,255,0.6)' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: 'rgba(255,255,255,0.6)' }, grid: { color: 'rgba(255,255,255,0.1)' } },
    },
  };

  const tempChartData = {
    labels: data.time,
    datasets: [{
      label: 'Temperature (°C)',
      data: data.temperature,
      borderColor: 'rgba(255,255,255,0.9)',
      backgroundColor: 'rgba(255,255,255,0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'white',
      pointRadius: 4,
    }],
  };

  const humidityChartData = {
    labels: data.time,
    datasets: [{
      label: 'Humidity (%)',
      data: data.humidity,
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderColor: 'rgba(255,255,255,0.6)',
      borderWidth: 1,
      borderRadius: 6,
    }],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
        <h3 className="text-white font-semibold mb-4">🌡️ Temperature (Next 12h)</h3>
        <Line data={tempChartData} options={chartOptions} />
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
        <h3 className="text-white font-semibold mb-4">💧 Humidity (Next 12h)</h3>
        <Bar data={humidityChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default WeatherChart;