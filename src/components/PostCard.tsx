import Link from 'next/link';
import { PostData } from '@/types/PostData';

export default function PostCard({ post }: { post: PostData }) {
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
      <div className="bg-[#1f2d2d] rounded-lg shadow-md p-6 hover:bg-[#253838] transition">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/posts/${post.slug}`} className="block">
            <h2 className="text-2xl font-semibold text-[#82c8a0] hover:underline">
              {post.title}
            </h2>
          </Link>
          <button className="ml-4 text-sm bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700">
            ★ ブックマーク
          </button>
        </div>

        {/* ✅ 日付表示 */}
        {post.date && (
          <p className="text-sm text-gray-400 mb-2">
            {(() => {
              try {
                console.log('post.date:', post.date);
                // `post.date` が文字列の場合は Date オブジェクトに変換
                const parsedDate =
                  typeof post.date === 'string' ? new Date(post.date) : post.date;

                // `parsedDate` が有効な Date オブジェクトか確認
                if (isNaN(parsedDate.getTime())) {
                  throw new Error('Invalid date');
                }

                // 日付をフォーマットして表示
                return parsedDate.toLocaleDateString('ja-JP');
              } catch {
                // 無効な日付の場合のフォールバック
                return '日付不明';
              }
            })()}
          </p>
        )}

        {/* ✅ 説明文 */}
        {post.description && (
          <p className="text-[#c7e1d6] mb-4">{post.description}</p>
        )}

        {/* ✅ タグ表示 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap justify-end gap-2">
            {post.tags.map((tag) => (
              <Link
                href={`/tags/${tag}`}
                key={tag}
                className="text-green-400 text-xs bg-[#2d3d3d] px-2 py-1 rounded hover:underline"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
