import React, { useState } from 'react';

import { ManagementTabs } from './tabs';
import { UserManagementContainer } from './user-container';
import { PostManagementContainer } from './post-container';

type EntityType = 'user' | 'post';

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');

  return (
    <div className="bg-subtle min-h-screen">
      <div className="p-lg mx-auto max-w-[1200px]">
        <div className="mb-lg">
          <h1 className="text-foreground text-pxr-24 mb-pxr-5 font-bold">관리 시스템</h1>
          <p className="text-muted text-base">사용자와 게시글을 관리하세요</p>
        </div>

        <div className="bg-background border-border p-pxr-40 border">
          <ManagementTabs entityType={entityType} setEntityType={setEntityType} />
          {entityType === 'user' && <UserManagementContainer />}
          {entityType === 'post' && <PostManagementContainer />}
        </div>
      </div>
    </div>
  );
};
