// app/tags/[tag]/page.tsx
import { getPostList } from '@/utils/getPosts';
import Link from 'next/link';

type Props = {
  params: { tag: string };
};

export default function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostList().filter((post) =>
    post.tags?.includes(tag)
  );

  return (
      <main className="min-h-screen bg-[#0f1e1e] text-[#c7e1d6] p-6">
        <h1 className="text-3xl font-bold text-[#e3fcec] mb-6">
          タグ: <span className="text-green-400">#{tag}</span>
        </h1>

        {posts.length === 0 ? (
          <p>このタグに一致する記事は見つかりませんでした。</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.slug} className="bg-[#1f2d2d] p-4 rounded-lg hover:bg-[#253838] transition">
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-xl font-bold text-[#82c8a0] hover:underline">{post.title}</h2>
                  <p className="text-sm text-gray-400">{post.date}</p>
                  <p className="text-[#c7e1d6] mt-2">{post.description}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
  );
}
