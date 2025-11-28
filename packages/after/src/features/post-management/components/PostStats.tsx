import React from 'react';

interface PostStatsProps {
  total: number;
  published: number;
  draft: number;
  archived: number;
  totalViews: number;
}

export const PostStats: React.FC<PostStatsProps> = ({ total, published, draft, archived, totalViews }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4">
      <div className="py-3 px-4 bg-blue-50 border border-blue-300 rounded">
        <div className="text-xs text-gray-600 mb-1">전체</div>
        <div className="text-2xl font-bold text-blue-700">{total}</div>
      </div>

      <div className="py-3 px-4 bg-green-50 border border-green-300 rounded">
        <div className="text-xs text-gray-600 mb-1">게시됨</div>
        <div className="text-2xl font-bold text-green-700">{published}</div>
      </div>

      <div className="py-3 px-4 bg-orange-50 border border-orange-300 rounded">
        <div className="text-xs text-gray-600 mb-1">임시저장</div>
        <div className="text-2xl font-bold text-orange-700">{draft}</div>
      </div>

      <div className="py-3 px-4 bg-red-50 border border-red-300 rounded">
        <div className="text-xs text-gray-600 mb-1">보관됨</div>
        <div className="text-2xl font-bold text-gray-600">{archived}</div>
      </div>

      <div className="py-3 px-4 bg-gray-100 border border-gray-400 rounded">
        <div className="text-xs text-gray-600 mb-1">총 조회수</div>
        <div className="text-2xl font-bold text-gray-700">{totalViews}</div>
      </div>
    </div>
  );
};
