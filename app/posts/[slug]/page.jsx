// app/posts/[slug]/page.jsx
import { getPostBySlug } from '@/utils/getPostBySlug';
import { getAllSlugs } from '@/utils/getAllSlugs';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function PostDetailPageWrapper({ params }) {
  return <PostDetailPage params={params} />;
}

async function PostDetailPage(props) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <div>記事が見つかりませんでした。</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <article className="bg-[#1f2d2d] p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-[#e3fcec]">{post.title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span key={tag} className="bg-gray-700 text-sm text-white px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            <button className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              ★ ブックマーク
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          {new Date(post.date).toLocaleDateString('ja-JP')}
        </p>

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
