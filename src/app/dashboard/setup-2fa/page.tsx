'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Setup2FA() {
  const [qrCode, setQrCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSetup = async () => {
    setLoading(true);
    setError('');

    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    const res = await fetch('/api/auth/setup-2fa', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (res.ok) {
      setQrCode(data.qrCodeDataURL);
      setBackupCodes(data.backupCodes);
    } else {
      setError(data.error);
    }
    setLoading(false);
  };

  const handleContinue = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set up Two-Factor Authentication
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Scan the QR code with your authenticator app and save your backup codes.
          </p>
        </div>

        {!qrCode && (
          <div className="text-center">
            <button
              onClick={handleSetup}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {loading ? 'Setting up...' : 'Set up 2FA'}
            </button>
          </div>
        )}

        {qrCode && (
          <div className="space-y-6">
            <div className="text-center">
              <Image src={qrCode} alt="QR Code" width={200} height={200} className="mx-auto" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Backup Codes</h3>
              <p className="text-sm text-gray-600 mb-2">
                Save these codes in a safe place. Each code can be used only once.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {backupCodes.map((code, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded text-center font-mono text-sm">
                    {code}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handleContinue}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}