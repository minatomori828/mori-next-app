import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, date, description, tags, content, uid } = data;

    if (!title || !content || !uid) {
      return NextResponse.json({ error: '必須項目が足りません' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'posts'), {
      title,
      date,
      description,
      tags,
      content,
      uid, // 🔥 ここに保存！
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ message: '記事を保存しました', id: docRef.id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'サーバーエラー' }, { status: 500 });
  }
}
