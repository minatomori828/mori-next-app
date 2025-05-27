// app/about/page.tsx
import React from 'react';


export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-[#82c8a0]">自己紹介</h1>

      <section className="space-y-5 leading-relaxed text-base">
        <p>
          はじめまして、森みなとと申します。React / Next.js を中心としたフロントエンド開発を学びながら、
          実践力のあるエンジニアを目指して日々取り組んでおります。
        </p>

        <p>
          このブログサイトは、職業訓練校での学びを起点に、「学習の定着」と「実務を想定した制作習慣」の両立を目的として構築しました。
        </p>

        <p>
          開発においては「誰が、どのように使うか」という視点を重視し、視認性・操作性・導線のわかりやすさを意識したUI/UX設計を大切にしています。
          手触りのよいプロダクトは、機能だけでなく体験としての価値が備わっているべきだと考えています。
          そのため、ユーザーの視点に立った設計を大切にし、実際の使用シーンを想像しながら開発を進めています。
        </p>

        <p>
          実務経験はありませんが、「技術力」と「ユーザー体験」の両面に向き合いながら、段階的な成長を積み重ねています。
          本サイトには、私の現在地と今後の伸びしろを込めています。
        </p>

        <p>
          学びを深めながら、より良いプロダクトを作りたいと思っています。
          どうぞよろしくお願いいたします。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-[#e3fcec] mb-4">使用技術と活用内容</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-600 text-sm text-left">
            <thead className="bg-[#1f2e25] text-[#a0ffce]">
              <tr>
                <th className="p-3 border border-gray-600">技術</th>
                <th className="p-3 border border-gray-600">活用内容</th>
                <th className="p-3 border border-gray-600">習得スキル</th>
              </tr>
            </thead>
            <tbody className="bg-[#0f1c18]">
              <tr>
                <td className="p-3 border border-gray-700">Next.js（App Router）</td>
                <td className="p-3 border border-gray-700">ルーティング構成、メタ設定、SSG対応</td>
                <td className="p-3 border border-gray-700">ページ構成力・静的サイト運用の理解</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-700">React</td>
                <td className="p-3 border border-gray-700">UIコンポーネントの分割、状態管理</td>
                <td className="p-3 border border-gray-700">保守性の高い設計と状態制御</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-700">TypeScript</td>
                <td className="p-3 border border-gray-700">propsの型定義、静的チェック</td>
                <td className="p-3 border border-gray-700">型安全な開発とバグ予防</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-700">Tailwind CSS</td>
                <td className="p-3 border border-gray-700">レスポンシブ対応、統一スタイリング</td>
                <td className="p-3 border border-gray-700">効率的なUI設計とデザイン実装</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-600">Firebase Authentication</td>
                <td className="px-4 py-2 border border-gray-600">Googleアカウントでの認証制御</td>
                <td className="px-4 py-2 border border-gray-600">セキュアなログインとアクセス制限の実装</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-600">Firebase Firestore</td>
                <td className="px-4 py-2 border border-gray-600">記事データの保存・取得</td>
                <td className="px-4 py-2 border border-gray-600">NoSQL型データ設計とクエリ操作</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-700">Git / GitHub</td>
                <td className="p-3 border border-gray-700">バージョン管理とコード公開</td>
                <td className="p-3 border border-gray-700">開発履歴の記録とコード共有の習慣</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
