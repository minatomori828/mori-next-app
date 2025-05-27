'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const allowedEmails = ['minatomori828@gmail.com', 'minato.sjh@gmail.com'];

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const email = user?.email || '';  // userがundefinedの場合は空文字

    console.log('ログインメール:', email);
    console.log('許可されているか:', allowedEmails.includes(email.trim().toLowerCase()));

    if (!user || !allowedEmails.includes(email.trim().toLowerCase())) {
      setAuthorized(false);
      setChecking(false);
      setTimeout(() => router.push('/login'), 1500);
      return;
    }

    setAuthorized(true);
    setChecking(false);
  });

  return () => unsubscribe();
}, [router]);

  // 認証確認中
  if (checking) return <p className="p-6 text-white">確認中...</p>;

  // 認可されていない場合
  if (!authorized)
    return <p className="p-6 text-white">アクセス権限がありません。ログインページにリダイレクトします...</p>;

  // 認可済みの場合の管理画面表示
  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">管理画面</h1>
      <p className="mb-4">いまやらねばいつできる わしがやらねばたれがやる</p>
      <p className="mb-4">不老　六十七十ははなたれこぞう　おとこざかりは百から百から　わしもこれからこれから</p>
      <div className="space-y-4">
        <button
          onClick={() => router.push('/admin/post')}
          className="block w-full text-left px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          📄 投稿
        </button>
        <button
          onClick={() => router.push('/admin/edit')}
          className="block w-full text-left px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          ✏️ 投稿編集
        </button>
      </div>
    </div>
  );
}

