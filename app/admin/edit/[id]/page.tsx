'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // 投稿の読み込み
  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
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
      } catch (error) {
        console.error('投稿取得エラー:', error);
        alert('投稿の読み込みに失敗しました');
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'posts', postId!);
      await updateDoc(docRef, {
        title,
        date,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        content,
        updatedAt: new Date(),
      });

      alert('更新完了！');
      router.push('/admin');
    } catch (error) {
      console.error('更新失敗:', error);
      alert('更新に失敗しました');
    }
  };

  if (loading) return <p className="text-white p-6">読み込み中...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">記事編集</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded"
        />
        <input
          type="text"
          placeholder="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded"
        />
        <input
          type="text"
          placeholder="タグ（カンマ区切り）"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded"
        />
        <textarea
          placeholder="本文"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 h-40 bg-gray-800 rounded"
        />
        <button type="submit" className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700">
          保存
        </button>
      </form>
    </div>
  );
}
