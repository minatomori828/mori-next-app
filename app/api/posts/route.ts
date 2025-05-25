import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('投稿データ', data);
    const { title, date, description, tags, content, uid } = data;

    if (!title || !content || !uid) {
      console.error('⚠️ 不正な投稿データ:', { title, content, uid });
      return NextResponse.json({ error: '必須項目が足りません' }, { status: 400 });
    }

    const docRef = await adminDb.collection('posts').add({
      title,
      date,
      description,
      tags,
      content,
      uid,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ message: '記事を保存しました', id: docRef.id }, { status: 200 });
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('🔥 投稿APIサーバーエラー:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    console.error('🔥 未知のエラー:', error);
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }
}

}
