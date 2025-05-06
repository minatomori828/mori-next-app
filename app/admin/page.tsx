'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout';

export default function AdminPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     // 🔒 タイトルが空だと保存できないようにガード
  if (!title.trim()) {
    alert('タイトルは必須です');
    return;
  }
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        date,
        description,
        tags: tags.split(',').map((t) => t.trim()),
        content,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      alert('投稿に成功しました');
      router.push('/'); // ✅ 投稿後に遷移
    } else {
      alert('エラー: ' + result.error);
    }
  };

  return (
    <Layout>
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
    </Layout>
  );
}