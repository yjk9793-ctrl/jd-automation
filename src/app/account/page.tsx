'use client';

import { useEffect, useState } from 'react';

export default function AccountPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/analysis/list');
      if (res.ok) {
        const json = await res.json();
        if (json.success) setItems(json.items);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="container-custom px-4 py-10 text-white">
      <h1 className="text-2xl font-bold mb-4">내 분석 기록</h1>
      {loading ? (
        <p className="text-gray-400">로딩 중...</p>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.id} className="p-4 bg-dark-800 border border-dark-700 rounded-lg">
              <div className="text-sm text-gray-400">{new Date(it.createdAt).toLocaleString()}</div>
              <div className="font-semibold">{it.type}</div>
            </div>
          ))}
          {items.length === 0 && <p className="text-gray-400">분석 기록이 없습니다.</p>}
        </div>
      )}
    </div>
  );
}



