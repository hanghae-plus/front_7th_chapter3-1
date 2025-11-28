export const USER_ROLE_BADGE_MAP = {
  admin: {
    variant: 'danger',
    content: '관리자',
  },
  moderator: {
    variant: 'warning',
    content: '운영자',
  },
  user: {
    variant: 'primary',
    content: '사용자',
  },
  guest: {
    variant: 'secondary',
    content: '게스트',
  },
} as const;

export const USER_STATUS_BADGE_MAP = {
  active: {
    variant: 'success',
    content: '게시됨',
  },
  inactive: {
    variant: 'warning',
    content: '임시저장',
  },
  suspended: {
    variant: 'danger',
    content: '거부됨',
  },
} as const;

export const POST_CATEGORY_BADGE_MAP = {
  development: {
    variant: 'primary',
    content: '개발',
  },
  design: {
    variant: 'warning',
    content: '디자인',
  },
  accessibility: {
    variant: 'success',
    content: '접근성',
  },
} as const;

export const POST_STATUS_BADGE_MAP = {
  draft: {
    variant: 'warning',
    content: '임시저장',
  },
  published: {
    variant: 'success',
    content: '게시됨',
  },
  archived: {
    variant: 'secondary',
    content: '보관됨',
  },
} as const;
