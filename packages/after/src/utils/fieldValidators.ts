// Form field validators
// UI 컴포넌트에서 비즈니스 로직을 분리

type ValidatorOptions = {
  fieldType?: 'username' | 'email' | 'postTitle' | 'slug' | 'normal';
  entityType?: 'user' | 'post';
  checkBusinessRules?: boolean;
};

/**
 * fieldType에 따라 적절한 validation을 수행
 * @param value - 검증할 값
 * @param options - 검증 옵션 (fieldType, entityType, checkBusinessRules)
 * @returns 에러 메시지 또는 빈 문자열
 */
export const validateField = (
  value: string,
  options: ValidatorOptions = {}
): string => {
  const {
    fieldType = 'normal',
    entityType,
    checkBusinessRules = false,
  } = options;

  if (!value) return '';

  switch (fieldType) {
    case 'username':
      return validateUsername(value, checkBusinessRules);

    case 'email':
      return validateEmail(value, entityType, checkBusinessRules);

    case 'postTitle':
      return validatePostTitle(value, entityType, checkBusinessRules);

    case 'slug':
      return validateSlug(value);

    default:
      return '';
  }
};

/**
 * 사용자명 검증
 */
function validateUsername(value: string, checkBusinessRules: boolean): string {
  if (value.length < 3) {
    return '사용자명은 3자 이상이어야 합니다';
  }

  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return '영문, 숫자, 언더스코어만 사용 가능합니다';
  }

  if (value.length > 20) {
    return '사용자명은 20자 이하여야 합니다';
  }

  if (checkBusinessRules) {
    const reservedWords = ['admin', 'root', 'system', 'administrator'];
    if (reservedWords.includes(value.toLowerCase())) {
      return '예약된 사용자명입니다';
    }
  }

  return '';
}

/**
 * 이메일 검증
 */
function validateEmail(
  value: string,
  entityType?: 'user' | 'post',
  checkBusinessRules?: boolean
): string {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return '올바른 이메일 형식이 아닙니다';
  }

  if (checkBusinessRules && entityType === 'user') {
    if (!value.endsWith('@company.com') && !value.endsWith('@example.com')) {
      return '회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다';
    }
  }

  return '';
}

/**
 * 게시글 제목 검증
 */
function validatePostTitle(
  value: string,
  entityType?: 'user' | 'post',
  checkBusinessRules?: boolean
): string {
  if (value.length < 5) {
    return '제목은 5자 이상이어야 합니다';
  }

  if (value.length > 100) {
    return '제목은 100자 이하여야 합니다';
  }

  if (checkBusinessRules && entityType === 'post') {
    const bannedWords = ['광고', '스팸', '홍보'];
    const hasBannedWord = bannedWords.some((word) => value.includes(word));
    if (hasBannedWord) {
      return '제목에 금지된 단어가 포함되어 있습니다';
    }
  }

  return '';
}

/**
 * Slug 검증
 */
function validateSlug(value: string): string {
  if (!/^[a-z0-9-]+$/.test(value)) {
    return '소문자, 숫자, 하이픈만 사용 가능합니다';
  }

  if (value.startsWith('-') || value.endsWith('-')) {
    return '하이픈으로 시작하거나 끝날 수 없습니다';
  }

  return '';
}
