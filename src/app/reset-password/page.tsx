'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [regenerateTwoFactor, setRegenerateTwoFactor] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password, regenerateTwoFactor }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
      setTimeout(() => router.push('/login'), 2000);
    } else {
      setError(data.error);
    }
  };

  if (!token) {
    return <div>Invalid reset link</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <input
              id="regenerateTwoFactor"
              name="regenerateTwoFactor"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={regenerateTwoFactor}
              onChange={(e) => setRegenerateTwoFactor(e.target.checked)}
            />
            <label htmlFor="regenerateTwoFactor" className="ml-2 block text-sm text-gray-900">
              Regenerate 2FA secret and backup codes
            </label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}