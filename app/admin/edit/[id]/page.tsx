'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams(); // URLの[id]
  const postId = id as string;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  // 投稿の読み込み
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title || '');
        setDate(data.date || '');
        setDescription(data.description || '');
        setTags((data.tags || []).join(', '));
        setContent(data.content || '');
      } else {
        alert('記事が見つかりません');
        router.push('/admin');
      }
    };

    fetchPost();
  }, [postId, router]);

  // 🔧 保存処理
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'posts', postId);
      await updateDoc(docRef, {
        title,
        date,
        description,
        tags: tags.split(',').map((tag) => tag.trim()),
        content,
        updatedAt: new Date(),
      });

      alert('更新完了！');
      router.push('/admin');
    } catch (err) {
      alert('更新に失敗しました');
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">記事編集</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" className="w-full p-2 bg-gray-800 rounded" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 bg-gray-800 rounded" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="説明" className="w-full p-2 bg-gray-800 rounded" />
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="タグ（カンマ区切り）" className="w-full p-2 bg-gray-800 rounded" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="本文" className="w-full p-2 h-40 bg-gray-800 rounded" />
        <button type="submit" className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700">保存</button>
      </form>
    </div>
  );
}
