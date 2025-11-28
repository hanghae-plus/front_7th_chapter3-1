import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 두 값이 동일한지 비교 */
export const compareEqual = <T>(a: T, b: T) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

/** 주어진 함수를 사용하여 두 값이 동일한지 비교 */
export const compareWithPredicate = <T>(
  compareValue: T,
  targetValue: T,
  predicate: (compareValue: T, targetValue: T) => boolean,
) => {
  return predicate(compareValue, targetValue);
};

/** lowercase로 비교 */
export const compareLowerCase = (value: string, target: string) => {
  return value.toLowerCase() === target.toLowerCase();
};

/** 배열에서 주어진 키의 값 중 최대값을 반환 */
export const getMaxValueInArrayByKey = <T>(items: T[], key: keyof T) => {
  return Math.max(...items.map(item => Number(item[key])));
};

export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};
