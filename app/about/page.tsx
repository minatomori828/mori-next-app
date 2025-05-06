// app/about/page.tsx
import React from 'react';
import Layout from '@/components/layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-6 text-[#82c8a0]">自己紹介</h1>

        <section className="space-y-5 leading-relaxed text-base">
          <p>
            はじめまして、森みなとと申します。現在はフロントエンド領域を中心に、
            React / Next.js を主軸とした技術の習得に励んでおります。
          </p>

          <p>
            当ブログは、職業訓練校の卒業課題としてだけでなく、学習記録の蓄積、継続的な機能改善・UI最適化を行っております。
            そのため、実際の業務に近い環境での開発を意識し、技術的な挑戦を続けています。
            実際の手触りや大手ブログサイトを設計や実装に反映しながら、実践的なスキルの定着を目指しています。
          </p>

          <p>
            今後の開発においては「誰が、どのように使うのか」という視点を重視し
            単なる動作だけでなく、操作感・視認性・導線設計など、体験として心地よいUI/UXを意識した実装を心がけています。
          </p>

          <p>
            実務経験はまだありませんが、技術の本質を理解し、使い手に価値を届けられる開発者を目指して、
            継続的な学習とアウトプットを積み重ねております。
          </p>

          <p>
            このポートフォリオでは、技術的な到達点のみならず、日々の試行錯誤や成長過程も含めてご覧いただけるよう構成しております。
            実務の中で経験を重ね、確かな力に昇華させていく姿勢をもって臨みます。何卒よろしくお願いいたします。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-[#e3fcec] mb-4">スキルセット</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>React / Next.js（学習・実装・継続改善）</li>
            <li>TypeScript / JavaScript（構文理解とUI実装経験）</li>
            <li>Tailwind CSS（効率的なスタイリングと設計）</li>
            <li>Git / GitHub（ブランチ管理・コード共有）</li>
            <li>Markdownベースの静的ブログ構築（技術記録・情報整理）</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
