import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

// GET: 特定の投稿を取得
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const docRef = doc(db, 'posts', params.id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return NextResponse.json({ error: '記事が存在しません' }, { status: 404 });
    }
    return NextResponse.json(snapshot.data(), { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '取得エラー' }, { status: 500 });
  }
}

// PUT: 特定の投稿を更新
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const { title, date, description, tags, content } = data;

    if (!title || !content) {
      return NextResponse.json({ error: 'タイトルと本文は必須です' }, { status: 400 });
    }

    const docRef = doc(db, 'posts', params.id);
    await updateDoc(docRef, {
      title,
      date,
      description,
      tags,
      content,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ message: '記事を更新しました' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '更新エラー' }, { status: 500 });
  }
}
