"use client";
import { Line, Bar } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function FounderCharts({ timeSeries, topReferrers }: { timeSeries: { date: string; count: number }[]; topReferrers: { referrer: string | null; _count: { referrer: number } }[] }) {
  const labels = timeSeries.map((t) => t.date);
  const counts = timeSeries.map((t) => t.count);

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Survey Completions',
        data: counts,
        borderColor: 'rgba(99,102,241,1)',
        backgroundColor: 'rgba(99,102,241,0.2)',
        tension: 0.2,
      },
    ],
  };

  const barData = {
    labels: topReferrers.map((r) => r.referrer || 'Direct'),
    datasets: [
      {
        label: 'Referrals',
        data: topReferrers.map((r) => r._count.referrer),
        backgroundColor: 'rgba(34,197,94,0.8)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-4">
        <h4 className="font-semibold mb-2">Completions (last 30 days)</h4>
        <Line data={lineData} />
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h4 className="font-semibold mb-2">Top Referrers</h4>
        <Bar data={barData} />
      </div>
    </div>
  );
}
