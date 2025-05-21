import { getPostList } from '@/utils/getPosts'
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const posts = getPostList();

  return (

    <main className="min-h-screen bg-[#0f1e1e] text-[#c7e1d6] p-6">
      <h1 className="text-4xl font-bold text-[#e3fcec] mb-8 text-center">
        記事一覧
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="p-6 rounded-lg bg-[#1f2d2d] hover:bg-[#253838] transition duration-300"
          >
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-semibold text-[#82c8a0] hover:underline">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1">{post.date}</p>
              <p className="text-[#c7e1d6] mt-3">{post.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
