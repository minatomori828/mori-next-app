// types/PostData.ts
export interface PostData {
  slug: string;
  title: string;
  date?: string | Date; // 日付は文字列または Date オブジェクト
  description?: string;
  tags?: string[];
}
