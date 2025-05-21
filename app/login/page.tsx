'use client';

import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('ログイン成功:', user.displayName);
      router.push('/admin');
    } catch (error) {
      console.error('ログイン失敗:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-xl font-bold mb-4">ログイン</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Googleでログイン
      </button>
    </main>
  );
}
