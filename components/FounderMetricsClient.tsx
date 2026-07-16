"use client";
import { useState } from 'react';
import FounderCharts from './FounderCharts';

export default function FounderMetricsClient({ initialData, defaultStart, defaultEnd } : { initialData: any, defaultStart?: string, defaultEnd?: string }){
  const [data, setData] = useState(initialData);
  const [start, setStart] = useState(defaultStart || '');
  const [end, setEnd] = useState(defaultEnd || '');
  const [loading, setLoading] = useState(false);

  async function fetchRange(s: string, e: string){
    setLoading(true);
    try{
      const res = await fetch(`/api/founder/metrics-range?start=${encodeURIComponent(s)}&end=${encodeURIComponent(e)}`, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('fetch failed');
      const json = await res.json();
      setData(json);
    }catch(err){
      console.error(err);
    }finally{ setLoading(false); }
  }

  return (
    <div>
      <div className="flex gap-2 items-center mb-4">
        <label className="text-sm text-gray-600">Start</label>
        <input type="date" value={start} onChange={(e)=>setStart(e.target.value)} className="border rounded px-2 py-1" />
        <label className="text-sm text-gray-600">End</label>
        <input type="date" value={end} onChange={(e)=>setEnd(e.target.value)} className="border rounded px-2 py-1" />
        <button disabled={loading||!start||!end} onClick={()=>fetchRange(start,end)} className="ml-2 bg-purple-600 text-white px-3 py-1 rounded">Apply</button>
      </div>

      <div>
        <FounderCharts timeSeries={data.timeSeries || []} topReferrers={data.topReferrers || []} />

        <div className="bg-white rounded-xl shadow p-4 mt-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500">Sessions</div>
              <div className="font-bold text-xl">{data.sessionsStarted}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Completions</div>
              <div className="font-bold text-xl">{data.completionsCount}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Conversion</div>
              <div className="font-bold text-xl">{(data.conversionRate*100||0).toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Rewards</div>
              <div className="font-bold text-xl">${(data.totalRewards||0).toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mt-4">
          <h4 className="font-semibold mb-2">Top UTM Sources</h4>
          <ul className="space-y-1">
            {(data.utmSources||[]).map((u:any)=> (
              <li key={u.utmSource||'direct'} className="flex justify-between"><div>{u.utmSource||'Direct'}</div><div className="text-sm text-gray-600">{u._count.utmSource}</div></li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mt-4">
          <h4 className="font-semibold mb-2">Per-Fundraiser</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500"><th>Fundraiser</th><th>Completions</th><th>Revenue</th></tr>
              </thead>
              <tbody>
                {(data.perFund||[]).map((p:any)=> (
                  <tr key={p.fundraiserId} className="border-t"><td>{p.title}</td><td>{p.completions}</td><td>${p.revenue.toFixed(2)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
