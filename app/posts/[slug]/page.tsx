import { getPostBySlug } from '@/utils/getPostBySlug';
import { getAllSlugs } from '@/utils/getAllSlugs';

interface PageProps {
  params: {
    slug: string;
  };
}

<<<<<<< HEAD
// 静的パス生成（事前ビルド対応）
export async function generateStaticParams(): Promise<PageProps["params"][]> {
=======
// 静的パス生成
export async function generateStaticParams() {
>>>>>>> 5fb4c87 (Fix: wrap PostDetailPage with non-async default export)
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

<<<<<<< HEAD
export default async function PostDetailPage({ params }: PageProps) {
=======
// ラッパー関数（default export）で props を受け取る
export default function PostDetailPageWrapper(props: Props) {
  return <PostDetailPage {...props} />;
}

// 本体の async 関数（default exportではない）
async function PostDetailPage({ params }: Props) {
>>>>>>> 5fb4c87 (Fix: wrap PostDetailPage with non-async default export)
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <div>記事が見つかりませんでした。</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <article className="bg-[#1f2d2d] p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-[#e3fcec]">{post.title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
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
