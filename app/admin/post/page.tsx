'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth } from '@/lib/firebase';




export default function PostPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
console.log("✅ 現在のログインユーザー:", auth.currentUser);
}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== 'minatomori828@gmail.com') {
        alert('ログインが必要です');
        router.push('/login');
        return;
      }
      setAuthorized(true);
      setChecking(false);
    });


    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getAuth().currentUser;
    if (!user) {
      alert('認証情報が取得できませんでした');
      return;
    }

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        date,
        description,
        tags: tags.split(',').map((t) => t.trim()),
        content,
        uid: user.uid, // 🔥 これを一緒に送る
      }),
    });

    try {
      const result = await res.json();
      if (res.ok) {
        alert('投稿に成功しました');
        router.push('/admin');
      } else {
        alert('エラー: ' + result.error);
      }
    } catch {
      alert('サーバーからの応答が正しくありませんでした');
    }
  };

  if (checking) return <p className="text-white p-6">認証確認中...</p>;
  if (!authorized) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">記事投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 bg-gray-800 rounded" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 bg-gray-800 rounded" />
        <input type="text" placeholder="説明" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 bg-gray-800 rounded" />
        <input type="text" placeholder="タグ（カンマ区切り）" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-2 bg-gray-800 rounded" />
        <textarea placeholder="本文" value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 h-40 bg-gray-800 rounded" />
        <button type="submit" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">投稿</button>
      </form>
    </div>
  );
}
