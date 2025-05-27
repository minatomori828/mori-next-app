// app/tags/[tag]/page.jsx
import { getPostsByTag } from '@/utils/getPostsByTag';
import { getAllTags } from '@/utils/getAllTags';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag }));
}

export default function TagPageWrapper({ params }) {
  return <TagPage params={params} />;
}

async function TagPage({ params }) {
  const posts = await getPostsByTag(params.tag);

  if (!posts || posts.length === 0) {
    return <div>該当する記事がありませんでした。</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">#{params.tag} の記事一覧</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="bg-gray-800 p-4 rounded">
            <a href={`/posts/${post.slug}`} className="text-xl text-blue-400 hover:underline">
              {post.title}
            </a>
            <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString('ja-JP')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
