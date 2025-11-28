import React from 'react';
import { StatsCard } from '@/components/ui';
import { useEntityStats } from '@/hooks/useEntityStats';
import { useEntityContext } from '@/contexts/EntityContext';

/**
 * Entity 통계를 표시하는 컴포넌트
 * 
 * @description
 * Context에서 entityType과 data를 가져와 통계를 표시합니다.
 */
export const EntityStats: React.FC = () => {
  const { entityType, data } = useEntityContext();
  const stats = useEntityStats(entityType, data);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4">
      <StatsCard variant="primary" label="전체" value={stats.total} />
      <StatsCard variant="success" label={stats.stat1.label} value={stats.stat1.value} />
      <StatsCard variant="warning" label={stats.stat2.label} value={stats.stat2.value} />
      <StatsCard variant="destructive" label={stats.stat3.label} value={stats.stat3.value} />
      <StatsCard variant="muted" label={stats.stat4.label} value={stats.stat4.value} />
    </div>
  );
};
