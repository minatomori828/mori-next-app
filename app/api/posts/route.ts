import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin'; // Firebase Admin SDK
import { Timestamp } from 'firebase-admin/firestore'; // ←ここは Admin SDK の Timestamp

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, date, description, tags, content, uid } = data;

    if (!title || !content || !uid) {
      return NextResponse.json({ error: '必須項目が足りません' }, { status: 400 });
    }

    const docRef = await adminDb.collection('posts').add({
      title,
      date,
      description,
      tags,
      content,
      uid,
      createdAt: Timestamp.now(), // ← Admin SDK のタイムスタンプ
    });

    return NextResponse.json({ message: '記事を保存しました', id: docRef.id }, { status: 200 });
  } catch (error: any) {
    console.error('投稿エラー:', error);
    return NextResponse.json({ error: error.message || 'サーバーエラー' }, { status: 500 });
  }
}
