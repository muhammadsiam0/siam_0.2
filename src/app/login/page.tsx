'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [backupCode, setBackupCode] = useState('');
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      if (data.requiresTwoFactor) {
        setRequiresTwoFactor(true);
        setUserId(data.userId);
      } else {
        document.cookie = `token=${data.token}; path=/`;
        router.push('/dashboard');
      }
    } else {
      setError(data.error);
    }
  };

  const handleTwoFactor = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/verify-2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, token: twoFactorToken, backupCode }),
    });

    const data = await res.json();
    if (res.ok) {
      document.cookie = `token=${data.token}; path=/`;
      router.push('/dashboard');
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={requiresTwoFactor ? handleTwoFactor : handleLogin}>
          {!requiresTwoFactor ? (
            <>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="twoFactorToken" className="sr-only">2FA Token</label>
                <input
                  id="twoFactorToken"
                  name="twoFactorToken"
                  type="text"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="2FA Token"
                  value={twoFactorToken}
                  onChange={(e) => setTwoFactorToken(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="backupCode" className="sr-only">Backup Code</label>
                <input
                  id="backupCode"
                  name="backupCode"
                  type="text"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Backup Code (optional)"
                  value={backupCode}
                  onChange={(e) => setBackupCode(e.target.value)}
                />
              </div>
            </>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {requiresTwoFactor ? 'Verify 2FA' : 'Sign in'}
            </button>
          </div>
          {!requiresTwoFactor && (
            <div className="text-center">
              <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          )}
          {!requiresTwoFactor && (
            <div className="text-center">
              <a href="/register" className="text-indigo-600 hover:text-indigo-500">
                Don't have an account? Sign up
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}