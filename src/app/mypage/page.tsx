'use client';

import { useEffect, useState } from 'react';

export default function MyPage() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/analysis/my');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Unauthorized');
        setList(json.data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">내 분석 기록</h1>
      {loading && <p>불러오는 중...</p>}
      {error && <p className="text-red-400">{error}</p>}
      <div className="space-y-3">
        {list.map((item) => (
          <div key={item.id} className="p-4 border border-dark-700 rounded-lg bg-dark-800">
            <div className="text-sm text-gray-400 mb-2">{new Date(item.createdAt).toLocaleString()}</div>
            <pre className="text-xs whitespace-pre-wrap break-all text-gray-300">{JSON.stringify(item.data?.summary || item.data, null, 2)}</pre>
          </div>
        ))}
        {!loading && !error && list.length === 0 && <p className="text-gray-400">저장된 분석 결과가 없습니다.</p>}
      </div>
    </div>
  );
}


