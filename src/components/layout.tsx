import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
    <header className="bg-[#1f2d2d] text-[#e3fcec] shadow-md">
  <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
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


      <main className="flex-grow container mx-auto py-8 px-4">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} 技術ブログ</p>
        </div>
      </footer>
    </div>
  );
}
