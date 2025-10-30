'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { id: string; email: string; name?: string }) => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: mode === 'register' ? name : undefined }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'failed');
      onAuthSuccess(json.data);
      onClose();
    } catch (err: any) {
      setError(err.message || '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="w-full max-w-md rounded-xl bg-dark-800 border border-dark-700 p-6"
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                {mode === 'login' ? '로그인' : '회원가입'}
              </h3>
              <button className="text-gray-400 hover:text-white" onClick={onClose}>✕</button>
            </div>
            <div className="flex space-x-2 mb-4">
              <button onClick={() => setMode('login')} className={`px-3 py-1 rounded-md ${mode==='login'?'bg-primary-600 text-white':'text-gray-400 border border-dark-600'}`}>로그인</button>
              <button onClick={() => setMode('register')} className={`px-3 py-1 rounded-md ${mode==='register'?'bg-primary-600 text-white':'text-gray-400 border border-dark-600'}`}>회원가입</button>
            </div>
            <form onSubmit={submit} className="space-y-3">
              {mode === 'register' && (
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="이름" className="w-full px-3 py-2 rounded-md bg-dark-700 border border-dark-600 text-white" />
              )}
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="이메일" className="w-full px-3 py-2 rounded-md bg-dark-700 border border-dark-600 text-white" required />
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="비밀번호" className="w-full px-3 py-2 rounded-md bg-dark-700 border border-dark-600 text-white" required />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full py-2 rounded-md disabled:opacity-60">
                {loading ? '처리 중...' : (mode==='login'?'로그인':'회원가입')}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


