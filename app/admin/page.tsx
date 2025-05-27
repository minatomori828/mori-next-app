'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';


export default function AdminDashboard() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [checking, setChecking] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (
        !user ||
        (user.email !== 'minatomori828@gmail.com' && user.email !== 'minato.sjh@gmail.com')
        ) {
        alert('アクセス権限がありません');
        router.push('/login');
        return; 
        }

            setAuthorized(true);
            setChecking(false);
        });

        return () => unsubscribe();
    }, [router]);


    if (checking) return <p className="p-6 text-white">確認中...</p>;
    if (!authorized) return null;

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
                {/* 将来的に追加できるボタンたち */}
                {/* <button>📋 投稿編集</button> */}
                

<button
  onClick={() => router.push('/admin/edit')}
  className="block w-full text-left px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
>
  ✏️ 投稿編集
</button>

                {/* <button>⚙️ 設定</button> */}
            </div>
        </div>
    );
}
