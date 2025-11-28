import React from 'react';

interface UserStatsProps {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  admins: number;
}

export const UserStats: React.FC<UserStatsProps> = ({ total, active, inactive, suspended, admins }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4">
      <div className="py-3 px-4 bg-blue-50 border border-blue-300 rounded">
        <div className="text-xs text-gray-600 mb-1">전체</div>
        <div className="text-2xl font-bold text-blue-700">{total}</div>
      </div>

      <div className="py-3 px-4 bg-green-50 border border-green-300 rounded">
        <div className="text-xs text-gray-600 mb-1">활성</div>
        <div className="text-2xl font-bold text-green-700">{active}</div>
      </div>

      <div className="py-3 px-4 bg-orange-50 border border-orange-300 rounded">
        <div className="text-xs text-gray-600 mb-1">비활성</div>
        <div className="text-2xl font-bold text-orange-700">{inactive}</div>
      </div>

      <div className="py-3 px-4 bg-red-50 border border-red-300 rounded">
        <div className="text-xs text-gray-600 mb-1">정지</div>
        <div className="text-2xl font-bold text-red-700">{suspended}</div>
      </div>

      <div className="py-3 px-4 bg-gray-100 border border-gray-400 rounded">
        <div className="text-xs text-gray-600 mb-1">관리자</div>
        <div className="text-2xl font-bold text-gray-700">{admins}</div>
      </div>
    </div>
  );
};
