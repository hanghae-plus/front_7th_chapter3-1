/**
 * 엔티티 액션에 대한 비즈니스 로직을 처리하는 훅
 * UI 컴포넌트에서 도메인 로직을 분리
 */

export type EntityType = 'user' | 'post';
export type ActionType = 'create' | 'edit' | 'delete' | 'publish' | 'archive';

interface User {
  role: string;
  [key: string]: any;
}

interface Post {
  status: string;
  [key: string]: any;
}

interface UseEntityActionOptions {
  entityType: EntityType;
  action: ActionType;
  entity?: User | Post;
}

interface EntityActionResult {
  /** 버튼이 비활성화되어야 하는지 */
  isDisabled: boolean;
  /** 버튼에 표시할 라벨 */
  label: string;
  /** 추천 variant */
  variant: 'primary' | 'secondary' | 'danger' | 'success';
  /** 비활성화 이유 (툴팁에 사용 가능) */
  disabledReason?: string;
}

/**
 * 엔티티와 액션 타입에 따라 버튼의 상태를 결정하는 훅
 *
 * @example
 * ```tsx
 * const { isDisabled, label, variant } = useEntityAction({
 *   entityType: 'user',
 *   action: 'delete',
 *   entity: user
 * });
 *
 * <Button variant={variant} disabled={isDisabled}>
 *   {label}
 * </Button>
 * ```
 */
export function useEntityAction(
  options: UseEntityActionOptions
): EntityActionResult {
  const { entityType, action, entity } = options;

  // 비활성화 상태 결정
  let isDisabled = false;
  let disabledReason: string | undefined;

  if (entity) {
    // 사용자 관련 비즈니스 규칙
    if (entityType === 'user') {
      const user = entity as User;

      if (action === 'delete' && user.role === 'admin') {
        isDisabled = true;
        disabledReason = '관리자는 삭제할 수 없습니다';
      }
    }

    // 게시글 관련 비즈니스 규칙
    if (entityType === 'post') {
      const post = entity as Post;

      if (action === 'publish' && post.status === 'published') {
        isDisabled = true;
        disabledReason = '이미 게시된 글입니다';
      }

      if (action === 'archive' && post.status !== 'published') {
        isDisabled = true;
        disabledReason = '게시된 글만 보관할 수 있습니다';
      }
    }
  }

  // 라벨 생성
  const label = generateLabel(entityType, action);

  // Variant 결정
  const variant = getVariantForAction(action);

  return {
    isDisabled,
    label,
    variant,
    disabledReason,
  };
}

/**
 * 액션 타입에 따라 버튼 라벨 생성
 */
function generateLabel(entityType: EntityType, action: ActionType): string {
  const entityLabel = entityType === 'user' ? '사용자' : '게시글';

  switch (action) {
    case 'create':
      return `새 ${entityLabel} 만들기`;
    case 'edit':
      return '수정';
    case 'delete':
      return '삭제';
    case 'publish':
      return '게시';
    case 'archive':
      return '보관';
    default:
      return '';
  }
}

/**
 * 액션 타입에 따라 적절한 variant 반환
 */
function getVariantForAction(
  action: ActionType
): 'primary' | 'secondary' | 'danger' | 'success' {
  switch (action) {
    case 'delete':
      return 'danger';
    case 'publish':
      return 'success';
    case 'archive':
      return 'secondary';
    case 'create':
    case 'edit':
    default:
      return 'primary';
  }
}
