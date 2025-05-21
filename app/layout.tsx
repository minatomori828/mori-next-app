import './globals.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'ミナトの技術ブログ',
  description: '努力と魔法で前へ進む',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="flex flex-col min-h-screen bg-[#0f1e1e] text-[#c7e1d6]">

          {/* ヘッダー */}
          <header className="bg-[#1f2d2d] text-[#e3fcec] shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-[#82c8a0] hover:text-[#a6eec4]">
                技術ブログ
              </Link>
              <nav className="space-x-6 text-sm text-[#c7e1d6]">
                <Link href="/" className="hover:text-[#e3fcec]">ホーム</Link>
                <Link href="/about" className="hover:text-[#e3fcec]">自己紹介</Link>
                <Link href="/projects" className="hover:text-[#e3fcec]">プロジェクト</Link>
                <Link href="/admin" className="hover:text-[#e3fcec]">管理</Link>
              </nav>
            </div>
          </header>

          {/* メイン */}
          <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>

          {/* フッター */}
          <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 py-6 text-center">
              <p>© {new Date().getFullYear()} 技術ブログ</p>
            </div>
          </footer>

        </div>
      </body>
    </html>
  );
}
