/**
 * Alert 타입을 한국어 제목으로 매핑
 */
export function mapAlertTypeToTitle(type: 'success' | 'error' | 'info' | 'warning'): string {
  const titleMap: Record<string, string> = {
    success: '성공',
    error: '오류',
    info: '정보',
    warning: '경고',
  };

  return titleMap[type] || '알림';
}

