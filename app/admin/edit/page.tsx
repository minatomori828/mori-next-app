'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

type Post = {
  id: string;
  title: string;
  uid: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
};

export default function EditPostListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert('ログインが必要です');
        router.push('/login');
        return;
      }

      try {
        const snapshot = await getDocs(collection(db, 'posts'));
        const data = snapshot.docs
          .map((doc) => {
            const docData = doc.data() as Omit<Post, 'id'>;
            return {
              id: doc.id,
              ...docData,
            };
          })
          .filter((post) => post.uid === user.uid);

        setPosts(data);
      } catch (error) {
        console.error('投稿の取得に失敗しました', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('この記事を削除しますか？');
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, 'posts', id));
      setPosts((prev) => prev.filter((post) => post.id !== id));
      alert('記事を削除しました');
    } catch (error) {
      console.error('削除に失敗しました', error);
      alert('削除に失敗しました');
    }
  };

  if (loading) return <p className="p-6 text-white">読み込み中...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-200">投稿編集一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition">
            <h2 className="text-2xl font-semibold text-blue-400 mb-1">{post.title}</h2>
            <p className="text-sm text-gray-400 mb-2">{post.date}</p>
            <p className="text-gray-200 mb-4 line-clamp-3">{post.description}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => router.push(`/admin/edit/${post.id}`)}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
