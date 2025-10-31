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
            
            {/* Google Login */}
            <div className="mt-4">
              <div className="relative flex items-center my-4">
                <div className="flex-1 border-t border-dark-600"></div>
                <span className="px-2 text-sm text-gray-400">또는</span>
                <div className="flex-1 border-t border-dark-600"></div>
              </div>
              <button
                type="button"
                onClick={() => window.location.href = '/api/auth/oauth/google/start'}
                className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>구글로 로그인</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


